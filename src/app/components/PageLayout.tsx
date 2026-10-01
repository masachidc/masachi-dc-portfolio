import { useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { easeOut } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import type { PageMeta } from '../lib/head';

/** Shell for top-level pages: nav, main landmark, footer, metadata, and an editorial page hero. */
export function PageLayout({
  meta,
  kicker,
  title,
  lede,
  actions,
  width = 'site',
  children,
}: {
  meta: PageMeta & { title: string };
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Links directly under the title (contact, downloads), before the lede. */
  actions?: ReactNode;
  /** Hero container: `reading` matches the case-study column, for pages whose body uses it too. */
  width?: 'site' | 'reading';
  children: ReactNode;
}) {
  usePageMeta(meta);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [meta.title]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
        <header className={`${width === 'reading' ? 'container-reading' : 'container-site'} pb-12 pt-16 lg:pb-16 lg:pt-24`}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeOut }}
            className="mb-4 font-display text-kicker text-fg-faint"
          >
            {kicker}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut, delay: 0.1 }}
            className="max-w-[18ch] font-display text-display text-ink"
          >
            {title}
          </motion.h1>
          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.25 }}
              className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              {actions}
            </motion.div>
          )}
          {lede && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOut, delay: 0.35 }}
              className="mt-8 max-w-[52ch] text-pretty text-lede text-fg-muted"
            >
              {lede}
            </motion.p>
          )}
        </header>
        {children}
      </main>
      <Footer />
    </div>
  );
}
