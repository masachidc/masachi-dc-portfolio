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

/**
 * Labelled rows of short tokens, for orderings and chains that are clearer drawn than described
 * (e.g. a feed before and after, or a hierarchy). `arrow` joins tokens with arrows instead of dots.
 * Tokens with the same text get the same shade, so repeats read at a glance.
 */
export function Sequence({ rows, arrow = false, note }: { rows: { label: string; items: string[] }[]; arrow?: boolean; note?: ReactNode }) {
  const shades = ['bg-ink text-paper', 'bg-accent-deep text-paper', 'bg-paper text-ink ring-1 ring-inset ring-ink/40', 'bg-fg-subtle text-paper'];
  const order = [...new Set(rows.flatMap((r) => r.items))];
  const shade = (t: string) => (arrow ? 'bg-paper text-ink ring-1 ring-inset ring-ink/20' : shades[order.indexOf(t) % shades.length]);
  return (
    <figure className="space-y-4 pt-2">
      {rows.map(({ label, items }) => (
        <div key={label} className={`flex flex-col gap-2 ${arrow ? '' : 'sm:flex-row sm:items-center sm:gap-4'}`}>
          <p className={`text-small font-semibold text-ink ${arrow ? '' : 'sm:w-32 sm:shrink-0'}`}>{label}</p>
          <ol aria-label={`${label}: ${items.join(arrow ? ', then ' : ', ')}`} className="flex flex-wrap items-center gap-1.5">
            {items.map((t, i) => (
              <li key={i} aria-hidden="true" className="flex items-center gap-1.5">
                {arrow && i > 0 && <span className="text-small text-fg-subtle">→</span>}
                <span className={`inline-flex h-8 min-w-8 items-center justify-center rounded-[4px] px-2.5 text-small font-semibold ${shade(t)}`}>
                  {t}
                </span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      {note && <figcaption className="text-small text-fg-subtle">{note}</figcaption>}
    </figure>
  );
}

export const deepDiveHref =(d: Pick<DeepDive, 'parent' | 'slug'>) => `/works/${d.parent}/${d.slug}`;

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
