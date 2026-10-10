import type Lenis from 'lenis';

/** Space kept above a scroll target so it clears the fixed header. */
export const NAV_OFFSET = 96;

/** The homepage's Lenis instance, published on `window.__lenis` while it runs. Other pages scroll natively. */
type LenisWindow = Window & { __lenis?: Lenis };

export function getLenis() {
  return (window as LenisWindow).__lenis;
}

export function setLenis(lenis: Lenis | undefined) {
  (window as LenisWindow).__lenis = lenis;
}

/**
 * Scroll to an in-page target (or the top when id is empty), via Lenis when present.
 * The target is resolved to an absolute offset from the live window position, so it
 * stays correct even when Lenis hasn't synced yet (e.g. right after a route change).
 * `instant` jumps without animating — used when arriving from another page.
 */
export function scrollToTarget(id: string, { instant = false } = {}) {
  const lenis = getLenis();
  const el = id ? document.getElementById(id) : null;
  if (id && !el) return;
  const top = el ? Math.max(0, el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET) : 0;
  if (lenis) {
    lenis.scrollTo(top, { immediate: instant, force: true });
  } else {
    window.scrollTo({ top, behavior: instant ? 'auto' : 'smooth' });
  }
}
