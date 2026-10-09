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
  /** What the project shows about this discipline: the desktop hover description, ~15–28 words. */
  summary: string;
  /** Nathan's part, "·"-separated: replaces the card's `disciplines` line. */
  contribution: string;
}

export interface Principle {
  title: string;
  text: string;
}

export interface Discipline {
  /** Route: /<slug>. */
  slug: string;
  /** Matches RESUME_DISCIPLINES, so the Resume card and its page can't drift apart. */
  name: (typeof RESUME_DISCIPLINES)[number];
  meta: { title: string; description: string };
  /** Headline under the discipline name; the last line takes the teal accent, as on the homepage. */
  headline: string[];
  intro: string;
  /** Exactly three, in display order: one homepage mosaic band (the second is the tall card on desktop). */
  work: [DisciplineWork, DisciplineWork, DisciplineWork];
  /**
   * The capabilities section after Selected work: a label and statement on the left, four or five principles
   * (title + one line) on the right. Principles describe how Nathan works, not tools.
   */
  approach: {
    /** Section heading, e.g. "How I work". */
    label: string;
    /** One sentence per line. */
    headline: string[];
    description: string;
    principles: Principle[];
  };
}

export const DISCIPLINES: Discipline[] = [
  {
    slug: 'product-design',
    name: 'Product Design',
    meta: {
      title: 'Product Design',
      description:
        'Product design by Nathan Masachi: Tembo, INLINE and AMUSE, from understanding the problem to defining the experience.',
    },
    headline: ['I turn ideas into', 'useful products'],
    intro:
      'With a bias toward shipping, I move quickly from ideas to prototypes and working products, balancing user needs, thoughtful design, and technical feasibility.',
    approach: {
      label: 'How I work',
      headline: ['Understand the problem.', 'Shape the solution.'],
      description:
        'I take products from early questions to clear, testable experiences, using research, product thinking, and iteration to decide what should be built and why.',
      principles: [
        { title: 'Product strategy', text: 'I define the problem, product direction, priorities, and tradeoffs.' },
        { title: 'Research & validation', text: 'I use research and testing to challenge assumptions and guide decisions.' },
        { title: 'Interaction & experience', text: 'I design the flows, states, and interactions that shape the product experience.' },
        { title: 'Rapid prototyping', text: 'I turn ideas into working prototypes to test, learn, and iterate quickly.' },
      ],
    },
    work: [
      {
        slug: 'tembo-app',
        summary:
          'The ongoing chapter of a life, not the single post, is the social object. A deliberately small first version, and a Home feed without engagement ranking.',
        contribution: 'Founder · Product strategy · Interaction design',
      },
      {
        slug: 'inline-chrome-extension',
        summary:
          'I owned the UI/UX in a five-person team, from the floating entry point to tool interactions, the visual system and feature states.',
        contribution: 'UI/UX Designer · 5-person product team',
      },
      {
        slug: 'amuse-art-museum',
        summary:
          'Research moved it from a native app to a mobile-first web platform with M-Pesa booking; testing with five participants made My Museum a core feature.',
        contribution: 'Lead Product Designer · UX research · Usability testing',
      },
    ],
  },
  {
    slug: 'design-engineering',
    name: 'Design Engineering',
    meta: {
      title: 'Design Engineering',
      description:
        'Design engineering by Nathan Masachi: Tembo, KESHO and INLINE, taking interaction design into production code.',
    },
    headline: ['Turning ideas into', 'shipped work'],
    intro:
      'With a background in architecture, digital media, and computer science, I work across design and development to turn ideas into working products with little to no traditional handoff.',
    approach: {
      label: 'How I work',
      headline: ['Carry the design', 'all the way through.'],
      description:
        'I take interface decisions into working software, using AI-assisted development and a computer science foundation to reason through implementation, systems, and tradeoffs.',
      principles: [
        { title: 'React & TypeScript', text: 'I build production interfaces across React, React Native, and TypeScript.' },
        { title: 'Design systems', text: 'I turn visual and interaction decisions into reusable components, tokens, and patterns.' },
        { title: 'Interaction engineering', text: 'I carry states, motion, responsiveness, accessibility, and edge cases into the build.' },
        { title: 'AI-assisted development', text: 'I use AI to move faster while owning the architecture, decisions, review, and final implementation.' },
        { title: 'Testing & performance', text: 'I use testing, CI, observability, and performance work to make what I ship more dependable.' },
      ],
    },
    work: [
      {
        slug: 'tembo-app',
        summary:
          'Designed and engineered end to end in React Native, Expo and TypeScript on Supabase. Live on the App Store; Android is in closed testing.',
        contribution: 'Founder · Design engineering · Full-stack development',
      },
      {
        slug: 'kesho-app',
        summary:
          'A sealed Call was a design promise. I built the server-side kickoff gate, locks and all-or-nothing reveal to keep it. Invite-only beta, then decommissioned.',
        contribution: 'Product design · Engineering · Closed testing',
      },
      {
        slug: 'inline-chrome-extension',
        summary:
          'Designed for the build: interactions, visual system and feature states, made alongside a front-end developer, a backend developer and a database designer.',
        contribution: 'UI/UX Designer · Technical collaboration',
      },
    ],
  },
  {
    slug: 'visual-design',
    name: 'Visual Design',
    meta: {
      title: 'Visual Design',
      description:
        'Visual design by Nathan Masachi: Project SEEDS, Tembo and The Incredible Hulk, through identity, typography, composition and motion.',
    },
    headline: ['Making ideas', 'visible'],
    intro:
      'I turn ideas into distinctive visual experiences, combining identity, typography, and motion to create work that feels cohesive, purposeful, and memorable.',
    approach: {
      label: 'How I work',
      headline: ['A clear idea.', 'A distinctive expression.'],
      description:
        'I turn ideas into visual systems that are recognizable, coherent, and built to work across real products and touchpoints.',
      principles: [
        { title: 'Identity & systems', text: 'I build visual languages that stay consistent across brands, products, and applications.' },
        { title: 'Typography & composition', text: 'I use type, hierarchy, color, and layout to give ideas structure and clarity.' },
        { title: 'Visual direction', text: 'I define the imagery, color, and composition that give a project its point of view.' },
        { title: 'Motion & storytelling', text: 'I use movement, pacing, and sequence to strengthen the story.' },
        { title: 'Craft & polish', text: 'I refine spacing, rhythm, alignment, and detail until the work feels resolved.' },
      ],
    },
    work: [
      {
        slug: 'project-seeds-branding',
        summary:
          'A seed mark and a gold and navy wordmark inside FIU’s brand system, approved by FIU branding and carried across campaign materials and the website.',
        contribution: 'Brand identity · Logo design · Web design',
      },
      {
        slug: 'tembo-app',
        summary:
          'The visual language of an app I founded, designed and shipped: interface composition and TEMBO yellow, carried through Storylines and their Moments.',
        contribution: 'Founder · Interface design · Brand',
      },
      {
        slug: 'the-incredible-hulk',
        summary:
          'Kinetic typography and particle effects carry the story, made in After Effects for Masachi DC Studios with Brandspot Media.',
        contribution: 'Motion design · Kinetic typography',
      },
    ],
  },
];

export const disciplineHref = (d: Discipline) => `/${d.slug}`;

/** The page for a Resume discipline. Throws at load if one is missing, so a Resume card can never link nowhere. */
export function findDiscipline(name: Discipline['name']) {
  const d = DISCIPLINES.find((x) => x.name === name);
  if (!d) throw new Error(`No discipline page for "${name}"`);
  return d;
}

/**
 * A discipline's three projects, resolved from projects.ts with this page's description and contribution line.
 * Throws at load if a slug is wrong, so a typo can't ship a broken card. Every card shows on phones here, since a
 * band of three has none to spare.
 */
export function disciplineProjects(d: Discipline): Project[] {
  return d.work.map((w) => {
    const project = findProject(w.slug);
    if (!project) throw new Error(`Discipline "${d.name}": unknown project slug "${w.slug}"`);
    return { ...project, description: w.summary, disciplines: w.contribution, hideOnMobile: false };
  });
}
