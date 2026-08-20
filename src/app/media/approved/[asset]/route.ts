import { NextResponse } from 'next/server';

const approvedMedia = {
  'headshot-theatrical': {
    driveId: '1jyHF5glCTphpNQTD6nePlp280b44Ehjp',
    fallbackType: 'image/jpeg',
  },
  'headshot-commercial': {
    driveId: '1YCdIYfBEabaXEWeyqixs4mrxrFzZYDav',
    fallbackType: 'image/jpeg',
  },
  lifestyle: {
    driveId: '1uc6hwNvYKhUo3Qz80w-xV6Gd1jfweVgh',
    fallbackType: 'image/jpeg',
  },
  'quiet-after-supper': {
    driveId: '1vK3rLWbC9yBR1PPxLoi4WSrmx46W-0d6',
    fallbackType: 'image/png',
  },
} as const;

type ApprovedMediaKey = keyof typeof approvedMedia;

export const revalidate = 86400;

export async function GET(
  _request: Request,
  context: { params: Promise<{ asset: string }> },
) {
  const { asset } = await context.params;
  const media = approvedMedia[asset as ApprovedMediaKey];

  if (!media) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const upstream = await fetch(
    `https://drive.usercontent.google.com/download?export=download&confirm=t&id=${encodeURIComponent(media.driveId)}`,
    { next: { revalidate } },
  );

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: 'Approved media is temporarily unavailable' },
      { status: 502 },
    );
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': upstream.headers.get('content-type') || media.fallbackType,
      'Cache-Control': 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
