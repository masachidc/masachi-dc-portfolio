import { useState, type ReactNode } from 'react';

type ProjectNavigationItemProps = {
  textRestColor: string;
  dotRestColor: string;
  onHoverChange?: (hovered: boolean) => void;
  children: (state: {
    hovered: boolean;
    textColor: string;
    dotColor: string;
  }) => ReactNode;
};

/** Shared project-rail interaction: project names and dots resolve to ink on hover or focus. */
export function ProjectNavigationItem({
  textRestColor,
  dotRestColor,
  onHoverChange,
  children,
}: ProjectNavigationItemProps) {
  const [hovered, setHovered] = useState(false);

  function setInteractionState(next: boolean) {
    setHovered(next);
    onHoverChange?.(next);
  }

  return (
    <span
      className="block"
      onMouseEnter={() => setInteractionState(true)}
      onMouseLeave={() => setInteractionState(false)}
      onFocus={() => setInteractionState(true)}
      onBlur={() => setInteractionState(false)}
    >
      {children({
        hovered,
        textColor: hovered ? 'var(--color-ink)' : textRestColor,
        dotColor: hovered ? 'var(--color-ink)' : dotRestColor,
      })}
    </span>
  );
}
