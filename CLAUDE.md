# masachi-dc-portfolio

Personal portfolio. React 18 + Vite 6 + Tailwind CSS v4 + motion + react-router-dom. Lenis smooth scroll (instance on `window.__lenis`).

## Commands

- `npm run dev` — dev server (port 5173)
- `npm run build` — production build. **This is the only validation step**: no TypeScript compiler, linter, or tests are installed. Don't add them just to create extra checks.

## Conventions

- **Design tokens** live in `src/styles/theme.css`. Use type roles (`text-display`, `text-headline`, `text-title`, `text-lede`, `text-kicker`, `text-body-lg`, `text-body`, `text-small`, `text-label caps`, `text-micro caps`), text colors (`text-ink`, `text-fg-muted`, `text-fg-subtle`, `text-fg-faint` — large text only), and layout utilities (`container-site`, `container-reading`, `section-y`). Avoid new `text-[Npx]` / `max-w-[...] px-...` one-offs.
- **Routes**: `/` home, `/works/<slug>` case studies (slugs match existing public masachidc.com URLs), `/about`, `/impact`, `/resume`; unknown paths render the 404 page. Old `/projects/<slug>` URLs redirect.
- **Projects**: `src/app/data/projects.ts` — array order is display order.
- **Case studies**: one file per study in `src/app/data/caseStudies/` (`<slug>.tsx`), registered in `index.ts`; types in `types.ts`. Blocks: `section` (kicker + title + prose, optional media), `insight` (one-line turning point), `media` (grey band; `wide` breaks out), `outcomes`. Section ids come from kickers. Media without `src` is a labelled slot shown only in `?preview`. `status: 'draft'` = noindex, public page shows "in progress"; append `?preview` to review. Projects with no study get an automatic in-progress page. Only verified content — never invent metrics or research.
- **Professional record** (About, Impact, Resume): `src/app/data/profile.ts`, one source so a claim is never worded two ways. Verified facts only; state outcomes alongside the work, not as caused by it. Unconfirmed details are listed as internal CONTENT GAPS there, never rendered. `resumePdf` stays null until a real PDF is in /public. Resume is noindex until education details are confirmed.
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
