import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Hero } from '../components/Hero';
import { HomeAbout } from '../components/HomeAbout';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import { projectHref } from '../data/projects';
import { isPublished } from '../data/caseStudies';
import { disciplineProjects, type Discipline, type DisciplineProject } from '../data/disciplines';

/**
 * Section opener, as on the homepage About and Contact: a muted sentence-case kicker, then the h2 statement. Each line
 * of a multi-line headline is its own block.
 */
function SectionHeading({ id, kicker, headline }: { id: string; kicker: string; headline: string | string[] }) {
  const lines = Array.isArray(headline) ? headline : [headline];
  return (
    <>
      <p className="mb-3 font-display text-kicker text-fg-faint">{kicker}</p>
      <h2 id={id} className="text-balance font-display text-headline text-ink">
        {/* The space keeps the spoken text "problem. Shape", not "problem.Shape". */}
        {lines.map((line, i) => (
          <span key={line} className="block">
            {i > 0 && ' '}
            {line}
          </span>
        ))}
      </h2>
    </>
  );
}

/**
 * One selected-work row, a single link to the case study. From lg: text and cover side by side (5/7 columns), the
 * cover switching sides on every other row. Below lg the row stacks in DOM order, text first, so phones and tablets
 * never inherit the desktop alternation. The link is named by the project and its call to action and described by the
 * discipline's description, so a screen reader doesn't read the whole row as one name.
 */
function WorkRow({ item, index, slug }: { item: DisciplineProject; index: number; slug: string }) {
  const { project } = item;
  const id = `${slug}-work-${project.slug}`;
  const flipped = index % 2 === 1;
  const published = isPublished(project.slug);
  return (
    <motion.li variants={fadeUp} className="border-t border-line last:*:pb-0">
      <Link
        to={projectHref(project)}
        aria-labelledby={`${id}-title ${id}-cta`}
        aria-describedby={`${id}-description`}
        className="group grid grid-cols-1 gap-8 py-10 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-16"
      >
        <div className={`min-w-0 lg:col-span-5 ${flipped ? 'lg:pl-4' : 'lg:pr-4'}`}>
          <p className="font-mono text-micro font-medium tracking-[0.1em] text-fg-subtle">
            N°{String(index + 1).padStart(2, '0')}
            {project.year && ` · ${project.year}`}
          </p>
          <h3 id={`${id}-title`} className="mt-4 text-balance font-display text-title text-ink">
            {project.title}
          </h3>
          <p id={`${id}-description`} className="mt-4 max-w-(--measure) text-body-lg text-fg-muted">
            {item.description}
          </p>
          <p className="mt-5 text-label caps text-fg-subtle">{item.focus}</p>
          <span
            id={`${id}-cta`}
            className="mt-8 inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink"
          >
            {published ? 'View case study' : 'Case study in progress'}
            <ArrowRight
              size={12}
              strokeWidth={2}
              aria-hidden
              className="transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none"
            />
          </span>
        </div>
        {/* The cover is a thumbnail for the link, named by the title beside it, so its alt is empty. */}
        <div className={`aspect-video overflow-hidden bg-surface lg:col-span-7 ${flipped ? 'lg:order-first' : ''}`}>
          <img
            src={project.cover.src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-out-premium motion-safe:group-hover:scale-103 motion-safe:group-focus-visible:scale-103"
            style={{ objectPosition: project.cover.position }}
          />
        </div>
      </Link>
    </motion.li>
  );
}

/** Selected work: three editorial rows, each opened by a hairline; Approach's top rule closes the last. */
function SelectedWork({ discipline }: { discipline: Discipline }) {
  const id = `${discipline.slug}-work-title`;
  return (
    <section aria-labelledby={id} className="container-site section-y">
      <motion.div initial="hidden" whileInView="show" viewport={viewportOnce} variants={fadeUp} className="mb-10 lg:mb-14">
        <SectionHeading id={id} kicker="Selected work" headline={discipline.work.headline} />
      </motion.div>
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce}
        variants={stagger(0, 0.12)}
      >
        {disciplineProjects(discipline).map((item, i) => (
          <WorkRow key={item.project.slug} item={item} index={i} slug={discipline.slug} />
        ))}
      </motion.ol>
    </section>
  );
}

/**
 * Approach: kicker, headline and description on the left (held in view from lg while the rows pass), five numbered
 * items between hairlines on the right. Stacks on phones, left column first.
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
      <motion.div variants={fadeUp} className="lg:sticky lg:top-28 lg:self-start">
        <SectionHeading id={id} kicker="Approach" headline={approach.headline} />
        <p className="mt-6 max-w-[44ch] text-body-lg text-fg-muted">{approach.description}</p>
      </motion.div>
      {/* Hairlines only between items: none above the first or below the last. */}
      <ol className="divide-y divide-line">
        {approach.items.map((item, i) => (
          <motion.li key={item.title} variants={fadeUp} className="flex items-baseline gap-4 py-8 first:pt-0 last:pb-0 sm:gap-6">
            <span aria-hidden="true" className="w-8 shrink-0 font-mono text-micro font-medium tracking-[0.1em] text-fg-subtle">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0">
              <h3 className="text-entry text-ink">{item.title}</h3>
              <p className="mt-2 max-w-(--measure) text-body-lg text-fg-muted">{item.text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </motion.section>
  );
}

/**
 * Template for /product-design, /design-engineering and /visual-design: the homepage hero (discipline name as the
 * kicker, then its headline and lede), Selected work as three editorial rows, Approach, then the homepage's About and
 * Contact unchanged.
 */
export function DisciplinePage({ discipline }: { discipline: Discipline }) {
  usePageMeta({ title: discipline.title, description: discipline.description });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [discipline.slug]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {/* key: replay the entrance when moving between discipline pages */}
        <Hero key={discipline.slug} kicker={discipline.title} lines={discipline.hero.lines} intro={discipline.hero.lede} />
        <SelectedWork discipline={discipline} />
        <Approach discipline={discipline} />

        <HomeAbout />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
