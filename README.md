# Masachi DC portfolio

Nathan Masachi's portfolio at [masachidc.com](https://masachidc.com). React 18, Vite 6, Tailwind CSS v4, Motion and React Router, deployed on Vercel.

## Running the code

- `npm ci` — install the locked dependencies
- `npm run dev` — dev server on port 5173
- `npm run build` — production build in `dist/` (the only validation step)
- `npm run preview` — serve the production build locally

## Structure

- `src/main.tsx` — entry point and routes; every page except the homepage is code-split
- `src/app/pages/` — one file per page (home, case study, deep dive, about, impact, resume, discipline, 404)
- `src/app/components/` — shared UI (nav, footer, cards, rails, media bands)
- `src/app/data/` — projects, brand systems, case studies, profile, site links and metadata defaults
- `src/app/lib/` — motion presets, page metadata, scroll helpers
- `src/styles/theme.css` — design tokens: colour, type scale, layout, motion
- `public/` — images, favicon, robots.txt, sitemap.xml
- `vercel.json` — SPA rewrite, long-lived caching for hashed assets, security headers

Conventions for content and code live in `CLAUDE.md`.
