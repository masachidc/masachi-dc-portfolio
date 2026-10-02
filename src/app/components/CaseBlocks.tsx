import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { MediaBand } from './MediaBand';
import type { RailSection } from './SectionRail';
import type { CaseBlock } from '../data/caseStudies';
import { fadeUp, viewportOnce } from '../lib/motion';

// ── Case-study grammar ──────────────────────────────────────────────────────
// Shared by case studies and their deep dives. Widths: prose sits in the
// reading column at --measure; standard media fills the reading column (960px);
// `wide` media breaks out to the site container.
// Primitives: chapter, section, insight, media band, outcomes.

const reveal = { initial: 'hidden', whileInView: 'show', viewport: viewportOnce } as const;

type Anchored = Extract<CaseBlock, { kind: 'chapter' | 'section' | 'outcomes' }>;

const isAnchored = (b: CaseBlock): b is Anchored => b.kind === 'chapter' || b.kind === 'section' || b.kind === 'outcomes';

const anchorText = (b: Anchored) => (b.kind === 'chapter' ? b.label : b.kicker);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

/** Stable, unique ids for rail targets, derived from kickers (or chapter labels) unless set explicitly. */
export function withIds(blocks: CaseBlock[]) {
  const seen = new Map<string, number>();
  return blocks.map((b) => {
    if (!isAnchored(b)) return { block: b, id: undefined };
    const base = b.id ?? slugify(anchorText(b));
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return { block: b, id: n ? `${base}-${n + 1}` : base };
  });
}

/** Rail entries: chapters only when a story is organised into chapters, otherwise every section and outcome. */
export function railSections(blocks: ReturnType<typeof withIds>): RailSection[] {
  const chaptered = blocks.some(({ block }) => block.kind === 'chapter');
  return blocks.flatMap(({ block, id }) =>
    id && isAnchored(block) && (!chaptered || block.kind === 'chapter') ? [{ id, title: anchorText(block) }] : [],
  );
}

/** Section lead-in: bold and muted, nearly title-sized. */
function Kicker({ children }: { children: ReactNode }) {
  return <p className="mb-1 font-display text-kicker text-fg-faint">{children}</p>;
}

/** Opens a chapter of a long story: hairline, label, headline, optional lede. Its sections sit beneath it. */
function Chapter({ id, block }: { id: string; block: Extract<CaseBlock, { kind: 'chapter' }> }) {
  return (
    <motion.header
      id={id}
      {...reveal}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
      className="container-reading pt-(--space-section)"
    >
      <div className="border-t border-ink pt-6">
        <motion.p variants={fadeUp} className="text-label caps text-accent-deep">
          {block.label}
        </motion.p>
        <motion.h2 variants={fadeUp} className="mt-4 max-w-[20ch] text-pretty font-display text-headline text-ink">
          {block.title}
        </motion.h2>
        {block.lede && (
          <motion.p variants={fadeUp} className="mt-6 max-w-[44ch] text-pretty text-lede text-fg-muted">
            {block.lede}
          </motion.p>
        )}
      </div>
    </motion.header>
  );
}

function Section({
  id,
  block,
  review,
  nested,
}: {
  id: string;
  block: Extract<CaseBlock, { kind: 'section' }>;
  review: boolean;
  /** Inside a chapter: the section title becomes an h3 under the chapter's h2. */
  nested: boolean;
}) {
  const Heading = nested ? 'h3' : 'h2';
  return (
    <>
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
            <Heading id={`${id}-title`} className="font-display text-title text-ink/85">
              {block.title}
            </Heading>
          </motion.div>
          <motion.div variants={fadeUp} className="max-w-(--measure) space-y-5 text-body-lg text-fg-muted">
            {block.body}
          </motion.div>
        </div>
      </motion.section>
      {/* Section media uses the same full-bleed band as media blocks: one grey treatment everywhere. */}
      {block.media && <MediaBand items={[block.media]} review={review} />}
    </>
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

function Outcomes({ id, block, nested }: { id: string; block: Extract<CaseBlock, { kind: 'outcomes' }>; nested: boolean }) {
  // Word values ("Approved") don't fit stat-size columns: give them title size and a wider grid.
  const words = block.items.some((s) => s.value.length > 4);
  const Heading = nested ? motion.h3 : motion.h2;
  return (
    <motion.section
      id={id}
      aria-labelledby={`${id}-title`}
      {...reveal}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className="container-reading section-y"
    >
      <Heading id={`${id}-title`} variants={fadeUp} className="mb-12 font-display text-kicker text-fg-faint">
        {block.kicker}
      </Heading>
      <dl className={`grid gap-x-8 ${words ? 'grid-cols-1 gap-y-10 md:grid-cols-3' : 'grid-cols-2 gap-y-12 md:grid-cols-4'}`}>
        {block.items.map((s, i) => (
          <motion.div key={`${s.label}-${i}`} variants={fadeUp} className="flex flex-col-reverse gap-2">
            <dt className="text-small text-fg-subtle">{s.label}</dt>
            <dd className={`font-display text-accent ${words ? 'text-title' : 'text-stat'}`}>{s.value}</dd>
          </motion.div>
        ))}
      </dl>
    </motion.section>
  );
}

/** Renders a story's blocks in order. `review` adds author-only detail to media slots. */
export function CaseBlocks({ blocks, keyPrefix, review }: { blocks: ReturnType<typeof withIds>; keyPrefix: string; review: boolean }) {
  let inChapter = false;
  return (
    <>
      {blocks.map(({ block, id }, i) => {
        const key = `${keyPrefix}-${i}`;
        switch (block.kind) {
          case 'chapter':
            inChapter = true;
            return <Chapter key={key} id={id!} block={block} />;
          case 'section':
            return <Section key={key} id={id!} block={block} review={review} nested={inChapter} />;
          case 'insight':
            return <Insight key={key} block={block} />;
          case 'media':
            return <MediaBand key={key} items={block.items} caption={block.caption} wide={block.wide} review={review} />;
          case 'outcomes':
            return <Outcomes key={key} id={id!} block={block} nested={inChapter} />;
        }
      })}
    </>
  );
}
