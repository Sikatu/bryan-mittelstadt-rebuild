import Container from '@/components/Container';
import InquiryForm from '@/components/InquiryForm';
import SectionHeading from '@/components/SectionHeading';
import { contactFormConfig } from '@/content/contact';
import { representation } from '@/content/representation';
import { siteConfig } from '@/content/site';
import { getVerifiedSocialLinks } from '@/content/social';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Contact & Representation',
  description: 'Contact information and talent representation for Bryan Mittelstadt.',
  path: '/contact',
});

function representationLabel(type: string) {
  if (type === 'voiceover') return 'Voice-Over';
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function ContactPage() {
  const verifiedSocial = getVerifiedSocialLinks();

  if (!siteConfig.email) {
    throw new Error('A verified direct-inquiry email is required for the contact workflow.');
  }

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container narrow>
        <SectionHeading as="h1" eyebrow="Professional Inquiries" align="center">
          Contact
        </SectionHeading>
        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-text-secondary">
          For casting, voice-over, music, press, writing, filmmaking, or general professional inquiries, use the form below or contact Bryan directly by email.
        </p>

        <section id="inquiry-form" className="mt-12 scroll-mt-32 rounded-sm border border-border-subtle bg-bg-secondary p-6 sm:p-10 lg:mt-16" aria-labelledby="inquiry-heading">
          <div className="mb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">Inquiry Form</p>
            <h2 id="inquiry-heading" className="heading-section text-2xl sm:text-3xl">Start a Conversation</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
              Until a production form provider is approved, submitting this form prepares a complete message in your email application rather than storing data on the website.
            </p>
          </div>
          <InquiryForm recipientEmail={siteConfig.email} config={contactFormConfig} />
        </section>

        <section className="mt-12 rounded-sm border border-border-subtle bg-bg-secondary p-8 text-center sm:p-12" aria-labelledby="direct-email-heading">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Direct Email
          </p>
          <h2 id="direct-email-heading" className="sr-only">Direct email address</h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="break-all font-serif text-2xl text-text-primary underline decoration-border-subtle underline-offset-8 transition-colors hover:text-accent hover:decoration-accent/40 sm:text-3xl"
          >
            {siteConfig.email}
          </a>
        </section>

        <section id="representation" className="mt-16 scroll-mt-32 lg:mt-24" aria-labelledby="representation-heading">
          <div className="mb-10 text-center">
            <SectionHeading as="h2" align="center">
              Representation
            </SectionHeading>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-text-secondary">
              Agency names are public. Direct representative details remain withheld until Bryan confirms which contacts may be published.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {representation.map((rep) => (
              <article key={rep.type} className="rounded-sm border border-border-subtle bg-bg-secondary p-8 text-center">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
                  {representationLabel(rep.type)}
                </p>
                <h3 className="font-serif text-xl text-text-primary">{rep.agencyName}</h3>
                {rep.agentName && <p className="mt-2 text-sm text-text-secondary">{rep.agentName}</p>}
                <div className="mt-5 space-y-2 text-sm">
                  {rep.email && (
                    <a className="block text-text-secondary underline underline-offset-4 hover:text-accent" href={`mailto:${rep.email}`}>
                      {rep.email}
                    </a>
                  )}
                  {rep.phone && (
                    <a className="block text-text-secondary underline underline-offset-4 hover:text-accent" href={`tel:${rep.phone.replace(/[^+\d]/g, '')}`}>
                      {rep.phone}
                    </a>
                  )}
                  {rep.website && (
                    <a className="block text-text-secondary underline underline-offset-4 hover:text-accent" href={rep.website} target="_blank" rel="noopener noreferrer">
                      Agency Website
                    </a>
                  )}
                  {!rep.email && !rep.phone && !rep.website && (
                    <p className="text-xs italic text-text-muted">Direct representative details available upon request</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {verifiedSocial.length > 0 && (
          <section className="mt-20 text-center lg:mt-28" aria-labelledby="social-heading">
            <h2 id="social-heading" className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
              Connect Online
            </h2>
            <div className="flex flex-wrap justify-center gap-6">
              {verifiedSocial.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-secondary underline decoration-transparent underline-offset-4 transition-colors hover:text-accent hover:decoration-accent/40"
                >
                  {link.platform}
                </a>
              ))}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
