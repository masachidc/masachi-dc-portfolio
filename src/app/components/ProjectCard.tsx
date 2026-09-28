import { type MouseEvent, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projectHref, projectNumber, type Project } from '../data/projects';
import { easeOut, viewportOnce } from '../lib/motion';

const MotionLink = motion(Link);

interface ProjectCardProps {
  project: Project;
  className?: string;
}

function hexToRgba(hex: string, alpha: number) {
  const n = parseInt(hex.replace('#', ''), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const cardEntrance = {
  hidden: { opacity: 0, y: 28, scale: 0.975 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: easeOut } },
};

const cardHover = {
  rest: { y: 0, transition: { duration: 0.4, ease: easeOut } },
  hover: { y: -8, transition: { duration: 0.5, ease: easeOut } },
};

const panelStagger = {
  rest: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

const panelItem = {
  rest: { opacity: 0, y: 8, transition: { duration: 0.18, ease: easeOut } },
  hover: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
};

function CardInner({ p, imgY, fg, fgSoft, fgFaint, fgBorder, hexToRgbaFn }: {
  p: Project;
  imgY: ReturnType<typeof useTransform>;
  fg: string;
  fgSoft: string;
  fgFaint: string;
  fgBorder: string;
  hexToRgbaFn: typeof hexToRgba;
}) {
  return (
    <>
      <motion.img
        src={p.image}
        alt=""
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: p.imagePosition, filter: 'saturate(0.92) brightness(0.88)', y: imgY }}
        whileHover={{ scale: 1.045 }}
        transition={{ duration: 0.9, ease: easeOut }}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/15 to-transparent transition-opacity duration-500 md:group-hover:opacity-0" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 transition-opacity duration-300 md:group-hover:opacity-0">
        <p className="mb-1.5 flex items-center gap-1.5 font-mono text-micro font-medium tracking-[0.1em] text-bone/70">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
          N°{projectNumber(p)} — {p.year}
        </p>
        <h3 className="font-display text-card uppercase text-bone">{p.cardTitle}</h3>
      </div>

      {/* Hover detail panel: decorative duplicate of the card's content, hidden from assistive tech. */}
      <motion.div
        aria-hidden="true"
        variants={panelStagger}
        className="pointer-events-none absolute inset-0 z-20 hidden flex-col justify-between p-7 opacity-0 transition-opacity duration-[400ms] ease-out md:flex md:group-hover:opacity-100"
        style={{
          background: `linear-gradient(155deg, ${p.accent} 0%, ${p.accentDeep} 100%)`,
          color: fg,
        }}
      >
        <motion.div variants={panelItem} className="flex items-start justify-between">
          <span className="font-mono text-label font-medium tracking-normal">N°{projectNumber(p)}</span>
          <span className="text-micro caps" style={{ color: fgSoft }}>
            {p.year}
          </span>
        </motion.div>

        <div>
          <motion.p
            variants={panelItem}
            className="mb-2 text-micro caps"
            style={{ color: fgFaint }}
          >
            {p.category}
          </motion.p>
          <motion.p
            variants={panelItem}
            className="mb-4 font-display text-card uppercase"
            style={{ textShadow: `0 12px 28px ${hexToRgbaFn(p.accentDeep, 0.55)}` }}
          >
            {p.cardTitle}
          </motion.p>
          <motion.p
            variants={panelItem}
            className="mb-4 max-w-[34ch] text-small"
            style={{ color: fgSoft }}
          >
            {p.description}
          </motion.p>
          <motion.div variants={panelItem} className="mb-5 flex flex-wrap gap-1.5">
            {p.tags.map((t) => (
              <span
                key={t}
                className="border px-2.5 py-1 text-micro caps tracking-[0.14em]"
                style={{ borderColor: fgBorder, backgroundColor: hexToRgbaFn(p.accentDeep, 0.28) }}
              >
                {t}
              </span>
            ))}
          </motion.div>
          <motion.span
            variants={panelItem}
            className="inline-flex items-center gap-1.5 text-micro caps tracking-[0.18em]"
          >
            View project <ArrowUpRight size={12} strokeWidth={2.25} />
          </motion.span>
        </div>
      </motion.div>
    </>
  );
}

export function ProjectCard({ project: p, className = '' }: ProjectCardProps) {
  const fg = p.foreground;
  const fgSoft = fg === '#ffffff' ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,11,0.65)';
  const fgFaint = fg === '#ffffff' ? 'rgba(255,255,255,0.4)' : 'rgba(10,10,11,0.45)';
  const fgBorder = fg === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(10,10,11,0.2)';
  const restShadow = '0 1px 2px rgba(10,10,11,0.05), 0 24px 48px -30px rgba(10,10,11,0.22)';
  const hoverShadow = `0 1px 2px rgba(10,10,11,0.06), 0 40px 70px -20px ${hexToRgba(p.accentDeep, 0.55)}`;
  const href = projectHref(p);
  const isInternal = !p.externalUrl;
  const linkLabel = `${p.railTitle} — ${p.category}, ${p.year}. View case study`;

  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ['start end', 'end start'] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-22, 22]);

  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);
  const rotateX = useSpring(rotateXRaw, { stiffness: 200, damping: 22, mass: 0.5 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 200, damping: 22, mass: 0.5 });

  function handleTilt(e: MouseEvent<HTMLAnchorElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateYRaw.set(px * 6);
    rotateXRaw.set(py * -6);
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
    className: 'group relative block aspect-[4/5] w-full overflow-hidden bg-ink shadow-[var(--rest-shadow)] transition-shadow duration-500 [transform-style:preserve-3d] hover:shadow-[var(--hover-shadow)] lg:aspect-auto lg:h-full',
  };

  const innerProps = { p, imgY, fg, fgSoft, fgFaint, fgBorder, hexToRgbaFn: hexToRgba };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
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

      {/* static meta — mobile only */}
      <div className="mt-5 flex flex-col gap-3 md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="flex items-center gap-1.5 text-micro caps text-fg-subtle">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
            {p.category}
          </p>
          <p className="text-micro caps text-fg-subtle">{p.year}</p>
        </div>
        <p className="text-body text-fg-muted">{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="border border-line px-2.5 py-1 text-micro caps tracking-[0.14em] text-fg-muted"
            >
              {t}
            </span>
          ))}
        </div>
        {isInternal ? (
          <Link
            to={href}
            aria-label={linkLabel}
            className="mt-1 inline-flex w-fit items-center gap-1.5 py-2 text-label caps text-ink"
          >
            View project <ArrowUpRight size={12} strokeWidth={2.25} aria-hidden />
          </Link>
        ) : (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${linkLabel} (opens in a new tab)`}
            className="mt-1 inline-flex w-fit items-center gap-1.5 py-2 text-label caps text-ink"
          >
            View project <ArrowUpRight size={12} strokeWidth={2.25} aria-hidden />
          </a>
        )}
      </div>
    </motion.div>
  );
}
