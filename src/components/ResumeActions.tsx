'use client';

import EditorialButton from './EditorialButton';

interface ResumeActionsProps {
  resumeUrl?: string;
}

export default function ResumeActions({ resumeUrl }: ResumeActionsProps) {
  return (
    <div className="no-print flex flex-wrap gap-3" aria-label="Résumé actions">
      <button
        type="button"
        onClick={() => window.print()}
        className="inline-flex min-h-11 items-center justify-center rounded-sm border border-border-subtle bg-bg-secondary px-5 py-3 text-xs font-medium uppercase tracking-[0.14em] text-text-primary transition-colors hover:border-accent hover:text-accent"
      >
        Print Résumé
      </button>
      <EditorialButton
        href={resumeUrl}
        variant="secondary"
        download
        disabled={!resumeUrl}
        title={!resumeUrl ? 'Approved résumé PDF has not been supplied yet' : undefined}
      >
        {resumeUrl ? 'Download PDF' : 'PDF Pending'}
      </EditorialButton>
    </div>
  );
}
