import { useState } from 'react';
import {
  motion,
  type MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
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

function RailItem({
  project,
  loadAmount,
  collapsed,
}: {
  project: Project;
  loadAmount: MotionValue<number>;
  collapsed: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const hoverTarget = useMotionValue(0);
  const hoverSmooth = useSpring(hoverTarget, { stiffness: 260, damping: 28 });
  const titleAmount = useTransform([loadAmount, hoverSmooth], ([l, h]: number[]) => Math.max(l, h));

  const titleWidth = useTransform(titleAmount, (v) => `${v * (collapsed ? 90 : 240)}px`);

  function handleEnter() {
    hoverTarget.set(1);
    setHovered(true);
  }

  function handleLeave() {
    hoverTarget.set(0);
    setHovered(false);
  }

  return (
    <button
      onClick={() => scrollToProject(project.id)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="flex w-full items-center justify-end gap-2.5"
    >
      <motion.span
        style={{ opacity: titleAmount, width: titleWidth, color: hovered ? project.accent : 'rgba(10,10,11,0.6)' }}
        className="overflow-hidden whitespace-nowrap text-right font-display text-[13px] font-bold tracking-[-0.01em] transition-colors duration-300"
      >
        {collapsed ? project.title : project.railTitle}
      </motion.span>
      <span
        className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ease-out"
        style={{
          backgroundColor: hovered ? project.accent : 'rgba(10,10,11,0.15)',
          transform: hovered ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </button>
  );
}

export function ProjectIndexRail() {
  const { scrollY } = useScroll();
  const loadAmount = useTransform(scrollY, [0, 260], [1, 0]);
  const [collapsed, setCollapsed] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    setCollapsed((prev) => (prev ? v > 220 : v > 260));
  });

  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed right-8 top-[calc(50%-39px)] z-30 hidden w-[290px] -translate-y-1/2 flex-col gap-4 xl:flex"
      aria-label="Jump to project"
    >
      {PROJECTS.map((p) => (
        <RailItem key={p.id} project={p} loadAmount={loadAmount} collapsed={collapsed} />
      ))}
    </motion.nav>
  );
}
