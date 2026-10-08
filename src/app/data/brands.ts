/**
 * Per-project brand systems, keyed by project slug. Each case study takes on
 * its project's brand; the homepage card overlay and the project rails use
 * `primary` today. Colours here are the project's own brand colours, as given
 * by Nathan — don't approximate or invent them. Grow a brand (secondary,
 * type, …) here as the case studies start to use it.
 */
export interface Brand {
  /** The project's primary brand colour. */
  primary: string;
  /** Optional darker base for the card's hover wash; omit to wash in `primary` alone. */
  primaryDeep?: string;
  /** Where the colour came from, when it isn't a plain hex (e.g. a CMYK spec). */
  source?: string;
}

export const BRANDS = {
  // TEMBO and INLINE deep: same hue as the brand colour, darkened at Nathan's request.
  'tembo-app': { primary: '#FFC829', primaryDeep: '#E0A800' },
  // The Hulk's green, chosen by Nathan for KESHO.
  'kesho-app': { primary: '#0B7A3B', primaryDeep: '#03401F' },
  'amuse-art-museum': { primary: '#260101' },
  'inline-chrome-extension': { primary: '#007BA8', primaryDeep: '#004B66' },
  'project-seeds-branding': { primary: '#001047', source: 'CMYK 100/87/42/52' },
  // Interim: the original card green, kept until the Hulk's brand colours are set.
  'the-incredible-hulk': { primary: '#0B7A3B', primaryDeep: '#03401F' },
  // The red of the "Global STEM Summer Camp" logo ribbon, picked by Nathan. Deep: a darker red-orange for the card
  // hover, at Nathan's request (the ribbon red was too bright as a full fill).
  stemxposure: { primary: '#E4010D', primaryDeep: '#B8360F' },
} satisfies Record<string, Brand>;

/** True for light colours (e.g. TEMBO yellow) that need ink text on top, not white. */
export function isLightColor(hex: string) {
  const n = parseInt(hex.replace('#', ''), 16);
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  return luminance > 0.4;
}
