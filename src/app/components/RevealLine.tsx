import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { easeOut, viewportOnce } from '../lib/motion';

interface RevealLineProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: 'load' | 'inView';
}

/**
 * A line of text that slides up from behind a mask, settling into focus
 * slightly ahead of the position landing — the blur/fade resolves a beat
 * before the slide finishes, like a rack-focus rather than one flat tween.
 */
export function RevealLine({ children, className = '', delay = 0, trigger = 'load' }: RevealLineProps) {
  const initial = { y: '110%', opacity: 0, filter: 'blur(6px)' };
  const target = { y: '0%', opacity: 1, filter: 'blur(0px)' };
  const transition = {
    y: { duration: 0.9, ease: easeOut, delay },
    opacity: { duration: 0.5, ease: easeOut, delay },
    filter: { duration: 0.55, ease: easeOut, delay },
  };

  return (
    <span className="block overflow-hidden">
      {trigger === 'load' ? (
        <motion.span
          initial={initial}
          animate={target}
          transition={transition}
          className={`block ${className}`}
        >
          {children}
        </motion.span>
      ) : (
        <motion.span
          initial={initial}
          whileInView={target}
          viewport={viewportOnce}
          transition={transition}
          className={`block ${className}`}
        >
          {children}
        </motion.span>
      )}
    </span>
  );
}
