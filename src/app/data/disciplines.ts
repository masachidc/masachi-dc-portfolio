import { findProject, type Project } from './projects';
import { RESUME_DISCIPLINES } from './profile';

/**
 * The three discipline pages (/product-design, /design-engineering, /visual-design), linked from the Resume's
 * Disciplines cards. One config per page; DisciplinePage renders them all from the same template.
 *
 * Projects are referenced by slug, never copied, so title, year, cover and case-study route always come from
 * projects.ts. Each page only rewrites the summary and contribution line for the discipline it demonstrates.
 * Same rules as the case studies: verified facts only, and release language exact (Tembo's Android build is in closed
 * testing, KESHO was an invite-only beta and is decommissioned, INLINE was a team project in which Nathan owned the
 * UI/UX, not the code).
 */
export interface DisciplineWork {
  /** A slug from PROJECTS or OTHER_PROJECTS. */
  slug: string;
  /** What the project shows about this discipline, in one or two sentences. */
  summary: string;
  /** Nathan's part, "·"-separated, as in projects.ts `disciplines`. */
  contribution: string;
}

export interface Discipline {
  /** Route: /<slug>. */
  slug: string;
  /** Matches RESUME_DISCIPLINES, so the Resume card and its page can't drift apart. */
  name: (typeof RESUME_DISCIPLINES)[number];
  meta: { title: string; description: string };
  /** Headline lines; the last takes the teal accent, as on the homepage. */
  headline: string[];
  intro: string;
  /** Exactly three, in display order. */
  work: [DisciplineWork, DisciplineWork, DisciplineWork];
  /** Exactly five. */
  skills: [string, string, string, string, string];
}

export const DISCIPLINES: Discipline[] = [
  {
    slug: 'product-design',
    name: 'Product Design',
    meta: {
      title: 'Product Design',
      description:
        'Product design by Nathan Masachi: Tembo, AMUSE and INLINE, from understanding the problem to defining the experience.',
    },
    headline: ['Ideas shaped into', 'useful products.'],
    intro:
      'From understanding the problem to defining the experience, I design digital products around real people and clear decisions.',
    work: [
      {
        slug: 'tembo-app',
        summary:
          'A social app where the ongoing chapter of a life, not the single post, is the social object. I kept the first version deliberately small and gave Home bounded diversity instead of engagement ranking.',
        contribution: 'Founder · Product strategy · Interaction design',
      },
      {
        slug: 'amuse-art-museum',
        summary:
          'Research moved a museum app to a lightweight, mobile-first web platform with M-Pesa in the booking flow. Usability testing with five participants made My Museum a core feature.',
        contribution: 'Lead Product Designer · UX research · Usability testing',
      },
      {
        slug: 'inline-chrome-extension',
        summary:
          'A Chrome extension that brings notes, drawing, highlights and AI to any webpage. I owned the UI/UX, from the floating entry point to tool interactions and feature states.',
        contribution: 'UI/UX Designer · 5-person product team',
      },
    ],
    skills: ['Product strategy', 'UX research', 'Interaction design', 'Prototyping & testing', 'Information architecture'],
  },
  {
    slug: 'design-engineering',
    name: 'Design Engineering',
    meta: {
      title: 'Design Engineering',
      description:
        'Design engineering by Nathan Masachi: Tembo, KESHO and INLINE, taking interaction design into production code.',
    },
    headline: ['Designed with intent.', 'Built to work.'],
    intro:
      'I bring design into production code, combining interaction design, frontend engineering, and systems thinking to ship working products.',
    work: [
      {
        slug: 'tembo-app',
        summary:
          'Designed and engineered end to end in React Native, Expo and TypeScript on Supabase. Every change runs typecheck, lint and tests before it merges. Live on the App Store; Android is in closed testing.',
        contribution: 'Founder · Design engineering · Full-stack development',
      },
      {
        slug: 'kesho-app',
        summary:
          'A sealed Call was a design promise. Keeping it meant building the server-side kickoff gate, the locks and the all-or-nothing reveal myself. Tested in an invite-only beta, then decommissioned.',
        contribution: 'Product design · Engineering · Closed testing',
      },
      {
        slug: 'inline-chrome-extension',
        summary:
          'Designing for the build: I owned the extension’s interactions, visual system and feature states, working alongside a front-end developer, a backend developer and a database designer.',
        contribution: 'UI/UX Designer · Technical collaboration',
      },
    ],
    skills: ['React & TypeScript', 'Design systems', 'Interaction engineering', 'Full-stack development', 'Testing & performance'],
  },
  {
    slug: 'visual-design',
    name: 'Visual Design',
    meta: {
      title: 'Visual Design',
      description:
        'Visual design by Nathan Masachi: Project SEEDS, The Incredible Hulk and Tembo, through identity, typography, composition and motion.',
    },
    headline: ['Making ideas', 'visible.'],
    intro:
      'I build visual identities and experiences through typography, composition, motion, and cohesive design systems.',
    work: [
      {
        slug: 'project-seeds-branding',
        summary:
          'A distinct identity inside FIU’s established brand system: a seed mark and a gold and navy wordmark, approved by FIU branding and the SEEDS team, carried across campaign materials and the website.',
        contribution: 'Brand identity · Logo design · Web design',
      },
      {
        slug: 'the-incredible-hulk',
        summary:
          'A comic origin story told through motion. Kinetic typography and particle effects carry the story, made in After Effects for Masachi DC Studios with Brandspot Media.',
        contribution: 'Motion design · Kinetic typography',
      },
      {
        slug: 'tembo-app',
        summary:
          'The visual language of an app I founded, designed and shipped: interface composition and TEMBO yellow, carried through Storylines and the Moments that grow inside them.',
        contribution: 'Founder · Interface design · Brand',
      },
    ],
    skills: ['Brand identity', 'Typography & layout', 'Art direction', 'Motion design', 'Visual systems'],
  },
];

export const disciplineHref = (d: Discipline) => `/${d.slug}`;

/** The page for a Resume discipline. Throws at load if one is missing, so a Resume card can never link nowhere. */
export function findDiscipline(name: Discipline['name']) {
  const d = DISCIPLINES.find((x) => x.name === name);
  if (!d) throw new Error(`No discipline page for "${name}"`);
  return d;
}

/** A discipline's three projects, resolved from projects.ts. Throws at load if a slug is wrong, so a typo can't ship a broken row. */
export function disciplineWork(d: Discipline): (DisciplineWork & { project: Project })[] {
  return d.work.map((w) => {
    const project = findProject(w.slug);
    if (!project) throw new Error(`Discipline "${d.name}": unknown project slug "${w.slug}"`);
    return { ...w, project };
  });
}
