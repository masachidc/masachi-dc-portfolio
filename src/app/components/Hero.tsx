import { motion } from 'motion/react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

export function Hero() {
  return (
    <section className="bg-bone">
      <motion.div
        initial="hidden"
        animate="show"
        variants={stagger(0.15)}
        className="mx-auto flex min-h-[72vh] w-full max-w-[1320px] flex-col justify-center px-6 py-28 sm:px-10 lg:px-16 lg:py-36"
      >
        <motion.div variants={fadeUp} className="mb-7 flex items-center gap-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
          </span>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-ink/45">
            Available for select work — 2026
          </p>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display font-extrabold leading-[0.96] tracking-[-0.02em] text-ink"
          style={{ fontSize: 'clamp(48px, 7.5vw, 104px)' }}
        >
          Design that moves
          <br />
          <span className="text-accent">with intention.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-md text-[15px] font-medium leading-relaxed text-ink/50"
        >
          Six selected projects in product, brand, and motion design — built
          for founders and teams who care how it feels, not only how it
          works.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-10 flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.14em] text-ink/35">
          <span>Product</span>
          <span className="h-px w-4 bg-ink/20" />
          <span>Brand</span>
          <span className="h-px w-4 bg-ink/20" />
          <span>Motion</span>
        </motion.div>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={fadeUp}
        className="mx-auto w-full max-w-[1320px] px-6 pb-12 sm:px-10 lg:px-16"
      >
        <div className="h-px w-full bg-ink/10" />
      </motion.div>
    </section>
  );
}
