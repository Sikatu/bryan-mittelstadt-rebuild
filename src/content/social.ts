// ============================================================
// Bryan Mittelstadt — Social Links
// Icons visible on the current site but URLs were not captured.
// Only verified links should have verified: true.
// ============================================================

import type { SocialLink } from '@/types';

export const socialLinks: SocialLink[] = [
  {
    platform: 'IMDb',
    label: 'Bryan Mittelstadt on IMDb',
    // TODO: Bryan to provide his IMDb profile URL
    url: '',
    verified: false,
  },
  {
    platform: 'Instagram',
    label: '@bryanmittelstadt on Instagram',
    // TODO: Bryan to provide his Instagram URL
    url: '',
    verified: false,
  },
  {
    platform: 'YouTube',
    label: 'Bryan Mittelstadt on YouTube',
    // TODO: Bryan to provide his YouTube channel URL
    url: '',
    verified: false,
  },
];

/** Only return links that have been verified and have a URL. */
export function getVerifiedSocialLinks(): SocialLink[] {
  return socialLinks.filter((link) => link.verified && link.url);
}
