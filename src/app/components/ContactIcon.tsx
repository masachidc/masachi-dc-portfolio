import { Instagram, Linkedin, Mail } from 'lucide-react';

/** The X (formerly Twitter) logo. Lucide's `X` is a close icon, so this is drawn inline. */
function XLogo({ size }: { size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** Icon for a contact channel, matched by its label. Decorative: the label carries the meaning. */
export function ContactIcon({ label, size = 15 }: { label: string; size?: number }) {
  switch (label) {
    case 'Email':
      return <Mail size={size} strokeWidth={1.75} aria-hidden />;
    case 'LinkedIn':
      return <Linkedin size={size} strokeWidth={1.75} aria-hidden />;
    case 'Instagram':
      return <Instagram size={size} strokeWidth={1.75} aria-hidden />;
    case 'X':
      // The filled glyph reads larger than outline icons; step it down to match.
      return <XLogo size={size - 2} />;
    default:
      return null;
  }
}
