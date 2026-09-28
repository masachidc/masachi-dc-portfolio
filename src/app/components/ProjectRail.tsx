import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS, type Project } from '../data/projects';

// "More projects" rail for case-study pages, in the home page's dot language.
// At rest: one muted dot per project on the right edge, the project being
// viewed slightly darker. Hovering or keyboard-focusing the rail opens it into
// a panel listing every project; each item takes on its project's accent on
// hover. Desktop pointer devices only.
export function ProjectRail({ currentId }: { currentId: string }) {
  return (
    <nav
      aria-label="More projects"
      className="group/rail fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 lg:[@media(hover:hover)]:block xl:right-10"
    >
      <div className="flex w-8 flex-col items-end rounded-[12px] border border-transparent px-2.5 py-3 transition-all duration-300 ease-out group-hover/rail:w-[260px] group-hover/rail:border-ink/10 group-hover/rail:bg-bone group-hover/rail:px-4 group-hover/rail:shadow-[0_12px_32px_rgba(17,17,17,0.08)] group-focus-within/rail:w-[260px] group-focus-within/rail:border-ink/10 group-focus-within/rail:bg-bone group-focus-within/rail:px-4 group-focus-within/rail:shadow-[0_12px_32px_rgba(17,17,17,0.08)]">
        <p className="mb-1 max-h-0 w-full overflow-hidden text-right text-[12px] text-ink/40 opacity-0 transition-all duration-300 group-hover/rail:max-h-6 group-hover/rail:opacity-100 group-focus-within/rail:max-h-6 group-focus-within/rail:opacity-100">
          More projects
        </p>
        <ol className="flex w-full flex-col gap-1">
          {PROJECTS.map((p) => (
            <li key={p.id}>
              <ProjectItem project={p} current={p.id === currentId} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function ProjectItem({ project, current }: { project: Project; current: boolean }) {
  const [hovered, setHovered] = useState(false);

  const content = (
    <>
      {/* Titles stay in the accessibility tree; only visually collapsed at rest. */}
      <span
        className="max-w-0 overflow-hidden whitespace-nowrap text-right font-display text-[13px] font-bold tracking-[-0.01em] opacity-0 transition-[opacity,color] duration-300 group-hover/rail:max-w-full group-hover/rail:opacity-100 group-focus-within/rail:max-w-full group-focus-within/rail:opacity-100"
        style={{ color: hovered ? project.accent : current ? '#0a0a0b' : 'rgba(10,10,11,0.45)' }}
      >
        {project.railTitle}
      </span>
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ease-out"
        style={{
          backgroundColor: hovered ? project.accent : current ? 'rgba(10,10,11,0.5)' : 'rgba(10,10,11,0.15)',
          transform: hovered ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </>
  );

  const props = {
    'aria-current': current ? ('page' as const) : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setHovered(true),
    onBlur: () => setHovered(false),
    className: 'flex min-h-7 w-full items-center justify-end gap-3',
  };

  return project.link.startsWith('/') ? (
    <Link to={project.link} {...props}>
      {content}
    </Link>
  ) : (
    <a href={project.link} {...props}>
      {content}
    </a>
  );
}
