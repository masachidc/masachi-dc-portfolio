export interface NavItem {
  label: string;
  /** Omit for pages that don't exist yet — rendered as a muted "Soon" item, never a dead link. */
  href?: string;
}

export const NAV_LINKS: NavItem[] = [
  { label: 'Work', href: '/#work' },
  { label: 'Impact' },
  { label: 'About', href: 'https://masachidc.com/about' },
  { label: 'Resume' },
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
