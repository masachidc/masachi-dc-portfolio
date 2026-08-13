import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

export function ClosingCta() {
  return (
    <section className="bg-ink-deep">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={stagger(0.1)}
        className="mx-auto flex min-h-[56vh] w-full max-w-[1320px] flex-col justify-center gap-7 px-6 py-28 sm:px-10 lg:px-16"
      >
        <motion.p
          variants={fadeUp}
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-bone/35"
        >
          Get in touch
        </motion.p>

        <motion.h2
          variants={fadeUp}
          className="font-display font-extrabold leading-[0.96] tracking-[-0.02em] text-bone"
          style={{ fontSize: 'clamp(40px, 6.5vw, 92px)' }}
        >
          Let's make the
          <br />
          <span className="text-accent-soft">next thing.</span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="max-w-sm text-[15px] font-medium leading-relaxed text-bone/45"
        >
          Available for select product, brand, and motion work.
        </motion.p>

        <motion.a
          variants={fadeUp}
          href="https://masachidc.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-2 inline-flex w-fit items-center gap-2 bg-accent px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bone transition-colors duration-300 hover:bg-accent-soft"
        >
          View full portfolio
          <ArrowUpRight
            size={13}
            strokeWidth={2}
            className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </motion.a>
      </motion.div>
    </section>
  );
}
