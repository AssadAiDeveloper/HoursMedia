import { notFound } from "next/navigation";

/**
 * Catch-all for unknown paths inside a locale. It delegates to the nearest
 * `not-found.tsx` so visitors get a translated 404 within the site shell
 * instead of Next's default page.
 */
export default function CatchAllNotFound() {
  notFound();
}
