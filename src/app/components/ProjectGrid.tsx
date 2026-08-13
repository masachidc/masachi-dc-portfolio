import { motion } from 'motion/react';
import { PROJECTS } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { fadeUp, viewportOnce } from '../lib/motion';

export function ProjectGrid() {
  const [a, b, c, d, e, f] = PROJECTS;

  return (
    <section className="bg-bone">
      <div className="mx-auto w-full max-w-[1320px] px-6 pb-8 sm:px-10 lg:px-16">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={fadeUp}
          className="flex items-baseline justify-between pb-10"
        >
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/50">
            Selected Work
          </h2>
          <span className="font-mono text-[11px] text-ink/30">
            {String(PROJECTS.length).padStart(2, '0')} / 06
          </span>
        </motion.div>
      </div>

      <div className="mx-auto w-full max-w-[1320px] px-6 pb-28 sm:px-10 lg:px-16">
        {/* mobile / tablet — simple stacked & 2-col rhythm */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>

        {/* desktop — asymmetric editorial mosaic */}
        <div className="hidden lg:flex lg:flex-col lg:gap-6">
          <div className="aspect-[5/3] w-full">
            <div className="grid h-full grid-cols-5 grid-rows-2 gap-6">
              <ProjectCard project={a} className="col-span-3 row-span-1" />
              <ProjectCard project={b} className="col-span-3 row-span-1" />
              <ProjectCard project={c} className="col-span-2 col-start-4 row-span-2 row-start-1" />
            </div>
          </div>

          <div className="aspect-[5/3] w-full">
            <div className="grid h-full grid-cols-5 grid-rows-2 gap-6">
              <ProjectCard project={d} className="col-span-2 row-span-2" />
              <ProjectCard project={e} className="col-span-3 col-start-3 row-span-1" />
              <ProjectCard project={f} className="col-span-3 col-start-3 row-span-1 row-start-2" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
