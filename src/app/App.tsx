import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from './components/SiteLink';
import { usePageMeta } from './lib/usePageMeta';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { WhatIDo } from './components/WhatIDo';
import { HomeNavigationCards } from './components/HomeNavigationCards';
import { Footer } from './components/Footer';
import { ProjectIndexRail } from './components/ProjectIndexRail';
import { ScrollProgress } from './components/ScrollProgress';
import viewportBackground from '../../assets/viewport-bg.jpg';
import viewportBackgroundAvif from '../../assets/viewport-bg.avif';
import navigationBackground from '../../assets/viewport-bg-nav.jpg';
import navigationBackgroundAvif from '../../assets/viewport-bg-nav.avif';

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      (window as unknown as { __lenis?: Lenis }).__lenis = undefined;
    };
  }, []);
}

/**
 * Arriving from another page: land at the top, or — with a hash like "/#work" —
 * scroll to that section once laid out.
 */
function useHashScroll() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      scrollToTarget('', { instant: true });
      return;
    }
    const id = hash.slice(1);
    let cancelled = false;
    let landedAt = -1;
    const t = window.setTimeout(() => {
      scrollToTarget(id, { instant: true });
      landedAt = window.scrollY;
    }, 60);
    // Web fonts can finish after the jump and push the section down; correct once,
    // unless the visitor has already scrolled on their own.
    document.fonts?.ready.then(() => {
      requestAnimationFrame(() => {
        if (!cancelled && (landedAt === -1 || window.scrollY === landedAt)) {
          scrollToTarget(id, { instant: true });
        }
      });
    });
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [hash]);
}

export default function App() {
  useSmoothScroll();
  useHashScroll();
  usePageMeta();

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <ScrollProgress />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Nav />
        {/* Inside the content layer so the header (z-50) and its dropdown stack above the rail (z-30). */}
        <ProjectIndexRail />
        <main id="main" tabIndex={-1} className="home-layout flex-1 focus:outline-none">
          <div className="relative isolate overflow-hidden">
            <picture>
              <source srcSet={viewportBackgroundAvif} type="image/avif" />
              <img
                src={viewportBackground}
                alt=""
                width={2560}
                height={4549}
                decoding="async"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
              />
            </picture>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-bone/50" />
            <div className="relative z-10">
              <Hero kickerRole="greeting" />
              <ProjectGrid />
            </div>
          </div>
          <div className="bg-bone">
            <WhatIDo />
          </div>
          <div className="relative isolate overflow-hidden">
            <picture>
              <source srcSet={navigationBackgroundAvif} type="image/avif" />
              <img
                src={navigationBackground}
                alt=""
                width={2560}
                height={900}
                decoding="async"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-0 h-full w-full select-none object-cover"
              />
            </picture>
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 bg-bone/50" />
            <div className="relative z-10">
              <HomeNavigationCards />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
