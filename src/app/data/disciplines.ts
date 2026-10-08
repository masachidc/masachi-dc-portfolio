import { findProject, type Project } from './projects';

/**
 * The three discipline pages (/product-design, /design-engineering, /visual-design), linked from the Resume's
 * "Explore work" cards. One config per page; DisciplinePage renders them all from the same template. Array order is the
 * order of the Resume cards.
 *
 * Projects are referenced by slug, never copied, so title, year, cover and case-study route always come from
 * projects.ts. Each page only adds what the project shows about that discipline: a description and a focus line.
 * Same rules as the case studies: verified facts only, and release language exact (Tembo's Android build is in closed
 * testing, KESHO was an invite-only beta and is decommissioned, INLINE was a five-person team project in which Nathan
 * owned the UI/UX, not the engineering).
 */
export interface DisciplineWork {
  /** A slug from PROJECTS or OTHER_PROJECTS. */
  slug: string;
  /** Why the project matters for this discipline, in Nathan's voice: one or two sentences. */
  description: string;
  /** What the project demonstrates here, "·"-separated. */
  focus: string;
}

/** One numbered row of the Approach section: how Nathan works, not a tool. */
export interface ApproachItem {
  title: string;
  text: string;
}

export interface Discipline {
  /** Route: /<slug> (see disciplineHref). */
  slug: string;
  /** The discipline's name: hero kicker, page title and Resume card. */
  title: string;
  /** Meta description (the title comes from `title`). */
  description: string;
  hero: {
    /** Headline lines; the last takes the teal accent, as on the homepage. */
    lines: string[];
    lede: string;
  };
  /** Selected work: a headline under the "Selected work" kicker, then exactly three projects in display order. */
  work: {
    headline: string;
    projects: [DisciplineWork, DisciplineWork, DisciplineWork];
  };
  /** Approach: headline (one sentence per line) and description on the left, five numbered items on the right. */
  approach: {
    headline: string[];
    description: string;
    items: [ApproachItem, ApproachItem, ApproachItem, ApproachItem, ApproachItem];
  };
}

export const DISCIPLINES: Discipline[] = [
  {
    slug: 'product-design',
    title: 'Product Design',
    description:
      'Product design by Nathan Masachi: Tembo, AMUSE and INLINE, from research and product strategy to interaction design and tested interfaces.',
    hero: {
      lines: ['I turn ideas into', 'useful products.'],
      lede: 'With a bias toward shipping, I move from research and product strategy into interaction design, rapid prototypes, and tested interfaces—balancing user needs, product goals, and technical constraints.',
    },
    work: {
      headline: 'From first question to working experience.',
      projects: [
        {
          slug: 'tembo-app',
          description:
            'I defined the core product model around Storylines and Moments, then designed the end-to-end mobile experience across creation, discovery, following, and privacy.',
          focus: 'Product strategy · Interaction design · Mobile UX',
        },
        {
          slug: 'amuse-art-museum',
          description:
            'Research challenged the original native-app direction and moved AMUSE to a mobile-first web platform; usability testing then reshaped search, navigation, and My Museum.',
          focus: 'UX research · Product strategy · Usability testing',
        },
        {
          slug: 'inline-chrome-extension',
          description:
            'I designed a lightweight interaction model that lets notes, drawing, highlights, and contextual AI live directly on any webpage without taking it over.',
          focus: 'Interaction design · UI/UX · Team collaboration',
        },
      ],
    },
    approach: {
      headline: ['Understand the problem.', 'Shape the product.'],
      description:
        'I don’t start with screens. I start by clarifying what needs to change, what evidence exists, and what the product has to make easier. The interface comes after the structure.',
      items: [
        { title: 'Product strategy', text: 'Turn ambiguous ideas into a clear product direction, scope, and set of priorities.' },
        { title: 'UX research', text: 'Use interviews, observation, competitive research, and testing to replace assumptions with evidence.' },
        {
          title: 'Information architecture',
          text: 'Organize flows, content, states, and hierarchy so the product makes sense before visual polish.',
        },
        {
          title: 'Interaction design',
          text: 'Design behaviors, feedback, and edge cases that make the experience predictable and easy to use.',
        },
        { title: 'Prototyping & testing', text: 'Make ideas tangible early, test what matters, and iterate before complexity hardens.' },
      ],
    },
  },
  {
    slug: 'design-engineering',
    title: 'Design Engineering',
    description:
      'Design engineering by Nathan Masachi: Tembo, KESHO and INLINE, carrying interface decisions into working software with AI-assisted development.',
    hero: {
      lines: ['Designed with intent.', 'Built to work.'],
      lede: 'I bridge design and implementation, using AI-assisted development and a computer science foundation to turn interface decisions into working software without losing the design intent.',
    },
    work: {
      headline: 'Interfaces carried into working software.',
      projects: [
        {
          slug: 'tembo-app',
          description:
            'I built the production React Native and Expo app in TypeScript with Supabase, including authentication, photo publishing, privacy, moderation, analytics, testing, CI, and observability.',
          focus: 'React Native · TypeScript · Supabase',
        },
        {
          slug: 'kesho-app',
          description:
            'I carried KESHO from product and interaction design into a production web app and mobile closed testing, including server-enforced prediction integrity and release infrastructure.',
          focus: 'Full-stack development · Product systems · Release',
        },
        {
          slug: 'inline-chrome-extension',
          description:
            'On a five-person team, I designed the extension around real browser and implementation constraints, working closely with front-end, backend, and database collaborators.',
          focus: 'Interaction engineering · Browser extension · Technical collaboration',
        },
      ],
    },
    approach: {
      headline: ['Carry the design', 'all the way through.'],
      description:
        'I use AI heavily for implementation, but not as a substitute for reasoning. My computer science background helps me evaluate architecture, state, data, failure modes, and tradeoffs while using AI to move faster.',
      items: [
        {
          title: 'React & TypeScript',
          text: 'Build production interfaces in React, React Native, and TypeScript, using AI to accelerate implementation while I reason through structure, state, and behavior.',
        },
        {
          title: 'Design systems',
          text: 'Translate visual and interaction decisions into reusable components, tokens, and patterns that stay coherent as a product grows.',
        },
        {
          title: 'Interaction engineering',
          text: 'Preserve states, transitions, responsive behavior, accessibility, and edge cases beyond the static mockup.',
        },
        {
          title: 'Full-stack product development',
          text: 'Connect the interface to authentication, data, APIs, storage, analytics, and backend rules so the product works end to end.',
        },
        {
          title: 'Testing & performance',
          text: 'Use automated tests, CI, observability, and performance work to make what ships more dependable.',
        },
      ],
    },
  },
  {
    slug: 'visual-design',
    title: 'Visual Design',
    description:
      'Visual design by Nathan Masachi: Project SEEDS, The Incredible Hulk and Tembo, across identity, typography, composition, motion and product UI.',
    hero: {
      lines: ['Making ideas', 'visible.'],
      lede: 'I build visual systems that make ideas easier to recognize, understand, and remember—across identity, typography, composition, motion, and digital products.',
    },
    work: {
      headline: 'Visual systems with a point of view.',
      projects: [
        {
          slug: 'project-seeds-branding',
          description:
            'I extended FIU’s established brand language into a distinct identity for Project SEEDS, then carried it across the website, recruitment materials, social content, and presentations.',
          focus: 'Brand identity · Typography · Web',
        },
        {
          slug: 'the-incredible-hulk',
          description:
            'I used kinetic typography, compositing, particle effects, and pacing to turn a comic origin story into a motion piece.',
          focus: 'Motion design · Kinetic typography · Compositing',
        },
        {
          slug: 'tembo-app',
          description:
            'I shaped Tembo’s product expression around a restrained dark/light system, a bold yellow signal, editorial hierarchy, and interface surfaces that stay recognizably Tembo.',
          focus: 'Visual systems · Product UI · Brand expression',
        },
      ],
    },
    approach: {
      headline: ['A clear idea.', 'A distinctive expression.'],
      description:
        'Good visual design starts with understanding what needs to be communicated, then finding the right form to make it recognizable, consistent, and memorable.',
      items: [
        { title: 'Identity & systems', text: 'Build cohesive visual languages that work across brands, products, and touchpoints.' },
        { title: 'Typography & composition', text: 'Use type, hierarchy, color, and layout to give ideas structure and clarity.' },
        {
          title: 'Visual direction',
          text: 'Choose imagery, references, color, and composition that give a project a coherent point of view.',
        },
        {
          title: 'Motion & storytelling',
          text: 'Use movement, pacing, and sequence to bring concepts to life without letting motion become decoration.',
        },
        {
          title: 'Craft & polish',
          text: 'Refine spacing, rhythm, alignment, and detail until the system feels intentional at every scale.',
        },
      ],
    },
  },
];

export const disciplineHref = (d: Discipline) => `/${d.slug}`;

export interface DisciplineProject extends DisciplineWork {
  project: Project;
}

/**
 * A discipline's three projects, each resolved from projects.ts alongside this page's description and focus line.
 * Throws if a slug is wrong; every discipline is checked once at load (below), so a typo can't ship a broken row.
 */
export function disciplineProjects(d: Discipline): DisciplineProject[] {
  return d.work.projects.map((w) => {
    const project = findProject(w.slug);
    if (!project) throw new Error(`Discipline "${d.title}": unknown project slug "${w.slug}"`);
    return { ...w, project };
  });
}

DISCIPLINES.forEach(disciplineProjects);
