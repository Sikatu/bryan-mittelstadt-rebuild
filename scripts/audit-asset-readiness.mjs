import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const errors = [];

function walk(directory) {
  if (!existsSync(directory)) return [];
  return readdirSync(directory).flatMap((entry) => {
    const fullPath = join(directory, entry);
    return statSync(fullPath).isDirectory() ? walk(fullPath) : [fullPath];
  });
}

const requiredFiles = [
  'src/components/EditorialImage.tsx',
  'src/content/assets.ts',
  'src/app/opengraph-image.tsx',
  'src/app/twitter-image.tsx',
  'src/app/media/approved/[asset]/route.ts',
  'src/app/downloads/bryan-mittelstadt-resume.pdf/route.ts',
  'docs/ASSET-INTEGRATION-GUIDE.md',
  'docs/PHASE-5-CHANGELOG.md',
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing Phase 5 file: ${file}`);
}

const sourceFiles = walk(join(root, 'src')).filter((file) => /\.(ts|tsx|css)$/.test(file));
const legacyReferences = [];
for (const file of sourceFiles) {
  const content = readFileSync(file, 'utf8');
  if (content.includes('/images/placeholders/')) {
    legacyReferences.push(relative(root, file));
  }
}
for (const file of legacyReferences) errors.push(`Legacy placeholder path remains in ${file}`);

const legacyPlaceholderDirectory = join(root, 'public/images/placeholders');
if (existsSync(legacyPlaceholderDirectory)) {
  errors.push('Legacy public/images/placeholders directory still exists.');
}

const assetsPath = join(root, 'src/content/assets.ts');
const assetsSource = existsSync(assetsPath) ? readFileSync(assetsPath, 'utf8') : '';
const pendingSlots = Math.max(0, (assetsSource.match(/pendingAsset\(/g) ?? []).length - 1);
const approvedSlots = Math.max(0, (assetsSource.match(/approvedAsset\(/g) ?? []).length - 1);
const configuredLocalPaths = [
  ...assetsSource.matchAll(/['"](\/images\/bryan\/[^'"]+)['"]/g),
].map((match) => match[1]);

for (const source of configuredLocalPaths) {
  const publicPath = join(root, 'public', source.replace(/^\//, ''));
  if (!existsSync(publicPath)) {
    errors.push(`Configured image directory or file does not exist: ${source}`);
  }
}

function requireTokens(file, tokens) {
  const path = join(root, file);
  if (!existsSync(path)) return;
  const source = readFileSync(path, 'utf8');
  for (const token of tokens) {
    if (!source.includes(token)) errors.push(`${file} is missing Phase 5 behavior: ${token}`);
  }
}

requireTokens('src/components/EditorialImage.tsx', [
  'data-asset-state',
  'asset.objectPosition',
  "asset.availability === 'available'",
  'Approved image pending',
]);
requireTokens('src/content/assets.ts', [
  'projectImageAssets',
  'disciplineImageAssets',
  'hero-primary',
  'about-portrait',
  '/media/approved',
]);
requireTokens('src/app/media/approved/[asset]/route.ts', [
  'headshot-theatrical',
  'headshot-commercial',
  'lifestyle',
  'quiet-after-supper',
  'drive.usercontent.google.com/download',
]);
requireTokens('src/app/downloads/bryan-mittelstadt-resume.pdf/route.ts', [
  '1xkXsF_iqm9LO2a6h7NO017dXntL0BCNS',
  'application/pdf',
  'Content-Disposition',
]);
requireTokens('src/content/site.ts', ["ogImage: '/opengraph-image'", "resumeUrl: '/downloads/bryan-mittelstadt-resume.pdf'"]);
requireTokens('src/app/opengraph-image.tsx', ['new ImageResponse', 'Official Portfolio']);

console.log('\nBryan Mittelstadt Phase 5 asset readiness audit');
console.log('================================================');
console.log(`Central image slots: ${pendingSlots + approvedSlots}`);
console.log(`Approved image slots configured: ${approvedSlots}`);
console.log(`Client image slots pending: ${pendingSlots}`);
console.log(`Legacy placeholder references: ${legacyReferences.length}`);
console.log('Approved Drive-backed media proxy: configured');
console.log('Canonical résumé download route: configured');
console.log('Generated Open Graph card: configured');

if (errors.length > 0) {
  console.error('\nAsset readiness failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nAsset architecture and fallback integrity checks passed.');
}
