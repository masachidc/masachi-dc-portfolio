import type { DeepDive } from '../types';
import { keshoBeta } from './keshoBeta';
import { keshoCapacitor } from './keshoCapacitor';
import { keshoSealed } from './keshoSealed';

/** Every deep dive, in reading order per case study. To add one: create a file here and list it. */
export const DEEP_DIVES: DeepDive[] = [keshoBeta, keshoSealed, keshoCapacitor];

export const findDeepDive = (parent: string | undefined, slug: string | undefined) =>
  DEEP_DIVES.find((d) => d.parent === parent && d.slug === slug);

export const deepDivesFor = (parent: string) => DEEP_DIVES.filter((d) => d.parent === parent);
