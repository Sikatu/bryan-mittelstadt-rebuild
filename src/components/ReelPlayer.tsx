import Container from './Container';
import EditorialButton from './EditorialButton';
import VideoReelGallery from './VideoReelGallery';
import { actingReels } from '@/content/media';

/** Homepage reel feature. The full categorized reel library lives on /acting. */
export default function ReelPlayer() {
  const featuredReel =
    actingReels.find(
      (reel) => reel.availability === 'available',
    ) ?? actingReels[0];

  if (!featuredReel) return null;

  return (
    <section
      id="reel"
      aria-label="Acting reel"
      className="relative isolate overflow-hidden bg-[#11100f] py-24 text-white sm:py-28 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(180deg,#11100f_0%,#171411_48%,#11100f_100%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 top-0 -z-10 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(154,93,58,0.16)_0%,rgba(154,93,58,0.05)_42%,transparent_72%)]"
      />

      <div
        aria-hidden="true"
        className="absolute -left-52 bottom-[-15rem] -z-10 h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(231,169,133,0.09)_0%,transparent_70%)]"
      />

      <Container>
        <div className="mb-12 grid gap-8 border-t border-white/12 pt-8 sm:mb-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.55fr)] lg:items-end lg:gap-16 lg:pt-10">
          <div>
            <div className="mb-5 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="h-px w-9 bg-[#E7A985]/72"
              />

              <p className="text-[10px] font-semibold uppercase tracking-[0.30em] text-[#E7A985]/82 sm:text-[11px]">
                Featured Performance
              </p>
            </div>

            <h2 className="heading-display max-w-3xl text-[clamp(3.4rem,7vw,6.4rem)] leading-[0.92] tracking-[-0.025em] text-white">
              Acting Reel
            </h2>
          </div>

          <div className="max-w-md lg:justify-self-end">
            <p className="text-sm leading-7 text-white/62 sm:text-[0.95rem]">
              Selected performance work across film,
              television, commercial, musical, and stage
              categories.
            </p>

            <div className="mt-5">
              <EditorialButton
                href="/acting"
                variant="text"
                className="text-white/72 decoration-white/25 hover:text-white hover:decoration-white"
              >
                Explore Acting Portfolio
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </EditorialButton>
            </div>
          </div>
        </div>

        <div className="relative">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 border border-white/[0.035] sm:-inset-6"
          />

          <div className="relative border border-white/12 bg-black/20 p-2 shadow-[0_32px_90px_rgba(0,0,0,0.32)] sm:p-3">
            <VideoReelGallery
              reels={[featuredReel]}
              showSelector={false}
            />
          </div>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6 border-b border-white/12 pb-8">
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">
            Bryan Mittelstadt
          </p>

          <p className="text-right text-[10px] font-medium uppercase tracking-[0.24em] text-white/38">
            Los Angeles
          </p>
        </div>
      </Container>
    </section>
  );
}
