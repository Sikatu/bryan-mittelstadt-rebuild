// ============================================================
// Bryan Mittelstadt — Credentials & Awards
// Only publicly confirmed achievements are marked verified.
// ============================================================

import type { Credential } from '@/types';

export const credentials: Credential[] = [
  {
    label: 'Best Actor — Durango Film Festival',
    detail: '21st Annual',
    verified: true,
  },
  {
    label: 'Torino Film Festival',
    detail: 'Julius — World Premiere',
    verified: true,
  },
  {
    label: 'SAG-AFTRA',
    verified: true,
  },
  {
    label: "Actors' Equity Association",
    verified: true,
  },
  {
    label: 'Film, Television, Commercial, Voice & Stage',
    verified: true,
  },
];

/** Return only verified credentials for public display. */
export function getVerifiedCredentials(): Credential[] {
  return credentials.filter((c) => c.verified);
}
