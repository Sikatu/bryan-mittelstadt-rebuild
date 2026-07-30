import type { ImageAsset, SiteAssets } from '@/types';

const verificationId = 'asset.hero-and-portfolio-images';

function pendingAsset(
  id: string,
  label: string,
  alt: string,
  tone: ImageAsset['tone'] = 'warm',
  objectPosition = '50% 50%',
): ImageAsset {
  return {
    id,
    label,
    alt,
    availability: 'pending',
    objectPosition,
    tone,
    verificationId,
  };
}

export function approvedAsset(
  id: string,
  label: string,
  alt: string,
  src: string,
  tone: ImageAsset['tone'] = 'warm',
  objectPosition = '50% 50%',
): ImageAsset {
  return {
    id,
    label,
    alt,
    src,
    availability: 'available',
    objectPosition,
    tone,
    verificationId,
  };
}

const featured = '/images/bryan/current-site/featured';
const print = '/images/bryan/current-site/print';

/**
 * Current-site media recovered from Bryan's publicly displayed Wix portfolio.
 * Final crops, captions, photographer credits, and download rights still need
 * Bryan or an authorized representative to approve before launch.
 */
export const siteAssets: SiteAssets = {
  heroImage: approvedAsset(
    'hero-primary',
    'Homepage cinematic still',
    'Bryan Mittelstadt seated in a warmly lit interior scene',
    `${featured}/hero-primary.jpg`,
    'dark',
    '64% 48%',
  ),
  reelPosterImage: approvedAsset(
    'reel-poster-primary',
    'Acting reel poster',
    'Bryan Mittelstadt in a cinematic blue-lit acting scene',
    `${featured}/acting-reel-poster.jpg`,
    'dark',
    '57% 45%',
  ),
  portraitImage: approvedAsset(
    'about-portrait',
    'About portrait',
    'Bryan Mittelstadt in a relaxed outdoor lifestyle portrait',
    `${featured}/bio-lifestyle.jpg`,
    'warm',
    '50% 30%',
  ),
  verificationId,
};

export const projectImageAssets = {
  overviewEffect: pendingAsset(
    'project-overview-effect',
    'The Overview Effect',
    'Approved production image for The Overview Effect',
    'accent',
  ),
  quietAfterSupper: pendingAsset(
    'project-quiet-after-supper',
    'Quiet After Supper',
    'Approved production still from Quiet After Supper',
    'dark',
  ),
  darling: approvedAsset(
    'project-darling',
    'Darling',
    'Current public artwork for Bryan Mittelstadt album Darling',
    `${featured}/darling-artwork.jpg`,
    'warm',
    '50% 50%',
  ),
  julius: pendingAsset(
    'project-julius',
    'Julius',
    'Approved production still from Julius',
    'neutral',
  ),
  bloodAndSexOverAmbition: pendingAsset(
    'project-blood-and-sex-over-ambition',
    'Blood and Sex Over Ambition',
    'Approved production still from Blood and Sex Over Ambition',
    'dark',
  ),
  goldilocks: pendingAsset(
    'project-goldilocks',
    'Goldilocks and the Two Bears',
    'Approved production still from Goldilocks and the Two Bears',
    'warm',
  ),
  give: pendingAsset(
    'project-give',
    'Give',
    'Approved production still from Give',
    'neutral',
  ),
  lastFiveYears: pendingAsset(
    'project-last-five-years',
    'The Last Five Years',
    'Approved stage image from The Last Five Years',
    'accent',
  ),
  arabesque: pendingAsset(
    'project-arabesque',
    'Arabesque',
    'Approved production still from Arabesque',
    'dark',
  ),
} satisfies Record<string, ImageAsset>;

export const disciplineImageAssets = {
  acting: approvedAsset(
    'discipline-acting',
    'Acting',
    'Bryan Mittelstadt in a black-and-white production still',
    `${featured}/discipline-acting.png`,
    'dark',
    '50% 42%',
  ),
  voiceOver: approvedAsset(
    'discipline-voice-over',
    'Voice-Over',
    'Editorial portrait of Bryan Mittelstadt',
    `${print}/print-05.jpeg`,
    'neutral',
    '50% 28%',
  ),
  music: approvedAsset(
    'discipline-music',
    'Music',
    'Current public artwork for Bryan Mittelstadt album Darling',
    `${featured}/darling-artwork.jpg`,
    'warm',
    '50% 50%',
  ),
  writing: approvedAsset(
    'discipline-writing-filmmaking',
    'Writing & Filmmaking',
    'Editorial photograph of Bryan Mittelstadt on a staircase',
    `${print}/print-16-staircase.jpg`,
    'accent',
    '50% 50%',
  ),
} satisfies Record<string, ImageAsset>;
