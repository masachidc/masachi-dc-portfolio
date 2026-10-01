import type { PageMeta } from '../lib/head';
import { PROFILE } from './profile';

/** Title and description for the top-level pages; also written into each route's static HTML at build. */
export const PAGE_META = {
  about: {
    title: 'About',
    description:
      'Nathan Masachi is a product designer and design engineer trained in architecture, digital interactive media, and computer science, based in Tampa, Florida.',
  },
  impact: {
    title: 'Impact',
    description:
      "Outcomes from Nathan Masachi's work: an app shipped to the App Store, 500+ students reached across seven countries, and program, product, and recognition results.",
  },
  resume: {
    title: 'Resume',
    description: `${PROFILE.name}, ${PROFILE.role}: shipped work, experience, selected projects, skills, and education.`,
    // Indexed (and added to the sitemap) once education is confirmed; see profile.ts CONTENT GAPS. A PDF isn't required.
    noindex: true,
  },
} satisfies Record<string, PageMeta>;
