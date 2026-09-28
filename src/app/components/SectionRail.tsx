import { useEffect, useState } from 'react';
import type Lenis from 'lenis';

export type RailSection = { id: string; title: string };

const NAV_OFFSET = 96;

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: -NAV_OFFSET });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// "On this page" rail. At rest: one short dash per section, the section in
// view marked by a longer, full-ink dash. Hovering or keyboard-focusing the
// rail expands it into a panel that reveals each dash's title. Desktop
// pointer devices only — on touch the titles would never be seen before a tap.
export function SectionRail({ sections }: { sections: readonly RailSection[] }) {
  const activeId = useActiveSection(sections);

  return (
    <nav
      aria-label="On this page"
      className="group/rail fixed left-6 top-1/2 z-30 hidden -translate-y-1/2 lg:[@media(hover:hover)]:block xl:left-10"
    >
      <ol className="w-8 rounded-[10px] border border-transparent py-2 transition-all duration-200 ease-out group-hover/rail:w-[240px] group-hover/rail:border-ink/10 group-hover/rail:bg-bone group-hover/rail:px-4 group-hover/rail:shadow-[0_12px_32px_rgba(17,17,17,0.08)] group-focus-within/rail:w-[240px] group-focus-within/rail:border-ink/10 group-focus-within/rail:bg-bone group-focus-within/rail:px-4 group-focus-within/rail:shadow-[0_12px_32px_rgba(17,17,17,0.08)]">
        {sections.map(({ id, title }) => {
          const active = id === activeId;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={active ? 'location' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(id);
                }}
                className={`group/link flex min-h-7 items-center gap-3 whitespace-nowrap text-[14px] leading-tight transition-colors ${
                  active ? 'font-semibold text-ink' : 'font-medium text-ink/45 hover:text-ink'
                }`}
              >
                {/* Inactive dashes reserve the active length so titles align. */}
                <span aria-hidden="true" className="flex w-6 shrink-0 items-center">
                  <span
                    className={`h-[2px] rounded-[1px] transition-all duration-200 ease-out ${
                      active ? 'w-6 bg-ink' : 'w-3 bg-ink/30 group-hover/link:bg-ink/60'
                    }`}
                  />
                </span>
                {/* Titles stay in the accessibility tree; only visually collapsed at rest. */}
                <span className="max-w-0 overflow-hidden text-ellipsis opacity-0 transition-opacity duration-200 group-hover/rail:max-w-full group-hover/rail:opacity-100 group-focus-within/rail:max-w-full group-focus-within/rail:opacity-100">
                  {title}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// The section being read: the last heading to reach the top 30% of the
// viewport. Scroll-position based so short and final sections resolve too.
function useActiveSection(sections: readonly RailSection[]) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      const threshold = Math.max(NAV_OFFSET + 1, window.innerHeight * 0.3);
      let current: string | undefined;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= threshold) current = el.id;
      }
      setActiveId(atBottom ? els[els.length - 1].id : current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [sections]);

  return activeId;
}
