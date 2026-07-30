// ============================================================
// Bryan Mittelstadt — Social Links
// Recovered from Bryan's public website/channel and held for client review.
// ============================================================

import type { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  {
    platform: 'IMDb',
    label: 'Bryan Mittelstadt on IMDb',
    url: 'https://www.imdb.com/name/nm9804418/',
    verified: true,
    verificationId: 'social.imdb',
  },
  {
    platform: 'Instagram',
    label: 'Bryan Mittelstadt on Instagram',
    url: 'https://www.instagram.com/bryanpatrickm/',
    verified: true,
    verificationId: 'social.instagram',
  },
  {
    platform: 'YouTube',
    label: 'Bryan Mittelstadt on YouTube',
    url: 'https://www.youtube.com/channel/UCuxBCsAa0XQcO8rOk2Zjqjg',
    verified: true,
    verificationId: 'social.youtube',
  },
];

export function getVerifiedSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.verified && link.url);
}
