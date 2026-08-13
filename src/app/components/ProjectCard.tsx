import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/projects';
import { fadeUp, viewportOnce } from '../lib/motion';

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project: p, className = '' }: ProjectCardProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className={`flex flex-col ${className}`}
    >
      <a
        href={p.link}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[4/5] w-full overflow-hidden bg-ink lg:aspect-auto lg:h-full"
      >
        <img
          src={p.image}
          alt={`${p.title} — ${p.subtitle}`}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] md:group-hover:scale-[1.035]"
          style={{ objectPosition: p.imagePosition, filter: 'saturate(0.92) brightness(0.88)' }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/90 via-ink-deep/15 to-transparent transition-opacity duration-500 md:group-hover:opacity-0" />

        {/* idle label */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-6 transition-opacity duration-300 md:group-hover:opacity-0">
          <p className="mb-1.5 font-mono text-[10px] font-medium tracking-[0.1em] text-bone/50">
            N°{p.id} — {p.year}
          </p>
          <h3 className="font-display text-[26px] font-bold uppercase leading-none tracking-[-0.01em] text-bone">
            {p.title}
          </h3>
          <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-bone/45">
            {p.subtitle}
          </p>
        </div>

        {/* hover panel — desktop only, one restrained treatment for every card */}
        <div className="pointer-events-none absolute inset-0 z-20 hidden flex-col justify-between border-t-2 border-accent bg-ink-deep/[0.94] p-7 opacity-0 transition-opacity duration-500 ease-out md:flex md:group-hover:opacity-100">
          <div className="flex items-start justify-between">
            <span className="font-mono text-[11px] font-medium text-accent-soft">N°{p.id}</span>
            <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-bone/40">
              {p.year}
            </span>
          </div>

          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.22em] text-bone/35">
              {p.category}
            </p>
            <h3 className="font-display text-[30px] font-bold uppercase leading-[0.95] tracking-[-0.01em] text-bone">
              {p.title}
            </h3>
            <p className="mb-4 mt-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-bone/35">
              {p.subtitle}
            </p>
            <p className="mb-4 max-w-[34ch] text-[13px] leading-relaxed text-bone/60">
              {p.description}
            </p>
            <div className="mb-5 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="border border-bone/15 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.14em] text-bone/70"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-soft">
              View project <ArrowUpRight size={12} strokeWidth={2.25} />
            </span>
          </div>
        </div>
      </a>

      {/* static meta — mobile only, since hover has no touch equivalent */}
      <div className="mt-5 flex flex-col gap-3 md:hidden">
        <div className="flex items-baseline justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink/40">
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
          className="mt-1 inline-flex w-fit items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-accent"
        >
          View project <ArrowUpRight size={12} strokeWidth={2.25} />
        </a>
      </div>
    </motion.div>
  );
}
