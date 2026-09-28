import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { easeOut } from '../lib/motion';
import { SiteLink } from './SiteLink';
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

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative bg-bone">
      <CornerMark className="left-(--gutter) top-4" delay={0.9} />
      <CornerMark className="right-(--gutter) top-4 rotate-90" delay={1.0} />

      {/* Top padding = the section rhythm; ProjectGrid mirrors it below the description. */}
      <motion.div style={{ opacity, y }} className="container-site pt-(--space-section)">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-5 text-kicker text-fg-faint"
        >
          Meet Nathan Masachi,
        </motion.p>

        <h1 className="font-display text-display text-ink">
          <RevealLine delay={0.15}>A product designer</RevealLine>
          <RevealLine delay={0.28} className="text-accent">
            who ships.
          </RevealLine>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.55 }}
        >
          <p className="mt-6 max-w-[44ch] text-body-lg font-medium text-fg-muted">
            I design products and build them, from research and interface design through to
            production code in React and React Native.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <SiteLink
              href="/#work"
              className="group inline-flex items-center gap-2 border-b border-ink pb-1 text-label caps text-ink"
            >
              See selected work
              <ArrowDown
                size={13}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
              />
            </SiteLink>
            <SiteLink
              href="/#contact"
              className="inline-flex items-center gap-2 py-1 text-small text-fg-subtle transition-colors hover:text-ink"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              Open to new roles
            </SiteLink>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
