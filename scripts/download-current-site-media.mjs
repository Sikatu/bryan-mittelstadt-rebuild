import { createHash } from 'node:crypto';
import { mkdir, readFile, rename, rm, stat, writeFile } from 'node:fs/promises';
import { dirname, extname, join } from 'node:path';

const root = process.cwd();
const manifestPath = join(root, 'src/content/current-site-media.json');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const force = process.argv.includes('--force');
const verifyOnly = process.argv.includes('--verify-only');
const allowPartial = process.argv.includes('--allow-partial');

function expectedFormat(destination) {
  const extension = extname(destination).toLowerCase();
  if (extension === '.jpg' || extension === '.jpeg') return 'jpeg';
  if (extension === '.png') return 'png';
  return undefined;
}

function detectedFormat(buffer) {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'jpeg';
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return 'png';
  }
  return undefined;
}

async function validLocalFile(file, format) {
  try {
    const info = await stat(file);
    if (!info.isFile() || info.size < 10_000) return false;
    const buffer = await readFile(file);
    return detectedFormat(buffer) === format;
  } catch {
    return false;
  }
}

function transformedUrl(asset, format) {
  const output = asset.destination.split('/').at(-1) ?? `image.${format === 'png' ? 'png' : 'jpg'}`;
  const encoder = format === 'png' ? 'enc_png' : 'enc_jpeg';
  return `${asset.sourceUrl}/v1/fit/w_2400,h_2400,al_c,q_92,${encoder},quality_auto/${encodeURIComponent(output)}`;
}

async function fetchBuffer(url) {
  const response = await fetch(url, {
    redirect: 'follow',
    headers: {
      Accept: 'image/jpeg,image/png,image/webp,image/avif,*/*;q=0.8',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) BryanWebsiteMediaRecovery/1.0',
    },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
  return Buffer.from(await response.arrayBuffer());
}

async function downloadAsset(asset) {
  const destination = join(root, asset.destination);
  const format = expectedFormat(destination);
  if (!format) throw new Error(`Unsupported destination extension: ${asset.destination}`);

  if (!force && (await validLocalFile(destination, format))) {
    return { status: 'verified', bytes: (await stat(destination)).size };
  }

  if (verifyOnly) throw new Error('file missing or invalid');

  let buffer;
  let transformedError;
  try {
    buffer = await fetchBuffer(transformedUrl(asset, format));
  } catch (error) {
    transformedError = error;
  }

  if (!buffer || detectedFormat(buffer) !== format) {
    try {
      buffer = await fetchBuffer(asset.sourceUrl);
    } catch (error) {
      throw new Error(
        `web-ready transform failed (${transformedError instanceof Error ? transformedError.message : 'format mismatch'}); original failed (${error instanceof Error ? error.message : String(error)})`,
      );
    }
  }

  if (detectedFormat(buffer) !== format) {
    throw new Error(`downloaded bytes are not ${format}`);
  }

  await mkdir(dirname(destination), { recursive: true });
  const partial = `${destination}.partial`;
  await writeFile(partial, buffer);
  await rename(partial, destination);

  return {
    status: 'downloaded',
    bytes: buffer.length,
    sha256: createHash('sha256').update(buffer).digest('hex'),
  };
}

console.log('\nBryan Mittelstadt current-site media recovery');
console.log('==============================================');
console.log(`Manifest assets: ${manifest.assets.length}`);
console.log(`Mode: ${verifyOnly ? 'verify only' : force ? 'force download' : 'download missing'}`);

const results = [];
for (const asset of manifest.assets) {
  try {
    const result = await downloadAsset(asset);
    results.push({ asset, ...result });
    console.log(`- ${result.status.padEnd(10)} ${asset.destination}`);
  } catch (error) {
    results.push({ asset, status: 'failed', error: error instanceof Error ? error.message : String(error) });
    console.error(`- failed     ${asset.destination}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

const failures = results.filter((result) => result.status === 'failed');
const requiredFailures = failures.filter((result) => result.asset.selectedForPublicUse);
const downloaded = results.filter((result) => result.status === 'downloaded').length;
const verified = results.filter((result) => result.status === 'verified').length;

console.log('\nRecovery summary');
console.log(`Downloaded: ${downloaded}`);
console.log(`Already valid: ${verified}`);
console.log(`Failed: ${failures.length}`);
console.log(`Required failures: ${requiredFailures.length}`);

const reportPath = join(root, 'reports/current-site-media-recovery.json');
await mkdir(dirname(reportPath), { recursive: true });
await writeFile(
  reportPath,
  `${JSON.stringify({ capturedOn: new Date().toISOString(), results }, null, 2)}\n`,
  'utf8',
);

for (const result of results) {
  const partial = join(root, `${result.asset.destination}.partial`);
  await rm(partial, { force: true });
}

if (requiredFailures.length > 0 || (!allowPartial && failures.length > 0)) {
  process.exitCode = 1;
} else {
  console.log('\nCurrent-site media recovery completed.');
}
