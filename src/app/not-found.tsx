import type { Metadata } from 'next';
import Container from '@/components/Container';
import EditorialButton from '@/components/EditorialButton';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[72vh] items-center py-32 lg:py-40">
      <Container narrow>
        <div className="text-center">
          <SectionHeading as="h1" eyebrow="404" align="center">
            Page Not Found
          </SectionHeading>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-text-secondary">
            The page may have moved, or the address may be incomplete. Return to Bryan&apos;s portfolio or use the primary navigation to continue.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <EditorialButton href="/" variant="primary">
              Return Home
            </EditorialButton>
            <EditorialButton href="/contact" variant="secondary">
              Contact Bryan
            </EditorialButton>
          </div>
        </div>
      </Container>
    </div>
  );
}
