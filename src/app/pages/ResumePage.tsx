import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SiteLink } from '../components/SiteLink';
import { Bullets } from '../components/caseStudy';
import { fadeUp, viewportOnce } from '../lib/motion';
import { EDUCATION, EXPERIENCE, PROFILE, RESUME_PROJECTS, SKILLS } from '../data/profile';
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

/** Head shared by roles and projects: name, then context; the date sits quietly beside the name from sm, below it on phones. */
function EntryHead({ name, context, when }: { name: ReactNode; context: string; when?: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-x-6">
      <h3 className="text-body-lg font-semibold text-ink">{name}</h3>
      <p className="text-body text-fg-muted sm:col-start-1">{context}</p>
      {when && <p className="mt-1 text-small text-fg-subtle sm:col-start-2 sm:row-start-1 sm:mt-0">{when}</p>}
    </div>
  );
}

export function ResumePage() {
  return (
    <PageLayout
      meta={{
        title: 'Resume',
        description: `${PROFILE.name}, ${PROFILE.role}. Experience, selected projects, skills, and education.`,
        // Indexed once education details are confirmed and a PDF exists (see profile.ts CONTENT GAPS).
        noindex: true,
      }}
      kicker="Resume"
      title={
        <>
          {PROFILE.name}
          <span className="mt-3 block text-title text-fg-muted">{PROFILE.role}</span>
        </>
      }
      width="reading"
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
          {PROFILE.resumePdf && (
            <a href={PROFILE.resumePdf} download className={heroLink}>
              Download résumé
              <Download size={12} strokeWidth={2} aria-hidden />
            </a>
          )}
        </>
      }
    >
      <div className="container-reading pb-(--space-section)">
        {/* Summary after the contact links, in the case-study overview style. */}
        <p className="max-w-[44ch] text-pretty text-lede text-fg-muted">
          Based in {PROFILE.location}. Trained in architecture, digital interactive media, and computer science, I take
          products from research and interface design into working code, and I've shipped to the App Store.
        </p>

        {/* The case-study section grid, so the left column matches a case study's title column. Source order is
            reading priority (Experience, Projects, then Skills + Education), which is also the stacked order. From lg:
            row 1 is Skills + Education beside Experience under one full-width rule; row 2 is Selected projects under
            its own full-width rule, content kept in the right column. */}
        <div className="mt-(--space-section) grid grid-cols-1 gap-y-(--space-section) lg:grid-cols-[2fr_3fr] lg:gap-x-16 lg:border-t lg:border-line lg:pt-6">
          <Block id="experience" title="Experience" rule="lead" className="lg:col-start-2 lg:row-start-1">
            <ol className="flex flex-col gap-12">
              {EXPERIENCE.map((e) => (
                <li key={`${e.title}-${e.org}`} className="max-w-(--measure)">
                  <EntryHead name={e.title} context={e.org} when={e.when} />
                  <div className="mt-4 text-body-lg text-fg-muted">
                    {e.points.length > 1 ? <Bullets items={e.points} /> : <p>{e.points[0]}</p>}
                  </div>
                </li>
              ))}
            </ol>
          </Block>

          <Block
            id="projects"
            title="Selected projects"
            // Spans both columns so its rule is full width; heading and list sit in the right column.
            className="lg:col-span-2 lg:row-start-2 lg:grid lg:grid-cols-[2fr_3fr] lg:gap-x-16 lg:*:col-start-2"
          >
            <ul className="flex flex-col gap-10">
              {RESUME_PROJECTS.map((p) => (
                <li key={p.name} className="max-w-(--measure)">
                  <EntryHead
                    name={
                      <SiteLink href={p.href} className="group inline-flex items-center gap-2 transition-colors hover:text-accent-deep">
                        {p.name}
                        <ArrowRight size={14} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                      </SiteLink>
                    }
                    context={p.role}
                    when={p.when}
                  />
                  <p className="mt-2 text-body text-fg-muted">{p.summary}</p>
                </li>
              ))}
            </ul>
          </Block>

          <div className="flex flex-col gap-(--space-section) lg:col-start-1 lg:row-start-1">
            <Block id="skills" title="Skills" rule="lead">
              <dl className="flex max-w-(--measure) flex-col gap-6">
                {SKILLS.map((s) => (
                  <div key={s.group}>
                    <dt className="text-label caps text-fg-subtle">{s.group}</dt>
                    <dd className="mt-2 text-body text-fg-muted">{s.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block id="education" title="Education" rule="none">
              <ul className="flex max-w-(--measure) flex-col gap-6">
                {EDUCATION.map((e) => (
                  <li key={e.field}>
                    <p className="text-label caps text-fg-subtle">{e.field}</p>
                    <div className="mt-2 text-body text-fg-muted">
                      {[e.minor, e.school, e.note].filter(Boolean).map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
        </div>

        <nav aria-label="Continue" className="mt-(--space-section) flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-10">
          {[
            { label: 'See the work', href: '/#work' },
            { label: 'Impact', href: '/impact' },
            { label: 'About', href: '/about' },
          ].map((l) => (
            <SiteLink key={l.href} href={l.href} className={heroLink}>
              {l.label}
              <ArrowRight size={12} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
            </SiteLink>
          ))}
        </nav>
      </div>
    </PageLayout>
  );
}
