/**
 * Professional record behind About, Impact and Resume.
 *
 * Every fact here comes from Nathan's published portfolio (masachidc.com
 * pages and case studies), verified résumé records, or public listings. Keep
 * causality honest: report outcomes alongside the work, not as caused by it,
 * unless the source proves it. Unconfirmed details stay out; see CONTENT GAPS
 * at the bottom.
 */

export const PROFILE = {
  name: 'Nathan Masachi',
  role: 'Product Designer & Design Engineer',
  location: 'Tampa, Florida',
  linkedin: 'https://www.linkedin.com/in/nathanmasachi/',
  /**
   * Résumé for the Resume page's "Download résumé" link: a hosted URL (opens in a new tab) or a path to a PDF in
   * /public (downloads). While null, the page shows no download link.
   */
  resumePdf: null as string | null,
};

export const TEMBO_APP_STORE = 'https://apps.apple.com/us/app/tembo-storylines/id6804888179';
/**
 * Tembo's Google Play listing. Null while the production release is in review (applied early Oct 2026); set it to
 * the live listing URL and the Resume switches to "App Store and Google Play release" and links to the listing.
 */
export const TEMBO_GOOGLE_PLAY: string | null = null;

/** Evidence of consequence. Headlines are plain statements, not vanity metrics. */
export interface ImpactItem {
  headline: string;
  subject: string;
  context: string;
  /** Nathan's part, stated accurately when he was one contributor among many. */
  role: string;
  link?: { label: string; href: string };
}

export const IMPACT: ImpactItem[] = [
  {
    headline: 'Shipped to the App Store',
    subject: 'Tembo: Storylines',
    context: 'A social app for turning everyday moments into ongoing Storylines about goals, hobbies, relationships, pets, and trips. Live on the App Store.',
    role: 'Founder. Designed and shipped the product.',
    link: { label: 'View on the App Store', href: TEMBO_APP_STORE },
  },
  {
    headline: '500+ students across seven countries',
    subject: 'STEM Xposure',
    context:
      'A two-week architecture and design camp run for three consecutive years, reaching high school students in the United States, Kenya, Tanzania, Uganda, Nigeria, Rwanda, and Namibia. Every student received a free one-year professional SketchUp license.',
    role: 'Lead Instructor and Curriculum Designer. Built the program, recruited 14 classmates as volunteer instructors, and took part in the SketchUp partnership negotiations.',
    link: { label: 'STEM Xposure', href: '/works/stemxposure' },
  },
  {
    headline: 'Enrollment more than doubled',
    subject: 'FIU Project SEEDS',
    context:
      "Project SEEDS had no consistent identity. I extended FIU's brand system into one, approved by both FIU branding and the SEEDS team, and built a website simple enough for non-technical staff to maintain. Enrollment more than doubled during the initiative.",
    role: 'Marketing Officer, leading recruitment. Brand identity, web design, and social media.',
    link: { label: 'Project SEEDS', href: '/works/project-seeds-branding' },
  },
  {
    headline: 'Designed, shipped, tested, and stopped',
    subject: 'KESHO',
    context:
      'A social prediction product for football fans: Calls sealed before kickoff with a server timestamp, then graded after the result. Deployed to production on the web and tested in an invite-only beta of 92 people, then decommissioned when complexity outgrew the evidence.',
    role: 'Product design and engineering: interaction design, system design, the full-stack build, release, and beta analysis.',
    link: { label: 'KESHO case study', href: '/works/kesho-app' },
  },
  {
    headline: 'Most Unique Project',
    subject: 'INLINE · FIU Blackstone LaunchPad',
    context: "A Chrome extension that makes any webpage writable, recognized as the most unique project at FIU Blackstone LaunchPad's demo day.",
    role: 'UI/UX designer on a five-person team.',
    link: { label: 'INLINE case study', href: '/works/inline-chrome-extension' },
  },
  {
    headline: '1,000+ students at a national summit',
    subject: '2024 BBCB Summit · Hillsborough Community College',
    context: 'A national student summit whose guests included Sugar Ray Leonard and Common.',
    role: 'Helped plan and execute the event. Recognized with a travel award.',
  },
];

/** Resume intro: the positioning paragraph under the contact links (~35–55 words). */
export const RESUME_INTRO =
  'A product designer who ships. Trained in architecture, digital media, and computer science, I work across design and development to turn ideas into working products without a traditional handoff. I build with longevity, scale, and depth in mind.';

/**
 * Resume roles, most relevant first. Keep the public record compact: the
 * accordion carries proof, while case studies carry the full project story.
 */
export interface ExperienceItem {
  title: string;
  org: string;
  /** Short functional lens shown beside the formal title in the collapsed row. */
  role?: string;
  /** Only verified dates. Omit rather than guess. */
  when?: string;
  points: string[];
  /** Public proof of the work, shown under the points. */
  links?: { label: string; href: string }[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Founder',
    org: 'Tembo',
    role: 'Product Designer & Design Engineer',
    when: 'Aug 2026 – Present',
    points: [
      `Founded, designed, and shipped Tembo: Storylines, a social iOS and Android app that organizes ongoing life experiences into Storylines made of Moments, from product concept through ${
        TEMBO_GOOGLE_PLAY ? 'App Store and Google Play release' : 'App Store release and Google Play submission'
      }.`,
      'Defined the core product model and end-to-end experience for creating, adding to, discovering, and following Storylines, with privacy controls at both the account and Storyline level.',
      'Built the production mobile stack in React Native, Expo, TypeScript, and Supabase, including authentication, photo publishing, moderation, privacy-aware media delivery, analytics, and observability.',
      'Established production engineering practices across database authorization, forward-only migrations, automated app, database, and function tests, CI gates, and staged releases.',
    ],
    links: [
      { label: 'View on the App Store', href: TEMBO_APP_STORE },
      ...(TEMBO_GOOGLE_PLAY ? [{ label: 'View on Google Play', href: TEMBO_GOOGLE_PLAY }] : []),
    ],
  },
  {
    title: 'Marketing Officer',
    org: 'FIU Project SEEDS',
    role: 'Brand & Web Design',
    when: 'May 2025 – Apr 2026',
    points: [
      "Led recruitment and extended FIU's brand system into a program identity approved by FIU branding and the SEEDS team.",
      'Designed and built a program website non-technical staff can maintain, and carried the identity across recruitment, social, and presentation materials.',
      'Enrollment more than doubled during the initiative.',
    ],
    links: [{ label: 'View Project SEEDS', href: '/works/project-seeds-branding' }],
  },
  {
    title: 'Lead Instructor & Curriculum Designer',
    org: 'STEM Xposure',
    role: 'Volunteer',
    when: 'May 2021 – May 2024',
    // No link until /works/stemxposure has a case study: a résumé shouldn't point to an in-progress page.
    points: [
      'Designed a two-week architecture and design curriculum that reached 500+ high school students in the U.S. and six African countries.',
      'Recruited and coordinated 14 volunteer instructors; the program ran for three consecutive years.',
      'Took part in the negotiations that secured a SketchUp licensing partnership, giving every student a free one-year professional license.',
    ],
  },
];

/**
 * Resume disciplines, in display order (N°01, N°02, …, as on the homepage cards). Plain text until each
 * discipline has a real project grouping to open; never ship dead buttons or
 * placeholder links.
 */
export const RESUME_DISCIPLINES = ['Product Design', 'Design Engineering', 'Visual Design'] as const;

/** Four groups, mirroring the disciplines plus how Nathan works. Keep each group short: signal, not keyword density. */
export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Product Design', items: ['Product strategy', 'UX research', 'Interaction design', 'Rapid prototyping', 'Shipping', 'Figma'] },
  { group: 'Design Engineering', items: ['React & TypeScript', 'Design systems', 'Interaction engineering', 'AI-assisted development'] },
  { group: 'Visual Design', items: ['Brand identity', 'Taste & judgment', 'Typography & layout', 'Motion design'] },
  {
    group: 'Thinking & Leadership',
    items: ['Systems thinking', 'End-to-end ownership', 'Problem-solving', 'Cross-functional collaboration'],
  },
];

/** Facts only: no explanatory notes. The field is the headline; degree, minor, school and dates support it. */
export interface EducationItem {
  /** Field of study, shown as the headline. */
  field: string;
  degree: string;
  minor?: string;
  school: string;
  /** Verified dates only. */
  when?: string;
}

// Display order: Architecture first, then Digital Interactive Media (Nathan's choice).
export const EDUCATION: EducationItem[] = [
  {
    // Completed: Associate of Arts, May 2024 (Nathan's résumé records).
    field: 'Architecture',
    degree: 'Associate of Arts (A.A.)',
    school: 'Hillsborough Community College',
    when: '2021–2024',
  },
  {
    field: 'Digital Interactive Media/Computer Science',
    degree: 'B.S. Digital Media, CS Minor',
    school: 'Florida International University',
    when: '2024–2026',
  },
];

/*
 * CONTENT GAPS (internal — never render):
 * - Tembo: public-safe usage metrics (none verified; the case study claims none).
 * - A current résumé PDF (or hosted link) for PROFILE.resumePdf.
 * - Portrait for About (optional).
 */
