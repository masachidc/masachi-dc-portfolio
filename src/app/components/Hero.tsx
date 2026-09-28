import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown } from 'lucide-react';
import { easeOut, fadeUp, stagger } from '../lib/motion';
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

const PROOF = [
  { lead: 'Shipped to the App Store', detail: 'Tembo: Storylines, a social app for iOS.' },
  { lead: 'Design through to code', detail: 'Interfaces built in React and React Native, prototype to production.' },
  { lead: 'Measurable outcomes', detail: "Brand and web work for FIU's Project SEEDS during a period when enrollment more than doubled." },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative bg-bone">
      <CornerMark className="left-(--gutter) top-4" delay={0.9} />
      <CornerMark className="right-(--gutter) top-4 rotate-90" delay={1.0} />
      <CornerMark className="bottom-4 left-(--gutter) -rotate-90" delay={1.1} />
      <CornerMark className="bottom-4 right-(--gutter) rotate-180" delay={1.2} />

      <motion.div style={{ opacity, y }} className="container-site pb-14 pt-16 lg:pb-16 lg:pt-24">
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

        {/* Proof: three verifiable facts, not vanity metrics. */}
        <motion.ul
          initial="hidden"
          animate="show"
          variants={stagger(0.75, 0.08)}
          aria-label="Highlights"
          className="mt-12 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8 lg:mt-14"
        >
          {PROOF.map(({ lead, detail }) => (
            <motion.li key={lead} variants={fadeUp} className="max-w-[34ch]">
              <p className="text-body font-semibold text-ink">{lead}</p>
              <p className="mt-1 text-small text-fg-subtle">{detail}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
