/**
 * Production URL comes from NEXT_PUBLIC_SITE_URL (see .env.example).
 * Falls back to the Vercel deployment URL when present, then localhost for development.
 */
export function siteUrl(): URL {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    'http://localhost:3000';
  try {
    return new URL(raw);
  } catch {
    return new URL('http://localhost:3000');
  }
}
