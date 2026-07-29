import Container from '@/components/Container';
import ResumeActions from '@/components/ResumeActions';
import SectionHeading from '@/components/SectionHeading';
import { representation } from '@/content/representation';
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

  const headingId = `resume-${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section className="mb-12 break-inside-avoid" aria-labelledby={headingId}>
      <h3
        id={headingId}
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
  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container narrow>
        <div className="no-print mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
          <div>
            <SectionHeading as="h1" eyebrow="Professional Credits">
              Résumé
            </SectionHeading>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
              Selected screen, stage, training, and performance information. The downloadable PDF will be enabled after Bryan approves the final casting résumé.
            </p>
          </div>
          <ResumeActions resumeUrl={siteConfig.resumeUrl} />
        </div>

        <article className="resume-sheet rounded-sm border border-border-subtle bg-bg-secondary p-6 sm:p-10" aria-label={`${siteConfig.name} résumé`}>
          <header className="mb-12 border-b border-border-subtle pb-8 text-center">
            <h2 className="heading-display mb-3 text-3xl sm:text-4xl">{siteConfig.name}</h2>
            <p className="mb-4 text-sm text-text-secondary">{siteConfig.location}</p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs font-sans uppercase tracking-widest text-text-secondary">
              {unionAffiliations.map((affiliation) => (
                <span key={affiliation}>{affiliation}</span>
              ))}
            </div>
            {siteConfig.email && (
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-4 inline-block text-sm text-text-secondary underline decoration-border-subtle underline-offset-4 hover:text-accent"
              >
                {siteConfig.email}
              </a>
            )}
          </header>

          {resumeSections.map((section) => (
            <ResumeCategory key={section.title} title={section.title} items={section.items} />
          ))}

          <section className="mb-12 break-inside-avoid" aria-labelledby="resume-training">
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

          <section className="mb-12 break-inside-avoid" aria-labelledby="resume-skills">
            <h3 id="resume-skills" className="mb-6 border-b border-border-subtle pb-2 text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Special Skills
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">{specialSkills}</p>
          </section>

          <section className="break-inside-avoid" aria-labelledby="resume-representation">
            <h3 id="resume-representation" className="mb-6 border-b border-border-subtle pb-2 text-sm font-medium uppercase tracking-[0.15em] text-accent">
              Representation
            </h3>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {representation.map((rep) => (
                <div key={rep.type}>
                  <p className="text-xs uppercase tracking-widest text-text-muted">
                    {rep.type === 'voiceover' ? 'Voice-Over' : rep.type}
                  </p>
                  <p className="mt-1 text-sm font-medium text-text-primary">{rep.agencyName}</p>
                  {(rep.agentName || rep.email || rep.phone) && (
                    <div className="mt-1 text-sm text-text-secondary">
                      {rep.agentName && <p>{rep.agentName}</p>}
                      {rep.email && <p>{rep.email}</p>}
                      {rep.phone && <p>{rep.phone}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </article>

        <div className="no-print mt-8 flex justify-center">
          <ResumeActions resumeUrl={siteConfig.resumeUrl} />
        </div>
      </Container>
    </div>
  );
}
