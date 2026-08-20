import { NextResponse } from 'next/server';

const resumeDriveId = '1xkXsF_iqm9LO2a6h7NO017dXntL0BCNS';

export const revalidate = 3600;

export async function GET() {
  const upstream = await fetch(
    `https://drive.usercontent.google.com/download?export=download&confirm=t&id=${resumeDriveId}`,
    { next: { revalidate } },
  );

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: 'Résumé is temporarily unavailable' },
      { status: 502 },
    );
  }

  return new NextResponse(upstream.body, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="Bryan-Mittelstadt-Acting-Resume.pdf"',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
