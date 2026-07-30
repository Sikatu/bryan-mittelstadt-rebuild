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

/**
 * Central art-direction registry. Add a local `src` only after the image is
 * supplied, approved, and stored under `public/images/bryan/`.
 */
export const siteAssets: SiteAssets = {
  heroImage: pendingAsset(
    'hero-primary',
    'Homepage portrait',
    'Bryan Mittelstadt in an approved cinematic portrait',
    'dark',
    '50% 32%',
  ),
  reelPosterImage: pendingAsset(
    'reel-poster-primary',
    'Acting reel poster',
    'Poster image for Bryan Mittelstadt acting reel',
    'dark',
  ),
  portraitImage: pendingAsset(
    'about-portrait',
    'About portrait',
    'Portrait of Bryan Mittelstadt',
    'warm',
    '50% 28%',
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
  darling: pendingAsset(
    'project-darling',
    'Darling',
    'Approved album artwork for Darling',
    'warm',
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
  acting: pendingAsset(
    'discipline-acting',
    'Acting',
    'Approved image representing Bryan Mittelstadt acting work',
    'dark',
  ),
  voiceOver: pendingAsset(
    'discipline-voice-over',
    'Voice-Over',
    'Approved image representing Bryan Mittelstadt voice-over work',
    'neutral',
  ),
  music: pendingAsset(
    'discipline-music',
    'Music',
    'Approved image representing Bryan Mittelstadt music work',
    'warm',
  ),
  writing: pendingAsset(
    'discipline-writing-filmmaking',
    'Writing & Filmmaking',
    'Approved image representing Bryan Mittelstadt writing and filmmaking work',
    'accent',
  ),
} satisfies Record<string, ImageAsset>;
