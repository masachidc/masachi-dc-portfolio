import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { easeOut } from '../lib/motion';
import { RevealLine } from './RevealLine';

function CornerMark({ className, delay }: { className: string; delay: number }) {
  return (
    <svg viewBox="0 0 24 24" className={`pointer-events-none absolute h-4 w-4 text-ink/25 ${className}`} fill="none">
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
      <CornerMark className="left-6 top-4 sm:left-10 lg:left-16" delay={0.9} />
      <CornerMark className="right-6 top-4 rotate-90 sm:right-10 lg:right-16" delay={1.0} />
      <CornerMark className="bottom-4 left-6 -rotate-90 sm:left-10 lg:left-16" delay={1.1} />
      <CornerMark className="bottom-4 right-6 rotate-180 sm:right-10 lg:right-16" delay={1.2} />

      <motion.div
        style={{ opacity, y }}
        className="mx-auto flex min-h-[calc(100vh-222px)] w-full max-w-[1320px] flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 lg:py-20"
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeOut }}
          className="mb-5 flex items-center gap-3"
        >
          <p className="text-[21px] font-bold tracking-[-0.01em] text-ink/45">
            Meet Nathan Masachi,
          </p>
        </motion.div>

        <h1
          className="font-display font-extrabold leading-[0.96] tracking-[-0.02em] text-ink"
          style={{ fontSize: 'clamp(36px, 5.5vw, 76px)' }}
        >
          <RevealLine delay={0.15}>A product designer</RevealLine>
          <RevealLine delay={0.28} className="text-accent">
            who ships.
          </RevealLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.65 }}
          className="mt-6 max-w-md text-[18px] font-medium leading-relaxed text-ink/50"
        >
          Six selected projects in product, brand, and motion design — built
          for founders and teams who care how it feels, not only how it
          works.
        </motion.p>
      </motion.div>
    </section>
  );
}
