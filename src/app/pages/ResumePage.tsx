import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SiteLink } from '../components/SiteLink';
import { Bullets } from '../components/caseStudy';
import { fadeUp, viewportOnce } from '../lib/motion';
import { EDUCATION, EXPERIENCE, PROFILE, RESUME_DISCIPLINES, RESUME_INTRO, SKILLS } from '../data/profile';
import { EMAIL } from '../data/site';

/** Hero link, as in the case-study hero. */
const heroLink = 'group inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink';

const RULE = {
  /** Hairline above the section, as in the case-study glance row. */
  always: 'border-t border-line pt-6',
  /** Opens a column: stacked it keeps its rule; from lg the grid's full-width rule stands in for it. */
  lead: 'border-t border-line pt-6 lg:border-t-0 lg:pt-0',
  none: '',
};

/** One résumé section, headed like a case-study outcomes block: the muted kicker is the h2. */
function Block({
  id,
  title,
  rule = 'always',
  className = '',
  children,
}: {
  id: string;
  title: string;
  rule?: keyof typeof RULE;
  className?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      aria-labelledby={id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className={`${RULE[rule]} ${className}`}
    >
      <h2 id={id} className="mb-8 font-display text-kicker text-fg-faint">
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

function ExperienceAccordion() {
  const [openIndex, setOpenIndex] = useState(0);
  const baseId = useId();

  return (
    <ol className="border-b border-line">
      {EXPERIENCE.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={`${item.title}-${item.org}`} className="border-t border-line">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-7 text-left sm:py-8"
              >
                <span className="min-w-0">
                  <span className="block font-display text-title text-ink">{item.org}</span>
                  <span className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-body text-fg-muted">
                    <span>{item.title}</span>
                    {item.role && (
                      <>
                        <span aria-hidden="true" className="text-fg-faint">
                          ·
                        </span>
                        <span>{item.role}</span>
                      </>
                    )}
                    {item.when && (
                      <>
                        <span aria-hidden="true" className="text-fg-faint">
                          ·
                        </span>
                        <span className="text-fg-subtle">{item.when}</span>
                      </>
                    )}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors duration-300 sm:h-14 sm:w-14 ${
                    isOpen ? 'bg-ink text-paper' : 'bg-paper text-ink group-hover:bg-bone-deep'
                  }`}
                >
                  {isOpen ? <Minus size={20} strokeWidth={1.8} /> : <Plus size={20} strokeWidth={1.8} />}
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="max-w-(--measure) pb-9 pr-16 sm:pb-10 sm:pr-20">
                    <div className="text-body-lg text-fg-muted">
                      <Bullets items={item.points} />
                    </div>
                    {item.link && (
                      <SiteLink
                        href={item.link.href}
                        className="group mt-6 inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink"
                      >
                        {item.link.label}
                        <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
                      </SiteLink>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}

function DisciplineRail() {
  return (
    <section aria-labelledby="disciplines" className="border-t border-line">
      <h2 id="disciplines" className="sr-only">
        Selected disciplines
      </h2>
      <ul className="border-b border-line">
        {RESUME_DISCIPLINES.map((discipline, index) => (
          <li key={discipline} className="border-t border-line first:border-t-0">
            <div className="grid grid-cols-[auto_1fr] items-center gap-6 py-7 sm:grid-cols-[4.5rem_1fr_auto] sm:gap-8 sm:py-8">
              <span className="font-display text-kicker font-normal text-fg-faint">/00{index + 1}</span>
              <span className="font-display text-title text-ink">{discipline}</span>
              <span
                aria-hidden="true"
                className="hidden h-12 w-12 items-center justify-center rounded-full bg-paper text-fg-faint sm:flex"
              >
                <Plus size={19} strokeWidth={1.7} />
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-small text-fg-subtle">Project groupings will open from these disciplines as the portfolio expands.</p>
    </section>
  );
}

export function ResumePage() {
  return (
    <PageLayout
      meta={{
        title: 'Resume',
        description: `${PROFILE.name}, ${PROFILE.role}: experience, capabilities, and education.`,
      }}
      kicker="Resume"
      title={
        <>
          {PROFILE.name}
          <span className="mt-3 block text-title text-fg-muted">{PROFILE.role}</span>
        </>
      }
      width="reading"
      lede={RESUME_INTRO}
      actions={
        <>
          <SiteLink href={`mailto:${EMAIL}`} className={heroLink}>
            {EMAIL}
            <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
          </SiteLink>
          <SiteLink href={PROFILE.linkedin} className={heroLink}>
            LinkedIn
            <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
          </SiteLink>
        </>
      }
    >
      <div className="container-reading pb-(--space-section)">
        <div className="mt-4 grid grid-cols-1 gap-y-(--space-section) lg:mt-8 lg:grid-cols-[2fr_3fr] lg:gap-x-16 lg:border-t lg:border-line lg:pt-6">
          <Block id="experience" title="Experience" rule="lead" className="lg:col-start-2 lg:row-start-1">
            <ExperienceAccordion />
          </Block>

          <div className="flex flex-col gap-(--space-section) lg:col-start-1 lg:row-start-1">
            <Block id="skills" title="Skills" rule="lead">
              <dl className="flex max-w-(--measure) flex-col gap-6">
                {SKILLS.map((skill) => (
                  <div key={skill.group}>
                    <dt className="text-label caps text-fg-subtle">{skill.group}</dt>
                    <dd className="mt-2 text-body text-fg-muted">{skill.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block id="education" title="Education" rule="none">
              <ul className="flex max-w-(--measure) flex-col gap-6">
                {EDUCATION.map((item) => (
                  <li key={item.field}>
                    <p className="text-label caps text-fg-subtle">{item.field}</p>
                    <div className="mt-2 text-body text-fg-muted">
                      {[item.minor, item.school, item.note].filter(Boolean).map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                    {item.when && <p className="mt-1 text-small text-fg-subtle">{item.when}</p>}
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          <div className="lg:col-span-2 lg:row-start-2">
            <DisciplineRail />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
