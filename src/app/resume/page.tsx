import Container from '@/components/Container';
import EditorialButton from '@/components/EditorialButton';
import SectionHeading from '@/components/SectionHeading';
import {
  resumeSections,
  specialSkills,
  trainingAndEducation,
  unionAffiliations,
} from '@/content/resume';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';
import type { ResumeItem } from '@/types';

export const metadata = createPageMetadata({
  title: 'Résumé',
  description: 'Theatrical, commercial, and voice-over résumé for Bryan Mittelstadt.',
  path: '/resume',
});

function ResumeCategory({ title, items }: { title: string; items: ResumeItem[] }) {
  if (items.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby={`resume-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
      <h3
        id={`resume-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
        className="mb-6 border-b border-border-subtle pb-2 text-sm font-medium uppercase tracking-[0.15em] text-accent"
      >
        {title}
      </h3>
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm text-text-primary sm:text-base md:grid-cols-12">
        {items.map((item) => (
          <div
            key={`${item.title}-${item.role}`}
            className="grid grid-cols-1 gap-x-6 gap-y-1 border-b border-border-subtle py-2 last:border-0 md:col-span-12 md:grid-cols-12"
          >
            <div className="font-medium md:col-span-5">{item.title}</div>
            <div className="text-text-secondary md:col-span-4">{item.role}</div>
            <div className="italic text-text-muted md:col-span-3 md:text-right">{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function ResumePage() {
  const hasResumePdf = Boolean(siteConfig.resumeUrl);

  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container narrow>
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
          <SectionHeading as="h1" eyebrow="Curriculum Vitae">
            Résumé
          </SectionHeading>
          <EditorialButton
            href={siteConfig.resumeUrl}
            variant="secondary"
            download
            disabled={!hasResumePdf}
            title={!hasResumePdf ? 'Approved résumé PDF has not been supplied yet' : undefined}
          >
            {hasResumePdf ? 'Download PDF' : 'PDF Pending'}
          </EditorialButton>
        </div>

        <div className="rounded-sm border border-border-subtle bg-bg-secondary p-6 sm:p-10">
          <div className="mb-12 border-b border-border-subtle pb-8 text-center">
            <h2 className="heading-display mb-4 text-3xl">{siteConfig.name}</h2>
            <div className="flex justify-center gap-4 text-xs font-sans uppercase tracking-widest text-text-secondary">
              {unionAffiliations.map((affiliation) => (
                <span key={affiliation}>{affiliation}</span>
              ))}
            </div>
          </div>

          {resumeSections.map((section) => (
            <ResumeCategory key={section.title} title={section.title} items={section.items} />
          ))}

          <section className="mb-12" aria-labelledby="resume-training">
            <h3 id="resume-training" className="mb-6 border-b border-border-subtle pb-2 text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Training & Education
            </h3>
            <div className="space-y-2 text-sm leading-relaxed text-text-secondary">
              {trainingAndEducation.map((item) => (
                <p key={item.credential}>
                  <strong className="text-text-primary">{item.credential}</strong> — {item.institution}
                </p>
              ))}
            </div>
          </section>

          <section aria-labelledby="resume-skills">
            <h3 id="resume-skills" className="mb-6 border-b border-border-subtle pb-2 text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Special Skills
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">{specialSkills}</p>
          </section>
        </div>
      </Container>
    </div>
  );
}
