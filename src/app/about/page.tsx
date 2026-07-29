import Image from 'next/image';
import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import EditorialButton from '@/components/EditorialButton';
import { siteAssets } from '@/content/assets';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'About Bryan Mittelstadt',
  description: 'Full biography and physical statistics for Bryan Mittelstadt.',
  path: '/about',
});

export default function AboutPage() {
  // Split long bio by double newlines into paragraphs
  const paragraphs = siteConfig.longBio.split('\n\n').filter(Boolean);

  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Portrait Column */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-28">
              <div className="relative aspect-[3/4] w-full bg-bg-light overflow-hidden mb-8">
                <Image
                  src={siteAssets.portraitImage}
                  alt={`Portrait of ${siteConfig.name}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>

              {/* Physical Stats */}
              {siteConfig.physical && (
                <div className="border border-border-subtle bg-bg-secondary p-6">
                  <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
                    Physical Details
                  </h3>
                  <dl className="grid grid-cols-2 gap-y-3 text-sm">
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
                </div>
              )}
            </div>
          </div>

          {/* Biography Column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SectionHeading as="h1" eyebrow="Biography">
              About Bryan
            </SectionHeading>
            
            <div className="mt-10 space-y-6 text-text-primary leading-relaxed font-sans text-lg lg:text-xl">
              {paragraphs.map((p, index) => (
                <p key={index} className="max-w-prose">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-12 pt-12 border-t border-border-subtle flex flex-wrap gap-4">
              <EditorialButton href={siteConfig.resumeUrl ?? '/resume'} variant="primary" download={Boolean(siteConfig.resumeUrl)}>
                {siteConfig.resumeUrl ? 'Download Résumé' : 'View Résumé'}
              </EditorialButton>
              <EditorialButton href="/contact" variant="secondary">
                Get in Touch
              </EditorialButton>
            </div>
          </div>

        </div>
      </Container>
    </div>
  );
}
