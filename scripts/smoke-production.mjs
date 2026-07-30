import { spawn } from 'node:child_process';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const host = '127.0.0.1';
const port = Number(process.env.SMOKE_PORT ?? 4311);
const baseUrl = `http://${host}:${port}`;
const nextBin = fileURLToPath(new URL('../node_modules/next/dist/bin/next', import.meta.url));

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

function sleep(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseUrl, { redirect: 'manual' });
      if (response.status > 0) return;
    } catch {
      await sleep(250);
    }
  }
  throw new Error('Production server did not become ready within 30 seconds.');
}

function countMatches(text, pattern) {
  return (text.match(pattern) ?? []).length;
}

const server = spawn(process.execPath, [nextBin, 'start', '--hostname', host, '--port', String(port)], {
  cwd: process.cwd(),
  env: { ...process.env, NODE_ENV: 'production' },
  stdio: ['ignore', 'pipe', 'pipe'],
});

let serverOutput = '';
server.stdout.on('data', (chunk) => {
  serverOutput += chunk.toString();
});
server.stderr.on('data', (chunk) => {
  serverOutput += chunk.toString();
});

const failures = [];

try {
  await waitForServer();

  for (const route of htmlRoutes) {
    const response = await fetch(`${baseUrl}${route}`);
    const html = await response.text();
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    const descriptionCount = countMatches(html, /<meta[^>]+name="description"/gi);
    const canonicalCount = countMatches(html, /<link[^>]+rel="canonical"/gi);
    const h1Count = countMatches(html, /<h1(?:\s|>)/gi);

    if (response.status !== 200) failures.push(`${route} returned ${response.status}, expected 200.`);
    if (!response.headers.get('content-type')?.includes('text/html')) failures.push(`${route} did not return HTML.`);
    if (!titleMatch?.[1]?.trim()) failures.push(`${route} is missing a rendered title.`);
    if (descriptionCount !== 1) failures.push(`${route} has ${descriptionCount} meta descriptions.`);
    if (canonicalCount !== 1) failures.push(`${route} has ${canonicalCount} canonical links.`);
    if (h1Count !== 1) failures.push(`${route} has ${h1Count} h1 elements.`);

    for (const [header, expectedFragment] of Object.entries(requiredHeaders)) {
      const value = response.headers.get(header) ?? '';
      if (!value.includes(expectedFragment)) failures.push(`${route} header ${header} is missing ${expectedFragment}.`);
    }

    if (response.headers.has('x-powered-by')) failures.push(`${route} exposes the X-Powered-By header.`);
  }

  for (const [route, contentType] of assetRoutes) {
    const response = await fetch(`${baseUrl}${route}`);
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
    const canonical = route === '/' ? 'https://www.bryanmittelstadt.com' : `https://www.bryanmittelstadt.com${route}`;
    if (!sitemap.includes(`<loc>${canonical}</loc>`)) failures.push(`Sitemap is missing ${canonical}.`);
  }

  const robots = await (await fetch(`${baseUrl}/robots.txt`)).text();
  if (!robots.includes('Sitemap: https://www.bryanmittelstadt.com/sitemap.xml')) {
    failures.push('robots.txt does not publish the canonical sitemap URL.');
  }
} finally {
  server.kill('SIGTERM');
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    sleep(3_000),
  ]);
}

console.log('\nBryan Mittelstadt production smoke test');
console.log('========================================');
console.log(`HTML routes tested: ${htmlRoutes.length}`);
console.log(`Metadata/system routes tested: ${assetRoutes.length}`);
console.log('Security headers tested: 6');
console.log('Custom 404 tested: yes');

if (failures.length > 0) {
  console.error('\nProduction smoke-test failures:');
  for (const failure of failures) console.error(`- ${failure}`);
  if (serverOutput.trim()) console.error(`\nServer output:\n${serverOutput.trim()}`);
  process.exit(1);
}

console.log('\nRoutes, metadata, headers, social images, sitemap, robots, and 404 checks passed.');
