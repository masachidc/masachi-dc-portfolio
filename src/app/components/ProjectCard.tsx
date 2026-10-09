import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projectHref, projectNumber, type Project } from '../data/projects';
import { isLightColor } from '../data/brands';
import { StatusMark } from './StatusMark';
import { easeOut } from '../lib/motion';

// The resting title, summary and disciplines (and the scrim behind them).
// Set false to hide them when the covers carry their own titles. The status
// mark shows either way.
const SHOW_RESTING_TEXT = false;

interface ProjectCardProps {
  project: Project;
  className?: string;
  /** The tall card in a desktop mosaic band: room for a larger title. */
  feature?: boolean;
  /** Display number ("01"); defaults to the project's place in Selected work. */
  number?: string;
}

// Cards reveal as soon as any part is on screen (or about to be), so the ones
// peeking above the fold on first load animate in immediately instead of
// waiting for a scroll. The shared viewportOnce inset would hold them back.
const cardViewport = { once: true, margin: '0px 0px 15% 0px' } as const;

const cardEntrance = {
  hidden: { opacity: 0, y: 28, scale: 0.975 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: easeOut } },
};

/** Visible stamp. BUILD reads as BUILT; the accessible name uses the same word. */
function statusStamp(mark: Project['mark']) {
  return mark === 'BUILD' ? 'BUILT' : mark;
}

function CardInner({ p, feature, number }: {
  p: Project;
  feature: boolean;
  number: string;
}) {
  const titleClass = `font-display uppercase text-balance ${feature ? 'text-card-lg' : 'text-card'}`;
  const meta = `N°${number}${p.year ? ` · ${p.year}` : ''}`;
  const { primary } = p.brand;
  const deep = p.brand.primaryDeep ?? primary;
  // light brand colours (e.g. TEMBO yellow) need ink text on the wash, not white
  const light = isLightColor(deep);
  return (
    <>
      <img
        src={p.cover.src}
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: p.cover.position }}
      />

      {SHOW_RESTING_TEXT && (
        <>
        {/* scrim only in the bottom-left corner, behind the text */}
        <div
          className="absolute inset-0 transition-opacity duration-500 md:group-hover:opacity-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 70% at 0% 100%, color-mix(in srgb, var(--color-ink-deep) 93%, transparent) 0%, color-mix(in srgb, var(--color-ink-deep) 60%, transparent) 45%, transparent 100%)',
          }}
        />

        {/*
          At rest the card answers, in reading order: what it is (title), why it
          matters (summary), what Nathan did (disciplines). Number and year stay quiet.
        */}
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 pr-32 transition-opacity duration-300 sm:p-6 sm:pr-32 md:group-hover:opacity-0">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-micro font-medium tracking-[0.1em] text-bone/65">{meta}</p>
            <h3 className={`${titleClass} text-bone`}>{p.cardTitle}</h3>
            <p className="mt-2 max-w-(--measure) text-body font-medium text-bone/90">{p.summary}</p>
            <p className="mt-3 text-micro caps text-bone/65">{p.disciplines}</p>
          </div>
        </div>
        </>
      )}

      {/* Status stays visible above both the cover and hover-credit states. */}
      <div className="absolute bottom-0 right-0 z-30 p-5 sm:p-6">
        <StatusMark label={statusStamp(p.mark)} />
      </div>

      {/*
        Hover detail panel: one solid fill of the project colour over the image,
        adding the why (description) rather than repeating the resting summary.
        Decorative duplicate of the card's content, hidden from assistive tech.
      */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-20 hidden flex-col justify-end p-7 opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none md:flex md:group-hover:opacity-100 md:group-focus-visible:opacity-100 ${light ? 'text-ink' : 'text-white'}`}
        style={{ background: deep }}
      >
        {p.credits && (
          <div className="absolute right-7 top-7 max-w-[23ch] text-right">
            {p.credits.disciplines.map((discipline) => (
              <p key={discipline} className={`text-small font-normal ${light ? 'text-ink' : 'text-white'}`}>{discipline}</p>
            ))}
          </div>
        )}
        <p className={`mb-3 font-mono text-micro font-medium tracking-[0.1em] ${light ? 'text-ink/70' : 'text-white/70'}`}>
          {meta}
        </p>
        <p className={`mb-3 ${titleClass}`}>
          {p.cardTitle}
        </p>
        <p className={`mb-5 max-w-[36ch] text-body ${light ? 'text-ink/85' : 'text-white/85'}`}>
          {p.description}
        </p>
        <span
          className={`inline-flex items-center gap-1.5 self-start border-b pb-1 text-label caps ${light ? 'border-ink/30' : 'border-white/30'}`}
        >
          View case study <ArrowUpRight size={12} strokeWidth={2.25} />
        </span>
      </div>
    </>
  );
}

/** Cover, clipped. Depth lives on .work-card and the cast ellipse beside it. */
const cardSurface = [
  'work-card group block aspect-square w-full overflow-hidden bg-ink',
  'min-[380px]:aspect-[4/3] sm:aspect-[4/5] lg:aspect-auto lg:h-full',
].join(' ');

export function ProjectCard({ project: p, className = '', feature = false, number = projectNumber(p) }: ProjectCardProps) {
  const href = projectHref(p);
  const isInternal = !p.externalUrl;
  const creditLabel = p.credits ? ` Disciplines: ${p.credits.disciplines.join(', ')}.` : '';
  const linkLabel = `${p.railTitle} (${statusStamp(p.mark).toLowerCase()}): ${p.summary}. ${p.disciplines}.${creditLabel} View case study`;

  const sharedCardProps = {
    'data-project-anchor': p.slug,
    'aria-label': linkLabel,
    className: cardSurface,
  };

  const innerProps = { p, feature, number };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={cardViewport}
      variants={cardEntrance}
      className={`flex flex-col ${className}`}
    >
      <div className="work-stage">
        <span aria-hidden="true" className="work-shadow" />
        {isInternal ? (
          <Link to={href} {...sharedCardProps}>
            <CardInner {...innerProps} />
          </Link>
        ) : (
          <a href={href} target="_blank" rel="noopener noreferrer" {...sharedCardProps}>
            <CardInner {...innerProps} />
          </a>
        )}
      </div>

      {/* Sighted touch fallback. The link name already includes this, so it stays out of the accessibility tree. */}
      <p aria-hidden="true" className="mt-4 text-body text-fg-muted md:hidden">{p.description}</p>
    </motion.div>
  );
}
