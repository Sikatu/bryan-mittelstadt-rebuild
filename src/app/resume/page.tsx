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
  description:
    'Theatrical, commercial, and voice-over résumé for Bryan Mittelstadt.',
  path: '/resume',
});

function ResumeCategory({
  index,
  title,
  items,
}: {
  index: number;
  title: string;
  items: ResumeItem[];
}) {
  if (items.length === 0) return null;

  const headingId = `resume-${title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <section
      className="editorial-resume-section break-inside-avoid"
      aria-labelledby={headingId}
    >
      <div className="editorial-resume-section-heading">
        <span aria-hidden="true">
          {String(index).padStart(2, '0')}
        </span>

        <h3 id={headingId}>{title}</h3>
      </div>

      <div className="editorial-resume-credit-list">
        {items.map((item) => (
          <div
            key={`${item.title}-${item.role}`}
            className="editorial-resume-credit-row"
          >
            <div className="editorial-resume-credit-title">
              {item.title}
            </div>

            <div className="editorial-resume-credit-role">
              {item.role}
            </div>

            <div className="editorial-resume-credit-detail">
              {item.detail}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ResumeStat({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="editorial-resume-stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container narrow>
        <div className="no-print mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:mb-16">
          <div>
            <SectionHeading
              as="h1"
              eyebrow="Professional Credits"
            >
              Résumé
            </SectionHeading>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
              A printable editorial résumé covering Bryan&apos;s
              selected screen, stage, training, skills, and
              representation information. The downloadable PDF will
              be enabled after Bryan approves the final casting
              résumé.
            </p>
          </div>

          <ResumeActions resumeUrl={siteConfig.resumeUrl} />
        </div>

        <article
          className="resume-sheet editorial-resume-shell"
          aria-label={`${siteConfig.name} résumé`}
        >
          <header className="editorial-resume-masthead">
            <div
              className="editorial-resume-monogram"
              aria-hidden="true"
            >
              BM
            </div>

            <div className="editorial-resume-identity">
              <p className="editorial-resume-kicker">
                {siteConfig.titles.join(' / ')}
              </p>

              <h2>{siteConfig.name}</h2>

              <p className="editorial-resume-location">
                {siteConfig.location}
              </p>
            </div>

            <div className="editorial-resume-contact">
              <p className="editorial-resume-unions">
                {unionAffiliations.join(' • ')}
              </p>

              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              )}
            </div>
          </header>

          <div
            className="editorial-resume-stats"
            aria-label="Casting information"
          >
            <ResumeStat
              label="Height"
              value={siteConfig.physical?.height}
            />

            <ResumeStat
              label="Weight"
              value={siteConfig.physical?.weight}
            />

            <ResumeStat
              label="Hair"
              value={siteConfig.physical?.hair}
            />

            <ResumeStat
              label="Eyes"
              value={siteConfig.physical?.eyes}
            />

            <ResumeStat
              label="Voice"
              value={siteConfig.physical?.voice}
            />
          </div>

          <div className="editorial-resume-body">
            {resumeSections.map((section, index) => (
              <ResumeCategory
                key={section.title}
                index={index + 1}
                title={section.title}
                items={section.items}
              />
            ))}

            <div className="editorial-resume-lower-grid">
              <section
                className="editorial-resume-section break-inside-avoid"
                aria-labelledby="resume-training"
              >
                <div className="editorial-resume-section-heading">
                  <span aria-hidden="true">
                    {String(
                      resumeSections.length + 1,
                    ).padStart(2, '0')}
                  </span>

                  <h3 id="resume-training">
                    Training &amp; Education
                  </h3>
                </div>

                <div className="editorial-resume-training-list">
                  {trainingAndEducation.map((item) => (
                    <div key={item.credential}>
                      <strong>{item.credential}</strong>
                      <span>{item.institution}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section
                className="editorial-resume-section break-inside-avoid"
                aria-labelledby="resume-skills"
              >
                <div className="editorial-resume-section-heading">
                  <span aria-hidden="true">
                    {String(
                      resumeSections.length + 2,
                    ).padStart(2, '0')}
                  </span>

                  <h3 id="resume-skills">Special Skills</h3>
                </div>

                <p className="editorial-resume-skills-copy">
                  {specialSkills}
                </p>
              </section>
            </div>

            <section
              className="editorial-resume-section editorial-resume-representation break-inside-avoid"
              aria-labelledby="resume-representation"
            >
              <div className="editorial-resume-section-heading">
                <span aria-hidden="true">
                  {String(
                    resumeSections.length + 3,
                  ).padStart(2, '0')}
                </span>

                <h3 id="resume-representation">
                  Representation
                </h3>
              </div>

              <div className="editorial-resume-representation-grid">
                {representation.map((rep) => (
                  <div key={rep.type}>
                    <p className="editorial-resume-rep-type">
                      {rep.type === 'voiceover'
                        ? 'Voice-Over'
                        : rep.type}
                    </p>

                    <p className="editorial-resume-rep-agency">
                      {rep.agencyName}
                    </p>

                    {(rep.agentName ||
                      rep.email ||
                      rep.phone) && (
                      <div className="editorial-resume-rep-details">
                        {rep.agentName && (
                          <p>{rep.agentName}</p>
                        )}

                        {rep.email && <p>{rep.email}</p>}

                        {rep.phone && <p>{rep.phone}</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          <footer className="editorial-resume-footer">
            <span>Selected professional résumé</span>
            <span>{siteConfig.name}</span>
          </footer>
        </article>

        <div className="no-print mt-8 flex justify-center">
          <ResumeActions resumeUrl={siteConfig.resumeUrl} />
        </div>
      </Container>
    </div>
  );
}
