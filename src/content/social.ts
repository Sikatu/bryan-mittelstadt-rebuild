// ============================================================
// Bryan Mittelstadt — Social Links
// Only links with an identified public source may be displayed.
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
    url: '',
    verified: false,
    verificationId: 'social.instagram',
  },
  {
    platform: 'YouTube',
    label: 'Bryan Mittelstadt on YouTube',
    url: '',
    verified: false,
    verificationId: 'social.youtube',
  },
];

/** Only return links that have been verified and have a URL. */
export function getVerifiedSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.verified && link.url);
}
