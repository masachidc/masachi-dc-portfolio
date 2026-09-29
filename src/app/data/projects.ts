/**
 * A portfolio project. Order in PROJECTS is display order — numbering, the
 * homepage mosaic, and the rails all follow the array, so reordering is safe.
 */
export interface Project {
  /** Stable URL segment: the case study lives at /works/<slug>. Matches existing public URLs. */
  slug: string;
  title: string;
  cardTitle: string;
  railTitle: string;
  /** What it is, in a few words. Always visible on the card. */
  summary: string;
  /** What Nathan did, "·"-separated. Always visible on the card. */
  disciplines: string;
  /** Omit until verified. */
  year?: string;
  /** One or two sentences on why it's interesting. Shown on hover (desktop) and below the card (mobile). */
  description: string;
  /** Temporary: link out to a case study hosted elsewhere instead of /works/<slug>. */
  externalUrl?: string;
  /**
   * Card image. `placeholder: true` marks generic stock imagery awaiting a real
   * project cover — swap `src` (and drop the flag) when artwork exists.
   */
  cover: { src: string; position: string; placeholder?: boolean };
  accent: string;
  accentDeep: string;
  foreground: string;
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

// Order: Selected work on the homepage, as Nathan ranks it.
export const PROJECTS: Project[] = [
  {
    slug: 'tembo-app',
    title: 'TEMBO',
    cardTitle: 'TEMBO APP',
    railTitle: 'TEMBO App',
    summary: 'Social storytelling app',
    disciplines: 'Founder · Product Design',
    year: '2026',
    description:
      'A social iOS app for turning everyday moments into ongoing Storylines about goals, hobbies, relationships, pets, and trips. Live on the App Store.',
    cover: { src: unsplash('photo-1549366021-9f761d450615'), position: 'center', placeholder: true },
    accent: '#00707A',
    accentDeep: '#003A40',
    foreground: '#ffffff',
  },
  {
    slug: 'kesho-app',
    title: 'KESHO',
    cardTitle: 'KESHO APP',
    railTitle: 'KESHO App',
    summary: 'Social foresight platform',
    disciplines: 'Product Design · Full Stack',
    year: '2026',
    description:
      'Predictions for sports, entertainment, and politics. Forecasts are sealed at kickoff and revealed once the outcome lands.',
    cover: { src: unsplash('photo-1768330187404-59e46cf222c9'), position: 'center', placeholder: true },
    accent: '#0057FF',
    accentDeep: '#00297A',
    foreground: '#ffffff',
  },
  {
    slug: 'amuse-art-museum',
    title: 'AMUSE',
    cardTitle: 'AMUSE WEB APP',
    railTitle: 'AMUSE Web App',
    summary: 'Museum Discovery and Booking',
    disciplines: 'Product Design · UX Research',
    year: '2025',
    description:
      'A mobile-first platform connecting how people discover exhibitions in Kenya with how they plan and book a visit, with M-Pesa payments built into the flow.',
    cover: { src: unsplash('photo-1774514580599-c3dae376348e'), position: 'center 35%', placeholder: true },
    accent: '#B84300',
    accentDeep: '#5C2200',
    foreground: '#ffffff',
  },
  {
    slug: 'inline-chrome-extension',
    title: 'INLINE',
    cardTitle: 'INLINE EXTENSION',
    railTitle: 'INLINE Extension',
    summary: 'AI annotation chrome extension',
    disciplines: 'Product Design · UI',
    year: '2026',
    description:
      'Turns any webpage into an interactive canvas. Annotate, highlight, draw, and call up AI without leaving the tab.',
    cover: { src: unsplash('photo-1768638687898-7851d341cb87'), position: 'center', placeholder: true },
    accent: '#7B2FFF',
    accentDeep: '#3E1385',
    foreground: '#ffffff',
  },
  {
    slug: 'project-seeds-branding',
    title: 'Project SEEDS',
    cardTitle: 'PROJECT SEEDS',
    railTitle: 'Project SEEDS',
    summary: 'Logo and Brand Identity Design',
    disciplines: 'Brand Identity · Web',
    year: '2025',
    description:
      "A distinct identity for FIU's Project SEEDS, built on the university brand system. Enrollment more than doubled during the initiative.",
    cover: { src: unsplash('photo-1446688568582-55ddb4b37cad'), position: 'center', placeholder: true },
    accent: '#FF2A2A',
    accentDeep: '#8C0F0F',
    foreground: '#ffffff',
  },
  {
    slug: 'the-incredible-hulk',
    title: 'The Incredible Hulk',
    cardTitle: 'THE INCREDIBLE HULK',
    railTitle: 'The Incredible Hulk',
    summary: 'Motion Design and Kinetic Typography',
    disciplines: 'Motion Design',
    year: '2025',
    description:
      'A comic-book origin story told through kinetic typography and particle effects, produced with Masachi DC Studios.',
    cover: { src: unsplash('photo-1755811717097-23fba595025d'), position: 'center', placeholder: true },
    accent: '#0B7A3B',
    accentDeep: '#03401F',
    foreground: '#ffffff',
  },
];

/**
 * Work kept out of Selected work but still routable at /works/<slug>, since
 * About and Impact link to it. STEM X moves to its own category later.
 */
export const OTHER_PROJECTS: Project[] = [
  {
    slug: 'stemxposure',
    title: 'STEM X',
    cardTitle: 'STEM X CAMP',
    railTitle: 'STEM X Architecture Camp',
    summary: 'Architecture education program',
    disciplines: 'Curriculum · Architecture',
    year: '2026',
    description:
      'A multi-year program bringing architecture and design to 500+ students across six African nations through hands-on SketchUp workshops.',
    cover: { src: unsplash('photo-1598941101837-e3fdd6d94b24'), position: 'center 40%', placeholder: true },
    accent: '#FF2E9A',
    accentDeep: '#8C1050',
    foreground: '#ffffff',
  },
];

/** Where a project's card and rail entries lead. */
export const projectHref = (p: Project) => p.externalUrl ?? `/works/${p.slug}`;

/** Display number from list position: "01", "02", … */
export const projectNumber = (p: Project) => String(PROJECTS.indexOf(p) + 1).padStart(2, '0');

export const findProject = (slug: string | undefined) =>
  [...PROJECTS, ...OTHER_PROJECTS].find((p) => p.slug === slug);
