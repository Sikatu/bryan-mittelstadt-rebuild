import Image from 'next/image';

const professionalMarks = [
  {
    id: 'sag-aftra',
    label: 'SAG-AFTRA',
    category: 'Professional organization',
    image: '/images/brand-marks/sag-aftra.webp',
    width: 678,
    height: 360,
  },
  {
    id: 'actors-equity',
    label: "Actors' Equity Association",
    category: 'Professional organization',
    image: '/images/brand-marks/actors-equity.webp',
    width: 299,
    height: 360,
  },
  {
    id: 'cesd',
    label: 'CESD Talent Agency',
    category: 'Representation',
    image: '/images/brand-marks/cesd.webp',
    width: 659,
    height: 360,
  },
  {
    id: 'eris',
    label: 'Eris Talent Agency',
    category: 'Representation',
    image: '/images/brand-marks/eris.webp',
    width: 553,
    height: 360,
  },
] as const;

/**
 * Compact universal professional-mark strip.
 * Mounted once in the root layout so it appears on every public page.
 */
export default function ProfessionalLogoNetwork() {
  return (
    <section
      className="professional-logo-network--universal no-print border-y border-white/8 bg-[#151311] text-[#f8f2ea]"
      aria-labelledby="professional-logo-network-title"
      data-layout="compact-credentials"
    >
      <div className="mx-auto flex w-[min(1220px,calc(100%-2.5rem))] flex-col gap-6 py-7 sm:w-[min(1220px,calc(100%-4rem))] sm:py-8 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="shrink-0">
          <p className="text-[9px] font-semibold uppercase tracking-[0.24em] text-[#d39d78]">
            Professional Network
          </p>

          <h2
            id="professional-logo-network-title"
            className="mt-1.5 font-serif text-[1.35rem] font-normal leading-none tracking-[-0.02em] text-[#fffaf4] sm:text-[1.55rem]"
          >
            Affiliations &amp; representation
          </h2>
        </div>

        <div className="grid flex-1 grid-cols-2 gap-2.5 sm:grid-cols-4 lg:max-w-[44rem]">
          {professionalMarks.map((mark) => (
            <article
              key={mark.id}
              data-kind={
                mark.id === 'cesd' || mark.id === 'eris'
                  ? 'representation'
                  : 'affiliation'
              }
              data-mark={mark.id}
              className="flex min-h-[4.6rem] items-center justify-center border border-white/8 bg-[#f7f3ed] px-4 py-2.5"
              aria-label={`${mark.label} — ${mark.category}`}
            >
              <Image
                src={mark.image}
                alt={mark.label}
                width={mark.width}
                height={mark.height}
                sizes="(max-width: 640px) 42vw, 160px"
                className="h-10 w-auto max-w-full object-contain sm:h-11"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
