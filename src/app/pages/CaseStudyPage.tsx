import { useEffect, useMemo } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { MediaBand } from '../components/MediaBand';
import { CaseBlocks, railSections, withIds } from '../components/CaseBlocks';
import { SectionRail } from '../components/SectionRail';
import { ProjectRail } from '../components/ProjectRail';
import { SiteLink } from '../components/SiteLink';
import { findCaseStudy, isPublished, type CaseStudy } from '../data/caseStudies';
import { PROJECTS, projectHref, type Project } from '../data/projects';
import { EMAIL } from '../data/site';
import { easeOut, fadeUp, viewportOnce } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

const reveal = { initial: 'hidden', whileInView: 'show', viewport: viewportOnce } as const;

// ── Hero ────────────────────────────────────────────────────────────────────

function Hero({ study, project }: { study: CaseStudy; project: Project }) {
  return (
    <header className="container-reading pb-12 pt-14 lg:pt-20">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: easeOut }}>
        <Link to="/#work" className="mb-10 inline-flex items-center gap-2 py-2 text-small text-fg-subtle transition-colors hover:text-ink">
          <ArrowLeft size={14} strokeWidth={2} aria-hidden />
          Back to work
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-[3fr_2fr] md:gap-12">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}>
          <p className="mb-3 text-small text-fg-subtle">{project.disciplines}</p>
          <h1 className="font-display text-display text-ink">
            {study.title.map((line, i) => (
              <span key={line} className="block">
                {line}
                {i < study.title.length - 1 && ' '}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[46ch] text-body-lg text-fg-muted">{study.tagline}</p>
          {study.links && (
            <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">
              {study.links.map((l) => (
                <SiteLink key={l.href} href={l.href} className="group inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink">
                  {l.label}
                  <ArrowUpRight size={12} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </SiteLink>
              ))}
            </div>
          )}
        </motion.div>

        <motion.dl
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
          // Facts sit 2×2 on the right, aligned to the bottom of the title block.
          className="grid grid-cols-2 content-end gap-x-8 gap-y-7 pb-2"
        >
          {study.facts.map(([label, value]) => (
            <div key={label}>
              <dt className="mb-1.5 text-small font-semibold text-ink">{label}</dt>
              <dd className="text-small text-fg-muted">{value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </header>
  );
}

/** The intro paragraph, then the 20-second read (problem / decision / outcome) directly under it. */
function Overview({ study }: { study: CaseStudy }) {
  if (!study.overview && !study.glance) return null;
  return (
    <div className="container-reading section-y">
      {study.overview && (
        // A div so an overview can be one run of text or several <p>s.
        <motion.div {...reveal} variants={fadeUp} className="max-w-[44ch] space-y-5 text-pretty text-lede text-fg-muted">
          {study.overview}
        </motion.div>
      )}
      {study.glance && (
        <motion.dl
          {...reveal}
          variants={fadeUp}
          className={`grid grid-cols-1 gap-6 border-t border-line pt-6 sm:grid-cols-3 sm:gap-8 ${study.overview ? 'mt-12' : ''}`}
        >
          {study.glance.map((g) => (
            <div key={g.label}>
              <dt className="text-label caps text-accent-deep">{g.label}</dt>
              <dd className="mt-2 text-body text-ink/80">{g.text}</dd>
            </div>
          ))}
        </motion.dl>
      )}
    </div>
  );
}

// ── Endings ─────────────────────────────────────────────────────────────────

/** Honest public state for a draft: no placeholder prose, a clear next step. */
function InProgress({ title }: { title: string }) {
  return (
    <section aria-labelledby="in-progress-title" className="container-reading pb-(--space-section)">
      <div className="rounded-[var(--radius-surface)] bg-surface p-8 sm:p-12">
        <p className="text-label caps text-accent-deep">In progress</p>
        <h2 id="in-progress-title" className="mt-3 max-w-[24ch] font-display text-title text-ink">
          The full {title} case study is being finished.
        </h2>
        <p className="mt-4 max-w-(--measure) text-body-lg text-fg-muted">
          I'm glad to walk through the project in the meantime.
        </p>
        <SiteLink href={`mailto:${EMAIL}`} className="group mt-8 inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink">
          Get in touch
          <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
        </SiteLink>
      </div>
    </section>
  );
}

/** Hand-off to the next project in portfolio order, so browsing keeps momentum. */
function NextProject({ project }: { project: Project }) {
  const next = PROJECTS[(PROJECTS.indexOf(project) + 1) % PROJECTS.length];
  return (
    <nav aria-label="Next project" className="border-t border-line">
      <div className="container-reading flex flex-col gap-10 py-16 sm:flex-row sm:items-end sm:justify-between md:py-20">
        <Link to="/#work" className="inline-flex items-center gap-2 py-2 text-small text-fg-subtle transition-colors hover:text-ink">
          <ArrowLeft size={14} strokeWidth={2} aria-hidden />
          All work
        </Link>
        <SiteLink href={projectHref(next)} className="group flex flex-col items-start gap-2 sm:items-end sm:text-right">
          <span className="text-micro caps text-fg-subtle">
            Next project{!isPublished(next.slug) && ' · case study in progress'}
          </span>
          <span className="inline-flex items-center gap-3 font-display text-title text-ink transition-colors group-hover:text-accent-deep">
            {next.railTitle}
            <ArrowRight size={22} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
          </span>
          <span className="text-small text-fg-muted">
            {next.summary} · {next.disciplines}
          </span>
        </SiteLink>
      </div>
    </nav>
  );
}

// ── Page ────────────────────────────────────────────────────────────────────

function CaseStudyView({ study, project }: { study: CaseStudy; project: Project }) {
  const { search } = useLocation();
  const draft = study.status === 'draft';
  // `?preview` shows a draft in full, with media slots, for review.
  const full = study.blocks.length > 0 && (!draft || new URLSearchParams(search).has('preview'));
  // Author-only slot detail (reserved ratio) shows in local dev and while reviewing a draft.
  const review = full && (draft || import.meta.env.DEV);
  const title = study.title.join(' ');

  usePageMeta({ title, description: study.description ?? project.description, noindex: draft });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  const blocks = useMemo(() => withIds(study.blocks), [study]);
  const sections = useMemo(() => (full ? railSections(blocks) : []), [blocks, full]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      {sections.length > 1 && <SectionRail sections={sections} />}
      <ProjectRail currentSlug={project.slug} />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {review && draft && (
          <p role="status" className="bg-ink px-(--gutter) py-2 text-center text-micro caps text-bone">
            Draft preview · not public · media slots show where real assets go
          </p>
        )}
        <article>
          <Hero study={study} project={project} />
          {study.cover && full && <MediaBand items={[study.cover]} review={review} priority />}
          <Overview study={study} />

          {full ? (
            <CaseBlocks blocks={blocks} keyPrefix={study.slug} review={review} />
          ) : (
            <InProgress title={study.title[0]} />
          )}
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
