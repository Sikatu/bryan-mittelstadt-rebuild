import { parseArguments, normalizeOrigin } from './lib/release-utils.mjs';

const args = parseArguments();
const environment = String(args.environment || 'staging');
const baseUrl = normalizeOrigin(String(args.url || process.env.REMOTE_SMOKE_URL || ''));

if (!['staging', 'production'].includes(environment)) {
  console.error(`Unknown remote smoke environment: ${environment}`);
  process.exit(1);
}

if (!baseUrl || !baseUrl.startsWith('https://')) {
  console.error('Remote smoke testing requires an absolute HTTPS --url or REMOTE_SMOKE_URL.');
  process.exit(1);
}

const htmlRoutes = [
  '/',
  '/about',
  '/acting',
  '/contact',
  '/headshots',
  '/music',
  '/resume',
  '/voice-over',
  '/writing-filmmaking',
];

const assetRoutes = [
  ['/robots.txt', 'text/plain'],
  ['/sitemap.xml', 'application/xml'],
  ['/manifest.webmanifest', 'application/manifest+json'],
  ['/opengraph-image', 'image/png'],
  ['/twitter-image', 'image/png'],
];

const requiredHeaders = {
  'content-security-policy': "default-src 'self'",
  'referrer-policy': 'strict-origin-when-cross-origin',
  'x-content-type-options': 'nosniff',
  'x-frame-options': 'DENY',
  'permissions-policy': 'camera=()',
  'strict-transport-security': 'max-age=31536000',
};

function countMatches(text, pattern) {
  return (text.match(pattern) ?? []).length;
}

const failures = [];

for (const route of htmlRoutes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: 'manual' });
  const html = await response.text();
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const descriptionCount = countMatches(html, /<meta[^>]+name="description"/gi);
  const canonicalCount = countMatches(html, /<link[^>]+rel="canonical"/gi);
  const h1Count = countMatches(html, /<h1(?:\s|>)/gi);
  const hasNoIndex = /<meta[^>]+name="robots"[^>]+noindex/i.test(html);

  if (response.status !== 200) failures.push(`${route} returned ${response.status}, expected 200.`);
  if (!response.headers.get('content-type')?.includes('text/html')) failures.push(`${route} did not return HTML.`);
  if (!titleMatch?.[1]?.trim()) failures.push(`${route} is missing a rendered title.`);
  if (descriptionCount !== 1) failures.push(`${route} has ${descriptionCount} meta descriptions.`);
  if (canonicalCount !== 1) failures.push(`${route} has ${canonicalCount} canonical links.`);
  if (h1Count !== 1) failures.push(`${route} has ${h1Count} h1 elements.`);
  if (environment === 'staging' && !hasNoIndex) failures.push(`${route} staging page is missing noindex.`);
  if (environment === 'production' && hasNoIndex) failures.push(`${route} production page unexpectedly has noindex.`);
  const expectedCanonical = route === '/' ? baseUrl : `${baseUrl}${route}`;
  const acceptedCanonicals =
    route === '/' ? [expectedCanonical, `${expectedCanonical}/`] : [expectedCanonical];
  if (!acceptedCanonicals.some((canonical) => html.includes(`href="${canonical}"`))) {
    failures.push(`${route} canonical does not use ${expectedCanonical}.`);
  }

  for (const [header, expectedFragment] of Object.entries(requiredHeaders)) {
    const value = response.headers.get(header) ?? '';
    if (!value.includes(expectedFragment)) failures.push(`${route} header ${header} is missing ${expectedFragment}.`);
  }

  if (response.headers.has('x-powered-by')) failures.push(`${route} exposes the X-Powered-By header.`);
}

for (const [route, contentType] of assetRoutes) {
  const response = await fetch(`${baseUrl}${route}`, { redirect: 'manual' });
  if (response.status !== 200) failures.push(`${route} returned ${response.status}, expected 200.`);
  if (!response.headers.get('content-type')?.includes(contentType)) {
    failures.push(`${route} returned ${response.headers.get('content-type')}, expected ${contentType}.`);
  }
}

const missing = await fetch(`${baseUrl}/this-route-does-not-exist`);
const missingHtml = await missing.text();
if (missing.status !== 404) failures.push(`Unknown route returned ${missing.status}, expected 404.`);
if (!/Page Not Found/i.test(missingHtml)) failures.push('Custom not-found page did not render.');
if (!/noindex/i.test(missingHtml)) failures.push('Not-found response is missing noindex metadata.');

const sitemap = await (await fetch(`${baseUrl}/sitemap.xml`)).text();
for (const route of htmlRoutes) {
  const canonical = route === '/' ? baseUrl : `${baseUrl}${route}`;
  if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`Sitemap is missing ${canonical}.`);
}

const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
if (environment === 'staging') {
  if (!/Disallow:\s*\//i.test(robots)) failures.push('Staging robots.txt must disallow crawling.');
  if (/Sitemap:/i.test(robots)) failures.push('Staging robots.txt must not publish a sitemap.');
} else if (!robots.includes(`Sitemap: ${baseUrl}/sitemap.xml`)) {
  failures.push('Production robots.txt does not publish the canonical sitemap URL.');
}

console.log('\nBryan Mittelstadt remote deployment smoke test');
console.log('==============================================');
console.log(`Environment: ${environment}`);
console.log(`Base URL: ${baseUrl}`);
console.log(`HTML routes tested: ${htmlRoutes.length}`);
console.log(`Metadata/system routes tested: ${assetRoutes.length}`);
console.log('Security headers tested: 6');
console.log('Custom 404 tested: yes');

if (failures.length > 0) {
  console.error('\nRemote smoke-test failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('\nRemote routes, metadata, indexing policy, headers, social images, and 404 checks passed.');
