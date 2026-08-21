import Container from './Container';
import EditorialButton from './EditorialButton';

export default function ContactCTA() {
  return (
    <section
      aria-label="Get in touch"
      className="border-t border-[#d8d1c7] bg-[#f8f7f3] py-16 sm:py-20 lg:py-24"
    >
      <Container>
        <div className="grid gap-9 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.72fr)] lg:items-end lg:gap-16">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-9 bg-accent/65"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.26em] text-accent">
                Get in Touch
              </p>
            </div>

            <h2 className="heading-display max-w-3xl text-[clamp(3.3rem,6vw,5.8rem)] leading-[0.92] tracking-[-0.03em] text-text-primary">
              Let&apos;s Work
              <br className="hidden sm:block" /> Together
            </h2>
          </div>

          <div className="max-w-lg lg:justify-self-end">
            <p className="text-[0.95rem] leading-7 text-text-secondary">
              Available for casting, representation,
              production, writing collaborations, music
              projects, and select creative partnerships.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <EditorialButton
                href="/contact#inquiry-form"
                variant="primary"
              >
                Start a Conversation
              </EditorialButton>

              <EditorialButton
                href="/contact#representation"
                variant="secondary"
              >
                Representation
              </EditorialButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
