import { globSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import tailwindcss from "@tailwindcss/vite";

const configDir = dirname(fileURLToPath(import.meta.url));

// Every feature slice's `ui/` folder auto-registers (ARCHITECTURE.md §9.3).
// The glob runs once at config load — a NEW `ui/` directory needs a dev-server restart.
const uiDirs = globSync("features/**/ui", { cwd: join(configDir, "app") }).map((path) =>
  path.replaceAll("\\", "/"),
);

const SITE_URL = "https://naijapath.com";

export default defineNuxtConfig({
  compatibilityDate: "2026-11-01",
  devtools: { enabled: true },
  // Optional: build into a separate dir (e.g. CI, or building while `nuxt dev` holds .nuxt).
  ...(process.env.NUXT_BUILD_DIR ? { buildDir: process.env.NUXT_BUILD_DIR } : {}),
  devServer: { port: 3000 },

  // The homepage needs SEO, so SSR stays on. Only the WebGL canvas is client-only.
  ssr: true,

  modules: ["@nuxt/fonts", "@nuxt/image"],

  css: ["~/assets/css/tailwind.css"],

  // Inline ALL CSS (incl. the global Tailwind sheet, ~7 KB gz) into the server-rendered HTML:
  // removes the one render-blocking request on this single-page site.
  features: { inlineStyles: true },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        "axios",
        "class-variance-authority",
        "clsx",
        "reka-ui",
        "tailwind-merge",
        "vee-validate",
        "@vee-validate/yup",
        "yup",
      ],
    },
  },

  components: [
    ...uiDirs.map((path) => ({ path: `~/${path}`, extensions: ["vue"] })),
    // `extensions` pinned so sibling `*-variants.ts` files are never registered as components.
    { path: "~/components", extensions: ["vue"] },
  ],

  imports: {
    dirs: ["features/**/composition"],
  },

  runtimeConfig: {
    // Server-only: where the same-origin proxy forwards `/backend/**` (ARCHITECTURE.md §10.2).
    apiProxyTarget: "",
    public: {
      apiBaseUrl: "/backend",
      siteUrl: SITE_URL,
      // Placeholder testimonial cards must never ship to production (brief §07).
      // Override with NUXT_PUBLIC_SHOW_PLACEHOLDER_TESTIMONIALS=true|false.
      showPlaceholderTestimonials: process.env.NODE_ENV !== "production",
      // WhatsApp number for the chat assistant and the Contact page, international format
      // (e.g. 2348031234567). NOT supplied yet: while empty, "Continue on WhatsApp" falls back
      // to the Contact page. Set NUXT_PUBLIC_WHATSAPP_NUMBER at BUILD time: the homepage is
      // prerendered, so its HTML carries the value it was built with.
      whatsappNumber: "",
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: "en-NG" },
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, viewport-fit=cover",
      meta: [
        { name: "theme-color", content: "#1E6428" },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      ],
    },
  },

  fonts: {
    defaults: {
      preload: false,
      subsets: ["latin"],
      styles: ["normal"],
    },
    families: [
      {
        // redesign-v3: one family for display and text (Fontshare, free for commercial use,
        // self-hosted at build). 500 = headings, 400 = body, 600 = small UI emphasis.
        name: "General Sans",
        provider: "fontshare",
        weights: [400, 500, 600],
        styles: ["normal", "italic"],
        // Preload the heading weight only (the hero H1 is the first text painted).
        preload: { weights: [500], styles: ["normal"] },
      },
    ],
  },

  image: {
    format: ["avif", "webp"],
    // AVIF/WebP at 60 is visually indistinguishable for photography and ~35% lighter than 72.
    quality: 60,
    // Mirrors the breakpoints in tailwind.css (the one place breakpoints are defined for CSS).
    screens: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1440,
    },
    densities: [1, 2],
  },

  routeRules: {
    // The homepage's content is static: render it on the server AT BUILD TIME. Crawlers get the
    // same full HTML as SSR, but it ships pre-compressed with zero server latency, and
    // @nuxt/image pre-generates every srcset variant as a static file. Remove this line to
    // switch back to per-request SSR (e.g. if the page ever shows live data).
    "/": { prerender: true },
    "/**": {
      headers: {
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
        "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
      },
    },
    "/_ipx/**": { headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
    "/_fonts/**": { headers: { "Cache-Control": "public, max-age=31536000, immutable" } },
  },

  nitro: {
    compressPublicAssets: { gzip: true, brotli: true },
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },
});
