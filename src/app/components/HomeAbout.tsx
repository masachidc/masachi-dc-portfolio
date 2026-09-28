import { motion } from 'motion/react';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

// Range, grouped so it reads as one practice rather than a list of skills.
const PRACTICE = [
  { area: 'Product', detail: 'Research, product strategy, interaction design' },
  { area: 'Interface', detail: 'Visual design, design systems, prototyping, motion' },
  { area: 'Build', detail: 'React, React Native, full-stack prototypes, AI-assisted development' },
];

/** Short human layer after the work: who Nathan is and how he works. Not a biography. */
export function HomeAbout() {
  return (
    <motion.section
      id="about-nathan"
      aria-labelledby="about-nathan-title"
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.1)}
      className="container-site section-y border-t border-line"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[5fr_7fr] md:gap-16">
        <motion.div variants={fadeUp}>
          <p className="mb-3 font-display text-kicker text-fg-faint">About</p>
          <h2 id="about-nathan-title" className="max-w-[14ch] font-display text-headline text-ink">
            Trained in architecture. Working in product.
          </h2>
        </motion.div>

        <motion.div variants={fadeUp} className="max-w-(--measure)">
          <p className="text-body-lg text-fg-muted">
            I studied architecture before moving into digital interactive media, with a minor in
            computer science. That path shaped how I work: <strong className="font-semibold text-ink">structure first</strong>,
            then form, then the details that make a product feel right. Today I take products from
            research and interface design into working code. I'm based in Tampa, Florida.
          </p>

          <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8">
            {PRACTICE.map(({ area, detail }) => (
              <div key={area}>
                <dt className="text-label caps text-accent-deep">{area}</dt>
                <dd className="mt-2 text-small text-fg-muted">{detail}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </motion.section>
  );
}
