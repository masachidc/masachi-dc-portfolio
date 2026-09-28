import { useEffect } from 'react';
import { motion } from 'motion/react';
import { Nav } from '../components/Nav';
import { Footer } from '../components/Footer';
import { easeOut } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';

/**
 * Placeholder for a nav destination whose content isn't written yet.
 * Kept out of search results (noindex) and the sitemap until it has content.
 */
export function BlankPage({ title }: { title: string }) {
  usePageMeta({ title, noindex: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main id="main" tabIndex={-1} className="container-site flex-1 pb-32 pt-20 focus:outline-none lg:pt-28">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="font-display text-display text-ink"
        >
          {title}
        </motion.h1>
      </main>
      <Footer />
    </div>
  );
}
