import { type MouseEvent, useId, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projectHref, projectNumber, type Project } from '../data/projects';
import { isLightColor } from '../data/brands';
import { easeOut } from '../lib/motion';

const MotionLink = motion(Link);

// Off for now: the covers carry their own titles. Set true to bring back the
// resting title, summary and disciplines (and the scrim behind them).
const SHOW_RESTING_TEXT = true;

interface ProjectCardProps {
  project: Project;
  className?: string;
  /** The tall card in a desktop mosaic band: room for a larger title. */
  feature?: boolean;
}

function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
// Cards reveal as soon as any part is on screen (or about to be), so the ones
// peeking above the fold on first load animate in immediately instead of
// waiting for a scroll. The shared viewportOnce inset would hold them back.
const cardViewport = { once: true, margin: '0px 0px 15% 0px' } as const;

const cardEntrance = {
  hidden: { opacity: 0, y: 28, scale: 0.975 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: easeOut } },
};

const cardHover = {
  rest: { y: 0, transition: { duration: 0.4, ease: easeOut } },
  hover: { y: -4, transition: { duration: 0.5, ease: easeOut } },
};

const panelStagger = {
  rest: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

const panelItem = {
  rest: { opacity: 0, y: 8, transition: { duration: 0.18, ease: easeOut } },
  hover: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
};

/**
 * The card's status stamp (SHIPPED / BUILD): a solid tag with the word cut
 * out of it, so the cover shows through the letters. Sized from the label, so
 * it hugs the text like an auto-layout frame.
 */
function StatusMark({ label }: { label: string }) {
  const maskId = `mark-${useId().replace(/:/g, '')}`;
  const padX = 10;
  const charW = 8.6;
  const textW = label.length * charW;
  const w = Math.round(textW + padX * 2);
  const h = 26;
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      className="shrink-0"
    >
      <mask id={maskId}>
        <rect width={w} height={h} rx={4} fill="white" />
        <text
          x={padX}
          y={h / 2}
          dominantBaseline="central"
          textLength={textW}
          lengthAdjust="spacingAndGlyphs"
          fill="black"
          className="font-display"
          style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.06em' }}
        >
          {label}
        </text>
      </mask>
      {/* tint seen only through the letters, so the cutout reads on light covers too */}
      <rect width={w} height={h} rx={4} fill="var(--color-ink-deep)" fillOpacity={0.8} />
      <rect width={w} height={h} rx={4} fill="var(--color-accent)" mask={`url(#${maskId})`} />
    </svg>
  );
}

function CardInner({ p, imgY, feature }: {
  p: Project;
  imgY: ReturnType<typeof useTransform>;
  feature: boolean;
}) {
  const titleClass = `font-display uppercase text-balance ${feature ? 'text-card-lg' : 'text-card'}`;
  const meta = `N°${projectNumber(p)}${p.year ? ` · ${p.year}` : ''}`;
  const { primary } = p.brand;
  const deep = p.brand.primaryDeep ?? primary;
  // light brand colours (e.g. TEMBO yellow) need ink text on the wash, not white
  const light = isLightColor(deep);
  return (
    <>
      <motion.img
        src={p.cover.src}
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: p.cover.position, filter: 'saturate(0.92) brightness(0.88)', y: imgY }}
        whileHover={{ scale: 1.025 }}
        transition={{ duration: 0.9, ease: easeOut }}
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
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-5 transition-opacity duration-300 sm:p-6 md:group-hover:opacity-0">
          <div className="min-w-0">
            <p className="mb-3 font-mono text-micro font-medium tracking-[0.1em] text-bone/65">{meta}</p>
            <h3 className={`${titleClass} text-bone`}>{p.cardTitle}</h3>
            <p className="mt-2 max-w-(--measure) text-body font-medium text-bone/90">{p.summary}</p>
            <p className="mt-3 text-micro caps text-bone/65">{p.disciplines}</p>
          </div>
          <StatusMark label={p.mark} />
        </div>
        </>
      )}

      {/*
        Hover detail panel: a project-colour wash over the still-visible image,
        adding the why (description) rather than repeating the resting summary.
        Decorative duplicate of the card's content, hidden from assistive tech.
      */}
      <motion.div
        aria-hidden="true"
        variants={panelStagger}
        className={`pointer-events-none absolute inset-0 z-20 hidden flex-col justify-end p-7 opacity-0 transition-opacity duration-300 ease-out md:flex md:group-hover:opacity-100 ${light ? 'text-ink' : 'text-white'}`}
        style={{
          // densest behind the text (bottom-left), lighter toward the image's far corner
          background: `linear-gradient(to right, ${hexToRgba(deep, 0.4)} 0%, ${hexToRgba(deep, 0)} 70%), linear-gradient(to top, ${hexToRgba(deep, 0.97)} 0%, ${hexToRgba(deep, 0.9)} 50%, ${hexToRgba(primary, 0.55)} 100%)`,
        }}
      >
        <motion.p variants={panelItem} className={`mb-3 font-mono text-micro font-medium tracking-[0.1em] ${light ? 'text-ink/70' : 'text-white/70'}`}>
          {meta}
        </motion.p>
        <motion.p variants={panelItem} className={`mb-3 ${titleClass}`}>
          {p.cardTitle}
        </motion.p>
        <motion.p variants={panelItem} className={`mb-5 max-w-[36ch] text-body ${light ? 'text-ink/85' : 'text-white/85'}`}>
          {p.description}
        </motion.p>
        <motion.span
          variants={panelItem}
          className={`inline-flex items-center gap-1.5 self-start border-b pb-1 text-label caps ${light ? 'border-ink/30' : 'border-white/30'}`}
        >
          View case study <ArrowUpRight size={12} strokeWidth={2.25} />
        </motion.span>
      </motion.div>
    </>
  );
}

export function ProjectCard({ project: p, className = '', feature = false }: ProjectCardProps) {
  const restShadow = '0 1px 2px rgba(10,10,11,0.05), 0 24px 48px -30px rgba(10,10,11,0.22)';
  const hoverShadow = `0 1px 2px rgba(10,10,11,0.06), 0 32px 60px -24px ${hexToRgba(p.brand.primaryDeep ?? p.brand.primary, 0.4)}`;
  const href = projectHref(p);
  const isInternal = !p.externalUrl;
  const linkLabel = `${p.railTitle} (${p.mark.toLowerCase()}): ${p.summary}. ${p.disciplines}. View case study`;

  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const reduceMotion = useReducedMotion();
  const imgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [-22, 22]);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 22, mass: 0.5 });

  function handleTilt(e: MouseEvent<HTMLAnchorElement>) {
    const el = cardRef.current;
    if (!el || reduceMotion) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * 3);
    rotateXRaw.set(py * -3);
  }

  function resetTilt() {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  }

  const sharedCardProps = {
    'data-project-anchor': p.slug,
    'aria-label': linkLabel,
    onMouseMove: handleTilt,
    onMouseLeave: resetTilt,
    initial: 'rest' as const,
    whileHover: 'hover' as const,
    variants: cardHover,
    style: {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      '--rest-shadow': restShadow,
      '--hover-shadow': hoverShadow,
    } as never,
    className: 'group relative block aspect-square w-full overflow-hidden min-[380px]:aspect-[4/3] sm:aspect-[4/5] bg-ink shadow-[var(--rest-shadow)] transition-shadow duration-500 [transform-style:preserve-3d] hover:shadow-[var(--hover-shadow)] lg:aspect-auto lg:h-full',
  };

  const innerProps = { p, imgY, feature };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={cardViewport}
      variants={cardEntrance}
      className={`flex flex-col ${className}`}
    >
      {isInternal ? (
        <MotionLink ref={cardRef as never} to={href} {...sharedCardProps}>
          <CardInner {...innerProps} />
        </MotionLink>
      ) : (
        <motion.a
          ref={cardRef}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          {...sharedCardProps}
        >
          <CardInner {...innerProps} />
        </motion.a>
      )}

      {/* why it's interesting — below the card on touch screens, where there's no hover */}
      <p className="mt-4 text-body text-fg-muted md:hidden">{p.description}</p>
    </motion.div>
  );
}
