import { CASE_STUDIES, caseStudyMeta } from '../data/caseStudies';
import { findProject } from '../data/projects';
import { PAGE_META } from '../data/pageMeta';
import type { PageMeta } from './head';

/** Routes that get their own static HTML (scripts/prerender-head.mjs). Unknown paths fall back to index.html. */
export const PRERENDER_ROUTES: { path: string; meta: PageMeta }[] = [
  { path: '/', meta: {} },
  { path: '/about', meta: PAGE_META.about },
  { path: '/impact', meta: PAGE_META.impact },
  { path: '/resume', meta: PAGE_META.resume },
  ...CASE_STUDIES.map((study) => ({ path: `/works/${study.slug}`, meta: caseStudyMeta(study, findProject(study.slug)!) })),
];
