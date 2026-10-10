import { useState } from 'react';
import {
  motion,
  type MotionValue,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';
import { PROJECTS, type Project } from '../data/projects';
import { ProjectNavigationItem } from './ProjectNavigationItem';
import { NAV_OFFSET, getLenis } from '../lib/scroll';

function scrollToProject(id: string) {
  const candidates = document.querySelectorAll<HTMLElement>(`[data-project-anchor="${id}"]`);
  const target = Array.from(candidates).find((el) => el.getBoundingClientRect().width > 0);
  if (!target) return;

  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(target, { offset: -NAV_OFFSET });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

function RailItem({
  project,
  loadAmount,
  railExpanded,
}: {
  project: Project;
  loadAmount: MotionValue<number>;
  railExpanded: boolean;
}) {
  const hoverTarget = useMotionValue(0);
  const loadSmooth = useSpring(loadAmount, { stiffness: 260, damping: 28 });
  const hoverSmooth = useSpring(hoverTarget, { stiffness: 260, damping: 28 });
  const titleAmount = useTransform([loadSmooth, hoverSmooth], ([l, h]: number[]) => Math.max(l, h, railExpanded ? 1 : 0));

  const titleWidth = useTransform(titleAmount, (v) => `${v * 172}px`);

  return (
    <ProjectNavigationItem
      textRestColor="rgba(10,10,11,0.6)"
      dotRestColor="rgba(10,10,11,0.15)"
      onHoverChange={(hovered) => hoverTarget.set(hovered ? 1 : 0)}
    >
      {({ hovered, textColor, dotColor }) => (
        <button
          type="button"
          onClick={() => scrollToProject(project.slug)}
          className="flex min-h-7 w-full items-center justify-end gap-2.5"
        >
          <motion.span
            style={{ opacity: titleAmount, width: titleWidth, color: textColor }}
            className="block overflow-hidden whitespace-nowrap text-right font-display text-small font-bold tracking-[-0.01em] transition-colors duration-300"
          >
            {project.railTitle}
          </motion.span>
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ease-out"
            style={{
              backgroundColor: dotColor,
              transform: hovered ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        </button>
      )}
    </ProjectNavigationItem>
  );
}

/** Dots on the right that jump to each card in Selected work: every project on the homepage, a discipline page's three on it. */
export function ProjectIndexRail({ projects = PROJECTS }: { projects?: Project[] } = {}) {
  const { scrollY } = useScroll();
  const loadAmount = useTransform(scrollY, [0, 260], [1, 0]);
  const loadSmooth = useSpring(loadAmount, { stiffness: 260, damping: 28 });
  const hoverTarget = useMotionValue(0);
  const hoverSmooth = useSpring(hoverTarget, { stiffness: 260, damping: 28 });
  const railAmount = useTransform([loadSmooth, hoverSmooth], ([l, h]: number[]) => Math.max(l, h));
  const railWidth = useTransform(railAmount, (v) => `${32 + v * 192}px`);
  const [railExpanded, setRailExpanded] = useState(false);

  function openRail() {
    hoverTarget.set(1);
    setRailExpanded(true);
  }

  function closeRail() {
    hoverTarget.set(0);
    setRailExpanded(false);
  }

  return (
    <motion.nav
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ width: railWidth }}
      onMouseEnter={openRail}
      onMouseLeave={closeRail}
      onFocusCapture={openRail}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) closeRail();
      }}
      className="fixed right-8 top-[calc(50%-39px)] z-30 hidden -translate-y-1/2 xl:block"
      aria-label="Jump to project"
    >
      <div
        className={`flex flex-col gap-4 rounded-[var(--radius-surface)] border py-3 backdrop-blur-[3px] transition-[background-color,border-color,box-shadow,padding] duration-500 ease-[var(--ease-out-premium)] motion-reduce:transition-none ${
          railExpanded
            ? 'border-ink/12 bg-paper/92 px-4 shadow-[0_16px_32px_-12px_rgb(78_83_90_/_10%)]'
            : 'border-transparent px-2.5'
        }`}
      >
        {projects.map((p) => (
          <RailItem key={p.slug} project={p} loadAmount={loadAmount} railExpanded={railExpanded} />
        ))}
      </div>
    </motion.nav>
  );
}
