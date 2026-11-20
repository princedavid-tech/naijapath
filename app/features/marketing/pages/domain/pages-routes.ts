/**
 * Routes and API endpoints for the standalone pages (sign in / sign up, contact, session request).
 *
 * `/sign-in` and `/book-a-session` are the paths the homepage already links to (HOME_ROUTES).
 * The API paths are relative to runtimeConfig.public.apiBaseUrl (same-origin `/backend/**`
 * proxy). They are NOT confirmed — agree the final paths and payloads with the platform team.
 */
import { HOME_ROUTES } from "../../home/domain/home-routes";

export const PAGES_ROUTES = {
  home: HOME_ROUTES.home,
  signIn: HOME_ROUTES.signIn,
  bookSession: HOME_ROUTES.bookSession,
  contact: HOME_ROUTES.contact,
  privacy: HOME_ROUTES.privacy,
  terms: HOME_ROUTES.terms,
  // Where a signed-in user goes next (platform app — confirm with the platform team).
  afterSignIn: "/dashboard",
} as const;

export const PAGES_API = {
  signIn: "/auth/sign-in",
  signUp: "/auth/sign-up",
  contact: "/contact",
  sessionRequest: "/session-requests",
} as const;
