import type { ReactNode } from 'react';

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
