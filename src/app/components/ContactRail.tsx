import { useState, type ReactNode } from 'react';
import { motion, type MotionValue, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { Mail } from 'lucide-react';
import { EMAIL, SOCIAL_LINKS } from '../data/site';

/** Solid brand marks, as on a GitHub profile sidebar (lucide's are outline, and it has no X logo). */
function LinkedInLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.71 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const ICON = 16;
const social = (label: string) => SOCIAL_LINKS.find((l) => l.label === label)?.href ?? '';

/** Labels are handles, GitHub-style: the address, in/<profile>, @<handle>. `name` is what a screen reader hears. */
const ITEMS: { label: string; name: string; href: string; icon: ReactNode }[] = [
  { label: EMAIL, name: `Email ${EMAIL}`, href: `mailto:${EMAIL}`, icon: <Mail size={ICON} strokeWidth={1.75} aria-hidden /> },
  { label: 'in/nathanmasachi', name: 'LinkedIn: in/nathanmasachi', href: social('LinkedIn'), icon: <LinkedInLogo size={ICON - 1} /> },
  { label: '@MasachiDC', name: 'X: @MasachiDC', href: social('X'), icon: <XLogo size={ICON - 2} /> },
];

/** One contact: label (shown at the top of the page, on hover and on focus) then its icon, as the homepage rail's dot. */
function RailLink({ label, name, href, icon, loadAmount }: { label: string; name: string; href: string; icon: ReactNode; loadAmount: MotionValue<number> }) {
  const [active, setActive] = useState(false);
  const hoverTarget = useMotionValue(0);
  const hoverSmooth = useSpring(hoverTarget, { stiffness: 260, damping: 28 });
  const labelAmount = useTransform([loadAmount, hoverSmooth], ([l, h]: number[]) => Math.max(l, h));
  const labelWidth = useTransform(labelAmount, (v) => `${v * 200}px`);
  const external = href.startsWith('http');

  const on = () => {
    hoverTarget.set(1);
    setActive(true);
  };
  const off = () => {
    hoverTarget.set(0);
    setActive(false);
  };

  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={external ? `${name} (opens in a new tab)` : name}
      onMouseEnter={on}
      onMouseLeave={off}
      onFocus={on}
      onBlur={off}
      className="flex w-full items-center justify-end gap-2.5"
    >
      <motion.span
        aria-hidden="true"
        style={{ opacity: labelAmount, width: labelWidth, color: active ? 'var(--color-accent-deep)' : 'var(--color-ink)' }}
        className="overflow-hidden whitespace-nowrap text-right text-body transition-colors duration-300"
      >
        {label}
      </motion.span>
      <span
        className="flex size-4 shrink-0 items-center justify-center transition-all duration-300 ease-out"
        style={{
          color: active ? 'var(--color-accent-deep)' : 'var(--color-fg-subtle)',
          transform: active ? 'scale(1.15)' : 'scale(1)',
        }}
      >
        {icon}
      </span>
    </a>
  );
}

/**
 * Contact rail for the Resume page, the homepage project rail's counterpart: fixed on the right, an icon in
 * place of each dot (email, LinkedIn, X). Labels show at the top of the page, fade as you scroll, and slide back in on
 * hover or keyboard focus. Shown from 1440px (34px clear of the content): below that the email label would slide over the reading column.
 */
export function ContactRail() {
  const { scrollY } = useScroll();
  const loadAmount = useTransform(scrollY, [0, 260], [1, 0]);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-8 top-[calc(50%-39px)] z-30 hidden w-[230px] -translate-y-1/2 flex-col gap-4 min-[1440px]:flex"
      aria-label="Contact"
    >
      {ITEMS.map((item) => (
        <RailLink key={item.label} {...item} loadAmount={loadAmount} />
      ))}
    </motion.nav>
  );
}
