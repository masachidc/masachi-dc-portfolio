import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { easeOut, viewportOnce } from '../lib/motion';

interface RevealLineProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  trigger?: 'load' | 'inView';
}

/** A line of text that slides up from behind a mask instead of just fading in. */
export function RevealLine({ children, className = '', delay = 0, trigger = 'load' }: RevealLineProps) {
  const transition = { duration: 0.9, ease: easeOut, delay };

  return (
    <span className="block overflow-hidden">
      {trigger === 'load' ? (
        <motion.span
          initial={{ y: '110%' }}
          animate={{ y: '0%' }}
          transition={transition}
          className={`block ${className}`}
        >
          {children}
        </motion.span>
      ) : (
        <motion.span
          initial={{ y: '110%' }}
          whileInView={{ y: '0%' }}
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
