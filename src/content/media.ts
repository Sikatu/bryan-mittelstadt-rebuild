import type {
  AudioReel,
  CreativeProject,
  Headshot,
  ResourceLink,
  VideoReel,
} from '@/types';
import { siteAssets } from './assets';

export const actingReels: VideoReel[] = [
  {
    id: 'dramatic',
    title: 'Dramatic Reel',
    category: 'Film & Television',
    description: 'Client-supplied dramatic reel master.',
    url: 'https://drive.google.com/file/d/1yFTzVNWiwkIOjo7lrRCfn0c8mzwkgy80/view',
    posterImage: siteAssets.reelPosterImage,
    year: '2026',
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'comedic',
    title: 'Comedy Reel',
    category: 'Comedy',
    description: 'Client-supplied comedy reel master dated May 2026.',
    url: 'https://drive.google.com/file/d/1AmJg8TyaGCA0UNcUktBc62e65Abol0jX/view',
    posterImage: siteAssets.reelPosterImage,
    year: '2026',
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'commercial',
    title: 'Commercial Reel',
    category: 'Commercial',
    description: 'Client-supplied commercial performance reel.',
    url: 'https://drive.google.com/file/d/1HWgIlZ-sYYJilsAB3daiJ1IA4W2OOpqg/view',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'lgbtq',
    title: 'LGBTQ Reel',
    category: 'Identity-Led Work',
    description: 'Client-supplied LGBTQ performance reel.',
    url: 'https://drive.google.com/file/d/1xJo7309NAetHpMG2g_QR2X7m36LM0yR0/view',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'musical',
    title: 'Voice & Guitar Reel',
    category: 'Musical Performance',
    description: 'Client-supplied vocal and guitar performance reel.',
    url: 'https://drive.google.com/file/d/17hlzx--qepYe407EJ-PYu32GdPoCneik/view',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'classical-voice',
    title: 'Classical Voice',
    category: 'Classical Voice',
    description: 'Public classical voice performance retained from Bryan’s existing site.',
    url: 'https://www.youtube.com/watch?v=bQ4o8ZrE7a0',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'stage',
    title: 'Stage Reel',
    category: 'Theatre',
    description: 'Client-supplied stage performance reel.',
    url: 'https://drive.google.com/file/d/1ioaheYg3U5LqpFqU7VHiubTwzGg1b6un/view',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
];

export const hasAvailableActingReel = actingReels.some(
  (reel) => reel.availability === 'available' && Boolean(reel.url),
);

export const voiceOverReels: AudioReel[] = [
  {
    id: 'narrative',
    title: 'Narrative VO Reel',
    category: 'Narration',
    description: 'Client-supplied narrative voice-over reel.',
    audioUrl: 'https://drive.google.com/file/d/16uwRmlToiTBs7VjhBGWx5pKlY_9z_c8A/view',
    sourceType: 'external',
    availability: 'available',
    verificationId: 'media.voiceover-reels',
  },
  {
    id: 'commercial',
    title: 'Commercial VO',
    category: 'Commercial',
    description: 'Commercial voice-over sample hosted on Bryan’s official SoundCloud.',
    audioUrl: 'https://soundcloud.com/bryan-mittelstadt/bryanmittelstadt-commercialvo?in=bryan-mittelstadt/sets/bryanmittelstadt_vo-clips&si=d526db148f9743fa878c42d4d8a72362&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    sourceType: 'external',
    availability: 'available',
    verificationId: 'media.voiceover-reels',
  },
  {
    id: 'radio-drama-dramatic',
    title: 'Radio Drama — Dramatic/Emotional',
    category: 'Radio Drama',
    description: 'Dramatic and emotional radio-drama performance hosted on Bryan’s official SoundCloud.',
    audioUrl: 'https://soundcloud.com/bryan-mittelstadt/bryanmittelstadt-dramatic?si=19586040fd104666a1517a23003800a2&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    sourceType: 'external',
    availability: 'available',
    verificationId: 'media.voiceover-reels',
  },
  {
    id: 'radio-drama-villain',
    title: 'Radio Drama — Villain',
    category: 'Radio Drama',
    description: 'Villain radio-drama performance hosted on Bryan’s official SoundCloud.',
    audioUrl: 'https://soundcloud.com/bryan-mittelstadt/radiodrama_villain_onthenightt?si=3464d411dfca4862bc84d4f5f8dd48ee&utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
    sourceType: 'external',
    availability: 'available',
    verificationId: 'media.voiceover-reels',
  },
];

const approved = '/media/approved';

export const headshots: Headshot[] = [
  {
    id: 'approved-theatrical',
    src: `${approved}/headshot-theatrical`,
    downloadUrl: `${approved}/headshot-theatrical`,
    alt: 'Bryan Mittelstadt theatrical headshot against a warm brown background',
    label: 'Theatrical',
    category: 'Theatrical',
    verificationId: 'asset.headshots',
  },
  {
    id: 'approved-commercial',
    src: `${approved}/headshot-commercial`,
    downloadUrl: `${approved}/headshot-commercial`,
    alt: 'Bryan Mittelstadt smiling in a professional commercial headshot',
    label: 'Commercial',
    category: 'Commercial',
    verificationId: 'asset.headshots',
  },
  {
    id: 'approved-editorial',
    src: `${approved}/lifestyle`,
    downloadUrl: `${approved}/lifestyle`,
    alt: 'Bryan Mittelstadt seated against a dark blue studio background',
    label: 'Editorial',
    category: 'Editorial',
    verificationId: 'asset.headshots',
  },
];

export const writingAndFilmmakingProjects: CreativeProject[] = [
  {
    title: 'The Sea Ranch',
    discipline: 'Writing & Filmmaking',
    contribution: ['Writer'],
    projectType: 'Other',
    logline:
      'Four lifelong friends reunite at the coastal home where their chosen family began, confronting how love, betrayal, and memory have reshaped them over fifty years.',
    availability: 'available',
    verificationId: 'media.writing-projects',
  },
  {
    title: 'Carne',
    discipline: 'Writing & Filmmaking',
    contribution: ['Writer'],
    projectType: 'Other',
    logline:
      'A lonely man’s encounters through a mysterious dating app awaken a consuming hunger that blurs the line between sexual desire, compulsion, and violence.',
    availability: 'available',
    verificationId: 'media.writing-projects',
  },
  {
    title: 'Dry',
    discipline: 'Writing & Filmmaking',
    contribution: ['Writer'],
    projectType: 'Other',
    logline:
      'While detoxing in a strange Glendale home, a man is drawn into a mythic underworld where he must confront his estranged brother, his abusive father’s legacy, and what it will take to break the cycle.',
    availability: 'available',
    verificationId: 'media.writing-projects',
  },
  {
    title: 'What Remains',
    discipline: 'Writing & Filmmaking',
    contribution: ['Writer'],
    projectType: 'Other',
    logline:
      'In a dying world where survival is tightly rationed, three people must face a brutal question: whose life is considered most valuable to humanity’s future?',
    availability: 'available',
    verificationId: 'media.writing-projects',
  },
  {
    title: 'Bubble Gum',
    discipline: 'Writing & Filmmaking',
    contribution: ['Director'],
    projectType: 'Short Film',
    logline:
      'A socially unconventional teacher and a lonely nine-year-old share an unexpected moment of connection that quietly changes how they see themselves and each other.',
    availability: 'available',
    verificationId: 'media.writing-projects',
  },
];

export const musicLinks: ResourceLink[] = [];
export const musicSamples: AudioReel[] = [];
