/** Brand domain: canonical URLs and the sitemap are built from it. */
export const SITE_URL = 'https://masachidc.com';
/**
 * Origin this build is served from. Link unfurlers (LinkedIn, X, Slack, iMessage)
 * fetch og:url and og:image here, so both must resolve on this project.
 * masachidc.com still serves the Framer site (og-image.png 404s there); once the
 * domain points at this project, set this to SITE_URL.
 */
export const DEPLOY_URL = 'https://masachi-dc-portfolio.vercel.app';
export const SITE_NAME = 'Masachi DC';
export const TWITTER_HANDLE = '@MasachiDC';
export const DEFAULT_TITLE = 'Masachi DC | Design. Develop. Deploy.';
/** Link preview for every page; source in brand/og-image.html. */
export const OG_IMAGE = {
  path: '/og-image.png',
  type: 'image/png',
  width: 1200,
  height: 630,
  alt: 'Masachi DC: Discover, Design, Develop, Deploy. Mobile & Web Applications, Product Strategy, Brand Identity Design.',
};
export const DEFAULT_DESCRIPTION =
  'Nathan Masachi is a product designer who ships. Selected work in product, brand, and motion design — from research to production.';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Impact', href: '/impact' },
  { label: 'About', href: '/about' },
  { label: 'Resume', href: '/resume' },
];

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nathanmasachi/' },
  { label: 'Instagram', href: 'https://www.instagram.com/masachi.dc/' },
  { label: 'X', href: 'https://x.com/MasachiDC' },
];

export const EMAIL = 'hello@masachidc.com';

export const CONTACT_LINKS = [
  { label: 'Email', href: `mailto:${EMAIL}` },
  ...SOCIAL_LINKS,
];

export const isExternal = (href: string) => /^(https?:|mailto:)/.test(href);
