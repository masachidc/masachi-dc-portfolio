import { motion } from 'motion/react';

/**
 * Fixed, full-viewport atmospheric layer: slow-drifting blurred color
 * fields + a fine grain overlay, giving the pure-white ground "cinematic
 * depth" instead of flat white. Purely decorative — no pointer events.
 */
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        className="absolute -left-[10%] -top-[15%] h-[560px] w-[560px] rounded-full opacity-[0.16] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #0057FF, transparent 70%)' }}
        animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -right-[8%] top-[8%] h-[480px] w-[480px] rounded-full opacity-[0.14] blur-[140px]"
        style={{ background: 'radial-gradient(circle, #FF7A00, transparent 70%)' }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[30%] h-[520px] w-[520px] rounded-full opacity-[0.10] blur-[150px]"
        style={{ background: 'radial-gradient(circle, #7B2FFF, transparent 70%)' }}
        animate={{ x: [0, 25, 0], y: [0, -25, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.035] mix-blend-multiply">
        <filter id="grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain)" />
      </svg>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(10,10,11,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(10,10,11,0.025) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
    </div>
  );
}
