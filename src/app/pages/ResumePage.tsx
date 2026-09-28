import type { ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { PageLayout } from '../components/PageLayout';
import { SiteLink } from '../components/SiteLink';
import { EDUCATION, EXPERIENCE, PROFILE, RESUME_PROJECTS, SKILLS } from '../data/profile';
import { EMAIL } from '../data/site';

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="border-t border-line pt-6">
      <h2 id={id} className="mb-6 text-label caps text-accent-deep">
        {title}
      </h2>
      {children}
    </section>
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
      title={PROFILE.name}
      lede={`${PROFILE.role} · ${PROFILE.location}`}
    >
      <div className="container-site pb-(--space-section)">
        {/* Contact actions: the first thing a recruiter needs after the name. */}
        <div className="mb-14 flex flex-wrap items-center gap-x-8 gap-y-4">
          <SiteLink href={`mailto:${EMAIL}`} className="group inline-flex items-center gap-1.5 border-b border-ink pb-1 text-label caps text-ink">
            {EMAIL}
            <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
          </SiteLink>
          <SiteLink href={PROFILE.linkedin} className="group inline-flex items-center gap-1.5 py-1 text-label caps text-fg-muted hover:text-ink">
            LinkedIn
            <ArrowUpRight size={12} strokeWidth={2} aria-hidden />
          </SiteLink>
          {PROFILE.resumePdf && (
            <a
              href={PROFILE.resumePdf}
              download
              className="inline-flex items-center gap-1.5 bg-ink px-4 py-2.5 text-label caps text-bone transition-colors hover:bg-accent-deep"
            >
              <Download size={13} strokeWidth={2} aria-hidden />
              Download PDF
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[8fr_4fr] lg:gap-20">
          {/* Main column */}
          <div className="flex flex-col gap-14">
            <Block id="summary" title="Summary">
              <p className="max-w-(--measure) text-body-lg text-fg-muted">
                Product designer who builds. Trained in architecture, digital interactive media, and computer science, I
                take products from research and interface design into working code, and I've shipped to the App Store.
              </p>
            </Block>

            <Block id="experience" title="Experience">
              <ol className="flex flex-col gap-10">
                {EXPERIENCE.map((e) => (
                  <li key={`${e.title}-${e.org}`}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="text-body-lg font-semibold text-ink">
                        {e.title} <span className="font-normal text-fg-muted">· {e.org}</span>
                      </h3>
                      {e.when && <p className="shrink-0 text-small text-fg-subtle">{e.when}</p>}
                    </div>
                    <ul className="mt-3 flex max-w-(--measure) flex-col gap-2">
                      {e.points.map((pt) => (
                        <li key={pt} className="flex gap-3 text-body text-fg-muted">
                          <span aria-hidden="true" className="mt-[11px] h-px w-3 shrink-0 bg-fg-subtle" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Block>

            <Block id="projects" title="Selected projects">
              <ul className="flex flex-col gap-8">
                {RESUME_PROJECTS.map((p) => (
                  <li key={p.name}>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <h3 className="text-body-lg font-semibold text-ink">
                        <SiteLink href={p.href} className="group inline-flex items-center gap-2 hover:text-accent-deep">
                          {p.name}
                          <ArrowRight size={14} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                        </SiteLink>{' '}
                        <span className="font-normal text-fg-muted">· {p.role}</span>
                      </h3>
                      <p className="shrink-0 text-small text-fg-subtle">{p.when}</p>
                    </div>
                    <p className="mt-2 max-w-(--measure) text-body text-fg-muted">{p.summary}</p>
                  </li>
                ))}
              </ul>
            </Block>
          </div>

          {/* Side column */}
          <div className="flex flex-col gap-14">
            <Block id="skills" title="Skills">
              <dl className="flex flex-col gap-5">
                {SKILLS.map((s) => (
                  <div key={s.group}>
                    <dt className="text-small font-semibold text-ink">{s.group}</dt>
                    <dd className="mt-1 text-body text-fg-muted">{s.items.join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </Block>

            <Block id="education" title="Education">
              <ul className="flex flex-col gap-5">
                {EDUCATION.map((e) => (
                  <li key={e.field}>
                    <p className="text-small font-semibold text-ink">{e.field}</p>
                    {e.school && <p className="mt-1 text-body text-fg-muted">{e.school}</p>}
                    {e.note && <p className="mt-1 text-body text-fg-muted">{e.note}</p>}
                  </li>
                ))}
              </ul>
            </Block>

            <nav aria-label="More" className="flex flex-col gap-3 border-t border-line pt-6">
              {[
                { label: 'See the work', href: '/#work' },
                { label: 'Impact', href: '/impact' },
                { label: 'About', href: '/about' },
              ].map((l) => (
                <SiteLink key={l.href} href={l.href} className="group inline-flex w-fit items-center gap-1.5 py-1 text-label caps text-ink">
                  {l.label}
                  <ArrowRight size={12} strokeWidth={2} aria-hidden className="transition-transform duration-300 ease-out group-hover:translate-x-0.5" />
                </SiteLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
