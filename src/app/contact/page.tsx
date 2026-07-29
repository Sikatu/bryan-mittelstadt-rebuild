import Container from '@/components/Container';
import SectionHeading from '@/components/SectionHeading';
import { siteConfig } from '@/content/site';
import { representation } from '@/content/representation';
import { getVerifiedSocialLinks } from '@/content/social';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Contact & Representation',
  description: 'Contact information and talent representation for Bryan Mittelstadt.',
  path: '/contact',
});

export default function ContactPage() {
  const verifiedSocial = getVerifiedSocialLinks();

  return (
    <div className="pt-32 pb-20 lg:pt-40 lg:pb-28 min-h-screen">
      <Container narrow>
        <SectionHeading as="h1" eyebrow="Get in Touch" align="center">
          Contact
        </SectionHeading>
        
        <div className="mt-12 lg:mt-16 bg-bg-secondary border border-border-subtle rounded-sm p-8 sm:p-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent mb-4">
            Direct Inquiries
          </p>
          <a 
            href={`mailto:${siteConfig.email}`}
            className="text-2xl sm:text-3xl font-serif text-text-primary hover:text-accent transition-colors underline decoration-border-subtle underline-offset-8 hover:decoration-accent/40"
          >
            {siteConfig.email}
          </a>
        </div>

        <div className="mt-16 lg:mt-24">
          <SectionHeading as="h2" align="center" className="mb-10">
            Representation
          </SectionHeading>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {representation.map((rep) => (
              <div key={rep.type} className="bg-bg-secondary border border-border-subtle p-8 text-center rounded-sm">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary mb-4">
                  {rep.type === 'voiceover' ? 'Voice-Over' : rep.type.charAt(0).toUpperCase() + rep.type.slice(1)}
                </p>
                <h3 className="font-serif text-xl text-text-primary mb-2">
                  {rep.agencyName}
                </h3>
                {rep.agentName && (
                  <p className="text-sm text-text-secondary mb-4">{rep.agentName}</p>
                )}
                {/* Fallback text since contact info isn't verified yet */}
                {!rep.email && !rep.phone && (
                  <p className="text-xs text-text-muted italic">Detailed representation contact available upon request</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {verifiedSocial.length > 0 && (
          <div className="mt-20 lg:mt-28 text-center">
            <h3 className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary mb-6">
              Connect Online
            </h3>
            <div className="flex justify-center gap-6">
              {verifiedSocial.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary hover:text-accent transition-colors underline underline-offset-4 decoration-transparent hover:decoration-accent/40"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}
