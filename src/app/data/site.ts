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
