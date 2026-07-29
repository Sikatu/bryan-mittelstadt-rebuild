import Container from './Container';
import { getVerifiedCredentials } from '@/content/credentials';

export default function CredibilityStrip() {
  const credentials = getVerifiedCredentials();

  if (credentials.length === 0) return null;

  return (
    <section
      aria-label="Awards and recognition"
      className="border-y border-border-subtle bg-bg-secondary"
    >
      <Container>
        <div className="py-6 sm:py-8 flex flex-wrap justify-center items-center gap-x-8 gap-y-3">
          {credentials.map((credential, index) => (
            <div key={credential.label} className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-xs sm:text-sm font-sans text-text-primary tracking-wide">
                  {credential.label}
                </p>
                {credential.detail && (
                  <p className="text-[10px] sm:text-xs text-text-secondary mt-0.5">
                    {credential.detail}
                  </p>
                )}
              </div>
              {index < credentials.length - 1 && (
                <span
                  className="hidden sm:block w-1 h-1 rounded-full bg-accent/40"
                  aria-hidden="true"
                />
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
