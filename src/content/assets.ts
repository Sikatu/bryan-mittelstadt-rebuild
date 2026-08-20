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

const approved = '/media/approved';
const featured = '/images/bryan/current-site/featured';

export const siteAssets: SiteAssets = {
  heroImage: approvedAsset(
    'hero-primary',
    'Approved homepage portrait',
    'Bryan Mittelstadt seated against a dark blue studio background',
    `${approved}/lifestyle`,
    'dark',
    '68% 43%',
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
    'Approved editorial portrait',
    'Bryan Mittelstadt seated against a dark blue studio background',
    `${approved}/lifestyle`,
    'neutral',
    '60% 38%',
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
  quietAfterSupper: approvedAsset(
    'project-quiet-after-supper',
    'Quiet After Supper',
    'Official poster for Quiet After Supper',
    `${approved}/quiet-after-supper`,
    'dark',
  ),
  darling: approvedAsset(
    'project-darling',
    'Darling',
    'Current public artwork for Bryan Mittelstadt music project Darling',
    `${featured}/darling-artwork.jpg`,
    'warm',
    '50% 50%',
  ),
  julius: pendingAsset(
    'project-julius',
    'Julius',
    'Approved production image for Julius',
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
    'Bryan Mittelstadt approved theatrical headshot',
    `${approved}/headshot-theatrical`,
    'neutral',
    '50% 30%',
  ),
  music: approvedAsset(
    'discipline-music',
    'Music',
    'Current public artwork for Bryan Mittelstadt music project Darling',
    `${featured}/darling-artwork.jpg`,
    'warm',
    '50% 50%',
  ),
  writing: approvedAsset(
    'discipline-writing-filmmaking',
    'Writing & Filmmaking',
    'Bryan Mittelstadt approved editorial portrait',
    `${approved}/lifestyle`,
    'accent',
    '62% 42%',
  ),
} satisfies Record<string, ImageAsset>;
