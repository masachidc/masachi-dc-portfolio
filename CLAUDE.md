# masachi-dc-portfolio

Personal portfolio. React 18 + Vite 6 + Tailwind CSS v4 + motion + react-router-dom. Lenis smooth scroll (instance on `window.__lenis`).

## Commands

- `npm run dev` — dev server (port 5173)
- `npm run build` — production build. **This is the only validation step**: no TypeScript compiler, linter, or tests are installed. Don't add them just to create extra checks.

## Conventions

- **Design tokens** live in `src/styles/theme.css`. Use type roles (`text-display`, `text-headline`, `text-title`, `text-lede`, `text-kicker`, `text-body-lg`, `text-body`, `text-small`, `text-label caps`, `text-micro caps`), text colors (`text-ink`, `text-fg-muted`, `text-fg-subtle`, `text-fg-faint` — large text only), and layout utilities (`container-site`, `container-reading`, `section-y`). Avoid new `text-[Npx]` / `max-w-[...] px-...` one-offs.
- **Routes**: `/` home, `/works/<slug>` case studies (slugs match existing public masachidc.com URLs), `/about`, `/impact`, `/resume`; unknown paths render the 404 page. Old `/projects/<slug>` URLs redirect.
- **Projects**: `src/app/data/projects.ts` — array order is display order.
- **Brand systems**: `src/app/data/brands.ts`, one per project (keyed by slug), referenced as `project.brand`. Each case study uses its project's brand; the card hover wash and rails use `brand.primary`. Only brand colours Nathan has given — never approximate or invent them.
- **Case studies**: one file per study in `src/app/data/caseStudies/` (`<slug>.tsx`), registered in `index.ts`; types in `types.ts`. Blocks: `section` (kicker + title + prose, optional media), `insight` (one-line turning point), `media` (grey band; `wide` breaks out), `outcomes`. Section ids come from kickers. Media without `src` renders as a labelled "Image coming soon" placeholder everywhere (dev, preview, production), so merged work looks the same live as on localhost. **Media rule: every image (cover, section `media`, media blocks) sits in the same full-bleed grey band**: `bg-surface` spans 100% of the viewport width, edge to edge, with the image in the reading column (or site container when `wide`). Never put an image in a padded or rounded grey card inside the text column. On any page, render content images only through `MediaBand` (`src/app/components/MediaBand.tsx`): `<MediaBand items={[{ slot, ratio, src, alt }]} />`. `status: 'draft'` = noindex, public page shows "in progress"; append `?preview` to review. Projects with no study get an automatic in-progress page. Only verified content — never invent metrics or research. Long stories can open phases with `chapter` blocks (the rail then lists chapters only). **Deep dives**: optional long-form companions in `caseStudies/deepDives/` served at `/works/<slug>/<article>`, same block grammar, same status as their case study; link to them only with `<DeepLink to={dive} />` so a link can never point at a missing page. `Table` is for small evidence comparisons only.
- **Professional record** (About, Impact, Resume): `src/app/data/profile.ts`, one source so a claim is never worded two ways. Verified facts only; state outcomes alongside the work, not as caused by it. Unconfirmed details are listed as internal CONTENT GAPS there, never rendered. `resumePdf` stays null until a real PDF is in /public (no download link renders until then). Resume is indexed and in the sitemap.
- **Metadata**: call `usePageMeta()` in every page. When a case study stops being a draft, add it to `public/sitemap.xml`.

## Autonomous work

- Always work on a branch. Before making any change, create one from an up-to-date `master` (e.g. `feat/amuse-rails`, `fix/nav-overlap`, `docs/...`). Never commit directly to `master`.
- Default to action: inspect the code, implement, verify with `npm run build`, review the diff, commit. When asked for end-to-end execution, push the branch (`git push -u origin <branch>`); merging into `master` happens via PR unless explicitly told to merge.
- Don't ask questions the repo can answer. Follow existing conventions; match the surrounding code.
- Scope discipline: change only what's requested or clearly necessary. No unrelated refactors or speculative abstractions.
- Before pushing: check `git status`, review the diff, run the build, stage only task files (never `.claude/settings.local.json` or secrets), then a normal `git push` of the branch.
- Never claim a check passed unless it ran. If one can't run, say exactly why.
- Preserve uncommitted work you didn't create.
- On failure: read the error, diagnose, apply a non-destructive fix, continue.
- Ask first before: force-push, deleting remote branches, `git reset --hard` over user work, `--no-verify`, disabling checks to go green, rewriting published history.
