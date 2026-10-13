import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Next 16 renamed `middleware` to `proxy`; the runtime is Node.js.
 * next-intl handles locale detection from the `Accept-Language` header and
 * redirects to a locale-prefixed URL. There is no IP-based redirect: we only
 * use the browser's stated preference, and a chosen locale is remembered by
 * next-intl's cookie.
 */
export default createMiddleware(routing);

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
