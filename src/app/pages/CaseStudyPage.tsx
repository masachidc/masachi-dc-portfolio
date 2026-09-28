import { useEffect, useMemo, type ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SectionRail, type RailSection } from '../components/SectionRail';
import { ProjectRail } from '../components/ProjectRail';
import { SiteLink } from '../components/SiteLink';
import { findCaseStudy, type CaseBlock, type CaseImage, type CaseStudy } from '../data/caseStudies';
import { PROJECTS, projectHref, type Project } from '../data/projects';
import { easeOut, fadeUp, viewportOnce } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

// ── Case-study primitives ───────────────────────────────────────────────────
// The visual grammar every case study shares: a label/prose section, a framed
// media band, and an outcome row. Content lives in data/caseStudies.tsx.

/** Section lead-in: bold and muted, nearly title-sized. */
function Kicker({ children }: { children: ReactNode }) {
  return <p className="mb-1 font-display text-kicker text-fg-faint">{children}</p>;
}

function ContentSection({
  id,
  kicker,
  title,
  children,
  wide = false,
}: {
  id: string;
  kicker: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="container-reading section-y"
    >
      <div className={`grid grid-cols-1 gap-6 ${wide ? 'md:grid-cols-[5fr_7fr]' : 'md:grid-cols-[2fr_3fr]'} md:gap-12 lg:gap-16`}>
        <motion.div variants={fadeUp}>
          <Kicker>{kicker}</Kicker>
          <h2 id={`${id}-title`} className="font-display text-title text-ink/85">
            {title}
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} className="max-w-(--measure) space-y-5 text-body-lg text-fg-muted">
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
}

/** Full-bleed soft-grey band holding media at reading width. */
function MediaFrame({ children, caption }: { children: ReactNode; caption?: string }) {
  return (
    <motion.figure
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className="w-full bg-surface section-y"
    >
      <div className="container-reading">{children}</div>
      {caption && <figcaption className="container-reading mt-6 text-center text-small text-fg-subtle">{caption}</figcaption>}
    </motion.figure>
  );
}

function FramedImage({ src, alt, ratio = '16/9', priority = false }: CaseImage & { ratio?: string; priority?: boolean }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      // Lowercase DOM attribute: React 18 doesn't know the camelCase prop.
      {...{ fetchpriority: priority ? 'high' : 'auto' }}
      decoding="async"
      className="w-full rounded-[6px] bg-bone-deep object-cover shadow-[0_20px_50px_-20px_rgba(10,10,11,0.25)]"
      style={{ aspectRatio: ratio }}
    />
  );
}

function Block({ block }: { block: CaseBlock }) {
  switch (block.kind) {
    case 'content':
      return (
        <ContentSection id={block.id} kicker={block.subtitle} title={block.title} wide={block.wide}>
          {block.body}
        </ContentSection>
      );
    case 'frame':
      return (
        <MediaFrame caption={block.caption}>
          {block.images.length === 1 ? (
            <FramedImage {...block.images[0]} />
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {block.images.map((img, i) => (
                <FramedImage key={`${img.src}-${i}`} {...img} ratio="4/3" />
              ))}
            </div>
          )}
        </MediaFrame>
      );
    case 'stats':
      return (
        <motion.section
          id={block.id}
          aria-labelledby={`${block.id}-title`}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          className="container-reading section-y"
        >
          <motion.h2 id={`${block.id}-title`} variants={fadeUp} className="mb-12 font-display text-kicker text-fg-faint">
            {block.label}
          </motion.h2>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
            {block.items.map((s, i) => (
              <motion.div key={`${s.label}-${i}`} variants={fadeUp} className="flex flex-col-reverse gap-2">
                <dt className="text-small text-fg-subtle">{s.label}</dt>
                <dd className="font-display text-stat text-accent">{s.value}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.section>
      );
  }
}

/** Closing hand-off to the next project in portfolio order. */
function NextProject({ project }: { project: Project }) {
  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  return (
    <section aria-label="Next project" className="border-t border-line">
      <div className="container-reading flex flex-col gap-10 py-16 sm:flex-row sm:items-end sm:justify-between md:py-20">
        <Link to="/#work" className="inline-flex items-center gap-2 py-2 text-small text-fg-subtle transition-colors hover:text-ink">
          <ArrowLeft size={14} strokeWidth={2} aria-hidden />
          All work
        </Link>
        <SiteLink href={projectHref(next)} className="group flex flex-col items-start gap-2 sm:items-end">
          <span className="text-micro caps text-fg-subtle">Next project</span>
          <span className="inline-flex items-center gap-3 font-display text-title text-ink transition-colors group-hover:text-accent-deep">
            {next.railTitle}
            <ArrowRight size={22} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
        </SiteLink>
      </div>
    </section>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

function CaseStudyView({ study, project }: { study: CaseStudy; project: Project }) {
  usePageMeta({ title: study.title.join(' '), description: project.description, noindex: study.draft });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  const sections = useMemo<RailSection[]>(
    () =>
      study.blocks.flatMap((b) =>
        b.kind === 'content' ? [{ id: b.id, title: b.subtitle }] : b.kind === 'stats' ? [{ id: b.id, title: b.label }] : [],
      ),
    [study],
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <SectionRail sections={sections} />
      <ProjectRail currentSlug={project.slug} />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <article>
          {/* ── Hero ── */}
          <header className="container-reading pb-16 pt-14 lg:pt-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}>
              <Link to="/#work" className="mb-10 inline-flex items-center gap-2 py-2 text-small text-fg-subtle transition-colors hover:text-ink">
                <ArrowLeft size={14} strokeWidth={2} aria-hidden />
                Back to work
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
              <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}>
                <p className="mb-3 text-small text-fg-subtle">{study.disciplines}</p>
                <h1 className="font-display text-display text-ink">
                  {study.title.map((line, i) => (
                    <span key={line} className="block">
                      {line}
                      {i < study.title.length - 1 && ' '}
                    </span>
                  ))}
                </h1>
                <p className="mt-6 max-w-[46ch] text-body-lg text-fg-muted">{study.subtitle}</p>
              </motion.div>

              <motion.dl
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
                className="grid grid-cols-2 content-end gap-x-8 gap-y-7 pb-2"
              >
                {study.meta.map(([label, value]) => (
                  <div key={label}>
                    <dt className="mb-1.5 text-small font-semibold text-ink">{label}</dt>
                    <dd className="text-small text-fg-muted">{value}</dd>
                  </div>
                ))}
              </motion.dl>
            </div>
          </header>

          {/* ── Hero image ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: easeOut, delay: 0.3 }}>
            <MediaFrame>
              <FramedImage {...study.hero} priority />
            </MediaFrame>
          </motion.div>

          {/* ── Overview ── */}
          <div className="container-reading section-y">
            <motion.p
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              variants={fadeUp}
              className="max-w-[44ch] text-pretty text-lede text-fg-muted"
            >
              {study.overview}
            </motion.p>
          </div>

          {study.blocks.map((block, i) => (
            <Block key={`${study.slug}-${i}`} block={block} />
          ))}
        </article>

        <NextProject project={project} />
      </main>

      <Footer />
    </div>
  );
}

export function CaseStudyPage() {
  const { slug } = useParams();
  const found = findCaseStudy(slug);
  if (!found) return <NotFoundPage />;
  // Keyed by slug so scroll-triggered reveals replay for each study.
  return <CaseStudyView key={found.study.slug} study={found.study} project={found.project} />;
}
