import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';
import { scrollToTarget } from './components/SiteLink';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { Footer } from './components/Footer';
import { Atmosphere } from './components/Atmosphere';
import { ProjectIndexRail } from './components/ProjectIndexRail';
import { ScrollProgress } from './components/ScrollProgress';

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

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Atmosphere />
      <ScrollProgress />
      <ProjectIndexRail />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <Hero />
          <ProjectGrid />
        </main>
        <Footer />
      </div>
    </div>
  );
}
