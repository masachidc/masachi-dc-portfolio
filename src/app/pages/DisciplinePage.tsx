import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { ProjectGrid } from '../components/ProjectGrid';
import { ProjectIndexRail } from '../components/ProjectIndexRail';
import { HomeAbout } from '../components/HomeAbout';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import { disciplineProjects, type Discipline } from '../data/disciplines';

/** The discipline's five skills, after Selected work: numbered like the cards, one line each. */
function Skills({ discipline }: { discipline: Discipline }) {
  const id = `${discipline.slug}-skills-title`;
  return (
    <motion.section
      aria-labelledby={id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.08)}
      className="container-site section-y grid grid-cols-1 gap-8 border-t border-line md:grid-cols-[5fr_7fr] md:gap-16"
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
 * Template for /product-design, /design-engineering and /visual-design, built from the homepage's own parts: the hero
 * with the discipline's headline and introduction, Selected work as one mosaic band of three cards (with the dot rail
 * listing just those three), the discipline's skills, then About and Contact unchanged.
 */
export function DisciplinePage({ discipline }: { discipline: Discipline }) {
  usePageMeta(discipline.meta);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [discipline.slug]);

  const projects = disciplineProjects(discipline);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <ProjectIndexRail key={discipline.slug} projects={projects} />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* key: replay the entrance when moving between discipline pages */}
        <Hero key={discipline.slug} lines={discipline.headline} intro={discipline.intro} />
        <ProjectGrid projects={projects} />
        <Skills discipline={discipline} />

        <HomeAbout />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
