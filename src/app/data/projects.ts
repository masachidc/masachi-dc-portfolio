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
  category: string;
  year: string;
  description: string;
  tags: string[];
  /** Temporary: link out to a case study hosted elsewhere instead of /works/<slug>. */
  externalUrl?: string;
  image: string;
  imagePosition: string;
  accent: string;
  accentDeep: string;
  foreground: string;
}

export const PROJECTS: Project[] = [
  {
    slug: 'kesho-app',
    title: 'KESHO',
    cardTitle: 'KESHO APP',
    railTitle: 'KESHO App',
    category: 'Full Stack / Product Design',
    year: '2026',
    description:
      'A prediction platform for sports, entertainment, and politics — forecasts are sealed at kickoff and revealed once the outcome lands.',
    tags: ['Sports Tech', 'PWA', 'AI'],
    image:
      'https://images.unsplash.com/photo-1768330187404-59e46cf222c9?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
    accent: '#0057FF',
    accentDeep: '#00297A',
    foreground: '#ffffff',
  },
  {
    slug: 'amuse-art-museum',
    title: 'AMUSE',
    cardTitle: 'AMUSE MUSEUM',
    railTitle: 'AMUSE Museum Booking App',
    category: 'UI/UX Product Design',
    year: '2025',
    description:
      'A discovery and ticketing platform for Kenyan museums, built on M-Pesa payments and an African-heritage visual identity.',
    tags: ['Mobile-First', 'Cultural Tech', 'Kenya'],
    image:
      'https://images.unsplash.com/photo-1774514580599-c3dae376348e?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center 35%',
    accent: '#FF7A00',
    accentDeep: '#8C3D00',
    foreground: '#0a0a0b',
  },
  {
    slug: 'inline-chrome-extension',
    title: 'INLINE',
    cardTitle: 'INLINE CHROME EXT',
    railTitle: 'INLINE Chrome Extension',
    category: 'UI/UX Design',
    year: '2026',
    description:
      'A browser extension that turns any webpage into an interactive canvas — annotate, highlight, draw, and call up AI without leaving the tab.',
    tags: ['Browser AI', 'Productivity', 'FIU Award'],
    image:
      'https://images.unsplash.com/photo-1768638687898-7851d341cb87?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
    accent: '#7B2FFF',
    accentDeep: '#3E1385',
    foreground: '#ffffff',
  },
  {
    slug: 'project-seeds-branding',
    title: 'SEEDS',
    cardTitle: 'SEEDS BRAND',
    railTitle: 'SEEDS Brand Identity',
    category: 'Brand Identity Design',
    year: '2025',
    description:
      "Extended FIU's brand system into a distinct identity for Project SEEDS — part of a push that helped drive a 100%+ rise in student enrollment.",
    tags: ['Logo Design', 'Web Design', 'FIU'],
    image:
      'https://images.unsplash.com/photo-1446688568582-55ddb4b37cad?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
    accent: '#FF2A2A',
    accentDeep: '#8C0F0F',
    foreground: '#ffffff',
  },
  {
    slug: 'the-incredible-hulk',
    title: 'HULK',
    cardTitle: 'HULK MOTION',
    railTitle: 'HULK Motion Design',
    category: 'Motion Design',
    year: '2025',
    description:
      'A comic-book origin story told through kinetic typography and particle effects — motion design produced with Masachi DC Studios.',
    tags: ['After Effects', 'Kinetic Type', 'Comics'],
    image:
      'https://images.unsplash.com/photo-1755811717097-23fba595025d?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
    accent: '#17D964',
    accentDeep: '#087236',
    foreground: '#0a0a0b',
  },
  {
    slug: 'stemxposure',
    title: 'STEM X',
    cardTitle: 'STEM X CAMP',
    railTitle: 'STEM X Architecture Camp',
    category: 'Architecture & Curriculum',
    year: '2026',
    description:
      'A multi-year program bringing architecture and design to 500+ students across six African nations through hands-on SketchUp workshops.',
    tags: ['STEM Education', 'Africa', '6 Countries'],
    image:
      'https://images.unsplash.com/photo-1598941101837-e3fdd6d94b24?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center 40%',
    accent: '#FF2E9A',
    accentDeep: '#8C1050',
    foreground: '#ffffff',
  },
];

/** Where a project's card and rail entries lead. */
export const projectHref = (p: Project) => p.externalUrl ?? `/works/${p.slug}`;

/** Display number from list position: "01", "02", … */
export const projectNumber = (p: Project) => String(PROJECTS.indexOf(p) + 1).padStart(2, '0');

export const findProject = (slug: string | undefined) => PROJECTS.find((p) => p.slug === slug);
