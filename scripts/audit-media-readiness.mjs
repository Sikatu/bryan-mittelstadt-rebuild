import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const errors = [];

const requiredFiles = [
  'src/lib/media.ts',
  'src/components/VideoReelGallery.tsx',
  'src/components/AudioReelPlayer.tsx',
  'src/components/CreativeProjectCard.tsx',
  'src/components/MediaStatusBadge.tsx',
  'src/content/media.ts',
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing Phase 3 file: ${file}`);
}

const mediaPath = join(root, 'src/content/media.ts');
const mediaSource = existsSync(mediaPath) ? readFileSync(mediaPath, 'utf8') : '';

const requiredActingIds = ['dramatic', 'comedic', 'commercial', 'lgbtq', 'musical', 'stage'];
const requiredVoiceIds = ['commercial', 'narration', 'character', 'radio-drama'];

function extractArray(name) {
  const match = mediaSource.match(new RegExp(`export const ${name}[^=]*=\\s*\\[([\\s\\S]*?)\\n\\];`));
  return match?.[1] ?? '';
}

function objectBlocks(arraySource) {
  return [...arraySource.matchAll(/\{([\s\S]*?)\n\s*\},?/g)].map((match) => match[1]);
}

function quotedField(block, field) {
  return block.match(new RegExp(`${field}:\\s*['\"]([^'\"]+)['\"]`))?.[1];
}

function auditMediaArray(name, requiredIds, urlField) {
  const source = extractArray(name);
  if (!source) {
    errors.push(`Unable to locate ${name} configuration.`);
    return { total: 0, available: 0, pending: 0 };
  }

  const blocks = objectBlocks(source);
  const ids = blocks.map((block) => quotedField(block, 'id')).filter(Boolean);
  for (const id of requiredIds) {
    if (!ids.includes(id)) errors.push(`${name} is missing required category id: ${id}`);
  }

  let available = 0;
  let pending = 0;
  for (const block of blocks) {
    const id = quotedField(block, 'id') ?? 'unknown';
    const availability = quotedField(block, 'availability');
    const url = quotedField(block, urlField);

    if (availability === 'available') {
      available += 1;
      if (!url) errors.push(`${name}.${id} is available but has no ${urlField}.`);
    }
    if (availability === 'pending') {
      pending += 1;
      if (url) errors.push(`${name}.${id} is pending but already exposes ${urlField}.`);
    }
    if (url === '#' || /example\.(com|org|net)/i.test(url ?? '')) {
      errors.push(`${name}.${id} uses a placeholder URL.`);
    }
  }

  return { total: blocks.length, available, pending };
}

const acting = auditMediaArray('actingReels', requiredActingIds, 'url');
const voice = auditMediaArray('voiceOverReels', requiredVoiceIds, 'audioUrl');

const pageRequirements = [
  ['src/app/acting/page.tsx', ['VideoReelGallery', 'Acting Inquiries']],
  ['src/app/voice-over/page.tsx', ['AudioReelPlayer', 'Send Voice-Over Inquiry']],
  ['src/app/music/page.tsx', ['musicSamples', 'Music Inquiries']],
  ['src/app/writing-filmmaking/page.tsx', ['CreativeProjectCard', 'Creative Inquiries']],
];

for (const [file, tokens] of pageRequirements) {
  const path = join(root, file);
  if (!existsSync(path)) {
    errors.push(`Missing discipline page: ${file}`);
    continue;
  }
  const source = readFileSync(path, 'utf8');
  for (const token of tokens) {
    if (!source.includes(token)) errors.push(`${file} is missing Phase 3 integration: ${token}`);
  }
}

const audioPlayer = readFileSync(join(root, 'src/components/AudioReelPlayer.tsx'), 'utf8');
for (const token of ['<audio', 'type="range"', 'aria-label', 'onError']) {
  if (!audioPlayer.includes(token)) errors.push(`Audio player is missing accessibility or fallback behavior: ${token}`);
}

const videoGallery = readFileSync(join(root, 'src/components/VideoReelGallery.tsx'), 'utf8');
for (const token of ['<iframe', 'allowFullScreen', 'aria-pressed', 'Awaiting Bryan’s approved media link']) {
  if (!videoGallery.includes(token)) errors.push(`Video gallery is missing responsive or fallback behavior: ${token}`);
}

console.log('\nBryan Mittelstadt Phase 3 media readiness audit');
console.log('================================================');
console.log(`Acting reel slots: ${acting.total}`);
console.log(`Acting reels available: ${acting.available}`);
console.log(`Acting reels pending: ${acting.pending}`);
console.log(`Voice-over reel slots: ${voice.total}`);
console.log(`Voice-over reels available: ${voice.available}`);
console.log(`Voice-over reels pending: ${voice.pending}`);
console.log(`Structural media components: ${requiredFiles.length}`);

if (errors.length > 0) {
  console.error('\nMedia readiness failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nMedia architecture and fallback integrity checks passed.');
}
