import { Fragment, useId, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Download, Minus, Plus } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SiteLink } from '../components/SiteLink';
import { Bullets } from '../components/caseStudy';
import { fadeUp, viewportOnce } from '../lib/motion';
import { EDUCATION, EXPERIENCE, PROFILE, RESUME_DISCIPLINES, RESUME_INTRO, SKILLS } from '../data/profile';
import { EMAIL, isExternal } from '../data/site';

/** Hero link, as in the case-study hero. */
const heroLink = 'group inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink';

const RULE = {
  /** Hairline above the section, as in the case-study glance row. */
  always: { section: 'border-t border-line pt-6', heading: 'mb-8' },
  /** Hairline under the heading: the heading sits above the divider. Caller sets the space below (headingClassName). */
  under: { section: '', heading: 'border-b border-line pb-6' },
  none: { section: '', heading: 'mb-8' },
};

/** One résumé section, headed like a case-study outcomes block: the muted kicker is the h2. */
function Block({
  id,
  title,
  rule = 'always',
  className = '',
  headingClassName = '',
  children,
}: {
  id: string;
  title: string;
  rule?: keyof typeof RULE;
  className?: string;
  /** Extra heading classes, e.g. to run the left column's rule across the gutter. */
  headingClassName?: string;
  children: ReactNode;
}) {
  return (
    <motion.section
      aria-labelledby={id}
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={fadeUp}
      className={`${RULE[rule].section} ${className}`}
    >
      <h2 id={id} className={`font-display text-kicker text-fg-faint ${RULE[rule].heading} ${headingClassName}`}>
        {title}
      </h2>
      {children}
    </motion.section>
  );
}

/**
 * Experience as a single-open accordion (WAI-ARIA APG pattern): each header is a button inside an h3 with
 * aria-expanded / aria-controls; the panel is a labelled region. Closed panels stay mounted (so aria-controls always
 * resolves) and are collapsed with a grid-rows transition; `invisible` keeps them out of the tab order and the
 * accessibility tree, and only flips once the close transition ends.
 */
function ExperienceAccordion() {
  // All closed on load (-1); opening one closes the others.
  const [openIndex, setOpenIndex] = useState(-1);
  const baseId = useId();

  return (
    <ol>
      {EXPERIENCE.map((item, index) => {
        const isOpen = openIndex === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        const meta = [item.title, item.role, item.when].filter(Boolean);

        return (
          <li key={`${item.title}-${item.org}`} className="border-t border-line first:border-t-0">
            <h3>
              <button
                id={triggerId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                className="group grid w-full grid-cols-[1fr_auto] items-center gap-6 py-6 text-left sm:py-7"
              >
                <span className="min-w-0">
                  {/* sr-only commas: the visual breaks (block, flex gaps, dots) aren't spoken, so the name reads
                      "Tembo, Founder, …" rather than running the parts together. */}
                  <span className="block text-entry text-ink">{item.org}</span>
                  <span className="sr-only">, </span>
                  <span className="mt-2 flex flex-wrap items-baseline gap-x-2.5 gap-y-1 text-body text-fg-muted">
                    {meta.map((part, i) => (
                      <Fragment key={part}>
                        {i > 0 && (
                          <>
                            <span aria-hidden="true" className="text-fg-subtle">
                              ·
                            </span>
                            <span className="sr-only">, </span>
                          </>
                        )}
                        <span className={part === item.when ? 'text-fg-subtle' : undefined}>{part}</span>
                      </Fragment>
                    ))}
                  </span>
                </span>

                <span
                  aria-hidden="true"
                  className={`flex size-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 motion-reduce:transition-none ${
                    isOpen
                      ? 'border-ink bg-ink text-bone'
                      : 'border-line bg-paper text-ink group-hover:border-ink/25 group-hover:bg-surface'
                  }`}
                >
                  {isOpen ? <Minus size={18} strokeWidth={1.8} /> : <Plus size={18} strokeWidth={1.8} />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`grid transition-[grid-template-rows,visibility] duration-300 ease-out motion-reduce:transition-none ${
                isOpen ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="max-w-(--measure) pb-8 pr-2 sm:pb-9 sm:pr-17">
                  <div className="text-body-lg text-fg-muted">
                    <Bullets items={item.points} />
                  </div>
                  {item.links && (
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
                      {item.links.map((link) => (
                        <SiteLink
                          key={link.href}
                          href={link.href}
                          className="group inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink"
                        >
                          {link.label}
                          <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
                        </SiteLink>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * The three disciplines as equal editorial cards: index top-left, arrow top-right, name bottom-left. Not links
 * yet: each card becomes one once its project grouping exists. Until then there is no link, button, pointer cursor
 * or lift, the arrow is muted and hidden from assistive tech, and hover only firms up the border.
 * Three columns from md (portrait 4:5); stacked shorter cards on phones.
 */
function Disciplines() {
  return (
    <ol className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
      {RESUME_DISCIPLINES.map((discipline, index) => (
        <li
          key={discipline}
          className="flex min-h-44 flex-col justify-between border border-line bg-paper p-6 transition-colors duration-300 hover:border-ink/20 motion-reduce:transition-none md:aspect-[4/5] md:min-h-0 lg:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            {/* The homepage card's number (N°01, as projectNumber() formats it) and type; text-fg-subtle instead of
                bone because these cards are light. */}
            <span className="font-mono text-micro font-medium tracking-[0.1em] text-fg-subtle">
              N°{String(index + 1).padStart(2, '0')}
            </span>
            <ArrowUpRight aria-hidden size={18} strokeWidth={1.5} className="shrink-0 text-fg-faint" />
          </div>
          {/* One word per line on every card, so the three titles share a shape whatever the card width. The space
              before the <br> keeps the spoken name "Product Design", not "ProductDesign". */}
          <h3 className="font-display text-title text-ink">
            {discipline.split(' ').map((word, i) => (
              <Fragment key={word}>
                {i > 0 && (
                  <>
                    {' '}
                    <br />
                  </>
                )}
                {word}
              </Fragment>
            ))}
          </h3>
        </li>
      ))}
    </ol>
  );
}

export function ResumePage() {
  return (
    <PageLayout
      meta={{
        title: 'Resume',
        description: `Résumé of ${PROFILE.name}, ${PROFILE.role}: founder of Tembo, with brand, web, and curriculum work for FIU Project SEEDS and STEM Xposure.`,
      }}
      kicker="Resume"
      title={
        <>
          {PROFILE.name}
          <span className="mt-3 block text-title text-fg-muted">{PROFILE.role}</span>
        </>
      }
      width="reading"
      titleSize="headline"
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
          {/* Only once a real résumé exists: a /public PDF downloads, a hosted link opens in a new tab. */}
          {PROFILE.resumePdf &&
            (isExternal(PROFILE.resumePdf) ? (
              <SiteLink href={PROFILE.resumePdf} className={heroLink}>
                Download résumé
                <Download size={12} strokeWidth={2} aria-hidden />
              </SiteLink>
            ) : (
              <a href={PROFILE.resumePdf} download className={heroLink}>
                Download résumé
                <Download size={12} strokeWidth={2} aria-hidden />
              </a>
            ))}
        </>
      }
    >
      <div className="container-reading pb-(--space-section)">
        {/* Skills and Experience headings sit above one divider: each heading carries the rule, and from lg the
            Skills rule runs across the gutter (-mr-16 = gap-x-16) to meet Experience's. The Experience heading keeps
            less space below it because each accordion row has its own top padding, so Tembo lines up with the first
            skill group. */}
        <div className="mt-4 grid grid-cols-1 gap-y-(--space-section) lg:mt-8 lg:grid-cols-[2fr_3fr] lg:gap-x-16">
          <Block id="experience" title="Experience" rule="under" headingClassName="mb-2" className="lg:col-start-2 lg:row-start-1">
            <ExperienceAccordion />
          </Block>

          <Block id="skills" title="Skills" rule="under" headingClassName="mb-8 lg:-mr-16" className="lg:col-start-1 lg:row-start-1">
            <dl className="flex max-w-(--measure) flex-col gap-6">
              {SKILLS.map((skill) => (
                <div key={skill.group}>
                  <dt className="text-label caps text-fg-subtle">{skill.group}</dt>
                  <dd className="mt-2 text-body text-fg-muted">{skill.items.join(', ')}</dd>
                </div>
              ))}
            </dl>
          </Block>

          {/* Full width, heading above the divider. Two equal columns on tablets; from lg the page's 2fr/3fr grid, so
              the second school starts exactly where Experience does. Stacked on phones with a hairline between the
              schools. The field of study is the headline (text-entry, as the Experience organisations); degree, minor and school
              support it, then the dates. */}
          <Block id="education" title="Education" rule="under" headingClassName="mb-8" className="lg:col-span-2 lg:row-start-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-16 lg:grid-cols-[2fr_3fr]">
              {EDUCATION.map((item, index) => (
                <li
                  key={item.field}
                  className={index === 0 ? 'pb-10 sm:pb-0' : 'border-t border-line pt-10 sm:border-t-0 sm:pt-0'}
                >
                  <h3 className="text-entry text-ink">{item.field}</h3>
                  <div className="mt-3 text-body text-fg-muted">
                    <p className="text-ink">{item.degree}</p>
                    {item.minor && <p>{item.minor}</p>}
                    <p className="font-semibold">{item.school}</p>
                  </div>
                  {item.when && <p className="mt-4 text-small text-fg-subtle">{item.when}</p>}
                </li>
              ))}
            </ul>
          </Block>

          {/* Full width, heading above the divider like Skills, Experience and Education; the grid gap between sections
              is the standard --space-section. */}
          <Block id="disciplines" title="Disciplines" rule="under" headingClassName="mb-8" className="lg:col-span-2 lg:row-start-3">
            <Disciplines />
          </Block>
        </div>
      </div>
    </PageLayout>
  );
}
