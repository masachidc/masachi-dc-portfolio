import { type MouseEvent, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { easeOut, viewportOnce } from '../lib/motion';

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

// entrance: a touch of scale-settle alongside the usual fade + rise
const cardEntrance = {
  hidden: { opacity: 0, y: 28, scale: 0.975 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: easeOut } },
};

// hover lift on the card itself — also the root the panel content reads its state from
const cardHover = {
  rest: { y: 0, transition: { duration: 0.4, ease: easeOut } },
  hover: { y: -8, transition: { duration: 0.5, ease: easeOut } },
};

// orchestrates the panel's children into a brief cascade instead of one flat fade
const panelStagger = {
  rest: { transition: { staggerChildren: 0.025, staggerDirection: -1 } },
  hover: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

const panelItem = {
  rest: { opacity: 0, y: 8, transition: { duration: 0.18, ease: easeOut } },
  hover: { opacity: 1, y: 0, transition: { duration: 0.32, ease: easeOut } },
};

export function ProjectCard({ project: p, className = '' }: ProjectCardProps) {
  const fg = p.foreground;
  const fgSoft = fg === '#ffffff' ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,11,0.65)';
  const fgFaint = fg === '#ffffff' ? 'rgba(255,255,255,0.4)' : 'rgba(10,10,11,0.45)';
  const fgBorder = fg === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(10,10,11,0.2)';
  const restShadow = '0 1px 2px rgba(10,10,11,0.05), 0 24px 48px -30px rgba(10,10,11,0.22)';
  const hoverShadow = `0 1px 2px rgba(10,10,11,0.06), 0 40px 70px -20px ${hexToRgba(p.accentDeep, 0.55)}`;

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

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={cardEntrance}
      className={`flex flex-col ${className}`}
    >
      <motion.a
        ref={cardRef}
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        data-project-anchor={p.id}
        onMouseMove={handleTilt}
        onMouseLeave={resetTilt}
        initial="rest"
        whileHover="hover"
        variants={cardHover}
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1000,
          '--rest-shadow': restShadow,
          '--hover-shadow': hoverShadow,
        } as never}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink shadow-[var(--rest-shadow)] transition-shadow duration-500 [transform-style:preserve-3d] hover:shadow-[var(--hover-shadow)] lg:aspect-auto lg:h-full"
      >
        <motion.img
          src={p.image}
          alt={`${p.cardTitle} — ${p.category}`}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: p.imagePosition, filter: 'saturate(0.92) brightness(0.88)', y: imgY }}
          whileHover={{ scale: 1.045 }}
          transition={{ duration: 0.9, ease: easeOut }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/15 to-transparent transition-opacity duration-500 md:group-hover:opacity-0" />

        {/* idle label */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 transition-opacity duration-300 md:group-hover:opacity-0">
          <p className="mb-1.5 flex items-center gap-1.5 font-mono text-[10px] font-medium tracking-[0.1em] text-bone/50">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
            N°{p.id} — {p.year}
          </p>
          <h3 className="font-display text-[26px] font-bold uppercase leading-none tracking-[-0.01em] text-bone">
            {p.cardTitle}
          </h3>
        </div>

        {/* hover panel — desktop only, bold saturated per-project color */}
        <motion.div
          variants={panelStagger}
          className="pointer-events-none absolute inset-0 z-20 hidden flex-col justify-between p-7 opacity-0 transition-opacity duration-[400ms] ease-out md:flex md:group-hover:opacity-100"
          style={{
            background: `linear-gradient(155deg, ${p.accent} 0%, ${p.accentDeep} 100%)`,
            color: fg,
          }}
        >
          <motion.div variants={panelItem} className="flex items-start justify-between">
            <span className="font-mono text-[11px] font-medium">N°{p.id}</span>
            <span
              className="text-[9px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: fgSoft }}
            >
              {p.year}
            </span>
          </motion.div>

          <div>
            <motion.p
              variants={panelItem}
              className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: fgFaint }}
            >
              {p.category}
            </motion.p>
            <motion.h3
              variants={panelItem}
              className="mb-4 font-display text-[30px] font-bold uppercase leading-[0.95] tracking-[-0.01em]"
              style={{ textShadow: `0 12px 28px ${hexToRgba(p.accentDeep, 0.55)}` }}
            >
              {p.cardTitle}
            </motion.h3>
            <motion.p
              variants={panelItem}
              className="mb-4 max-w-[34ch] text-[13px] leading-relaxed"
              style={{ color: fgSoft }}
            >
              {p.description}
            </motion.p>
            <motion.div variants={panelItem} className="mb-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{ borderColor: fgBorder, backgroundColor: hexToRgba(p.accentDeep, 0.28) }}
                >
                  {t}
                </span>
              ))}
            </motion.div>
            <motion.span
              variants={panelItem}
              className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
            >
              View project <ArrowUpRight size={12} strokeWidth={2.25} />
            </motion.span>
          </div>
        </motion.div>
      </motion.a>

      {/* static meta — mobile only, since hover has no touch equivalent */}
      <div className="mt-5 flex flex-col gap-3 md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: p.accent }} />
            {p.category}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
            {p.year}
          </p>
        </div>
        <p className="text-[14px] leading-relaxed text-ink/55">{p.description}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.tags.map((t) => (
            <span
              key={t}
              className="border border-ink/12 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-ink/55"
            >
              {t}
            </span>
          ))}
        </div>
        <a
          href={p.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em]"
          style={{ color: p.accent }}
        >
          View project <ArrowUpRight size={12} strokeWidth={2.25} />
        </a>
      </div>
    </motion.div>
  );
}
