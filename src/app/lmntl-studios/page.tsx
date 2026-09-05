import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
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

export default function LmntlStudiosPage() {
  return (
    <div className="bg-[#0a0a09] text-[#f3efe8]">
      <section className="relative isolate overflow-hidden border-b border-white/10 pt-24">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_76%_40%,rgba(101,148,159,0.15),transparent_24%),radial-gradient(circle_at_84%_66%,rgba(199,89,48,0.11),transparent_24%),radial-gradient(circle_at_58%_78%,rgba(109,113,80,0.10),transparent_28%),linear-gradient(125deg,#0a0a09_10%,#10100f_56%,#080808_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 opacity-[0.1] [background-image:linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] [background-size:76px_76px]"
        />

        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/52">
                {lmntlStudio.eyebrow}
              </p>

              <h1 className="mt-7 font-serif text-[clamp(4.35rem,10vw,8rem)] font-normal leading-[0.8] tracking-[-0.05em] text-white">
                <span className="block">LMNTL</span>
                <span className="mt-4 block pl-[0.09em] text-[0.34em] tracking-[0.5em] text-white/54 sm:mt-5">
                  Studios
                </span>
              </h1>

              <p className="mt-8 max-w-xl font-serif text-[1.9rem] leading-tight text-white/92 sm:text-[2.25rem] lg:text-[2.55rem]">
                {lmntlStudio.tagline}
              </p>

              <p className="mt-6 max-w-lg text-base leading-8 text-white/62 sm:text-[1.02rem]">
                {lmntlStudio.introduction}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#framework"
                  className="inline-flex min-h-12 items-center justify-center border border-[#c75930] bg-[#c75930] px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:border-[#eb8623] hover:bg-[#eb8623]"
                >
                  Explore the Framework
                </a>

                <Link
                  href="/contact#inquiry-form"
                  className="inline-flex min-h-12 items-center justify-center border border-white/20 px-7 text-xs font-semibold uppercase tracking-[0.2em] text-white/82 transition-colors hover:border-white/50 hover:bg-white/[0.06] hover:text-white"
                >
                  Start a Conversation
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="mx-auto max-w-[34rem] lg:ml-auto lg:mr-0">
                <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.02] px-6 py-8 shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:px-8 sm:py-10">
                  <div
                    aria-hidden="true"
                    className="absolute inset-[8%] rounded-full bg-white/[0.03] blur-3xl"
                  />

                  <div className="relative mx-auto aspect-square w-full max-w-[29rem]">
                    <Image
                      src="/images/lmntl/lmntl-logo.png"
                      alt="LMNTL Studios elemental emblem combining Earth, Air, Fire, Water, and the artist at the center"
                      fill
                      priority
                      sizes="(max-width: 1024px) 92vw, 34rem"
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-[9px] font-medium uppercase tracking-[0.28em] text-white/38">
                  <span className="text-[#a3a67a]">Earth</span>
                  <span className="text-[#c1c1c1]">Air</span>
                  <span className="text-[#eb8623]">Fire</span>
                  <span className="text-[#65949f]">Water</span>
                  <span className="text-[#838484]">Artist</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-white/10 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c75930]">
                The Premise
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="max-w-[58rem]">
                <div className="space-y-2 sm:space-y-3">
                  <p className="font-serif text-[clamp(2.55rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.038em] text-white">
                    <span className="text-[#a3a67a]">Earth</span>{' '}
                    grounds the work.
                  </p>

                  <p className="font-serif text-[clamp(2.55rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.038em] text-white">
                    <span className="text-[#c1c1c1]">Air</span>{' '}
                    opens the vision.
                  </p>

                  <p className="font-serif text-[clamp(2.55rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.038em] text-white">
                    <span className="text-[#eb8623]">Fire</span>{' '}
                    creates momentum.
                  </p>

                  <p className="font-serif text-[clamp(2.55rem,4.6vw,4.8rem)] leading-[0.98] tracking-[-0.038em] text-white">
                    <span className="text-[#65949f]">Water</span>{' '}
                    shapes identity.
                  </p>
                </div>

                <p className="mt-10 max-w-[50rem] font-serif text-[clamp(2rem,3.3vw,3.55rem)] leading-[1.04] tracking-[-0.03em] text-white/92 sm:mt-12">
                  The artist brings them together&mdash;
                  <span className="block text-white/62">
                    and turns possibility into form.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="framework" className="scroll-mt-24 py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="mb-12 grid gap-6 border-b border-white/12 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.42fr)] lg:items-end lg:gap-16">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c75930]">
                The Elemental Framework
              </p>
              <h2 className="mt-4 font-serif text-4xl text-white sm:text-5xl lg:text-[3.8rem]">
                Four forces. One practice.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-white/50 lg:justify-self-end">
              Each element gives the artist a different way to examine the work. Together, they create a more complete creative system.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {lmntlElements.map((element) => (
              <article
                key={element.id}
                className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.03),rgba(255,255,255,0.008))] px-6 py-6 sm:px-8 sm:py-8"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <span className="text-[10px] font-medium tracking-[0.24em] text-white/40">
                      {element.number}
                    </span>

                    <p
                      className="mt-10 text-[10px] font-semibold uppercase tracking-[0.24em]"
                      style={{ color: element.accent }}
                    >
                      {element.principle}
                    </p>

                    <h3 className="mt-3 font-serif text-[2.3rem] leading-none text-white sm:text-[2.8rem]">
                      {element.name}
                    </h3>
                  </div>

                  <div className="relative h-24 w-24 shrink-0 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                    <Image
                      src={element.image}
                      alt=""
                      fill
                      sizes="128px"
                      className="object-contain"
                    />
                  </div>
                </div>

                <p className="mt-8 max-w-[34rem] text-sm leading-7 text-white/66 sm:text-base">
                  {element.description}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative isolate overflow-hidden border-y border-white/10 py-20 sm:py-24 lg:py-28">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_22%_48%,rgba(131,132,132,0.1),transparent_25%),linear-gradient(110deg,#0c0c0b_0%,#111110_52%,#090909_100%)]"
        />

        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(13rem,17rem)_minmax(0,1fr)] lg:gap-16">
            <div className="mx-auto w-full max-w-[14rem]">
              <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.02] p-7 shadow-[0_18px_48px_rgba(0,0,0,0.3)]">
                <div className="relative aspect-square w-full">
                  <Image
                    src="/images/lmntl/artist-mark.png"
                    alt="The fifth element symbol representing the artist"
                    fill
                    sizes="224px"
                    className="object-contain"
                  />
                </div>
              </div>

              <p className="mt-5 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-white/38">
                Element 05
              </p>
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9fa0a0]">
                The Fifth Element
              </p>

              <h2 className="mt-5 max-w-4xl font-serif text-[2.5rem] leading-[1.03] text-white sm:text-[4rem] lg:text-[4.9rem]">
                The framework is not the artist. It exists to reveal them.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-white/62 sm:text-lg">
                LMNTL treats the artist as the transformative center—not a product to standardize, but the force that gives every structure, vision, action, and emotion its final meaning.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-24 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#c75930]">
                Studio Focus
              </p>

              <h2 className="mt-5 max-w-sm font-serif text-[2.7rem] leading-[1.02] text-white sm:text-[3.4rem]">
                Built around the work—not a template.
              </h2>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/52 sm:text-base">
                LMNTL is designed for independent artists whose work crosses disciplines, evolves in public, and needs both imagination and structure.
              </p>
            </div>

            <div className="lg:col-span-8">
              <div className="divide-y divide-white/12 border-y border-white/12">
                {lmntlPathways.map((pathway) => (
                  <article
                    key={pathway.number}
                    className="grid gap-4 py-7 sm:grid-cols-[3.5rem_1fr] sm:gap-7 sm:py-9"
                  >
                    <span className="font-serif text-[1.65rem] text-[#c75930]">
                      {pathway.number}
                    </span>

                    <div>
                      <h3 className="font-serif text-[2rem] leading-tight text-white sm:text-[2.45rem]">
                        {pathway.title}
                      </h3>

                      <p className="mt-3 max-w-2xl text-sm leading-7 text-white/56 sm:text-base">
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

      <section className="bg-[#efe9df] py-20 text-[#171512] sm:py-24 lg:py-28">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a5131]">
                Founder & Creative Lead
              </p>

              <h2 className="mt-5 max-w-4xl font-serif text-[2.6rem] leading-[1.05] sm:text-[4rem] lg:text-[4.8rem]">
                A studio shaped by a multidisciplinary artist.
              </h2>

              <p className="mt-7 max-w-2xl text-base leading-8 text-black/62 sm:text-lg">
                {lmntlStudio.founderNote}
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:col-span-4 lg:max-w-[18rem] lg:justify-self-end lg:self-center">
              <Link
                href="/about"
                className="inline-flex min-h-12 items-center justify-between border border-black/20 px-6 text-xs font-semibold uppercase tracking-[0.18em] transition-colors hover:border-black hover:bg-black hover:text-white"
              >
                About Bryan
                <span aria-hidden="true">→</span>
              </Link>

              <Link
                href="/contact#inquiry-form"
                className="inline-flex min-h-12 items-center justify-between border border-[#8a5131] bg-[#8a5131] px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:border-[#704128] hover:bg-[#704128]"
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
