import { OTHER_PROJECTS, PROJECTS, findProject, type Project } from '../projects';
import { amuse } from './amuse';
import { inline } from './inline';
import { kesho } from './kesho';
import { projectSeeds } from './projectSeeds';
import type { PageMeta } from '../../lib/head';
import type { CaseStudy } from './types';

export type { CaseBlock, CaseStudy, Media, MediaRatio } from './types';

/** Authored case studies. To add one: create `<slug>.tsx` beside this file and list it here. */
const WRITTEN: CaseStudy[] = [amuse, kesho, inline, projectSeeds];

/**
 * Projects without an authored study still get a real URL: a draft built only
 * from verified project data, rendered as a "case study in progress" page.
 */
function comingSoon(p: Project): CaseStudy {
  const rest = p.railTitle.slice(p.title.length).trim();
  return {
    slug: p.slug,
    status: 'draft',
    title: rest ? [p.title, rest] : [p.title],
    tagline: p.description,
    facts: p.year
      ? [
          ['Discipline', p.disciplines],
          ['Year', p.year],
        ]
      : [['Discipline', p.disciplines]],
    blocks: [],
  };
}

export const CASE_STUDIES: CaseStudy[] = [...PROJECTS, ...OTHER_PROJECTS].map(
  (p) => WRITTEN.find((c) => c.slug === p.slug) ?? comingSoon(p),
);

export const findCaseStudy = (slug: string | undefined) => {
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  const project = findProject(slug);
  return study && project ? { study, project } : undefined;
};

/** A case study's title, description, and indexing, for the page and its static HTML. */
export const caseStudyMeta = (study: CaseStudy, project: Project): PageMeta => ({
  title: study.title.join(' '),
  description: study.description ?? project.description,
  noindex: study.status === 'draft',
});

export const isPublished = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)?.status === 'published';
