import { useEffect } from 'react';
import Lenis from 'lenis';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { ProjectGrid } from './components/ProjectGrid';
import { ClosingCta } from './components/ClosingCta';
import { Footer } from './components/Footer';

function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let frame: number;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);
}

export default function App() {
  useSmoothScroll();

  return (
    <div className="flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main className="flex-1">
        <Hero />
        <ProjectGrid />
        <ClosingCta />
      </main>
      <Footer />
    </div>
  );
}
