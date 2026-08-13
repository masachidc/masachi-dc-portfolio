import { motion } from 'motion/react';

/**
 * Fixed, full-viewport atmospheric layer: a few slow-drifting, very faint
 * blurred color fields at the edges — pure white ground, just a hint of
 * depth. Purely decorative — no pointer events.
 */
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bone">
      <motion.div
        className="absolute -left-[10%] -top-[15%] h-[560px] w-[560px] rounded-full opacity-[0.06] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #0057FF, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[8%] top-[8%] h-[480px] w-[480px] rounded-full opacity-[0.05] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #FF7A00, transparent 70%)' }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-[520px] w-[520px] rounded-full opacity-[0.04] blur-[150px]"
        style={{ background: 'radial-gradient(circle, #7B2FFF, transparent 70%)' }}
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
