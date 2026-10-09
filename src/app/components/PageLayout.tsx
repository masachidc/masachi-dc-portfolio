import { useEffect, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Nav } from './Nav';
import { Footer } from './Footer';
import { easeOut } from '../lib/motion';
import { usePageMeta } from '../lib/usePageMeta';
import viewportBackground from '../../../assets/viewport-bg.jpg';
import viewportBackgroundAvif from '../../../assets/viewport-bg.avif';

/** Shell for top-level pages: nav, main landmark, footer, metadata, and an editorial page hero. */
export function PageLayout({
  meta,
  kicker,
  title,
  lede,
  actions,
  width = 'site',
  titleSize = 'display',
  viewportBg = false,
  children,
}: {
  meta: { title: string; description: string; noindex?: boolean };
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  /** Links directly under the title (contact, downloads), before the lede. */
  actions?: ReactNode;
  /** Hero container: `reading` matches the case-study column, for pages whose body uses it too. */
  width?: 'site' | 'reading';
  /** Hero title role: `display` by default; `headline` for a quieter page (Resume). */
  titleSize?: 'display' | 'headline';
  /** Homepage viewport image behind the page, from under the nav through to the footer. */
  viewportBg?: boolean;
  children: ReactNode;
}) {
  usePageMeta(meta);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [meta.title]);

  return (
    <div className="relative flex min-h-screen flex-col bg-bone font-sans">
      <Nav />
      <main
        id="main"
        tabIndex={-1}
        className={`flex-1 focus:outline-none${viewportBg ? ' relative overflow-hidden' : ''}`}
      >
        {viewportBg && (
          <picture>
            <source srcSet={viewportBackgroundAvif} type="image/avif" />
            <img
              src={viewportBackground}
              alt=""
              width={2560}
              height={4549}
              decoding="async"
              aria-hidden="true"
              className="immersive-bg"
            />
          </picture>
        )}
        {viewportBg && (
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-paper/85" />
        )}
        <div className={viewportBg ? 'relative' : undefined}>
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
              className={`max-w-[18ch] font-display text-ink ${titleSize === 'headline' ? 'text-headline' : 'text-display'}`}
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
        </div>
      </main>
      <Footer />
    </div>
  );
}
