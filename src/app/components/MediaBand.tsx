import { motion } from 'motion/react';
import type { Media } from '../data/caseStudies';
import { fadeUp, viewportOnce } from '../lib/motion';

// The one way to show an image in page content. Every image sits in a full-bleed
// grey band: `bg-surface` spans 100% of the viewport, the image sits in the reading
// column (or the site container when `wide`). Never wrap an image in a padded grey card.
//
//   <MediaBand items={[{ slot: 'Checkout flow', ratio: '16/9', src: '/img/checkout.png', alt: '…' }]} />
//
// Omit `src` until the asset exists: the slot renders as a labelled placeholder everywhere.

const reveal = { initial: 'hidden', whileInView: 'show', viewport: viewportOnce } as const;

/**
 * One media slot. With `src`: a lazy image in a reserved box (no layout shift).
 * Without: a labelled placeholder in the same box, so dev, preview, and production render identically.
 * `review` adds author-only detail (the reserved ratio) in local dev and draft preview.
 */
function MediaSlot({ media, review, priority = false }: { media: Media; review: boolean; priority?: boolean }) {
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
  return (
    <div
      role="img"
      aria-label={`Image coming soon: ${media.slot}`}
      className="flex w-full flex-col items-center justify-center gap-2 rounded-[6px] border-2 border-dashed border-ink/15 bg-bone p-6 text-center"
      style={{ aspectRatio: media.ratio }}
    >
      <span className="text-micro caps text-fg-subtle">Image coming soon</span>
      <span className="max-w-[32ch] text-small text-fg-muted">{media.slot}</span>
      {review && <span className="font-mono text-micro text-fg-subtle">{media.ratio}</span>}
    </div>
  );
}

/** Full-bleed soft-grey band holding one, two, or three media items. */
export function MediaBand({
  items,
  caption,
  wide = false,
  review = false,
  priority = false,
}: {
  items: Media[];
  caption?: string;
  wide?: boolean;
  review?: boolean;
  priority?: boolean;
}) {
  if (!items.length) return null;
  const cols = items.length === 1 ? '' : items.length === 2 ? 'grid gap-4 sm:grid-cols-2 sm:gap-6' : 'grid grid-cols-2 gap-4 md:grid-cols-3';
  return (
    <motion.figure {...reveal} variants={fadeUp} className="w-full bg-surface section-y">
      <div className={wide ? 'container-site' : 'container-reading'}>
        <div className={cols}>
          {items.map((m, i) => (
            <MediaSlot key={`${m.slot}-${i}`} media={m} review={review} priority={priority && i === 0} />
          ))}
        </div>
      </div>
      {caption && <figcaption className="container-reading mt-6 text-center text-small text-fg-subtle">{caption}</figcaption>}
    </motion.figure>
  );
}
