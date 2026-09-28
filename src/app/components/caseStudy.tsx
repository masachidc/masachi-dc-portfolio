import type { ReactNode } from 'react';

// Building blocks for case-study copy. Kept apart from the page template so
// case-study data (which renders these at module load) never imports the page.

export const CASE_ACCENT = '#008C95';
export const FRAME_BG = '#f3f3f1';

/** Bold-black emphasis inside grey body copy. */
export function Hl({ children }: { children: ReactNode }) {
  return <strong className="font-semibold text-ink">{children}</strong>;
}

/** Accent-dash bullet list. */
export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-[13px] h-1 w-4 shrink-0" style={{ backgroundColor: CASE_ACCENT }} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** 2-up grid of soft grey cards. */
export function Cards({ items }: { items: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 pt-2">
      {items.map((item) => (
        <div key={item} className="rounded-[6px] p-4" style={{ backgroundColor: FRAME_BG }}>
          <p className="text-[16px] leading-snug text-ink/70">{item}</p>
        </div>
      ))}
    </div>
  );
}

/** Label + body pairs. `bar` adds an accent rule on the left (for pillars / jobs to be done). */
export function Points({ items, bar = false }: { items: { label: string; body: ReactNode }[]; bar?: boolean }) {
  return (
    <div className={`${bar ? 'space-y-6' : 'space-y-8'} pt-2`}>
      {items.map(({ label, body }) =>
        bar ? (
          <div key={label} className="border-l-2 pl-5" style={{ borderColor: CASE_ACCENT }}>
            <p className="mb-1 font-semibold text-ink">{label}</p>
            <p>{body}</p>
          </div>
        ) : (
          <div key={label}>
            <p className="mb-2 font-semibold text-ink">{label}</p>
            <p>{body}</p>
          </div>
        ),
      )}
    </div>
  );
}
