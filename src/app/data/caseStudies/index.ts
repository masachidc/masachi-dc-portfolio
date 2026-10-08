import { OTHER_PROJECTS, PROJECTS, findProject, type Project } from '../projects';
import { amuse } from './amuse';
import { inline } from './inline';
import { kesho } from './kesho';
import { projectSeeds } from './projectSeeds';
import { stemxposure } from './stemxposure';
import { tembo } from './tembo';
import type { CaseStudy } from './types';

export type { CaseBlock, CaseStudy, DeepDive, Media, MediaRatio } from './types';
export { DEEP_DIVES, deepDivesFor, findDeepDive } from './deepDives';

/** Authored case studies. To add one: create `<slug>.tsx` beside this file and list it here. */
const WRITTEN: CaseStudy[] = [tembo, amuse, kesho, inline, projectSeeds, stemxposure];

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

export const isPublished = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug)?.status === 'published';
