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
 * The page's capabilities ("How I work"): label, statement and description on the left, the principles between
 * hairlines on the right. From lg the section is the same height on every discipline page: the principles sit in a
 * fixed-height column that scrolls on its own when they overflow, then hands the scroll back to the page. Stacks at
 * natural height below lg, left column first.
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
        <h2 id={id} className="font-display text-kicker text-fg-faint">
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
        {/* The case-study overview's size: the description reads as the section's summary. */}
        <p className="mt-6 max-w-[44ch] text-pretty text-lede text-fg-muted">{approach.description}</p>
      </motion.div>
      {/* Hairlines only between principles: none above the first or below the last. data-lenis-prevent lets the
          column scroll natively under Lenis; tabIndex makes it keyboard-scrollable when it overflows. */}
      <div
        role="region"
        aria-label={`${approach.label}: ${discipline.name}`}
        tabIndex={0}
        data-lenis-prevent
        className="lg:h-116 lg:overflow-y-auto lg:overscroll-auto lg:pr-4 lg:[scrollbar-width:thin]"
      >
        <ul className="divide-y divide-line">
          {approach.principles.map((principle) => (
            <motion.li key={principle.title} variants={fadeUp} className="py-4 first:pt-0 last:pb-0">
              <h3 className="text-entry text-ink">{principle.title}</h3>
              <p className="mt-1 max-w-(--measure) text-body-lg text-fg-muted">{principle.text}</p>
            </motion.li>
          ))}
        </ul>
      </div>
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
        <ProjectGrid projects={projects} bare />
        <Approach discipline={discipline} />

        <HomeAbout />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
