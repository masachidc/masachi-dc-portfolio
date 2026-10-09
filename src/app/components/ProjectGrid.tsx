import { useEffect, useState } from 'react';
import { PROJECTS, WORK_MOSAIC_QUERY, type Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';

/** True from the desktop mosaic breakpoint up. One layout mounts, so covers aren't fetched twice. */
function useDesktopMosaic() {
  const query = WORK_MOSAIC_QUERY;
  const [desktop, setDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia(query).matches : false,
  );

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setDesktop(media.matches);
    onChange();
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return desktop;
}

/** Split into groups of three for the desktop mosaic. */
function groupsOfThree(items: Project[]) {
  const groups: Project[][] = [];
  for (let i = 0; i < items.length; i += 3) groups.push(items.slice(i, i + 3));
  return groups;
}

/**
 * One desktop mosaic band. Full groups of three alternate between
 * "two wide + one tall" (tall on the right) and its mirror, so any number of
 * projects keeps the asymmetric rhythm. A trailing 1 or 2 fill a simple row.
 * One column tall + two columns wide at 3:2 makes the tall card ~768x1564 and
 * the wide cards ~1564x768 in shape, so covers made at those sizes barely crop.
 * Slots follow reading order (top-left, top-right, then below), so array
 * order is the order a visitor reads the cards.
 */
function MosaicBand({
  group,
  mirrored,
  number,
  priority = false,
}: {
  group: Project[];
  mirrored: boolean;
  number: (p: Project) => string;
  priority?: boolean;
}) {
  if (group.length < 3) {
    return (
      <div className={`grid gap-6 ${group.length === 2 ? 'aspect-[5/2] grid-cols-2' : 'aspect-[5/2] grid-cols-1'}`}>
        {group.map((p) => (
          <ProjectCard key={p.slug} project={p} number={number(p)} priority={priority} mosaic />
        ))}
      </div>
    );
  }

  const [a, b, c] = group;
  return (
    <div className="aspect-[3/2] w-full">
      <div className="grid h-full grid-cols-3 grid-rows-2 gap-6">
        {mirrored ? (
          <>
            <ProjectCard project={a} number={number(a)} feature priority={priority} mosaic className="col-span-1 row-span-2" />
            <ProjectCard project={b} number={number(b)} priority={priority} mosaic className="col-span-2 col-start-2 row-span-1" />
            <ProjectCard project={c} number={number(c)} priority={priority} mosaic className="col-span-2 col-start-2 row-span-1 row-start-2" />
          </>
        ) : (
          <>
            <ProjectCard project={a} number={number(a)} priority={priority} mosaic className="col-span-2 row-span-1" />
            <ProjectCard project={b} number={number(b)} feature priority={priority} mosaic className="col-span-1 col-start-3 row-span-2 row-start-1" />
            <ProjectCard project={c} number={number(c)} priority={priority} mosaic className="col-span-2 row-span-1 row-start-2" />
          </>
        )}
      </div>
    </div>
  );
}

/**
 * Selected work. The homepage shows every project in PROJECTS; a discipline page passes its own three, numbered by
 * their place on that page.
 */
export function ProjectGrid({ projects = PROJECTS }: { projects?: Project[] } = {}) {
  const desktop = useDesktopMosaic();
  const number = (p: Project) => String(projects.indexOf(p) + 1).padStart(2, '0');
  return (
    <section id="work" aria-labelledby="work-title" className="relative">
      {/* Hero description → "Selected work" equals nav → hero kicker: both are --space-section. */}
      <div className="container-site pb-(--space-section) pt-(--space-section)">
        <h2 id="work-title" className="mb-8 font-display text-kicker uppercase text-ink">
          Selected work
        </h2>

        {/*
          Below the mosaic, cards stack in one column. Every cover is 4:3, so the
          row stays one consistent height and reading order without a short/tall hole.
        */}
        {desktop ? (
          <div className="flex flex-col gap-6">
            {groupsOfThree(projects).map((group, i) => (
              <MosaicBand key={group[0].slug} group={group} mirrored={i % 2 === 1} number={number} priority={i === 0} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 items-start gap-8">
            {projects.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                number={number(p)}
                priority={i === 0}
                className={p.hideOnMobile ? 'max-sm:hidden' : ''}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
