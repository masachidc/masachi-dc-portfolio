import { useState } from 'react';
import { motion } from 'motion/react';
import type Lenis from 'lenis';
import { PROJECTS, type Project } from '../data/projects';

function scrollToProject(id: string) {
  const candidates = document.querySelectorAll<HTMLElement>(`[data-project-anchor="${id}"]`);
  const target = Array.from(candidates).find((el) => el.getBoundingClientRect().width > 0);
  if (!target) return;

  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -96 });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function RailItem({ project }: { project: Project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={() => scrollToProject(project.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2.5"
    >
      <span
        className="overflow-hidden whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.1em] text-ink/50 transition-all duration-300 ease-out"
        style={{ maxWidth: hovered ? 100 : 0, opacity: hovered ? 1 : 0 }}
      >
        {project.title}
      </span>
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full transition-transform duration-300 ease-out"
        style={{
          backgroundColor: hovered ? project.accent : 'rgba(10,10,11,0.15)',
          transform: hovered ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </button>
  );
}

export function ProjectIndexRail() {
  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-8 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
      aria-label="Jump to project"
    >
      {PROJECTS.map((p) => (
        <RailItem key={p.id} project={p} />
      ))}
    </motion.nav>
  );
}
