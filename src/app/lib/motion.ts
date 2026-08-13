export const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: easeOut } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1, ease: easeOut } },
};

export function stagger(delayChildren = 0, staggerChildren = 0.09) {
  return {
    hidden: {},
    show: { transition: { delayChildren, staggerChildren } },
  };
}

export const viewportOnce = { once: true, margin: '-10% 0px -10% 0px' } as const;
