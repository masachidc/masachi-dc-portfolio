import { BRANDS, type Brand } from './brands';

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
  /** What it is or why it matters, in sentence case. Always visible on the card. */
  summary: string;
  /** What Nathan did, "·"-separated. Always visible on the card. */
  disciplines: string;
  /** Omit until verified. */
  year?: string;
  /** Why it's interesting, ~15–28 words; must not repeat `summary`. Shown on hover (desktop) and below the card (mobile). */
  description: string;
  /** Temporary: link out to a case study hosted elsewhere instead of /works/<slug>. */
  externalUrl?: string;
  /**
   * Card image. `placeholder: true` marks generic stock imagery awaiting a real
   * project cover — swap `src` (and drop the flag) when artwork exists.
   */
  cover: { src: string; position: string; placeholder?: boolean };
  /** The project's brand system (see brands.ts): card hover wash, rail highlights, case study. */
  brand: Brand;
  /** Leave off the phone-width Selected work grid (still shown on tablet and desktop). */
  hideOnMobile?: boolean;
}

const unsplash = (id: string) => `https://images.unsplash.com/${id}?w=1600&q=80&auto=format&fit=crop`;

// Order: Selected work on the homepage, as Nathan ranks it.
export const PROJECTS: Project[] = [
  {
    slug: 'tembo-app',
    title: 'TEMBO',
    cardTitle: 'TEMBO',
    railTitle: 'TEMBO App',
    summary: 'Social sharing built around ongoing life stories',
    disciplines: 'Shipping · Product Design · Design Engineering',
    year: '2026',
    description:
      'Goals, hobbies, relationships, pets, and trips become ongoing Storylines that grow through Moments. Designed, engineered, and shipped to the App Store.',
    cover: { src: unsplash('photo-1549366021-9f761d450615'), position: 'center', placeholder: true },
    brand: BRANDS['tembo-app'],
  },
  {
    slug: 'kesho-app',
    title: 'KESHO',
    cardTitle: 'KESHO',
    railTitle: 'KESHO App',
    summary: 'Predictions that lock before the outcome',
    disciplines: 'Full-Stack Development · Closed Testing',
    year: '2026',
    description:
      'A social prediction product for football fans: Calls sealed before kickoff, graded after the whistle. Designed, built, deployed, tested, and decommissioned.',
    cover: { src: unsplash('photo-1768330187404-59e46cf222c9'), position: 'center', placeholder: true },
    brand: BRANDS['kesho-app'],
  },
  {
    slug: 'amuse-art-museum',
    title: 'AMUSE',
    cardTitle: 'AMUSE',
    railTitle: 'AMUSE Web App',
    summary: 'Discover, plan and book museum visits in Kenya',
    disciplines: 'Product Design · UX Research · Usability Testing',
    year: '2025',
    description:
      'Research moved it from a native app to a lightweight web platform with M-Pesa booking; usability testing made My Museum a core feature.',
    cover: { src: unsplash('photo-1774514580599-c3dae376348e'), position: 'center 35%', placeholder: true },
    brand: BRANDS['amuse-art-museum'],
  },
  {
    slug: 'inline-chrome-extension',
    title: 'INLINE',
    cardTitle: 'INLINE',
    railTitle: 'INLINE Extension',
    summary: 'Annotate any webpage without leaving the tab',
    disciplines: 'UI/UX Design · Technical Collaboration',
    year: '2026',
    description:
      'Makes the read-only web writable: a floating icon opens notes, drawing, highlights, and AI on any page. Most Unique Project at FIU Blackstone LaunchPad.',
    cover: { src: '/img/works/inline-chrome-extension.webp', position: 'center' },
    brand: BRANDS['inline-chrome-extension'],
  },
  {
    slug: 'project-seeds-branding',
    title: 'Project SEEDS',
    cardTitle: 'PROJECT SEEDS',
    railTitle: 'Project SEEDS',
    summary: "A distinct identity within FIU's brand system",
    disciplines: 'Brand Identity Design · Logo Design',
    year: '2025',
    description:
      'Gave a program with no consistent look an identity approved by FIU branding, and a site non-technical staff can maintain. Enrollment more than doubled during the initiative.',
    cover: { src: '/img/works/project-seeds-brand-guidelines.webp', position: 'center' },
    brand: BRANDS['project-seeds-branding'],
  },
  {
    slug: 'stemxposure',
    title: 'STEM Xposure',
    cardTitle: 'STEM XPOSURE',
    railTitle: 'STEM Xposure',
    summary: 'A two-week architecture and design program across seven countries',
    disciplines: 'Curriculum Design · Program Leadership',
    year: '2026',
    description:
      'I designed the curriculum, recruited and onboarded 14 volunteer instructors, and helped deliver three years of programming to 500+ high school students.',
    cover: { src: '/img/works/stemxposure.webp', position: 'center' },
    brand: BRANDS.stemxposure,
  },
];

/**
 * Work kept out of Selected work but still routable at /works/<slug>, since
 * existing links point to it.
 */
export const OTHER_PROJECTS: Project[] = [
  {
    slug: 'the-incredible-hulk',
    title: 'The Incredible Hulk',
    cardTitle: 'THE INCREDIBLE HULK',
    railTitle: 'The Incredible Hulk',
    summary: 'A comic origin story told through motion',
    disciplines: 'Motion Design',
    year: '2025',
    description:
      'Kinetic typography and particle effects carry the story, made in After Effects for Masachi DC Studios with Brandspot Media.',
    cover: { src: '/img/works/the-incredible-hulk.webp', position: 'center' },
    brand: BRANDS['the-incredible-hulk'],
    hideOnMobile: true,
  },
];

/** Where a project's card and rail entries lead. */
export const projectHref = (p: Project) => p.externalUrl ?? `/works/${p.slug}`;

/** Display number from list position: "01", "02", … */
export const projectNumber = (p: Project) => String(PROJECTS.indexOf(p) + 1).padStart(2, '0');

export const findProject = (slug: string | undefined) =>
  [...PROJECTS, ...OTHER_PROJECTS].find((p) => p.slug === slug);
