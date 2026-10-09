import { useRef, type ReactNode } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { easeOut } from '../lib/motion';
import { RevealLine } from './RevealLine';

function CornerMark({ className, delay }: { className: string; delay: number }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`pointer-events-none absolute h-4 w-4 text-ink/25 ${className}`} fill="none">
      <motion.path
        d="M1 8V1H8"
        stroke="currentColor"
        strokeWidth="1.4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: easeOut, delay }}
      />
    </svg>
  );
}

/**
 * The homepage hero, reusable: the defaults are the homepage's copy. Discipline pages pass their own kicker, headline
 * lines (the last line takes the teal accent) and introduction. The homepage greeting is a larger type role; other
 * pages keep the shared section kicker.
 */
export function Hero({
  kicker = 'Meet Nathan Masachi,',
  lines = ['A product designer', 'who ships.'],
  intro = 'I design products and build them, from research and interface design through to production code in React and React Native.',
  kickerRole = 'kicker',
}: {
  kicker?: ReactNode;
  lines?: string[];
  intro?: ReactNode;
  /** `greeting` is the homepage lead-in. Discipline pages keep the shared section kicker. */
  kickerRole?: 'kicker' | 'greeting';
} = {}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative">
      <CornerMark className="left-(--gutter) top-4 z-10" delay={0.9} />
      <CornerMark className="right-(--gutter) top-4 z-10 rotate-90" delay={1.0} />

      {/* Top padding = the section rhythm; ProjectGrid mirrors it above "Selected work". */}
      <motion.div style={{ opacity, y }} className="container-site relative pt-(--space-section)">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className={`mb-5 text-fg-faint ${kickerRole === 'greeting' ? 'text-greeting' : 'text-kicker'}`}
        >
          {kicker}
        </motion.p>

        <h1 className="font-display text-display text-ink">
          {lines.map((line, i) => (
            <RevealLine key={line} delay={0.15 + i * 0.13} className={i === lines.length - 1 ? 'text-accent' : ''}>
              {line}
            </RevealLine>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.55 }}
        >
          <p className="mt-6 max-w-[44ch] text-body-lg font-medium text-fg-muted">
            {intro}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
