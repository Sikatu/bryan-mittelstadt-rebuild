import type { AudioReel, Headshot, Project, ResourceLink } from '@/types';

/**
 * Media and download configuration.
 * Keep unavailable values undefined instead of linking visible controls to "#".
 */
export const voiceOverReels: AudioReel[] = [
  {
    title: 'Commercial Reel',
    type: 'Standard & Energetic Reads',
  },
  {
    title: 'Radio Drama — Dramatic',
    type: 'Character Narration',
  },
  {
    title: 'Radio Drama — Villain',
    type: 'Character Acting',
  },
];

/** Add verified headshot files here after the original images are supplied. */
export const headshots: Headshot[] = [];

/** Add verified writing, directing, and producing credits here. */
export const writingAndFilmmakingProjects: Project[] = [];

/** Add verified streaming, pre-save, purchase, or press links here. */
export const musicLinks: ResourceLink[] = [];
