import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { MOBILE_COVER, projectHref, projectNumber, type Project } from '../data/projects';
import { isLightColor } from '../data/brands';
import { StatusMark } from './StatusMark';
import { easeOut } from '../lib/motion';

interface ProjectCardProps {
  project: Project;
  className?: string;
  /** The tall card in a desktop mosaic band: room for a larger title on the hover panel. */
  feature?: boolean;
  /** Display number ("01"); defaults to the project's place in Selected work. */
  number?: string;
  /** Above-the-fold cover: load immediately. Later cards wait until they near the viewport. */
  priority?: boolean;
  /** Desktop mosaic. The other layout is not mounted, so each card only references one cover. */
  mosaic?: boolean;
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

function CardInner({ p, feature, number, priority, mosaic }: {
  p: Project;
  feature: boolean;
  number: string;
  priority: boolean;
  mosaic: boolean;
}) {
  const titleClass = `font-display uppercase text-balance ${feature ? 'text-card-lg' : 'text-card'}`;
  const meta = `N°${number}${p.year ? ` · ${p.year}` : ''}`;
  const deep = p.brand.primaryDeep ?? p.brand.primary;
  // light brand colours (e.g. TEMBO yellow) need ink text on the wash, not white
  const light = isLightColor(deep);
  const mobile = !mosaic ? p.cover.mobile : undefined;
  return (
    <>
      {/*
        Phone and tablet: one 4:3 frame, flush to the card edges, using the
        mobile file (800w / 1600w). Desktop: the frame fills the mosaic cell
        and uses the original cover. Only the mounted layout is in the DOM,
        so the other file is never requested.
      */}
      <div className="relative aspect-[4/3] w-full bg-surface lg:absolute lg:inset-0 lg:aspect-auto">
        <img
          src={mobile?.src ?? p.cover.src}
          srcSet={mobile?.srcSet}
          sizes={mobile ? MOBILE_COVER.sizes : undefined}
          alt=""
          width={mobile ? MOBILE_COVER.width : undefined}
          height={mobile ? MOBILE_COVER.height : undefined}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: p.cover.position }}
        />

        {/* Status stays on the cover at desktop, above both the artwork and the hover panel. */}
        <div className="absolute bottom-0 right-0 z-30 hidden p-5 sm:p-6 lg:block">
          <StatusMark label={statusStamp(p.mark)} />
        </div>

        {/*
          Hover detail panel: one solid fill of the project colour over the image,
          adding the why (description) rather than repeating the resting summary.
          Desktop pointer and keyboard only. Touch layouts use the footer instead.
          Decorative duplicate of the card's content, hidden from assistive tech.
        */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-20 hidden flex-col justify-end p-7 opacity-0 transition-opacity duration-300 ease-out motion-reduce:transition-none lg:flex lg:group-hover:opacity-100 lg:group-focus-visible:opacity-100 ${light ? 'text-ink' : 'text-white'}`}
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
      </div>

      {/* Touch layouts: title and discipline live in the card, not under it. */}
      <div className="bg-paper px-5 py-4 text-left sm:px-6 sm:py-5 lg:hidden">
        <p className="font-display text-card uppercase text-balance text-ink">{p.cardTitle}</p>
        <p className="mt-1.5 text-small text-pretty text-fg-muted">{p.disciplines}</p>
      </div>
    </>
  );
}

/** Cover, clipped, with the editorial footer on touch layouts. Depth lives on .work-card. */
const cardSurface = 'work-card group relative block w-full overflow-hidden bg-paper lg:h-full';

export function ProjectCard({
  project: p,
  className = '',
  feature = false,
  number = projectNumber(p),
  priority = false,
  mosaic = false,
}: ProjectCardProps) {
  const href = projectHref(p);
  const isInternal = !p.externalUrl;
  const creditLabel = p.credits ? ` Disciplines: ${p.credits.disciplines.join(', ')}.` : '';
  const linkLabel = `${p.railTitle} (${statusStamp(p.mark).toLowerCase()}): ${p.summary}. ${p.disciplines}.${creditLabel} View case study`;

  const sharedCardProps = {
    'data-project-anchor': p.slug,
    'aria-label': linkLabel,
    className: cardSurface,
  };

  const innerProps = { p, feature, number, priority, mosaic };

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
    </motion.div>
  );
}
