import type { AudioReel, Headshot, Project, ResourceLink } from '@/types';

/**
 * Media and download configuration.
 * Keep unavailable values undefined instead of linking visible controls to "#".
 */
export const voiceOverReels: AudioReel[] = [
  {
    title: 'Commercial Reel',
    type: 'Standard & Energetic Reads',
    verificationId: 'media.voiceover-reels',
  },
  {
    title: 'Radio Drama — Dramatic',
    type: 'Character Narration',
    verificationId: 'media.voiceover-reels',
  },
  {
    title: 'Radio Drama — Villain',
    type: 'Character Acting',
    verificationId: 'media.voiceover-reels',
  },
];

/** Add verified headshot files here after the original images are supplied. */
export const headshots: Headshot[] = [];

/** Add verified writing, directing, and producing credits here. */
export const writingAndFilmmakingProjects: Project[] = [];

/** Add verified streaming, pre-save, purchase, or press links here. */
export const musicLinks: ResourceLink[] = [];
