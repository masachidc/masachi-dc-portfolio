import { useId } from 'react';
import type { Project } from '../data/projects';

/**
 * A project's status stamp (SHIPPED, BUILD, …): a solid tag with the word cut
 * out of it, so the cover shows through the letters. Sized from the label, so
 * it hugs the text like an auto-layout frame. One look for every label; the
 * fill is a theme colour token, overridable per use.
 */
export function StatusMark({
  label,
  color = 'var(--color-accent-soft)',
  className = '',
}: {
  label: Project['mark'];
  color?: string;
  className?: string;
}) {
  const maskId = `mark-${useId().replace(/:/g, '')}`;
  const padX = 10;
  const charW = 8.6;
  const textW = label.length * charW;
  const w = Math.round(textW + padX * 2);
  const h = 26;
  return (
    <svg aria-hidden="true" width={w} height={h} viewBox={`0 0 ${w} ${h}`} className={`shrink-0 ${className}`}>
      <mask id={maskId}>
        <rect width={w} height={h} rx={4} fill="white" />
        <text
          x={padX}
          y={h / 2}
          dominantBaseline="central"
          textLength={textW}
          lengthAdjust="spacingAndGlyphs"
          fill="black"
          className="font-display"
          style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.06em' }}
        >
          {label}
        </text>
      </mask>
      {/* tint seen only through the letters, so the cutout reads on light covers too */}
      <rect width={w} height={h} rx={4} fill="var(--color-ink-deep)" fillOpacity={0.8} />
      <rect width={w} height={h} rx={4} fill={color} mask={`url(#${maskId})`} />
    </svg>
  );
}
