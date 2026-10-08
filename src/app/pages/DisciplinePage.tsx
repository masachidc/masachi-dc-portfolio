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

/**
 * The page's capabilities ("How I design", "How I build", …): label, statement and description on the left, four
 * numbered principles between hairlines on the right. Stacks on phones, left column first.
 */
function Approach({ discipline }: { discipline: Discipline }) {
  const { approach } = discipline;
  const id = `${discipline.slug}-approach-title`;
  return (
    <motion.section
      aria-labelledby={id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.08)}
      className="container-site section-y grid grid-cols-1 gap-10 border-t border-line md:grid-cols-[5fr_7fr] md:gap-16"
    >
      <motion.div variants={fadeUp}>
        <h2 id={id} className="font-display text-kicker uppercase text-ink">
          {approach.label}
        </h2>
        <p className="mt-6 text-balance font-display text-headline text-ink">
          {/* The space keeps the spoken text "idea. A", not "idea.A". */}
          {approach.headline.map((line, i) => (
            <span key={line} className="block">
              {i > 0 && ' '}
              {line}
            </span>
          ))}
        </p>
        <p className="mt-6 max-w-[44ch] text-body-lg text-fg-muted">{approach.description}</p>
      </motion.div>
      <ol className="border-t border-line">
        {approach.principles.map((principle, i) => (
          <motion.li key={principle.title} variants={fadeUp} className="flex items-baseline gap-4 border-b border-line py-6 sm:gap-6">
            <span aria-hidden="true" className="w-8 shrink-0 font-mono text-micro font-medium tracking-[0.1em] text-fg-subtle">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="text-entry text-ink">{principle.title}</h3>
              <p className="mt-2 max-w-(--measure) text-body-lg text-fg-muted">{principle.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}

/**
 * Template for /product-design, /design-engineering and /visual-design, built from the homepage's own parts: the hero
 * (discipline name as the kicker, then its headline and introduction), Selected work as one mosaic band of three cards (with the dot rail
 * listing just those three), the discipline's capabilities, then About and Contact unchanged.
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
        <Hero key={discipline.slug} kicker={discipline.name} lines={discipline.headline} intro={discipline.intro} />
        <ProjectGrid projects={projects} />
        <Approach discipline={discipline} />

        <HomeAbout />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
