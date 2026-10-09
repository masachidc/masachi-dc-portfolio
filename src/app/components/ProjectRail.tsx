import { PROJECTS, projectHref, type Project } from '../data/projects';
import { SiteLink } from './SiteLink';
import { ProjectNavigationItem } from './ProjectNavigationItem';

// "More projects" rail for case-study pages, in the home page's dot language.
// At rest: one muted dot per project on the right edge, the project being
// viewed slightly darker. Hovering or keyboard-focusing the rail opens it into
// a panel listing every project; each item takes on its project's accent on
// hover. Pointer devices ≥1280px only, where the side margin clears the reading column.
export function ProjectRail({ currentSlug }: { currentSlug: string }) {
  return (
    <nav
      aria-label="More projects"
      className="group/rail fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:[@media(hover:hover)]:block xl:right-10"
    >
      <div className="flex w-8 flex-col items-end rounded-[var(--radius-surface)] border border-transparent px-2.5 py-3 backdrop-blur-[3px] transition-all duration-500 ease-[var(--ease-out-premium)] group-hover/rail:w-[224px] group-hover/rail:border-ink/12 group-hover/rail:bg-paper/92 group-hover/rail:px-4 group-hover/rail:shadow-[0_16px_32px_-12px_rgb(78_83_90_/_10%)] group-focus-within/rail:w-[224px] group-focus-within/rail:border-ink/12 group-focus-within/rail:bg-paper/92 group-focus-within/rail:px-4 group-focus-within/rail:shadow-[0_16px_32px_-12px_rgb(78_83_90_/_10%)] motion-reduce:transition-none">
        <ol className="flex w-full flex-col gap-1">
          {PROJECTS.map((p) => (
            <li key={p.slug}>
              <ProjectItem project={p} current={p.slug === currentSlug} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function ProjectItem({ project, current }: { project: Project; current: boolean }) {
  return (
    <ProjectNavigationItem
      textRestColor={current ? 'var(--color-ink)' : 'var(--color-fg-subtle)'}
      dotRestColor={current ? 'rgba(10,10,11,0.5)' : 'rgba(10,10,11,0.15)'}
    >
      {({ hovered, textColor, dotColor }) => (
        <SiteLink
          href={projectHref(project)}
          ariaCurrent={current ? 'page' : undefined}
          className="flex min-h-7 w-full items-center justify-end gap-2.5"
        >
          {/* Titles stay in the accessibility tree; only visually collapsed at rest. */}
          <span
            className="w-[172px] max-w-0 overflow-hidden whitespace-nowrap text-right font-display text-small font-bold tracking-[-0.01em] opacity-0 transition-[max-width,opacity,color] duration-300 group-hover/rail:max-w-[172px] group-hover/rail:opacity-100 group-focus-within/rail:max-w-[172px] group-focus-within/rail:opacity-100"
            style={{ color: textColor }}
          >
            {project.railTitle}
          </span>
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-300 ease-out"
            style={{
              backgroundColor: dotColor,
              transform: hovered ? 'scale(1.5)' : 'scale(1)',
            }}
          />
        </SiteLink>
      )}
    </ProjectNavigationItem>
  );
}
