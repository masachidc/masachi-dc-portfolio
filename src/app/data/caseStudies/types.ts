import type { ReactNode } from 'react';

/** Reserved aspect ratios. Media always reserves its box, so images never shift layout. */
export type MediaRatio = '16/9' | '3/2' | '4/3' | '1/1' | '3/4';

/**
 * One image slot. Omit `src` until the real asset exists: in preview the slot
 * renders as labelled scaffolding; on a published page it is simply left out.
 */
export interface Media {
  /** Author note for the slot: what belongs here. Shown only on unfinished slots. */
  slot: string;
  ratio: MediaRatio;
  src?: string;
  /** Required with `src`. Describe what the image shows, not the file. */
  alt?: string;
}

export type CaseBlock =
  /** Kicker + title beside prose. Optional media sits under the text at reading width. */
  | { kind: 'section'; kicker: string; title: string; body: ReactNode; id?: string; wide?: boolean; media?: Media }
  /** A turning point: what was learned or decided, stated in one line. */
  | { kind: 'insight'; label: 'Insight' | 'Decision' | 'What changed' | 'Recognition'; statement: string; detail?: ReactNode }
  /** Full-bleed grey band. 1 item = single, 2 = two-up, 3 = row. `wide` breaks past the reading column. */
  | { kind: 'media'; items: Media[]; caption?: string; wide?: boolean }
  /** Short facts or numbers that close the story. Values can be words. */
  | { kind: 'outcomes'; kicker: string; items: { value: string; label: string }[]; id?: string };

export interface CaseStudy {
  /** Matches the project's slug: served at /works/<slug>. */
  slug: string;
  /**
   * `published`: indexable and listed in the sitemap.
   * `draft`: noindex; the public URL shows a "case study in progress" page.
   * Append `?preview` to the URL to review the full draft.
   */
  status: 'published' | 'draft';
  /** Hero title, one entry per line. */
  title: string[];
  /** One line: what it is and why it matters. */
  tagline: string;
  /** Curated hero facts (role, timeline, platform…). Only what's meaningful for this project. */
  facts: [label: string, value: string][];
  /** Optional outbound links shown in the hero (live product, repo…). */
  links?: { label: string; href: string }[];
  /** The 20-second read: three short answers (e.g. problem / decision / outcome). */
  glance?: { label: string; text: string }[];
  /** The 60-second read: what it is, who it's for, what Nathan owned. */
  overview?: ReactNode;
  cover?: Media;
  blocks: CaseBlock[];
  /** Search/social description. Falls back to the project description. */
  description?: string;
}
