export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
  imagePosition: string;
}

export const PROJECTS: Project[] = [
  {
    id: '01',
    title: 'KESHO',
    subtitle: 'Prediction App',
    category: 'Full Stack / Product Design',
    year: '2026',
    description:
      'A sealed foresight platform where users submit timestamped predictions for live sports, entertainment, and politics — locked at kickoff, revealed after.',
    tags: ['Sports Tech', 'PWA', 'AI'],
    link: 'https://masachidc.com/works/kesho-app',
    image:
      'https://images.unsplash.com/photo-1768330187404-59e46cf222c9?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
  },
  {
    id: '02',
    title: 'AMUSE',
    subtitle: 'Art Museum',
    category: 'UI/UX Product Design',
    year: '2025',
    description:
      'A museum platform enabling Kenyans to discover exhibitions and book tickets seamlessly — with M-Pesa integration and an African-heritage visual identity.',
    tags: ['Mobile-First', 'Cultural Tech', 'Kenya'],
    link: 'https://masachidc.com/works/amuse-art-museum',
    image:
      'https://images.unsplash.com/photo-1774514580599-c3dae376348e?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center 35%',
  },
  {
    id: '03',
    title: 'INLINE',
    subtitle: 'Chrome Extension',
    category: 'UI/UX Design',
    year: '2026',
    description:
      'A browser extension that turns passive browsing into an interactive canvas — annotate, highlight, draw, and invoke AI on any webpage.',
    tags: ['Browser AI', 'Productivity', 'FIU Award'],
    link: 'https://masachidc.com/works/inline-chrome-extension',
    image:
      'https://images.unsplash.com/photo-1768638687898-7851d341cb87?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
  },
  {
    id: '04',
    title: 'SEEDS',
    subtitle: 'Brand Identity',
    category: 'Brand Identity Design',
    year: '2025',
    description:
      "Extending FIU's brand system to give Project SEEDS its own distinct presence — contributing to a 100%+ increase in student enrollment.",
    tags: ['Logo Design', 'Web Design', 'FIU'],
    link: 'https://masachidc.com/works/project-seeds-branding',
    image:
      'https://images.unsplash.com/photo-1446688568582-55ddb4b37cad?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
  },
  {
    id: '05',
    title: 'HULK',
    subtitle: 'Motion Design',
    category: 'Motion Design',
    year: '2025',
    description:
      'An epic comics story produced with Masachi DC Studios — kinetic typography, particle physics, and After Effects mastery woven into a bold cinematic narrative.',
    tags: ['After Effects', 'Kinetic Type', 'Comics'],
    link: 'https://masachidc.com/works/the-incredible-hulk',
    image:
      'https://images.unsplash.com/photo-1755811717097-23fba595025d?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center',
  },
  {
    id: '06',
    title: 'STEM X',
    subtitle: 'Architecture Camp',
    category: 'Architecture & Curriculum',
    year: '2026',
    description:
      'A multi-year initiative bringing architecture and design to 500+ students across six African nations through hands-on SketchUp workshops.',
    tags: ['STEM Education', 'Africa', '6 Countries'],
    link: 'https://masachidc.com/works/stemxposure',
    image:
      'https://images.unsplash.com/photo-1598941101837-e3fdd6d94b24?w=1600&q=80&auto=format&fit=crop',
    imagePosition: 'center 40%',
  },
];
