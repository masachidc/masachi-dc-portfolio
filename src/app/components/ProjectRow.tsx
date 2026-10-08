import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projectHref, type Project } from '../data/projects';
import { fadeUp, stagger, viewportOnce } from '../lib/motion';

/** Covers made at the homepage's wide-card size (1564 × 768, or 2000 × 982 for case-study covers) fill the frame as-is. */
const FRAME_RATIO = '1564 / 768';

/**
 * The average colour of an image's left and right edge columns, read once it loads (covers are same-origin), or null
 * until then.
 */
function useEdgeColor(src: string, enabled: boolean) {
  const [color, setColor] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      const h = 64;
      const w = Math.max(1, Math.round((image.naturalWidth / image.naturalHeight) * h));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx || cancelled) return;
      ctx.drawImage(image, 0, 0, w, h);
      let r = 0, g = 0, b = 0, n = 0;
      for (const x of [0, w - 1]) {
        const { data } = ctx.getImageData(x, 0, 1, h);
        for (let i = 0; i < data.length; i += 4) {
          r += data[i]; g += data[i + 1]; b += data[i + 2]; n++;
        }
      }
      setColor(`rgb(${Math.round(r / n)} ${Math.round(g / n)} ${Math.round(b / n)})`);
    };
    image.src = src;
    return () => {
      cancelled = true;
    };
  }, [src, enabled]);
  return color;
}

/**
 * A portrait cover (KESHO and INLINE are 768 × 1564) can't fill a landscape frame without losing most of its
 * composition, so it sits whole, at full height, on a ground matched to its own edges (grey surface until known).
 */
function Cover({ project: p }: { project: Project }) {
  const portrait = !!p.cover.portrait;
  const ground = useEdgeColor(p.cover.src, portrait);
  const img = 'transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100';
  return (
    <div
      className="relative overflow-hidden bg-surface transition-colors duration-500"
      style={{ aspectRatio: FRAME_RATIO, backgroundColor: ground ?? undefined }}
    >
      <img
        src={p.cover.src}
        alt=""
        decoding="async"
        loading="lazy"
        className={`absolute inset-0 h-full w-full ${portrait ? 'object-contain' : 'object-cover'} ${img}`}
        style={portrait ? undefined : { objectPosition: p.cover.position }}
      />
    </div>
  );
}

/**
 * One editorial row on a discipline page: a wide, clean cover (about two thirds of the row) beside its text.
 * `flip` puts the cover on the left. On phones and tablets the cover always comes first, then the text, so every row
 * reads the same way; the DOM order matches.
 *
 * The cover is a pointer shortcut to the same case study as the text link, so it is hidden from assistive tech and
 * the tab order: one link per project, named by its title.
 */
export function ProjectRow({
  project: p,
  number,
  summary,
  contribution,
  flip = false,
}: {
  project: Project;
  /** Position on this page, 1-based. */
  number: number;
  summary: string;
  contribution: string;
  flip?: boolean;
}) {
  const href = projectHref(p);
  const titleId = `row-${p.slug}`;
  return (
    <motion.article
      aria-labelledby={titleId}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={stagger(0, 0.12)}
      className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
    >
      <motion.div
        variants={fadeUp}
        className={`lg:col-span-8 lg:row-start-1 ${flip ? 'lg:col-start-1' : 'lg:col-start-5'}`}
      >
        <Link to={href} tabIndex={-1} aria-hidden="true" className="group block">
          <Cover project={p} />
        </Link>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className={`min-w-0 lg:col-span-4 lg:row-start-1 ${flip ? 'lg:col-start-9' : 'lg:col-start-1'}`}
      >
        <p className="mb-4 font-mono text-micro font-medium tracking-[0.1em] text-fg-subtle">
          N°{String(number).padStart(2, '0')}
          {p.year && (
            <>
              <span aria-hidden="true"> · </span>
              <span className="sr-only">, </span>
              {p.year}
            </>
          )}
        </p>
        <h3 id={titleId} className="font-display text-card-lg uppercase text-balance text-ink">
          {p.cardTitle}
        </h3>
        <p className="mt-4 max-w-(--measure) text-pretty text-body-lg text-fg-muted">{summary}</p>
        <p className="mt-5 text-micro caps text-fg-subtle">{contribution}</p>
        <Link
          to={href}
          className="group mt-8 inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink"
        >
          View case study
          <span className="sr-only">: {p.railTitle}</span>
          <ArrowUpRight
            size={12}
            strokeWidth={2}
            aria-hidden
            className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
          />
        </Link>
      </motion.div>
    </motion.article>
  );
}
