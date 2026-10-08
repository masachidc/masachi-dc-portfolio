import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { ProjectRow } from '../components/ProjectRow';
import { HomeAbout } from '../components/HomeAbout';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import { disciplineWork, type Discipline } from '../data/disciplines';

/** The discipline's five skills, after the last project rule: numbered like the rows, one line each. */
function Skills({ discipline }: { discipline: Discipline }) {
  const id = `${discipline.slug}-skills-title`;
  return (
    <motion.section
      aria-labelledby={id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.08)}
      className="grid grid-cols-1 gap-8 pt-(--space-section) md:grid-cols-[5fr_7fr] md:gap-16"
    >
      <motion.h2 id={id} variants={fadeUp} className="font-display text-kicker uppercase text-ink">
        Skills
      </motion.h2>
      <ol className="border-t border-line">
        {discipline.skills.map((skill, i) => (
          <motion.li
            key={skill}
            variants={fadeUp}
            className="flex items-baseline gap-6 border-b border-line py-5"
          >
            <span aria-hidden="true" className="w-8 shrink-0 font-mono text-micro font-medium tracking-[0.1em] text-fg-subtle">
              {String(i + 1).padStart(2, '0')}
            </span>
            <span className="font-display text-title text-ink">{skill}</span>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}

/**
 * Template for /product-design, /design-engineering and /visual-design: the homepage hero with the discipline's own
 * headline, three alternating project rows between hairlines, the discipline's skills, then the homepage's About and
 * Contact sections unchanged.
 */
export function DisciplinePage({ discipline }: { discipline: Discipline }) {
  usePageMeta(discipline.meta);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [discipline.slug]);

  const work = disciplineWork(discipline);
  const workId = `${discipline.slug}-work-title`;

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* key: replay the entrance when moving between discipline pages */}
        <Hero key={discipline.slug} kicker={discipline.name} lines={discipline.headline} intro={discipline.intro} />

        <section aria-labelledby={workId} className="container-site pb-(--space-section) pt-(--space-section)">
          <h2 id={workId} className="mb-8 font-display text-kicker uppercase text-ink">
            Selected work
          </h2>
          {/* A rule above each row and one below the last: heading, rule, row, rule, row, rule, row, rule, skills. */}
          <ol className="border-b border-line">
            {work.map((w, i) => (
              <li key={w.slug} className="border-t border-line py-12 lg:py-16">
                <ProjectRow
                  project={w.project}
                  number={i + 1}
                  summary={w.summary}
                  contribution={w.contribution}
                  flip={i % 2 === 1}
                />
              </li>
            ))}
          </ol>

          <Skills discipline={discipline} />
        </section>

        <HomeAbout />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
