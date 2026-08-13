import { type MouseEvent, useRef } from 'react';
import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { easeOut, fadeUp, viewportOnce } from '../lib/motion';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project: p, className = '' }: ProjectCardProps) {
  const fg = p.foreground;
  const fgSoft = fg === '#ffffff' ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,11,0.65)';
  const fgFaint = fg === '#ffffff' ? 'rgba(255,255,255,0.4)' : 'rgba(10,10,11,0.45)';
  const fgBorder = fg === '#ffffff' ? 'rgba(255,255,255,0.25)' : 'rgba(10,10,11,0.2)';

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
      variants={fadeUp}
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
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink [transform-style:preserve-3d] lg:aspect-auto lg:h-full"
      >
        <motion.img
          src={p.image}
          alt={`${p.title} — ${p.subtitle}`}
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
            {p.title}
          </h3>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/45">
            {p.subtitle}
          </p>
        </div>

        {/* hover panel — desktop only, bold saturated per-project color */}
        <div
          className="pointer-events-none absolute inset-0 z-20 hidden flex-col justify-between p-7 opacity-0 transition-opacity duration-[400ms] ease-out md:flex md:group-hover:opacity-100"
          style={{ backgroundColor: p.accent, color: fg }}
        >
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] font-medium">N°{p.id}</span>
            <span
              className="text-[9px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: fgSoft }}
            >
              {p.year}
            </span>
          </div>

          <div>
            <p
              className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em]"
              style={{ color: fgFaint }}
            >
              {p.category}
            </p>
            <h3 className="font-display text-[30px] font-bold uppercase leading-[0.95] tracking-[-0.01em]">
              {p.title}
            </h3>
            <p
              className="mb-4 mt-1 text-[10px] font-semibold uppercase tracking-[0.2em]"
              style={{ color: fgFaint }}
            >
              {p.subtitle}
            </p>
            <p className="mb-4 max-w-[34ch] text-[13px] leading-relaxed" style={{ color: fgSoft }}>
              {p.description}
            </p>
            <div className="mb-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em]"
                  style={{ borderColor: fgBorder }}
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
              View project <ArrowUpRight size={12} strokeWidth={2.25} />
            </span>
          </div>
        </div>
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
