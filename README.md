# Beka Natchkebia — Portfolio (Next.js)

Next.js App Router + TypeScript + Tailwind CSS port of the approved design in `../portfolio-react`,
with content from `../about-me.md`.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
npm run lint       # ESLint (eslint-config-next)
npm run typecheck  # tsc --noEmit
```

## Editing content

All copy, projects, links, experience and skills live in **`src/content/portfolio.ts`** (typed).
Nothing personal is hard-coded in components.

Optional fields on `profile` — currently unset because the source material doesn't provide them:

| Field | Effect when set |
| --- | --- |
| `email` | Adds an Email link; the contact orb switches from “Connect on LinkedIn” to copy-to-clipboard |
| `github` | Adds GitHub to the contact links and JSON-LD `sameAs` |
| `resumeUrl` | Experience header link becomes “Résumé (PDF)” (e.g. put `resume.pdf` in `/public` and use `/resume.pdf`) |
| `portrait` | Replaces the generated “signal” panel in the hero with your photo via `next/image` (e.g. `/portrait.jpg`, 4:5, shown B&W) |

Featured-project figures are diagrams drawn in code from project facts (no product screenshots were supplied).
The one exception is Memoire's real app icon (`public/projects/memoire-icon.png`, copied from the Memoire repo's `assets/`).
A project's `status` (e.g. "On TestFlight") renders as a badge in the index, the featured card and the detail view;
add a `links` entry when a public TestFlight or App Store URL exists and a button appears automatically.

## Environment

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production origin, e.g. `https://example.com`. Used for canonical URL, Open Graph/Twitter URLs, `robots.txt`, `sitemap.xml`. Falls back to Vercel's production URL, then `http://localhost:3000`. |

Copy `.env.example` to `.env.local` and fill it in before a production build.

## Structure

- `src/app` — layout (fonts via `next/font`, metadata, no-flash theme script), page, `icon`, `opengraph-image`, `robots`, `sitemap`, `globals.css`
- `src/components` — Server Components by default; client islands only where needed:
  `Header` (theme, clock, mobile menu), `HeroFx` (letter swell + liquid-glass lens), `Marquee`, `FillText`,
  `Work` (hover preview), `Rail`, `Orb`, `Cursor`, `Reveal`, `DialogController`
- `src/lib/motion.ts` — single shared `requestAnimationFrame` loop, pointer/scroll state, reduced-motion helpers

## Notes

- `globals.css` keeps the original design CSS verbatim (only font variables and the hero intro animation adapted);
  additions are appended below a marker. Tailwind is loaded **without Preflight** so the approved design renders unchanged.
- Project details open as native `<dialog>`s via `#/work/<slug>` links — deep-linkable, Esc/Back/Close all work.
- Hover-only effects (cursor, lens, letter swell, preview, magnetic orb) are disabled for touch input and
  `prefers-reduced-motion`; reveals, marquee, and intro animations are static under reduced motion.
