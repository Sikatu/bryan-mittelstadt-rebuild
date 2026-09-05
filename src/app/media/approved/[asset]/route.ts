import { NextResponse } from 'next/server';
import { castingGalleryDriveIds } from '@/content/casting-gallery';

const legacyApprovedMedia = {
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

type LegacyMediaKey = keyof typeof legacyApprovedMedia;

type ResolvedMedia = {
  driveId: string;
  fallbackType: string;
};

function resolveMedia(asset: string): ResolvedMedia | null {
  const legacy =
    legacyApprovedMedia[asset as LegacyMediaKey];

  if (legacy) {
    return legacy;
  }

  if (!asset.startsWith('drive-')) {
    return null;
  }

  const driveId = asset.slice('drive-'.length);

  if (!castingGalleryDriveIds.has(driveId)) {
    return null;
  }

  return {
    driveId,
    fallbackType: 'image/jpeg',
  };
}

async function fetchOriginal(driveId: string) {
  return fetch(
    `https://drive.usercontent.google.com/download?export=download&confirm=t&id=${encodeURIComponent(driveId)}`,
    {
      cache: 'no-store',
      redirect: 'follow',
    },
  );
}

export async function GET(
  request: Request,
  context: { params: Promise<{ asset: string }> },
) {
  const { asset } = await context.params;
  const media = resolveMedia(asset);

  if (!media) {
    return NextResponse.json(
      { error: 'Not found' },
      { status: 404 },
    );
  }

  const requestUrl = new URL(request.url);
  const preview =
    requestUrl.searchParams.get('preview') === '1';
  const download =
    requestUrl.searchParams.get('download') === '1';

  let upstream: Response;

  if (preview) {
    upstream = await fetch(
      `https://drive.google.com/thumbnail?id=${encodeURIComponent(media.driveId)}&sz=w1600`,
      {
        cache: 'no-store',
        redirect: 'follow',
      },
    );

    if (!upstream.ok || !upstream.body) {
      upstream = await fetchOriginal(media.driveId);
    }
  } else {
    upstream = await fetchOriginal(media.driveId);
  }

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      {
        error:
          'Approved media is temporarily unavailable',
      },
      { status: 502 },
    );
  }

  const headers: Record<string, string> = {
    'Content-Type':
      upstream.headers.get('content-type') ||
      media.fallbackType,
    'Cache-Control': preview
      ? 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800'
      : 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
    'X-Content-Type-Options': 'nosniff',
  };

  if (download) {
    const upstreamDisposition =
      upstream.headers.get('content-disposition');

    headers['Content-Disposition'] = upstreamDisposition
      ? upstreamDisposition.replace(
          /^inline/i,
          'attachment',
        )
      : 'attachment';
  }

  return new NextResponse(
    upstream.body,
    { headers },
  );
}
