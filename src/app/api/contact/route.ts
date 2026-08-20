import { NextResponse } from 'next/server';

const MAX_NAME_LENGTH = 120;
const MAX_SUBJECT_LENGTH = 180;
const MAX_MESSAGE_LENGTH = 6000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  category?: unknown;
  subject?: unknown;
  message?: unknown;
  company?: unknown;
};

type RateBucket = {
  count: number;
  resetAt: number;
};

const globalRateBuckets = globalThis as typeof globalThis & {
  __bryanContactRateBuckets?: Map<string, RateBucket>;
};

const rateBuckets =
  globalRateBuckets.__bryanContactRateBuckets ??
  new Map<string, RateBucket>();

globalRateBuckets.__bryanContactRateBuckets = rateBuckets;

function cleanText(value: unknown, maxLength: number): string {
  return typeof value === 'string'
    ? value.replace(/\r?\n/g, ' ').trim().slice(0, maxLength)
    : '';
}

function cleanMessage(value: unknown): string {
  return typeof value === 'string'
    ? value.trim().slice(0, MAX_MESSAGE_LENGTH)
    : '';
}

function validEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function requestIp(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  return forwarded?.split(',')[0]?.trim() || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateBuckets.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(ip, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  existing.count += 1;
  rateBuckets.set(ip, existing);
  return existing.count > RATE_LIMIT_MAX_REQUESTS;
}

function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get('origin');
  if (!origin) return true;

  const forwardedHost =
    request.headers.get('x-forwarded-host') ??
    request.headers.get('host');

  if (!forwardedHost) return false;

  try {
    return new URL(origin).host === forwardedHost;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { error: 'invalid_origin' },
      { status: 403 },
    );
  }

  const ip = requestIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'rate_limited' },
      { status: 429 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: 'invalid_json' },
      { status: 400 },
    );
  }

  const company =
    typeof body.company === 'string'
      ? body.company.trim()
      : '';

  if (company) {
    return NextResponse.json({ ok: true });
  }

  const name = cleanText(body.name, MAX_NAME_LENGTH);
  const email = cleanText(body.email, 254);
  const category = cleanText(body.category, 80) || 'General';
  const subject =
    cleanText(body.subject, MAX_SUBJECT_LENGTH) ||
    'Website inquiry';
  const message = cleanMessage(body.message);

  if (!name || !validEmail(email) || message.length < 20) {
    return NextResponse.json(
      { error: 'invalid_submission' },
      { status: 400 },
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.BRYAN_CONTACT_EMAIL_FROM?.trim();
  const to =
    process.env.BRYAN_CONTACT_EMAIL_TO?.trim() ||
    'bryanmittelstadt@gmail.com';

  if (!resendApiKey || !from) {
    return NextResponse.json(
      { error: 'delivery_unavailable' },
      { status: 503 },
    );
  }

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Inquiry type: ${category}`,
    '',
    message,
  ].join('\n');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: email,
      subject: `[BryanMittelstadt.com] ${subject}`,
      text,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: 'delivery_failed' },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
