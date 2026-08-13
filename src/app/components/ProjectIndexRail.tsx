import { useEffect, useState } from 'react';
import { motion, type MotionValue, useMotionValue, useScroll, useSpring, useTransform } from 'motion/react';
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

function useActiveProject() {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-project-anchor]')).filter(
      (el) => el.getBoundingClientRect().width > 0,
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) => (a.intersectionRatio > b.intersectionRatio ? a : b));
        setActiveId((top.target as HTMLElement).dataset.projectAnchor ?? null);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}

function RailItem({
  project,
  active,
  loadAmount,
}: {
  project: Project;
  active: boolean;
  loadAmount: MotionValue<number>;
}) {
  const hoverTarget = useMotionValue(0);
  const hoverSmooth = useSpring(hoverTarget, { stiffness: 260, damping: 28 });
  const titleAmount = useTransform([loadAmount, hoverSmooth], ([l, h]: number[]) => Math.max(l, h));

  const roleWidth = useTransform(loadAmount, (v) => `${v * 160}px`);
  const titleWidth = useTransform(titleAmount, (v) => `${v * 80}px`);

  return (
    <button
      onClick={() => scrollToProject(project.id)}
      onMouseEnter={() => hoverTarget.set(1)}
      onMouseLeave={() => hoverTarget.set(0)}
      className="flex w-full items-center justify-between gap-3"
    >
      <motion.span
        style={{ opacity: loadAmount, width: roleWidth }}
        className="overflow-hidden whitespace-nowrap text-left font-mono text-[13px] tracking-[0.08em] text-ink/40"
      >
        {project.role}
      </motion.span>

      <span className="flex items-center gap-2.5">
        <motion.span
          style={{ opacity: titleAmount, width: titleWidth }}
          className="overflow-hidden whitespace-nowrap text-right font-display text-[13px] font-bold uppercase tracking-[-0.01em]"
          animate={{ color: active ? project.accent : 'rgba(10,10,11,0.6)' }}
          transition={{ duration: 0.3 }}
        >
          {project.title}
        </motion.span>
        <span
          className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ease-out"
          style={{
            backgroundColor: active ? project.accent : 'rgba(10,10,11,0.15)',
            transform: active ? 'scale(1.5)' : 'scale(1)',
          }}
        />
      </span>
    </button>
  );
}

export function ProjectIndexRail() {
  const activeId = useActiveProject();
  const { scrollY } = useScroll();
  const loadAmount = useTransform(scrollY, [0, 260], [1, 0]);

  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-8 top-1/2 z-30 hidden w-[290px] -translate-y-1/2 flex-col gap-4 xl:flex"
      aria-label="Jump to project"
    >
      {PROJECTS.map((p) => (
        <RailItem key={p.id} project={p} active={activeId === p.id} loadAmount={loadAmount} />
      ))}
    </motion.nav>
  );
}
