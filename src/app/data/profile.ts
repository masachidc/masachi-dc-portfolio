/**
 * Professional record behind About, Impact and Resume.
 *
 * Every fact here comes from Nathan's published portfolio (masachidc.com
 * pages and case studies) or public listings. Keep causality honest: report
 * outcomes alongside the work, not as caused by it, unless the source proves
 * it. Unconfirmed details stay out; see CONTENT GAPS at the bottom.
 */

export const PROFILE = {
  name: 'Nathan Masachi',
  role: 'Product Designer & Design Engineer',
  location: 'Tampa, Florida',
  linkedin: 'https://www.linkedin.com/in/nathanmasachi/',
  /**
   * Résumé for the Resume page's "Download résumé" link: a hosted URL (opens in a new tab) or a path to a PDF in
   * /public (downloads). While null, the link emails a résumé request instead.
   */
  resumePdf: null as string | null,
};

export const TEMBO_APP_STORE = 'https://apps.apple.com/us/app/tembo-storylines/id6804888179';

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
 * Resume roles, most relevant first. Adding a role is data only: 2–3 points,
 * each an action with its context or result. Report results alongside the work,
 * not as caused by it.
 */
export interface ExperienceItem {
  title: string;
  org: string;
  /** Only verified dates. Omit rather than guess. */
  when?: string;
  points: string[];
  /** Public proof of the work, shown under the points. */
  link?: { label: string; href: string };
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Founder',
    org: 'Tembo',
    when: 'Aug 2026 – Present',
    points: [
      'Founded, designed, and shipped Tembo: Storylines, a social iOS app now live on the App Store.',
      'Designed its core model: everyday moments gathered into ongoing Storylines about goals, hobbies, relationships, pets, and trips.',
    ],
    link: { label: 'View on the App Store', href: TEMBO_APP_STORE },
  },
  {
    title: 'Marketing Officer',
    org: 'FIU Project SEEDS',
    when: '2025',
    points: [
      "Led recruitment and extended FIU's brand system into an identity approved by FIU branding and the SEEDS team.",
      'Designed and built a program website simple enough for non-technical staff to maintain.',
      'Enrollment more than doubled during the initiative.',
    ],
  },
  {
    title: 'Lead Instructor & Curriculum Designer',
    org: 'STEM Xposure Inc. · Volunteer',
    when: '3 consecutive years',
    points: [
      'Built a two-week architecture and design curriculum that reached 500+ high school students in the US and six African countries.',
      'Recruited and onboarded 14 classmates as volunteer instructors, and took part in negotiations that secured a free SketchUp license for every student.',
    ],
  },
];

/** Resume projects: the strongest supporting evidence only, not every portfolio piece. Roles above aren't repeated here. */
export interface ProjectLine {
  name: string;
  role: string;
  when: string;
  summary: string;
  href: string;
}

export const RESUME_PROJECTS: ProjectLine[] = [
  {
    name: 'KESHO',
    role: 'Product designer & full-stack developer',
    when: '2026',
    summary:
      'Designed, built, and shipped a social prediction product for football fans, ran an invite-only beta of 92 people, and decided to stop when complexity outgrew the evidence. Next.js, TypeScript, Postgres.',
    href: '/works/kesho-app',
  },
  {
    name: 'AMUSE Art Museum',
    role: 'Lead product designer',
    when: '2025',
    summary:
      'Museum discovery and booking for Kenya. Research moved it from a native app to a lightweight web platform with M-Pesa booking; usability testing made My Museum a core feature.',
    href: '/works/amuse-art-museum',
  },
  {
    name: 'INLINE',
    role: 'UI/UX designer on a five-person team',
    when: '2026',
    summary:
      "A Chrome extension that makes any webpage writable with notes, drawing, highlights, and AI. Most Unique Project at FIU Blackstone LaunchPad's demo day.",
    href: '/works/inline-chrome-extension',
  },
];

/** Capabilities first, tools last. Keep each group short: signal, not keyword density. */
export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Product', items: ['User research', 'Product strategy', 'Information architecture', 'Interaction design', 'Usability testing'] },
  { group: 'Design', items: ['Interface design', 'Design systems', 'Prototyping', 'Brand identity', 'Motion design'] },
  {
    group: 'Engineering',
    items: ['TypeScript', 'React', 'React Native', 'Next.js', 'PostgreSQL', 'Tailwind CSS', 'CI/CD with GitHub Actions and Vercel', 'AI-assisted development'],
  },
  { group: 'Tools', items: ['Figma', 'Adobe Illustrator', 'After Effects', 'Premiere Pro', 'SketchUp'] },
];

export const EDUCATION: { field: string; minor?: string; school?: string; note?: string; /** Verified dates only. */ when?: string }[] = [
  { field: 'Digital Interactive Media', minor: 'Minor in Computer Science', school: 'Florida International University' },
  {
    field: 'Architecture',
    school: 'Hillsborough Community College',
    when: '2021–2024',
    note: 'Studied before moving into digital interactive media.',
  },
];

/*
 * CONTENT GAPS (internal — never render):
 * - Degree names, and FIU dates.
 * - Confirm Digital Interactive Media + CS minor were at FIU (inferred from FIU
 *   journalism school / Caplin News and SEEDS "about to graduate").
 *   Resume stays noindex until this is confirmed: education is the one record
 *   section that is still inferred.
 * - Tembo: public-safe metrics, and whether to describe the build stack.
 * - Employment dates for SEEDS (year only) and STEM Xposure (years).
 * - A current résumé PDF (or hosted link) for PROFILE.resumePdf.
 * - Portrait for About (optional).
 */
