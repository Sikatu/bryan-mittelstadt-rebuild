import Image from 'next/image';

const professionalMarks = [
  {
    id: 'sag-aftra',
    label: 'SAG-AFTRA',
    category: 'Professional organization',
    image: '/images/brand-marks/sag-aftra.webp',
    width: 678,
    height: 360,
    logoWidth: '13.75rem',
    logoHeight: '5.85rem',
  },
  {
    id: 'actors-equity',
    label: "Actors' Equity Association",
    category: 'Professional organization',
    image: '/images/brand-marks/actors-equity.webp',
    width: 299,
    height: 360,
    logoWidth: '7.15rem',
    logoHeight: '7.1rem',
  },
  {
    id: 'cesd',
    label: 'CESD Talent Agency',
    category: 'Representation',
    image: '/images/brand-marks/cesd.webp',
    width: 659,
    height: 360,
    logoWidth: '13.5rem',
    logoHeight: '6rem',
  },
  {
    id: 'eris',
    label: 'Eris Talent Agency',
    category: 'Representation',
    image: '/images/brand-marks/eris.webp',
    width: 553,
    height: 360,
    logoWidth: '12.4rem',
    logoHeight: '6.4rem',
  },
] as const;

export default function ProfessionalLogoNetwork() {
  return (
    <section
      className="professional-logo-network professional-logo-network--universal no-print"
      aria-labelledby="professional-logo-network-title"
      data-layout="credentials"
    >
      <div
        aria-hidden="true"
        className="professional-logo-network__ambient"
      />

      <div className="professional-logo-network__inner">
        <div className="professional-logo-network__intro">
          <div>
            <p>
              <span aria-hidden="true" />
              Professional Network
            </p>

            <h2 id="professional-logo-network-title">
              Affiliations &amp; representation
            </h2>
          </div>

          <span>
            The professional organizations and talent agencies
            associated with Bryan&apos;s acting, stage, commercial,
            and voice-over work.
          </span>
        </div>

        <div className="professional-logo-network__grid">
          {professionalMarks.map((mark, index) => (
            <article
              key={mark.id}
              className="professional-logo-network__card professional-logo-network__card--static"
              data-kind={
                mark.id === 'cesd' || mark.id === 'eris'
                  ? 'representation'
                  : 'affiliation'
              }
              data-mark={mark.id}
              style={
                {
                  '--professional-logo-width':
                    mark.logoWidth,
                  '--professional-logo-height':
                    mark.logoHeight,
                } as React.CSSProperties
              }
            >
              <span className="professional-logo-network__card-topline">
                <span>
                  {String(index + 1).padStart(2, '0')}
                </span>

                <span>{mark.category}</span>
              </span>

              <span className="professional-logo-network__image-stage">
                <span
                  aria-hidden="true"
                  className="professional-logo-network__image-halo"
                />

                <Image
                  src={mark.image}
                  alt=""
                  width={mark.width}
                  height={mark.height}
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 42vw, 310px"
                  className="professional-logo-network__image"
                />
              </span>

              <span className="professional-logo-network__card-copy">
                <strong>{mark.label}</strong>
                <span>Professional reference</span>
              </span>
            </article>
          ))}
        </div>

        <div
          aria-hidden="true"
          className="professional-logo-network__closing-rule"
        >
          <span />
          <i />
        </div>
      </div>
    </section>
  );
}
