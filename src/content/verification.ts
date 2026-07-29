import manifestJson from './content-verification.json';
import type {
  ContentSource,
  ContentVerificationManifest,
  ContentVerificationRecord,
  VerificationStatus,
} from '@/types';

/**
 * Phase 2 evidence ledger.
 *
 * This manifest is intentionally separate from presentation data so content
 * can be reviewed, approved, or withheld without introducing UI conditionals.
 * The runtime audit validates its structure and references.
 */
export const contentVerificationManifest =
  manifestJson as ContentVerificationManifest;

export function getVerificationRecord(
  id: string,
): ContentVerificationRecord | undefined {
  return contentVerificationManifest.records.find((record) => record.id === id);
}

export function getVerificationSource(id: string): ContentSource | undefined {
  return contentVerificationManifest.sources.find((source) => source.id === id);
}

export function getRecordsByStatus(
  status: VerificationStatus,
): ContentVerificationRecord[] {
  return contentVerificationManifest.records.filter(
    (record) => record.status === status,
  );
}

export function getClientApprovalQueue(): ContentVerificationRecord[] {
  return contentVerificationManifest.records.filter(
    (record) =>
      record.status === 'client-review-required' ||
      record.status === 'pending',
  );
}
