import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import LmntlEmblem from '@/components/LmntlEmblem';
import {
  lmntlElements,
  lmntlPathways,
  lmntlStudio,
} from '@/content/lmntl';
import { createPageMetadata } from '@/lib/metadata';

export const metadata = createPageMetadata({
  title: 'LMNTL STUDIOS — Creative Development for Independent Artists',
  description:
    'LMNTL STUDIOS is Bryan Mittelstadt’s creative development studio for independent artists working across performance, story, music, and production.',
  path: '/lmntl-studios',
});

function ElementGlyph({ id }: { id: string }) {
  const common = 'h-12 w-12';

  if (id === 'earth') {
    return (
      <svg viewBox="0 0 48 48" className={common} aria-hidden="true" fill="none">
        <path d="M8 10h32L24 38 8 10Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 19h22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (id === 'air') {
    return (
      <svg viewBox="0 0 48 48" className={common} aria-hidden="true" fill="none">
        <path d="M8 38h32L24 10 8 38Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 29h22" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  if (id === 'water') {
    return (
      <svg viewBox="0 0 48 48" className={common} aria-hidden="true" fill="none">
        <path d="M8 10h32L24 38 8 10Z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" className={common} aria-hidden="true" fill="none">
      <path d="M8 38h32L24 10 8 38Z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function LmntlStudiosPage() {
  return (
    <div className="bg-[#0b0b0a] text-[#f2eee6]">
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden border-b border-white/10 pt-24">
        <div className="absolute inset-0 -z-30 bg-black">
          <Image
            src="/images/lmntl/spotlights.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            aria-hidden="true"
            className="object-cover object-top opacity-72 contrast-125 saturate-50"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_75%_35%,rgba(200,120,79,0.18),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.70)_44%,rgba(0,0,0,0.28)_72%,rgba(0,0,0,0.62)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] [background-size:72px_72px]"
        />

        <Container className="relative py-20 sm:py-28 lg:py-32">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="mb-8 flex items-center gap-4">
                <span className="h-px w-10 bg-[#c8784f]" aria-hidden="true" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/62">
                  {lmntlStudio.eyebrow}
                </p>
              </div>

              <h1 className="font-serif text-[clamp(4.25rem,11vw,9rem)] font-normal leading-[0.78] tracking-[-0.055em] text-white">
                <span className="block">LMNTL</span>
                <span className="mt-4 block pl-[0.08em] text-[0.39em] tracking-[0.48em] text-white/62 sm:mt-6">
                  Studios
                </span>
              </h1>

              <p className="mt-10 max-w-2xl font-serif text-2xl leading-snug text-white/92 sm:text-3xl lg:text-4xl">
                {lmntlStudio.tagline}
              </p>

              <p className="mt-6 max-w-xl text-base leading-8 text-white/64 sm:text-lg">
                {lmntlStudio.introduction}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#framework"
                  className="inline-flex min-h-12 items-center justify-center border border-[#c8784f] bg-[#c8784f] px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#da8c63] hover:bg-[#da8c63]"
                >
                  Explore the Framework
                </a>
                <Link
                  href="/contact#inquiry-form"
                  className="inline-flex min-h-12 items-center justify-center border border-white/25 px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white/86 transition-colors hover:border-white/60 hover:bg-white/[0.08] hover:text-white"
                >
                  Start a Conversation
                </Link>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[31rem] lg:col-span-5 lg:mr-0">
              <div className="absolute inset-8 rounded-full bg-[#c8784f]/10 blur-3xl" aria-hidden="true" />
              <div className="relative border border-white/12 bg-black/22 p-8 backdrop-blur-sm sm:p-12">
                <LmntlEmblem className="mx-auto aspect-square w-full max-w-[24rem] text-[#e4d6c6]" labelled />
                <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[9px] font-medium uppercase tracking-[0.3em] text-white/46">
                  <span>Earth</span>
                  <span>Air</span>
                  <span>Fire</span>
                  <span>Water</span>
                  <span className="text-[#c8784f]">Artist</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-24 sm:py-32">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c8784f]">
                The Premise
              </p>
            </div>
            <div className="lg:col-span-9">
              <p className="max-w-5xl font-serif text-3xl leading-[1.22] text-white sm:text-5xl lg:text-6xl">
                {lmntlStudio.manifesto}
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section id="framework" className="scroll-mt-24 py-24 sm:py-32">
        <Container>
          <div className="mb-14 flex flex-col justify-between gap-6 border-b border-white/12 pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c8784f]">
                The Elemental Framework
              </p>
              <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl lg:text-6xl">
                Four forces. One practice.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-white/54">
              Each element gives the artist a different way to examine the work. Together, they create a more complete creative system.
            </p>
          </div>

          <div className="grid border-l border-t border-white/12 sm:grid-cols-2 lg:grid-cols-4">
            {lmntlElements.map((element) => (
              <article
                key={element.id}
                className="group relative min-h-[34rem] overflow-hidden border-b border-r border-white/12 bg-black"
              >
                <Image
                  src={element.image}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
                  aria-hidden="true"
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.045] group-hover:saturate-125"
                  style={{ objectPosition: element.objectPosition }}
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/25 to-black/92 transition-colors duration-500 group-hover:to-black/86"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_36%)]"
                />

                <div className="relative flex min-h-[34rem] flex-col justify-between p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="text-[10px] font-medium tracking-[0.24em] text-white/60">
                      {element.number}
                    </span>
                    <div
                      className="drop-shadow-[0_4px_16px_rgba(0,0,0,0.55)]"
                      style={{ color: element.accent }}
                    >
                      <ElementGlyph id={element.id} />
                    </div>
                  </div>

                  <div>
                    <p
                      className="text-[10px] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: element.accent }}
                    >
                      {element.principle}
                    </p>
                    <h3 className="mt-3 font-serif text-4xl text-white drop-shadow-lg">
                      {element.name}
                    </h3>
                    <p className="mt-5 text-sm leading-7 text-white/78">
                      {element.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden border-y border-white/10 bg-black py-24 sm:py-32">
        <div className="absolute inset-0 -z-20">
          <Image
            src="/images/lmntl/nebula.webp"
            alt=""
            fill
            sizes="100vw"
            aria-hidden="true"
            className="object-cover opacity-78 brightness-90 contrast-110 saturate-110"
          />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.62)_48%,rgba(0,0,0,0.34)_72%,rgba(0,0,0,0.68)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-b from-black/32 via-transparent to-black/55"
        />

        <Container className="relative">
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <div className="mx-auto w-full max-w-[20rem] border border-white/15 bg-black/28 p-8 backdrop-blur-md">
                <div className="relative aspect-square">
                  <div className="absolute inset-[17%] rotate-45 border border-[#c8784f]/80" />
                  <div className="absolute inset-[29%] rotate-45 bg-[#c8784f] shadow-[0_0_42px_rgba(200,120,79,0.38)]" />
                  <div className="absolute inset-[39%] rotate-45 bg-black/90" />
                  <div className="absolute inset-[47%] rounded-full bg-[#f0dfcf] shadow-[0_0_32px_rgba(240,223,207,0.65)]" />
                </div>
                <p className="mt-8 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/52">
                  Element 05
                </p>
              </div>
            </div>
            <div className="lg:col-span-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e28b5d]">
                The Fifth Element
              </p>
              <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight text-white drop-shadow-xl sm:text-6xl lg:text-7xl">
                The framework is not the artist. It exists to reveal them.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">
                LMNTL treats the artist as the transformative center—not a product to standardize, but the force that gives every structure, vision, action, and emotion its final meaning.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-24 sm:py-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c8784f]">
                Studio Focus
              </p>
              <h2 className="mt-5 font-serif text-4xl leading-tight text-white sm:text-5xl">
                Built around the work—not a template.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-7 text-white/54">
                LMNTL is designed for independent artists whose work crosses disciplines, evolves in public, and needs both imagination and structure.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="divide-y divide-white/12 border-y border-white/12">
                {lmntlPathways.map((pathway) => (
                  <article
                    key={pathway.number}
                    className="grid gap-5 py-8 sm:grid-cols-[4rem_1fr] sm:gap-8 sm:py-10"
                  >
                    <span className="font-serif text-2xl text-[#c8784f]">
                      {pathway.number}
                    </span>
                    <div>
                      <h3 className="font-serif text-3xl text-white sm:text-4xl">
                        {pathway.title}
                      </h3>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-white/56 sm:text-base">
                        {pathway.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-[#efe9df] py-24 text-[#171512] sm:py-32">
        <Container>
          <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9a5d3a]">
                Founder & Creative Lead
              </p>
              <h2 className="mt-5 max-w-4xl font-serif text-4xl leading-tight sm:text-6xl lg:text-7xl">
                A studio shaped by a multidisciplinary artist.
              </h2>
              <p className="mt-8 max-w-2xl text-base leading-8 text-black/62 sm:text-lg">
                {lmntlStudio.founderNote}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-stretch">
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-between border border-black/20 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                About Bryan
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact#inquiry-form"
                className="inline-flex min-h-12 items-center justify-between border border-[#9a5d3a] bg-[#9a5d3a] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#7d492a] hover:bg-[#7d492a]"
              >
                LMNTL Inquiry
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
