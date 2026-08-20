import Container from '@/components/Container';
import InquiryForm from '@/components/InquiryForm';
import SectionHeading from '@/components/SectionHeading';
import { contactFormConfig } from '@/content/contact';
import { siteConfig } from '@/content/site';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'Contact & Representation',
  description:
    'Contact information and talent representation for Bryan Mittelstadt.',
  path: '/contact',
});

export default function ContactPage() {
  if (!siteConfig.email) {
    throw new Error(
      'A verified direct-inquiry email is required for the contact workflow.',
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 lg:pt-40 lg:pb-28">
      <Container narrow>
        <SectionHeading
          as="h1"
          eyebrow="Professional Inquiries"
          align="center"
        >
          Contact
        </SectionHeading>

        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-relaxed text-text-secondary">
          For casting, voice-over, music, press,
          writing, filmmaking, or general professional
          inquiries, use the form below or contact Bryan
          directly by email.
        </p>

        <section
          id="inquiry-form"
          className="mt-12 scroll-mt-32 rounded-sm border border-border-subtle bg-bg-secondary p-6 sm:p-10 lg:mt-16"
          aria-labelledby="inquiry-heading"
        >
          <div className="mb-8">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-accent">
              Inquiry Form
            </p>

            <h2
              id="inquiry-heading"
              className="heading-section text-2xl sm:text-3xl"
            >
              Start a Conversation
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
              Submit your inquiry directly through the site. If
              email delivery is temporarily unavailable, the direct
              email address below remains the fallback.
            </p>
          </div>

          <InquiryForm
            recipientEmail={siteConfig.email}
            config={contactFormConfig}
          />
        </section>

        <section
          className="mt-12 rounded-sm border border-border-subtle bg-bg-secondary p-8 text-center sm:p-12"
          aria-labelledby="direct-email-heading"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Direct Email
          </p>

          <h2
            id="direct-email-heading"
            className="sr-only"
          >
            Direct email address
          </h2>

          <a
            href={`mailto:${siteConfig.email}`}
            className="break-all font-serif text-2xl text-text-primary underline decoration-border-subtle underline-offset-8 transition-colors hover:text-accent hover:decoration-accent/40 sm:text-3xl"
          >
            {siteConfig.email}
          </a>
        </section>
      </Container>
    </div>
  );
}
