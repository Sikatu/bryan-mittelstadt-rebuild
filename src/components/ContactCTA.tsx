import Container from './Container';
import EditorialButton from './EditorialButton';

export default function ContactCTA() {
  return (
    <section
      aria-label="Get in touch"
      className="py-20 lg:py-28 border-t border-border-subtle"
    >
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-accent mb-4">
            Get in Touch
          </p>
          <h2 className="heading-section text-3xl sm:text-4xl lg:text-5xl text-text-primary mb-6">
            Let&apos;s Work Together
          </h2>
          <p className="body-text text-text-muted mx-auto mb-10 text-sm sm:text-base">
            Available for casting, representation inquiries, production, writing collaborations, music projects, and creative partnerships.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <EditorialButton href="/contact" variant="primary">
              Contact
            </EditorialButton>
            <EditorialButton href="/contact" variant="secondary">
              Representation
            </EditorialButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
