export type ResolvedVideo = {
  platform: 'youtube' | 'vimeo' | 'external';
  watchUrl: string;
  embedUrl?: string;
};

/** Resolve common YouTube and Vimeo links without assuming a single URL shape. */
export function resolveVideoUrl(url?: string): ResolvedVideo | undefined {
  if (!url) return undefined;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^www\./, '').toLowerCase();

    if (host === 'youtu.be') {
      const id = parsed.pathname.split('/').filter(Boolean)[0];
      if (id) {
        return {
          platform: 'youtube',
          watchUrl: `https://www.youtube.com/watch?v=${id}`,
          embedUrl: `https://www.youtube.com/embed/${id}?rel=0`,
        };
      }
    }

    if (host === 'youtube.com' || host === 'm.youtube.com') {
      const pathParts = parsed.pathname.split('/').filter(Boolean);
      const id =
        parsed.searchParams.get('v') ??
        (pathParts[0] === 'embed' || pathParts[0] === 'shorts'
          ? pathParts[1]
          : undefined);

      if (id) {
        return {
          platform: 'youtube',
          watchUrl: `https://www.youtube.com/watch?v=${id}`,
          embedUrl: `https://www.youtube.com/embed/${id}?rel=0`,
        };
      }
    }

    if (host === 'vimeo.com' || host === 'player.vimeo.com') {
      const id = parsed.pathname
        .split('/')
        .filter(Boolean)
        .find((part) => /^\d+$/.test(part));

      if (id) {
        return {
          platform: 'vimeo',
          watchUrl: `https://vimeo.com/${id}`,
          embedUrl: `https://player.vimeo.com/video/${id}`,
        };
      }
    }

    return {
      platform: 'external',
      watchUrl: parsed.toString(),
    };
  } catch {
    return undefined;
  }
}

export function formatMediaTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

export function createInquiryHref(
  email: string | undefined,
  subject: string,
): string | undefined {
  if (!email) return undefined;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
}
