// ============================================================
// Bryan Mittelstadt — Credentials & Awards
// Public claims are traceable through the Phase 2 verification ledger.
// ============================================================

import type { Credential } from '@/types';

export const credentials: Credential[] = [
  {
    label: 'Durango Independent Film Festival',
    detail: '2026 Jury Award — Best Performance Actor, Narrative Feature',
    verified: true,
    verificationId: 'award.quiet-after-supper-durango',
  },
  {
    label: 'Torino Film Festival',
    detail: 'Julius — Premiere',
    verified: true,
    verificationId: 'project.julius',
  },
  {
    label: 'SAG-AFTRA',
    verified: true,
    verificationId: 'unions.affiliations',
  },
  {
    label: "Actors' Equity Association",
    verified: true,
    verificationId: 'unions.affiliations',
  },
  {
    label: 'Film, Television, Commercial, Voice & Stage',
    verified: true,
    verificationId: 'disciplines.editorial-copy',
  },
];

/** Return only verified credentials for public display. */
export function getVerifiedCredentials(): Credential[] {
  return credentials.filter((credential) => credential.verified);
}
