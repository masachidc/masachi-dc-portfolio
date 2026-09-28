import { PROJECTS, type Project } from '../data/projects';
import { ProjectCard } from './ProjectCard';

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
 */
function MosaicBand({ group, mirrored }: { group: Project[]; mirrored: boolean }) {
  if (group.length < 3) {
    return (
      <div className={`grid gap-6 ${group.length === 2 ? 'aspect-[5/2] grid-cols-2' : 'aspect-[5/2] grid-cols-1'}`}>
        {group.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    );
  }

  const [a, b, c] = group;
  return (
    <div className="aspect-[5/3] w-full">
      <div className="grid h-full grid-cols-5 grid-rows-2 gap-6">
        {mirrored ? (
          <>
            <ProjectCard project={a} className="col-span-2 row-span-2" />
            <ProjectCard project={b} className="col-span-3 col-start-3 row-span-1" />
            <ProjectCard project={c} className="col-span-3 col-start-3 row-span-1 row-start-2" />
          </>
        ) : (
          <>
            <ProjectCard project={a} className="col-span-3 row-span-1" />
            <ProjectCard project={b} className="col-span-3 row-span-1" />
            <ProjectCard project={c} className="col-span-2 col-start-4 row-span-2 row-start-1" />
          </>
        )}
      </div>
    </div>
  );
}

export function ProjectGrid() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative bg-bone">
      <div className="container-site pb-28 pt-12">
        <h2 id="work-title" className="sr-only">
          Selected work
        </h2>

        {/* mobile / tablet — simple stacked & 2-col rhythm */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>

        {/* desktop — asymmetric editorial mosaic */}
        <div className="hidden lg:flex lg:flex-col lg:gap-6">
          {groupsOfThree(PROJECTS).map((group, i) => (
            <MosaicBand key={group[0].slug} group={group} mirrored={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
