/**
 * Semantic icon names → line-art glyphs (ARCHITECTURE.md §5.2).
 * Templates say `<NIcon name="practitioners" />`, never a library import. Swapping a glyph is one
 * line here.
 *
 * redesign-v3: every glyph is a true stroke drawing on Lucide's 24px grid (lucide-static, ISC),
 * so one stroke weight runs through the whole site, from 16px UI marks to 96px illustrations.
 * Brand logos (LinkedIn, X, YouTube) are not in Lucide; they are authored below on the same grid
 * in the same stroke grammar.
 */
import arrowLeft from "lucide-static/icons/arrow-left.svg?raw";
import arrowRight from "lucide-static/icons/arrow-right.svg?raw";
import arrowUpRight from "lucide-static/icons/arrow-up-right.svg?raw";
import badgeCheck from "lucide-static/icons/badge-check.svg?raw";
import building2 from "lucide-static/icons/building-2.svg?raw";
import calendarCheck from "lucide-static/icons/calendar-check.svg?raw";
import chartColumn from "lucide-static/icons/chart-no-axes-column.svg?raw";
import check from "lucide-static/icons/check.svg?raw";
import chevronLeft from "lucide-static/icons/chevron-left.svg?raw";
import chevronRight from "lucide-static/icons/chevron-right.svg?raw";
import circleAlert from "lucide-static/icons/circle-alert.svg?raw";
import circleCheck from "lucide-static/icons/circle-check.svg?raw";
import clipboardCheck from "lucide-static/icons/clipboard-check.svg?raw";
import download from "lucide-static/icons/download.svg?raw";
import fileText from "lucide-static/icons/file-text.svg?raw";
import handshake from "lucide-static/icons/handshake.svg?raw";
import idCard from "lucide-static/icons/id-card.svg?raw";
import listChecks from "lucide-static/icons/list-checks.svg?raw";
import lock from "lucide-static/icons/lock.svg?raw";
import mapPin from "lucide-static/icons/map-pin.svg?raw";
import menu from "lucide-static/icons/menu.svg?raw";
import pause from "lucide-static/icons/pause.svg?raw";
import play from "lucide-static/icons/play.svg?raw";
import quote from "lucide-static/icons/quote.svg?raw";
import star from "lucide-static/icons/star.svg?raw";
import userRound from "lucide-static/icons/user-round.svg?raw";
import users from "lucide-static/icons/users.svg?raw";
import x from "lucide-static/icons/x.svg?raw";

/** Lucide file → inner shapes only, each with pathLength="1" so CSS can stroke-draw it. */
function inner(raw: string): string {
  return raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/^[\s\S]*?<svg[^>]*>/, "")
    .replace(/<\/svg>\s*$/, "")
    .replace(/<(path|circle|rect|line|polyline|polygon|ellipse)\b/g, '<$1 pathLength="1"')
    .replace(/\s+/g, " ")
    .trim();
}

/** Authored brand marks: same 24px grid, same stroke grammar as Lucide. */
const brand = (shapes: string) => inner(`<svg>${shapes}</svg>`);
const linkedin = brand(
  '<rect x="3" y="3" width="18" height="18" rx="4"/><path d="M8 10.5v6"/><path d="M8 7.5v.01"/><path d="M12 16.5v-6"/><path d="M12 13a2.75 2.75 0 0 1 5.5 0v3.5"/>',
);
const xLogo = brand(
  '<path d="M4.5 4h4.2l10.8 16h-4.2z"/><path d="M19.5 4l-6.4 7.1"/><path d="M4.5 20l6.4-7.1"/>',
);
const youtube = brand(
  '<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10.25 9.5 14.5 12l-4.25 2.5z"/>',
);

export const ICONS = {
  // Trust figures
  practitioners: inner(users),
  "zero-barrier": inner(lock),
  "delivery-standard": inner(listChecks),
  partners: inner(handshake),

  // Commission features
  vetted: inner(badgeCheck),
  documentation: inner(fileText),
  dashboard: inner(chartColumn),
  "audit-report": inner(clipboardCheck),

  // Audience doors (shown large as line-art illustrations)
  beneficiary: inner(userRound),
  practitioner: inner(idCard),
  organisation: inner(building2),

  // UI
  "arrow-right": inner(arrowRight),
  "arrow-left": inner(arrowLeft),
  "arrow-up-right": inner(arrowUpRight),
  "chevron-left": inner(chevronLeft),
  "chevron-right": inner(chevronRight),
  check: inner(check),
  "check-circle": inner(circleCheck),
  "calendar-check": inner(calendarCheck),
  download: inner(download),
  menu: inner(menu),
  close: inner(x),
  star: inner(star),
  quote: inner(quote),
  error: inner(circleAlert),
  "map-pin": inner(mapPin),
  pause: inner(pause),
  play: inner(play),

  // Social
  linkedin,
  x: xLogo,
  youtube,
} as const satisfies Record<string, string>;

export type IconName = keyof typeof ICONS;

/**
 * Legacy weight names, kept so existing call sites read the same:
 * regular = the house stroke, bold = heavier stroke (small UI marks), fill = solid shape.
 */
export type IconWeight = "regular" | "bold" | "fill";

export function resolveIcon(name: IconName): string {
  return ICONS[name];
}
