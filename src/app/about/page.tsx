import Container from '@/components/Container';
import EditorialButton from '@/components/EditorialButton';
import EditorialImage from '@/components/EditorialImage';
import SectionHeading from '@/components/SectionHeading';
import { siteAssets } from '@/content/assets';
import { getVerifiedCredentials } from '@/content/credentials';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'About Bryan Mittelstadt',
  description: 'Biography, selected recognition, and casting details for Bryan Mittelstadt.',
  path: '/about',
});

export default function AboutPage() {
  const paragraphs = siteConfig.longBio.split('\n\n').filter(Boolean);
  const selectedRecognition = getVerifiedCredentials().filter(
    (credential) => credential.detail && !credential.label.includes('SAG'),
  );

  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-20">
          <aside className="order-2 lg:order-1 lg:col-span-5" aria-label="Portrait and casting details">
            <div className="sticky top-28">
              <div className="relative mb-8 aspect-[3/4] w-full overflow-hidden bg-bg-light">
                <EditorialImage
                  asset={siteAssets.portraitImage}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  fallbackLabel="Portrait photography pending"
                />
              </div>

              {siteConfig.physical && (
                <section className="border border-border-subtle bg-bg-secondary p-6" aria-labelledby="casting-details-heading">
                  <h2 id="casting-details-heading" className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-accent">
                    Casting Details
                  </h2>
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm">
                    <div>
                      <dt className="text-text-secondary">Height</dt>
                      <dd className="text-text-primary">{siteConfig.physical.height}</dd>
                    </div>
                    <div>
                      <dt className="text-text-secondary">Weight</dt>
                      <dd className="text-text-primary">{siteConfig.physical.weight}</dd>
                    </div>
                    <div>
                      <dt className="text-text-secondary">Hair</dt>
                      <dd className="text-text-primary">{siteConfig.physical.hair}</dd>
                    </div>
                    <div>
                      <dt className="text-text-secondary">Eyes</dt>
                      <dd className="text-text-primary">{siteConfig.physical.eyes}</dd>
                    </div>
                    <div className="col-span-2">
                      <dt className="text-text-secondary">Voice</dt>
                      <dd className="text-text-primary">{siteConfig.physical.voice}</dd>
                    </div>
                  </dl>
                  <p className="mt-5 border-t border-border-subtle pt-4 text-xs leading-relaxed text-text-muted">
                    Casting details remain in Bryan&apos;s approval queue and should be reconfirmed before launch.
                  </p>
                </section>
              )}
            </div>
          </aside>

          <div className="order-1 lg:order-2 lg:col-span-7">
            <SectionHeading as="h1" eyebrow="Biography">
              About Bryan
            </SectionHeading>

            <p className="mt-8 max-w-prose border-l-2 border-accent pl-6 font-serif text-xl leading-relaxed text-text-primary sm:text-2xl">
              {siteConfig.shortBio}
            </p>

            <div className="mt-10 space-y-6 font-sans text-lg leading-relaxed text-text-primary lg:text-xl">
              {paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 48)} className="max-w-prose">
                  {paragraph}
                </p>
              ))}
            </div>

            {selectedRecognition.length > 0 && (
              <section className="mt-14 border-y border-border-subtle py-10" aria-labelledby="recognition-heading">
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-accent">Selected Recognition</p>
                <h2 id="recognition-heading" className="sr-only">Selected recognition</h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {selectedRecognition.map((credential) => (
                    <article key={credential.label}>
                      <h3 className="font-serif text-xl text-text-primary">{credential.label}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{credential.detail}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-12 flex flex-wrap gap-4">
              <EditorialButton href={siteConfig.resumeUrl ?? '/resume'} variant="primary" download={Boolean(siteConfig.resumeUrl)}>
                {siteConfig.resumeUrl ? 'Download Résumé' : 'View Résumé'}
              </EditorialButton>
              <EditorialButton href="/headshots" variant="secondary">
                View Headshots
              </EditorialButton>
              <EditorialButton href="/contact#inquiry-form" variant="text">
                Get in Touch
              </EditorialButton>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
