import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { easeOut } from '../lib/motion';

/** Placeholder page for a nav destination whose content isn't written yet. */
export function BlankPage({ title }: { title: string }) {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${title} — Masachi DC`;
  }, [title]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main className="mx-auto w-full max-w-[1280px] flex-1 px-6 pb-32 pt-20 sm:px-12 md:px-20 lg:px-32 lg:pt-28 xl:px-40">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="font-display text-[52px] font-extrabold leading-[0.96] tracking-[-0.02em] text-ink sm:text-[68px] lg:text-[80px]"
        >
          {title}
        </motion.h1>
      </main>
      <Footer />
    </div>
  );
}
