import type {
  AudioReel,
  CreativeProject,
  Headshot,
  ResourceLink,
  VideoReel,
} from '@/types';
import { siteAssets } from './assets';

/** Public reel links recovered from Bryan's current official website and channel. */
export const actingReels: VideoReel[] = [
  {
    id: 'dramatic',
    title: 'Acting Reel 2026',
    category: 'Film & Television',
    description: 'Current public acting reel selected from Bryan’s official YouTube channel.',
    url: 'https://www.youtube.com/watch?v=jcB9oISlmPg',
    posterImage: siteAssets.reelPosterImage,
    year: '2026',
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'comedic',
    title: 'Comedic Reel',
    category: 'Comedy',
    description: 'The current website lists a comedic reel, but a stable public URL was not exposed.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'commercial',
    title: 'Commercial Film Reel',
    category: 'Commercial',
    description: 'Current commercial performance reel from Bryan’s public YouTube channel.',
    url: 'https://www.youtube.com/watch?v=BCZGDyQI-LI',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'lgbtq',
    title: 'LGBTQ Reel',
    category: 'Identity-Led Work',
    description: 'Public reel embedded on Bryan’s current Acting page.',
    url: 'https://www.youtube.com/watch?v=bbqwvz7dBpA',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'musical',
    title: 'Vocal Reel / Guitar',
    category: 'Musical Performance',
    description: 'Public vocal and guitar performance reel from Bryan’s current website.',
    url: 'https://www.youtube.com/watch?v=8pURXDYgnqE',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'classical-voice',
    title: 'Classical Voice',
    category: 'Classical Voice',
    description: 'Public classical voice performance reel from Bryan’s current website.',
    url: 'https://www.youtube.com/watch?v=bQ4o8ZrE7a0',
    posterImage: siteAssets.reelPosterImage,
    availability: 'available',
    verificationId: 'media.acting-reel',
  },
  {
    id: 'stage',
    title: 'Stage Reel',
    category: 'Theatre',
    description: 'The current site lists sword, accent, and dance material, but no stable public URL was exposed.',
    availability: 'pending',
    verificationId: 'media.acting-reel',
  },
];

export const hasAvailableActingReel = actingReels.some(
  (reel) => reel.availability === 'available' && Boolean(reel.url),
);

/** Client-supplied Voice-Over reels hosted on Bryan's official SoundCloud. */
export const voiceOverReels: AudioReel[] = [
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

const printRoot = '/images/bryan/current-site/print';
const featuredRoot = '/images/bryan/current-site/featured';

/** Selected current-site portraits. Final order and download rights still need client approval. */
export const headshots: Headshot[] = [
  {
    id: 'current-headshot-01',
    src: `${featuredRoot}/home-dsc-1685.jpeg`,
    downloadUrl: `${featuredRoot}/home-dsc-1685.jpeg`,
    alt: 'Bryan Mittelstadt in a dark blue shirt against a dark studio background',
    label: 'Current Headshot 01',
    category: 'Theatrical',
    verificationId: 'asset.headshots',
  },
  {
    id: 'current-headshot-02',
    src: `${printRoot}/print-01-dsc-1960.jpeg`,
    downloadUrl: `${printRoot}/print-01-dsc-1960.jpeg`,
    alt: 'Bryan Mittelstadt smiling in an olive jacket against a warm brown background',
    label: 'Current Headshot 02',
    category: 'Commercial',
    verificationId: 'asset.headshots',
  },
  {
    id: 'current-headshot-03',
    src: `${printRoot}/print-02.jpeg`,
    downloadUrl: `${printRoot}/print-02.jpeg`,
    alt: 'Bryan Mittelstadt professional portrait from his current print gallery',
    label: 'Current Headshot 03',
    category: 'Theatrical',
    verificationId: 'asset.headshots',
  },
  {
    id: 'current-headshot-04',
    src: `${printRoot}/print-03.jpeg`,
    downloadUrl: `${printRoot}/print-03.jpeg`,
    alt: 'Bryan Mittelstadt professional portrait from his current print gallery',
    label: 'Current Headshot 04',
    category: 'Commercial',
    verificationId: 'asset.headshots',
  },
  {
    id: 'current-headshot-05',
    src: `${printRoot}/print-04.jpeg`,
    downloadUrl: `${printRoot}/print-04.jpeg`,
    alt: 'Bryan Mittelstadt professional portrait from his current print gallery',
    label: 'Current Headshot 05',
    category: 'Theatrical',
    verificationId: 'asset.headshots',
  },
  {
    id: 'current-headshot-06',
    src: `${printRoot}/print-05.jpeg`,
    downloadUrl: `${printRoot}/print-05.jpeg`,
    alt: 'Bryan Mittelstadt editorial portrait from his current print gallery',
    label: 'Current Headshot 06',
    category: 'Editorial',
    verificationId: 'asset.headshots',
  },
  {
    id: 'current-headshot-07',
    src: `${printRoot}/print-06.jpeg`,
    downloadUrl: `${printRoot}/print-06.jpeg`,
    alt: 'Bryan Mittelstadt professional portrait from his current print gallery',
    label: 'Current Headshot 07',
    category: 'Theatrical',
    verificationId: 'asset.headshots',
  },
  {
    id: 'current-headshot-08',
    src: `${printRoot}/print-07.jpeg`,
    downloadUrl: `${printRoot}/print-07.jpeg`,
    alt: 'Bryan Mittelstadt professional portrait from his current print gallery',
    label: 'Current Headshot 08',
    category: 'Commercial',
    verificationId: 'asset.headshots',
  },
];

export const writingAndFilmmakingProjects: CreativeProject[] = [];
export const musicLinks: ResourceLink[] = [];
export const musicSamples: AudioReel[] = [];
