/**
 * Hero "The Path" — WebGL scene. Framework-free; created by useThreeScene() AFTER first paint
 * via dynamic import, so `three` never enters the initial bundle.
 *
 * What it draws (all low contrast on the mint hero):
 * - a gently undulating topographic field (isolines from hero-path-field.ts, 1px lines)
 * - ONE brighter path (TubeGeometry along a CatmullRomCurve3, green-500, ~1.5px) threading
 *   five stage nodes; it draws in over 1.6s via drawRange, lighting each node as it arrives
 * - camera drift < 2° following the pointer (desktop only, damped)
 *
 * Reduced motion → the final static frame, no undulation, no drift.
 */
import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  CircleGeometry,
  Color,
  Group,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  RingGeometry,
  Scene,
  ShaderMaterial,
  TubeGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { easeBrand, MOTION_MS } from "~/utils/easing";
import {
  buildContourSegments,
  heightAt,
  PATH_LEAD_UV,
  PATH_NODES_UV,
  uvToWorld,
} from "../../domain/hero-path-field";

const GREEN_500 = new Color("#1B6B3A");
const WHITE = new Color("#FFFFFF");

const FOV = 30;
const CAMERA_DISTANCE = 1 / Math.tan(((FOV / 2) * Math.PI) / 180); // visible height = 2 world units
const BASE_TILT = -0.08; // radians — a slight lean so the relief reads as 3D
const MAX_DRIFT = (1 * Math.PI) / 180; // ±1° per axis → under 2° total
const RELIEF = 0.12; // z-scale of the terrain
const TUBULAR_SEGMENTS = 480;
const RADIAL_SEGMENTS = 6;

export interface HeroPathSceneOptions {
  reducedMotion: boolean;
  pixelRatio: number;
}

export interface HeroPathScene {
  setSize: (width: number, height: number) => void;
  setPointer: (nx: number, ny: number) => void;
  /** Renders one frame. Returns false once nothing will change without new input. */
  render: (now: number) => boolean;
  dispose: () => void;
}

export function createHeroPathScene(
  canvas: HTMLCanvasElement,
  options: HeroPathSceneOptions,
): HeroPathScene {
  const renderer = new WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(options.pixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();
  const camera = new PerspectiveCamera(FOV, 1, 0.1, 50);
  camera.position.set(0, 0, CAMERA_DISTANCE);
  camera.lookAt(0, 0, 0);

  const world = new Group();
  world.rotation.x = BASE_TILT;
  scene.add(world);

  // ── Contour field ────────────────────────────────────────────────
  const segs = buildContourSegments();
  const positions = new Float32Array((segs.length / 2) * 3);
  for (let s = 0, p = 0; s < segs.length; s += 2, p += 3) {
    const x = segs[s]!;
    const y = segs[s + 1]!;
    positions[p] = x;
    positions[p + 1] = y;
    positions[p + 2] = heightAt(x, y) * RELIEF;
  }
  const contourGeometry = new BufferGeometry();
  contourGeometry.setAttribute("position", new BufferAttribute(positions, 3));

  const contourMaterial = new ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: GREEN_500 },
      uOpacity: { value: 0.15 },
      uResolution: { value: new Vector2(1, 1) },
    },
    vertexShader: /* glsl */ `
      uniform float uTime;
      void main() {
        vec3 p = position;
        // Gentle undulation on top of the static relief.
        p.z += 0.035 * sin(p.x * 1.2 + uTime * 0.22) * cos(p.y * 1.5 - uTime * 0.17);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform vec2 uResolution;
      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution;   // (0,0) bottom-left
        // Keep the copy area (left ~56%, upper ~80%) quieter: ≤ 15% intensity everywhere,
        // ~9% behind the headline.
        float copy = (1.0 - smoothstep(0.50, 0.60, uv.x)) * smoothstep(0.16, 0.30, uv.y);
        float alpha = uOpacity * mix(1.0, 0.6, copy);
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });
  const contours = new LineSegments(contourGeometry, contourMaterial);
  world.add(contours);

  // ── Path + nodes (rebuilt on resize because they are placed in viewport space) ──
  const pathMaterial = new MeshBasicMaterial({ color: GREEN_500, transparent: true, opacity: 0.9 });
  const nodeFillMaterial = new MeshBasicMaterial({ color: WHITE });
  const nodeRingMaterial = new MeshBasicMaterial({ color: GREEN_500 });

  let pathMesh: Mesh<TubeGeometry, MeshBasicMaterial> | undefined;
  let nodes: Group[] = [];
  let nodeFractions: number[] = [];
  let indexCount = 0;

  let width = 1;
  let height = 1;
  let startTime: number | undefined;
  let lastNow = 0;
  const pointer = new Vector2(0, 0);
  const drift = new Vector2(0, 0);
  let settled = false;

  function disposePath() {
    if (pathMesh) {
      world.remove(pathMesh);
      pathMesh.geometry.dispose();
      pathMesh = undefined;
    }
    for (const node of nodes) {
      world.remove(node);
      node.traverse((obj) => {
        if (obj instanceof Mesh) obj.geometry.dispose();
      });
    }
    nodes = [];
  }

  function buildPath() {
    disposePath();
    const aspect = width / height;
    const pxToWorld = 2 / height; // world units per CSS pixel

    const surfacePoint = (u: number, v: number) => {
      const [x, y] = uvToWorld(u, v, aspect);
      return new Vector3(x, y, heightAt(x, y) * RELIEF + 0.01);
    };

    const points = [
      surfacePoint(PATH_LEAD_UV.in[0], PATH_LEAD_UV.in[1]),
      ...PATH_NODES_UV.map(([u, v]) => surfacePoint(u, v)),
      surfacePoint(PATH_LEAD_UV.out[0], PATH_LEAD_UV.out[1]),
    ];
    const curve = new CatmullRomCurve3(points, false, "centripetal");

    const tube = new TubeGeometry(
      curve,
      TUBULAR_SEGMENTS,
      0.75 * pxToWorld,
      RADIAL_SEGMENTS,
      false,
    );
    indexCount = tube.index ? tube.index.count : 0;
    pathMesh = new Mesh(tube, pathMaterial);
    world.add(pathMesh);

    // Arc-length fraction at which the path reaches each node (TubeGeometry samples by arc length).
    const lengths = curve.getLengths(1000);
    const total = lengths[lengths.length - 1]!;
    nodeFractions = PATH_NODES_UV.map((_, i) => {
      const t = (i + 1) / (points.length - 1);
      return lengths[Math.round(t * 1000)]! / total;
    });

    const r = 5 * pxToWorld;
    nodes = points.slice(1, -1).map((p) => {
      const g = new Group();
      const ring = new Mesh(new RingGeometry(r * 0.62, r, 32), nodeRingMaterial);
      const fill = new Mesh(new CircleGeometry(r * 0.62, 32), nodeFillMaterial);
      ring.position.z = 0.001;
      fill.position.z = 0.001;
      g.add(fill, ring);
      g.position.copy(p);
      g.scale.setScalar(options.reducedMotion ? 1 : 0.0001);
      world.add(g);
      return g;
    });
  }

  function setSize(w: number, h: number) {
    width = Math.max(1, w);
    height = Math.max(1, h);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    const dpr = renderer.getPixelRatio();
    contourMaterial.uniforms.uResolution!.value.set(width * dpr, height * dpr);
    buildPath();
    settled = false;
  }

  function setPointer(nx: number, ny: number) {
    if (options.reducedMotion) return;
    pointer.set(Math.max(-1, Math.min(1, nx)), Math.max(-1, Math.min(1, ny)));
    settled = false;
  }

  function render(now: number): boolean {
    startTime ??= now;
    const elapsed = now - startTime;
    const dt = lastNow ? Math.min(64, now - lastNow) : 16;
    lastNow = now;

    const progress = options.reducedMotion
      ? 1
      : easeBrand(Math.min(1, elapsed / MOTION_MS.heroPath));

    // Path draw-in.
    if (pathMesh && indexCount) {
      const perSegment = RADIAL_SEGMENTS * 6;
      const segments = Math.ceil(progress * TUBULAR_SEGMENTS);
      pathMesh.geometry.setDrawRange(0, Math.min(indexCount, segments * perSegment));
    }

    // Nodes light as the path arrives.
    nodes.forEach((node, i) => {
      const reached = progress >= (nodeFractions[i] ?? 1) - 0.002;
      const current = node.scale.x;
      const target = reached ? 1 : 0.0001;
      const next = options.reducedMotion
        ? target
        : current + (target - current) * Math.min(1, dt / 90);
      node.scale.setScalar(next);
    });

    // Undulation + damped pointer drift.
    if (!options.reducedMotion) {
      contourMaterial.uniforms.uTime!.value = elapsed / 1000;
      drift.lerp(pointer, 1 - Math.pow(0.94, dt / 16));
      world.rotation.y = drift.x * MAX_DRIFT;
      world.rotation.x = BASE_TILT - drift.y * MAX_DRIFT;
    }

    renderer.render(scene, camera);

    if (options.reducedMotion) {
      settled = true;
      return false;
    }
    return !settled;
  }

  function dispose() {
    disposePath();
    contourGeometry.dispose();
    contourMaterial.dispose();
    pathMaterial.dispose();
    nodeFillMaterial.dispose();
    nodeRingMaterial.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }

  return { setSize, setPointer, render, dispose };
}
