import { useEffect, useMemo, type ReactNode } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { SectionRail, type RailSection } from '../components/SectionRail';
import { ProjectRail } from '../components/ProjectRail';
import { SiteLink } from '../components/SiteLink';
import { findCaseStudy, isPublished, type CaseBlock, type CaseStudy, type Media } from '../data/caseStudies';
import { PROJECTS, projectHref, type Project } from '../data/projects';
import { EMAIL } from '../data/site';
import { easeOut, fadeUp, viewportOnce } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import { NotFoundPage } from './NotFoundPage';

// ── Case-study grammar ──────────────────────────────────────────────────────
// Widths: prose sits in the reading column at --measure; standard media fills
// the reading column (960px); `wide` media breaks out to the site container.
// Five primitives: section, insight, media band, outcomes, next project.

const reveal = { initial: 'hidden', whileInView: 'show', viewport: viewportOnce } as const;

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Stable, unique ids for rail targets, derived from kickers unless set explicitly. */
function withIds(blocks: CaseBlock[]) {
  const seen = new Map<string, number>();
  return blocks.map((b) => {
    if (b.kind !== 'section' && b.kind !== 'outcomes') return { block: b, id: undefined };
    const base = b.id ?? slugify(b.kicker);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return { block: b, id: n ? `${base}-${n + 1}` : base };
  });
}

/** Section lead-in: bold and muted, nearly title-sized. */
function Kicker({ children }: { children: ReactNode }) {
  return <p className="mb-1 font-display text-kicker text-fg-faint">{children}</p>;
}

/**
 * One media slot. With `src`: a lazy image in a reserved box (no layout shift).
 * Without: labelled scaffolding in preview, nothing on a public page.
 */
function MediaSlot({ media, showSlots, priority = false }: { media: Media; showSlots: boolean; priority?: boolean }) {
  if (media.src) {
    return (
      <img
        src={media.src}
        alt={media.alt ?? ''}
        loading={priority ? 'eager' : 'lazy'}
        // Lowercase DOM attribute: React 18 doesn't know the camelCase prop.
        {...{ fetchpriority: priority ? 'high' : 'auto' }}
        decoding="async"
        className="w-full rounded-[6px] bg-bone-deep object-cover shadow-[0_20px_50px_-20px_rgba(10,10,11,0.25)]"
        style={{ aspectRatio: media.ratio }}
      />
    );
  }
  if (!showSlots) return null;
  return (
    <div
      role="img"
      aria-label={`Image placeholder: ${media.slot}`}
      className="flex w-full flex-col items-center justify-center gap-2 rounded-[6px] border-2 border-dashed border-ink/15 bg-bone p-6 text-center"
      style={{ aspectRatio: media.ratio }}
    >
      <span className="text-micro caps text-fg-subtle">Asset pending</span>
      <span className="max-w-[32ch] text-small text-fg-muted">{media.slot}</span>
      <span className="font-mono text-micro text-fg-subtle">{media.ratio}</span>
    </div>
  );
}

const visible = (items: Media[], showSlots: boolean) => items.filter((m) => m.src || showSlots);

/** Full-bleed soft-grey band holding one, two, or three media items. */
function MediaBand({
  items,
  caption,
  wide = false,
  showSlots,
  priority = false,
}: {
  items: Media[];
  caption?: string;
  wide?: boolean;
  showSlots: boolean;
  priority?: boolean;
}) {
  const shown = visible(items, showSlots);
  if (!shown.length) return null;
  const cols = shown.length === 1 ? '' : shown.length === 2 ? 'grid gap-4 sm:grid-cols-2 sm:gap-6' : 'grid grid-cols-2 gap-4 md:grid-cols-3';
  return (
    <motion.figure {...reveal} variants={fadeUp} className="w-full bg-surface section-y">
      <div className={wide ? 'container-site' : 'container-reading'}>
        <div className={cols}>
          {shown.map((m, i) => (
            <MediaSlot key={`${m.slot}-${i}`} media={m} showSlots={showSlots} priority={priority && i === 0} />
          ))}
        </div>
      </div>
      {caption && <figcaption className="container-reading mt-6 text-center text-small text-fg-subtle">{caption}</figcaption>}
    </motion.figure>
  );
}

function Section({
  id,
  block,
  showSlots,
}: {
  id: string;
  block: Extract<CaseBlock, { kind: 'section' }>;
  showSlots: boolean;
}) {
  const media = block.media && visible([block.media], showSlots).length ? block.media : undefined;
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      {...reveal}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="container-reading section-y"
    >
      <div className={`grid grid-cols-1 gap-6 ${block.wide ? 'md:grid-cols-[5fr_7fr]' : 'md:grid-cols-[2fr_3fr]'} md:gap-12 lg:gap-16`}>
        <motion.div variants={fadeUp}>
          <Kicker>{block.kicker}</Kicker>
          <h2 id={`${id}-title`} className="font-display text-title text-ink/85">
            {block.title}
          </h2>
        </motion.div>
        <motion.div variants={fadeUp} className="max-w-(--measure) space-y-5 text-body-lg text-fg-muted">
          {block.body}
        </motion.div>
      </div>
      {media && (
        <motion.div variants={fadeUp} className="mt-12 rounded-[8px] bg-surface p-4 sm:p-8">
          <MediaSlot media={media} showSlots={showSlots} />
        </motion.div>
      )}
    </motion.section>
  );
}

/** A turning point, aligned to the prose column: label, one-line statement, optional support. */
function Insight({ block }: { block: Extract<CaseBlock, { kind: 'insight' }> }) {
  return (
    <motion.aside {...reveal} variants={fadeUp} aria-label={block.label} className="container-reading py-10 md:py-14">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_3fr] md:gap-12 lg:gap-16">
        <p className="text-label caps text-accent-deep md:pt-2">{block.label}</p>
        <div className="max-w-(--measure) border-l-2 border-accent pl-5 sm:pl-6">
          <p className="text-pretty font-display text-title text-ink">{block.statement}</p>
          {block.detail && <p className="mt-3 text-body-lg text-fg-muted">{block.detail}</p>}
        </div>
      </div>
    </motion.aside>
  );
}

function Outcomes({ id, block }: { id: string; block: Extract<CaseBlock, { kind: 'outcomes' }> }) {
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      {...reveal}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className="container-reading section-y"
    >
      <motion.h2 id={`${id}-title`} variants={fadeUp} className="mb-12 font-display text-kicker text-fg-faint">
        {block.kicker}
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
        <motion.p {...reveal} variants={fadeUp} className="max-w-[44ch] text-pretty text-lede text-fg-muted">
          {study.overview}
        </motion.p>
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
      <div className="rounded-[8px] bg-surface p-8 sm:p-12">
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
  const showSlots = draft && full;
  const title = study.title.join(' ');

  usePageMeta({ title, description: study.description ?? project.description, noindex: draft });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [study.slug]);

  const blocks = useMemo(() => withIds(study.blocks), [study]);
  const sections = useMemo<RailSection[]>(
    () =>
      full
        ? blocks.flatMap(({ block, id }) =>
            id && (block.kind === 'section' || block.kind === 'outcomes') ? [{ id, title: block.kicker }] : [],
          )
        : [],
    [blocks, full],
  );

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      {sections.length > 1 && <SectionRail sections={sections} />}
      <ProjectRail currentSlug={project.slug} />

      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        {showSlots && (
          <p role="status" className="bg-ink px-(--gutter) py-2 text-center text-micro caps text-bone">
            Draft preview · not public · media slots show where real assets go
          </p>
        )}
        <article>
          <Hero study={study} project={project} />
          {study.cover && full && <MediaBand items={[study.cover]} showSlots={showSlots} priority />}
          <Overview study={study} />

          {full ? (
            blocks.map(({ block, id }, i) => {
              const key = `${study.slug}-${i}`;
              switch (block.kind) {
                case 'section':
                  return <Section key={key} id={id!} block={block} showSlots={showSlots} />;
                case 'insight':
                  return <Insight key={key} block={block} />;
                case 'media':
                  return <MediaBand key={key} items={block.items} caption={block.caption} wide={block.wide} showSlots={showSlots} />;
                case 'outcomes':
                  return <Outcomes key={key} id={id!} block={block} />;
              }
            })
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
