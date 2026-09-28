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
  /** Public path to a résumé PDF in /public. Leave null until a real file exists; the download action stays hidden. */
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
    headline: 'A production system, built end to end',
    subject: 'KESHO',
    context:
      'A sealed prediction platform with write-once, server-timestamped predictions, a points and XP scoring system, and an interface translated into up to 7 languages at deploy time. Live as a web app.',
    role: 'Product designer and full-stack developer: research, specification, interface, database, and deployment.',
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

export interface ExperienceItem {
  title: string;
  org: string;
  /** Only verified dates. Omit rather than guess. */
  when?: string;
  points: string[];
}

export const EXPERIENCE: ExperienceItem[] = [
  {
    title: 'Founder',
    org: 'Tembo',
    points: ['Designed and shipped Tembo: Storylines, a social iOS app, to the App Store.'],
  },
  {
    title: 'Marketing Officer',
    org: 'FIU Project SEEDS',
    when: '2025',
    points: [
      "Led recruitment; extended FIU's brand system into an approved identity for the initiative.",
      'Designed and built the program website for non-technical staff to maintain.',
      'Enrollment more than doubled during the initiative.',
    ],
  },
  {
    title: 'Lead Instructor & Curriculum Designer',
    org: 'STEM Xposure Inc. · Volunteer',
    when: '3 consecutive years',
    points: [
      'Built a two-week architecture and design curriculum reaching 500+ high school students in the US and six African countries.',
      'Recruited and onboarded 14 volunteer instructors; helped secure free SketchUp licenses for every student.',
    ],
  },
];

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
    summary: 'Sealed prediction platform. Next.js, React 19, TypeScript, Neon Postgres, Drizzle, Clerk, Vercel.',
    href: '/works/kesho-app',
  },
  {
    name: 'AMUSE Art Museum',
    role: 'Lead product designer',
    when: '2025',
    summary: 'Mobile-first museum discovery and booking platform for Kenya. Research through usability testing.',
    href: '/works/amuse-art-museum',
  },
  {
    name: 'INLINE',
    role: 'UI/UX designer',
    when: '2026',
    summary: "Chrome extension for annotating any webpage. FIU Blackstone LaunchPad's Most Unique Project.",
    href: '/works/inline-chrome-extension',
  },
  {
    name: 'The Incredible Hulk',
    role: 'Motion designer',
    when: '2025',
    summary: 'Kinetic type and particle short for Masachi DC Studios with Brandspot Media. After Effects, Premiere Pro.',
    href: '/works/the-incredible-hulk',
  },
];

export const SKILLS: { group: string; items: string[] }[] = [
  { group: 'Product', items: ['User research', 'Product strategy', 'Information architecture', 'Interaction design', 'Usability testing'] },
  { group: 'Design', items: ['UI design', 'Design systems', 'Prototyping', 'Brand identity', 'Motion design'] },
  { group: 'Engineering', items: ['React', 'React Native', 'Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Vercel', 'GitHub Actions'] },
  { group: 'Tools', items: ['Figma', 'Claude Code', 'Adobe Illustrator', 'After Effects', 'Premiere Pro', 'SketchUp'] },
];

export const EDUCATION: { field: string; school?: string; note?: string }[] = [
  { field: 'Digital Interactive Media, minor in Computer Science', school: 'Florida International University' },
  { field: 'Architecture', note: 'Studied before moving into digital interactive media.' },
];

/*
 * CONTENT GAPS (internal — never render):
 * - Degree names, graduation dates, and the architecture school's name.
 * - Confirm Digital Interactive Media + CS minor were at FIU (inferred from FIU
 *   journalism school / Caplin News and SEEDS "about to graduate").
 * - Tembo: dates, public-safe metrics, and whether to describe the build stack.
 * - Employment dates for SEEDS (year only) and STEM Xposure (years).
 * - A résumé PDF for PROFILE.resumePdf.
 * - Portrait for About (optional).
 */
