import { ImageResponse } from 'next/og';
import { siteConfig } from '@/content/site';

export const alt = `${siteConfig.name} — ${siteConfig.titles.join(', ')}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/** Generated launch-safe social card. Replace only when Bryan approves photography. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          background: '#f8f7f3',
          color: '#171717',
          padding: '72px 82px',
          fontFamily: 'Georgia, Times New Roman, serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 560,
            height: 560,
            right: -150,
            top: -190,
            borderRadius: 999,
            border: '2px solid rgba(154, 93, 58, 0.18)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 440,
            height: 440,
            right: -60,
            bottom: -250,
            borderRadius: 999,
            background: 'rgba(154, 93, 58, 0.12)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: 2,
            height: 760,
            right: 300,
            top: -70,
            background: 'rgba(23, 23, 23, 0.08)',
            transform: 'rotate(18deg)',
          }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div
            style={{
              display: 'flex',
              fontFamily: 'Arial, Helvetica, sans-serif',
              fontSize: 22,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#9a5d3a',
            }}
          >
            Official Portfolio
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', fontSize: 82, lineHeight: 1.02, letterSpacing: '-0.025em' }}>
              {siteConfig.name}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 26,
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 27,
                letterSpacing: '0.06em',
                color: '#5f5b55',
              }}
            >
              {siteConfig.titles.join(' • ')}
            </div>
            <div
              style={{
                display: 'flex',
                marginTop: 18,
                fontFamily: 'Arial, Helvetica, sans-serif',
                fontSize: 20,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#77736d',
              }}
            >
              {siteConfig.location}
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
