import { useEffect } from 'react';
import Lenis from 'lenis';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { ClosingCta } from './components/ClosingCta';
import { Footer } from './components/Footer';
import { Atmosphere } from './components/Atmosphere';
import { ProjectIndexRail } from './components/ProjectIndexRail';

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

export default function App() {
  useSmoothScroll();

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Atmosphere />
      <ProjectIndexRail />
      <div className="relative z-10 flex min-h-screen flex-col">
        <Nav />
        <main className="flex-1">
          <Hero />
          <ProjectGrid />
          <ClosingCta />
        </main>
        <Footer />
      </div>
    </div>
  );
}
