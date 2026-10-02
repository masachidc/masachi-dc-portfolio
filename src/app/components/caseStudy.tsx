import type { ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';
import { SiteLink } from './SiteLink';
import type { DeepDive } from '../data/caseStudies/types';

// Building blocks for case-study copy. Kept apart from the page template so
// case-study data (which renders these at module load) never imports the page.

/** Bold-black emphasis inside grey body copy. */
export function Hl({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

/** Accent-dash bullet list. */
export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-start gap-3">
          <span aria-hidden="true" className="mt-[13px] h-1 w-4 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 2-up grid of soft grey cards. */
export function Cards({ items }: { items: string[] }) {
  return (
    <ul className="grid grid-cols-1 gap-3 pt-2 sm:grid-cols-2">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="rounded-[6px] bg-surface p-4 text-body leading-snug text-ink/80">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Label + body pairs. `bar` adds an accent rule on the left (for pillars / jobs to be done). */
export function Points({ items, bar = false }: { items: { label: string; body: ReactNode }[]; bar?: boolean }) {
  return (
    <div className={`${bar ? 'space-y-6' : 'space-y-8'} pt-2`}>
      {items.map(({ label, body }, i) =>
        bar ? (
          <div key={`${label}-${i}`} className="border-l-2 border-accent pl-5">
            <p className="mb-1 font-semibold text-ink">{label}</p>
            <p>{body}</p>
          </div>
        ) : (
          <div key={`${label}-${i}`}>
            <p className="mb-2 font-semibold text-ink">{label}</p>
            <p>{body}</p>
          </div>
        ),
      )}
    </div>
  );
}

/**
 * A small comparison table for evidence that reads better side by side than in prose.
 * First column is the row label; the rest are values, right-aligned. Keep it to a few rows and columns.
 */
export function Table({ head, rows, note }: { head: string[]; rows: ReactNode[][]; note?: ReactNode }) {
  return (
    <figure className="pt-2">
      <div className="overflow-x-auto">
        {/* Four or more columns scroll sideways on phones instead of crushing the labels. */}
        <table className={`w-full border-collapse text-left text-body ${head.length > 3 ? 'min-w-[32rem]' : ''}`}>
          <thead>
            <tr className="border-b border-ink">
              {head.map((h, i) => (
                <th key={`${h}-${i}`} scope="col" className={`pb-3 pr-4 align-bottom text-small font-semibold text-ink last:pr-0 ${i ? 'text-right' : ''}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([label, ...values], r) => (
              <tr key={r} className="border-b border-line">
                <th scope="row" className="py-3 pr-4 font-normal text-ink/80">
                  {label}
                </th>
                {values.map((v, i) => (
                  <td key={i} className="py-3 pr-4 text-right tabular-nums text-ink last:pr-0">
                    {v}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {note && <figcaption className="mt-3 text-small text-fg-subtle">{note}</figcaption>}
    </figure>
  );
}

export const deepDiveHref = (d: Pick<DeepDive, 'parent' | 'slug'>) => `/works/${d.parent}/${d.slug}`;

/** Hand-off to a deep dive. Takes the deep dive itself, so it can never point at a page that doesn't exist. */
export function DeepLink({ to }: { to: DeepDive }) {
  return (
    <p className="pt-2">
      <SiteLink href={deepDiveHref(to)} className="group inline-flex flex-col gap-1.5">
        <span className="text-label caps text-accent-deep">Deep dive</span>
        <span className="inline-flex items-center gap-2 font-semibold text-ink underline decoration-ink/25 underline-offset-4 transition-colors group-hover:decoration-ink">
          {to.title}
          <ArrowRight size={16} strokeWidth={2} aria-hidden className="shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </span>
      </SiteLink>
    </p>
  );
}
