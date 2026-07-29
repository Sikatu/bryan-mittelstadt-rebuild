import type {
  AudioReel,
  CreativeProject,
  Headshot,
  ResourceLink,
  VideoReel,
} from '@/types';

/**
 * Acting reel slots requested during the content inventory.
 * Add only Bryan-approved URLs. Pending slots remain visible as honest states.
 */
export const actingReels: VideoReel[] = [
  {
    id: 'dramatic',
    title: 'Dramatic Reel',
    category: 'Film & Television',
    description: 'Dramatic scenes selected for casting and representation review.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'comedic',
    title: 'Comedic Reel',
    category: 'Comedy',
    description: 'Comedic performance material across screen and stage work.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'commercial',
    title: 'Commercial Reel',
    category: 'Commercial',
    description: 'Commercial performance samples approved for public use.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'lgbtq',
    title: 'LGBTQ+ Reel',
    category: 'Identity-Led Work',
    description: 'Selected identity-led performances when Bryan approves the final reel.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'musical',
    title: 'Vocal & Guitar Reel',
    category: 'Musical Performance',
    description: 'Singing, guitar, and musical-performance material.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'stage',
    title: 'Stage Reel',
    category: 'Theatre',
    description: 'Stage performance excerpts approved for online presentation.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
];

export const hasAvailableActingReel = actingReels.some(
  (reel) => reel.availability === 'available' && Boolean(reel.url),
);

/** Voice-over categories stay configured even before final audio is delivered. */
export const voiceOverReels: AudioReel[] = [
  {
    id: 'commercial',
    title: 'Commercial Reel',
    category: 'Commercial',
    description: 'Standard, conversational, and energetic reads.',
    availability: 'pending',
    verificationId: 'media.voiceover-reels',
  },
  {
    id: 'narration',
    title: 'Narration Reel',
    category: 'Narration',
    description: 'Long-form, documentary, and dramatic narration.',
    availability: 'pending',
    verificationId: 'media.voiceover-reels',
  },
  {
    id: 'character',
    title: 'Character Reel',
    category: 'Character',
    description: 'Character acting for animation, games, and scripted audio.',
    availability: 'pending',
    verificationId: 'media.voiceover-reels',
  },
  {
    id: 'radio-drama',
    title: 'Radio Drama Reel',
    category: 'Radio Drama',
    description: 'Dramatic and villain performance selections for audio fiction.',
    availability: 'pending',
    verificationId: 'media.voiceover-reels',
  },
];

/** Add verified headshot files here after the original images are supplied. */
export const headshots: Headshot[] = [];

/** Add only Bryan-approved writing, directing, and producing projects. */
export const writingAndFilmmakingProjects: CreativeProject[] = [];

/** Add approved streaming, pre-save, purchase, performance, or press links. */
export const musicLinks: ResourceLink[] = [];

/** Add direct audio files or approved hosted samples for Darling. */
export const musicSamples: AudioReel[] = [];
