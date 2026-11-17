/**
 * Semantic icon names → Phosphor glyphs (ARCHITECTURE.md §5.2).
 * Templates say `<NIcon name="practitioners" />`, never a Phosphor import. Swapping a glyph is one
 * line here.
 *
 * Only the weights actually used are imported (raw SVG from @phosphor-icons/core) — the Vue
 * components ship all six weights per icon, which cost ~19 KB gz in the initial bundle.
 * Need another weight? Import `@phosphor-icons/core/<weight>/<name>-<weight>.svg?raw` and add it.
 */
import usersThree from "@phosphor-icons/core/regular/users-three.svg?raw";
import lockSimple from "@phosphor-icons/core/regular/lock-simple.svg?raw";
import listChecks from "@phosphor-icons/core/regular/list-checks.svg?raw";
import handshake from "@phosphor-icons/core/regular/handshake.svg?raw";
import sealCheck from "@phosphor-icons/core/regular/seal-check.svg?raw";
import fileText from "@phosphor-icons/core/regular/file-text.svg?raw";
import chartLineUp from "@phosphor-icons/core/regular/chart-line-up.svg?raw";
import clipboardText from "@phosphor-icons/core/regular/clipboard-text.svg?raw";
import userCircle from "@phosphor-icons/core/regular/user-circle.svg?raw";
import identificationBadge from "@phosphor-icons/core/regular/identification-badge.svg?raw";
import buildings from "@phosphor-icons/core/regular/buildings.svg?raw";
import arrowRightBold from "@phosphor-icons/core/bold/arrow-right-bold.svg?raw";
import checkBold from "@phosphor-icons/core/bold/check-bold.svg?raw";
import checkCircleFill from "@phosphor-icons/core/fill/check-circle-fill.svg?raw";
import calendarCheck from "@phosphor-icons/core/regular/calendar-check.svg?raw";
import downloadSimple from "@phosphor-icons/core/regular/download-simple.svg?raw";
import list from "@phosphor-icons/core/regular/list.svg?raw";
import xIcon from "@phosphor-icons/core/regular/x.svg?raw";
import star from "@phosphor-icons/core/regular/star.svg?raw";
import starFill from "@phosphor-icons/core/fill/star-fill.svg?raw";
import warningCircleBold from "@phosphor-icons/core/bold/warning-circle-bold.svg?raw";
import linkedinLogo from "@phosphor-icons/core/regular/linkedin-logo.svg?raw";
import xLogo from "@phosphor-icons/core/regular/x-logo.svg?raw";
import youtubeLogo from "@phosphor-icons/core/regular/youtube-logo.svg?raw";
import mapPin from "@phosphor-icons/core/regular/map-pin.svg?raw";
import pauseFill from "@phosphor-icons/core/fill/pause-fill.svg?raw";
import playFill from "@phosphor-icons/core/fill/play-fill.svg?raw";

export type IconWeight = "regular" | "bold" | "fill";
type IconSet = Partial<Record<IconWeight, string>>;

/** Keep only the inner markup; NIcon renders its own <svg> wrapper. */
const inner = (raw: string) => raw.replace(/^\s*<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "");

export const ICONS = {
  // Trust bar
  practitioners: { regular: inner(usersThree) },
  "zero-barrier": { regular: inner(lockSimple) },
  "delivery-standard": { regular: inner(listChecks) },
  partners: { regular: inner(handshake) },

  // Commission features
  vetted: { regular: inner(sealCheck) },
  documentation: { regular: inner(fileText) },
  dashboard: { regular: inner(chartLineUp) },
  "audit-report": { regular: inner(clipboardText) },

  // Audience doors
  beneficiary: { regular: inner(userCircle) },
  practitioner: { regular: inner(identificationBadge) },
  organisation: { regular: inner(buildings) },

  // UI
  "arrow-right": { bold: inner(arrowRightBold) },
  check: { bold: inner(checkBold) },
  "check-circle": { fill: inner(checkCircleFill) },
  "calendar-check": { regular: inner(calendarCheck) },
  download: { regular: inner(downloadSimple) },
  menu: { regular: inner(list) },
  close: { regular: inner(xIcon) },
  star: { regular: inner(star), fill: inner(starFill) },
  error: { bold: inner(warningCircleBold) },
  "map-pin": { regular: inner(mapPin) },
  pause: { fill: inner(pauseFill) },
  play: { fill: inner(playFill) },

  // Social
  linkedin: { regular: inner(linkedinLogo) },
  x: { regular: inner(xLogo) },
  youtube: { regular: inner(youtubeLogo) },
} as const satisfies Record<string, IconSet>;

export type IconName = keyof typeof ICONS;

/** The requested weight, else whichever weight this icon ships with. */
export function resolveIcon(name: IconName, weight: IconWeight = "regular"): string {
  const set: IconSet = ICONS[name];
  return set[weight] ?? set.regular ?? set.bold ?? set.fill ?? "";
}
