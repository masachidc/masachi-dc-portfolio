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
  /** What the project shows about this discipline: the card's hover (and mobile) description, ~15–28 words. */
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
   * The capabilities section after Selected work: a label and statement on the left, exactly four numbered principles
   * (title + one line) on the right. Principles describe how Nathan works, not tools.
   */
  approach: {
    /** Section heading, e.g. "How I design". */
    label: string;
    /** One sentence per line. */
    headline: string[];
    description: string;
    principles: [Principle, Principle, Principle, Principle];
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
      label: 'How I design products',
      headline: ['Understand the problem.', 'Shape the solution.'],
      description:
        'I work from discovery through delivery, using research, experimentation, and technical understanding to make ideas useful.',
      principles: [
        { title: 'Product strategy', text: 'Defining the problem, product direction, priorities, and tradeoffs before committing to a solution.' },
        { title: 'Research & validation', text: 'Using research and usability testing to challenge assumptions and improve decisions.' },
        { title: 'Interaction & experience', text: 'Designing clear flows, intuitive interfaces, and coherent experiences across a product.' },
        { title: 'Rapid prototyping', text: 'Turning ideas into interactive prototypes and working experiences to test and refine quickly.' },
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
      label: 'How I build',
      headline: ['From design intent', 'to working software.'],
      description:
        'I combine design judgment, computer science fundamentals, and AI-assisted development to build products that work beyond the prototype.',
      principles: [
        { title: 'Interface engineering', text: 'Building responsive, interactive experiences with React, React Native, and TypeScript.' },
        { title: 'Systems & architecture', text: 'Structuring components, data, and application behavior for maintainability and scale.' },
        {
          title: 'AI-assisted development',
          text: 'Using AI coding agents to accelerate implementation, while directing architecture, evaluating outputs, and validating correctness.',
        },
        { title: 'Production & quality', text: 'Taking products through testing, performance optimization, deployment, and release.' },
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
      label: 'How I design',
      headline: ['A clear idea.', 'A distinctive expression.'],
      description:
        'Good visual design starts with understanding what needs to be communicated, then finding the right form to make it recognizable, consistent, and memorable.',
      principles: [
        { title: 'Identity & systems', text: 'Building cohesive visual languages that work across brands, products, and touchpoints.' },
        { title: 'Typography & composition', text: 'Using type, hierarchy, color, and layout to give ideas structure and clarity.' },
        { title: 'Motion & storytelling', text: 'Bringing concepts to life through movement, pacing, and visual narrative.' },
        { title: 'Design craft', text: 'Refining the details that make an experience feel intentional, polished, and complete.' },
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
