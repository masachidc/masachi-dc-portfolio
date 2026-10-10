import viewportBackground from '../../../assets/viewport-bg.jpg';
import viewportBackgroundAvif from '../../../assets/viewport-bg.avif';
import navigationBackground from '../../../assets/viewport-bg-nav.jpg';
import navigationBackgroundAvif from '../../../assets/viewport-bg-nav.avif';

const PLATES = {
  /** Tall plate behind the homepage hero and Selected work (also the Resume page). */
  viewport: { src: viewportBackground, avif: viewportBackgroundAvif, width: 2560, height: 4549 },
  /** Short plate behind the homepage's "Where to next" cards. */
  navigation: { src: navigationBackground, avif: navigationBackgroundAvif, width: 2560, height: 900 },
} as const;

/**
 * Decorative full-bleed plate (see .immersive-bg in theme.css) plus the veil that softens it. The parent must be
 * `relative` and clip its overflow; content that sits on the plate goes in a later `relative` sibling.
 */
export function ImmersiveBackground({
  plate,
  veil,
  lazy = false,
}: {
  plate: keyof typeof PLATES;
  /** Background utility for the veil over the image, e.g. `bg-bone/50`. */
  veil: string;
  /** Below the fold: let the browser defer the request. */
  lazy?: boolean;
}) {
  const { src, avif, width, height } = PLATES[plate];
  return (
    <>
      <picture>
        <source srcSet={avif} type="image/avif" />
        <img
          src={src}
          alt=""
          width={width}
          height={height}
          decoding="async"
          loading={lazy ? 'lazy' : undefined}
          aria-hidden="true"
          className="immersive-bg"
        />
      </picture>
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-0 ${veil}`} />
    </>
  );
}
