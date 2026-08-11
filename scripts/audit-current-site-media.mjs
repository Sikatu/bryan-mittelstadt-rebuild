import { existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const errors = [];
const manifestPath = join(root, 'src/content/current-site-media.json');

if (!existsSync(manifestPath)) {
  console.error('Current-site media manifest is missing.');
  process.exit(1);
}

const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const manifestOnly = process.env.MEDIA_RECOVERY_MANIFEST_ONLY === '1';

if (manifest.version !== 1) errors.push(`Unsupported manifest version: ${manifest.version}`);
if (!Array.isArray(manifest.assets) || manifest.assets.length < 39) {
  errors.push('The recovery manifest must contain at least 39 deduplicated public image records.');
}

const destinations = new Set();
for (const asset of manifest.assets ?? []) {
  if (!asset.id || !asset.sourceUrl || !asset.destination || !asset.sourcePage) {
    errors.push('Every recovered asset requires id, sourceUrl, sourcePage, and destination.');
    continue;
  }
  if (!asset.sourceUrl.startsWith('https://static.wixstatic.com/media/')) {
    errors.push(`Unexpected media host for ${asset.id}: ${asset.sourceUrl}`);
  }
  if (!asset.destination.startsWith('public/images/bryan/current-site/')) {
    errors.push(`Recovered image must remain under public/images/bryan/current-site/: ${asset.destination}`);
  }
  if (destinations.has(asset.destination)) errors.push(`Duplicate media destination: ${asset.destination}`);
  destinations.add(asset.destination);

  if (!manifestOnly && asset.selectedForPublicUse) {
    const file = join(root, asset.destination);
    if (!existsSync(file) || statSync(file).size < 10_000) {
      errors.push(`Selected recovered media is missing or invalid: ${asset.destination}`);
    }
  }
}

const requiredReelIds = ['dramatic', 'commercial', 'lgbtq', 'musical', 'classical-voice'];
const availableReels = (manifest.actingReels ?? []).filter((reel) => reel.availability === 'available');
for (const id of requiredReelIds) {
  const reel = availableReels.find((entry) => entry.id === id);
  if (!reel?.url?.startsWith('https://www.youtube.com/watch?v=')) {
    errors.push(`Recovered acting reel is missing or invalid: ${id}`);
  }
}

if (manifest.social?.instagram !== 'https://www.instagram.com/bryanpatrickm/') {
  errors.push('Recovered Instagram URL is missing or unexpected.');
}
if (manifest.social?.youtube !== 'https://www.youtube.com/channel/UCuxBCsAa0XQcO8rOk2Zjqjg') {
  errors.push('Recovered YouTube channel URL is missing or unexpected.');
}

const requiredSourceFiles = [
  'src/content/assets.ts',
  'src/content/media.ts',
  'src/content/social.ts',
  'scripts/download-current-site-media.mjs',
  'docs/CURRENT-SITE-MEDIA-RECOVERY.md',
  'docs/PHASE-8-CHANGELOG.md',
];
for (const file of requiredSourceFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing Phase 8 file: ${file}`);
}

if (!manifestOnly) {
  const zip = join(root, 'public/downloads/bryan-mittelstadt-current-site-headshots.zip');
  if (!existsSync(zip) || statSync(zip).size < 20_000) {
    errors.push('Recovered headshot ZIP is missing or invalid.');
  }
}

console.log('\nBryan Mittelstadt Phase 8 current-site media audit');
console.log('====================================================');
console.log(`Public image records: ${manifest.assets?.length ?? 0}`);
console.log(`Images selected for current use: ${(manifest.assets ?? []).filter((asset) => asset.selectedForPublicUse).length}`);
console.log(`Recovered acting reels available: ${availableReels.length}`);
console.log(`Unrecovered categories documented: ${manifest.unrecovered?.length ?? 0}`);
console.log(`File verification: ${manifestOnly ? 'manifest-only mode' : 'enabled'}`);

if (errors.length > 0) {
  console.error('\nCurrent-site media integrity failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nCurrent-site media mapping and recovery integrity checks passed.');
}
