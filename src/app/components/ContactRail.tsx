import { useState, type ReactNode } from 'react';
import { motion, type MotionValue, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { EMAIL, SOCIAL_LINKS } from '../data/site';

/** The X mark (lucide has no X logo). */
function XLogo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const ICON = 14;
const social = (label: string) => SOCIAL_LINKS.find((l) => l.label === label)?.href ?? '';

const ITEMS: { label: string; href: string; icon: ReactNode }[] = [
  { label: EMAIL, href: `mailto:${EMAIL}`, icon: <Mail size={ICON} strokeWidth={2} aria-hidden /> },
  { label: 'LinkedIn', href: social('LinkedIn'), icon: <Linkedin size={ICON} strokeWidth={2} aria-hidden /> },
  { label: 'X', href: social('X'), icon: <XLogo size={ICON - 1} /> },
];

/** One contact: label (shown at the top of the page, on hover and on focus) then its icon, as the homepage rail's dot. */
function RailLink({ label, href, icon, loadAmount }: { label: string; href: string; icon: ReactNode; loadAmount: MotionValue<number> }) {
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
      aria-label={external ? `${label} (opens in a new tab)` : `Email ${label}`}
      onMouseEnter={on}
      onMouseLeave={off}
      onFocus={on}
      onBlur={off}
      className="flex w-full items-center justify-end gap-2.5"
    >
      <motion.span
        aria-hidden="true"
        style={{ opacity: labelAmount, width: labelWidth, color: active ? 'var(--color-accent-deep)' : 'rgba(10,10,11,0.6)' }}
        className="overflow-hidden whitespace-nowrap text-right font-display text-small font-bold tracking-[-0.01em] transition-colors duration-300"
      >
        {label}
      </motion.span>
      <span
        className="flex size-4 shrink-0 items-center justify-center transition-all duration-300 ease-out"
        style={{
          color: active ? 'var(--color-accent-deep)' : 'rgba(10,10,11,0.45)',
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
 * hover or keyboard focus. Shown from 1360px: below that the email label would slide over the reading column.
 */
export function ContactRail() {
  const { scrollY } = useScroll();
  const loadAmount = useTransform(scrollY, [0, 260], [1, 0]);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-8 top-[calc(50%-39px)] z-30 hidden w-[230px] -translate-y-1/2 flex-col gap-4 min-[1360px]:flex"
      aria-label="Contact"
    >
      {ITEMS.map((item) => (
        <RailLink key={item.label} {...item} loadAmount={loadAmount} />
      ))}
    </motion.nav>
  );
}
