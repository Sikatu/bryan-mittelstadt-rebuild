import type { MediaAvailability } from '@/types';

const labels: Record<MediaAvailability, string> = {
  available: 'Available',
  pending: 'Media Pending',
  withheld: 'Private',
};

export default function MediaStatusBadge({
  availability,
  theme = 'light',
}: {
  availability: MediaAvailability;
  theme?: 'light' | 'dark';
}) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] ${theme === 'dark' ? 'text-contrast-light/70' : 'text-text-muted'}`}>
      <span
        className={`h-2 w-2 rounded-full ${
          availability === 'available' ? 'bg-accent' : 'bg-border-subtle'
        }`}
        aria-hidden="true"
      />
      {labels[availability]}
    </span>
  );
}
