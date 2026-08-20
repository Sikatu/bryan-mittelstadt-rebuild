import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const sourceRoot = join(root, 'src');

function walk(directory) {
  return readdirSync(directory).flatMap((entry) => {
    const absolutePath = join(directory, entry);
    return statSync(absolutePath).isDirectory() ? walk(absolutePath) : [absolutePath];
  });
}

const sourceFiles = walk(sourceRoot).filter((file) => /\.(ts|tsx|css)$/.test(file));
const placeholderReferences = [];
const deadHashLinks = [];
const unsafeAny = [];

for (const file of sourceFiles) {
  const content = readFileSync(file, 'utf8');
  const fileName = relative(root, file);

  for (const match of content.matchAll(/\/images\/placeholders\/[A-Za-z0-9._/-]+/g)) {
    placeholderReferences.push({ file: fileName, value: match[0] });
  }

  if (/href\s*=\s*["']#["']/.test(content) || /\?\?\s*["']#["']/.test(content)) {
    deadHashLinks.push(fileName);
  }

  if (/\bas\s+any\b|:\s*any\b/.test(content)) {
    unsafeAny.push(fileName);
  }
}

const requiredTechnicalAssets = [
  'src/app/opengraph-image.tsx',
  'src/app/twitter-image.tsx',
  'src/components/EditorialImage.tsx',
  'src/app/media/approved/[asset]/route.ts',
  'src/app/downloads/bryan-mittelstadt-resume.pdf/route.ts',
];
const missingTechnicalAssets = requiredTechnicalAssets.filter(
  (asset) => !existsSync(join(root, asset)),
);

console.log('\nBryan Mittelstadt rebuild readiness audit');
console.log('=========================================');
console.log(`Source files scanned: ${sourceFiles.length}`);
console.log(`Legacy placeholder references: ${placeholderReferences.length}`);
console.log(`Dead hash-link files: ${deadHashLinks.length}`);
console.log(`Unsafe any files: ${unsafeAny.length}`);
console.log(`Missing technical launch assets: ${missingTechnicalAssets.length}`);
console.log('Client résumé delivery: canonical Drive-backed first-party route');

if (placeholderReferences.length > 0) {
  console.log('\nLegacy placeholder references still to remove:');
  for (const item of placeholderReferences) {
    console.log(`- ${item.file}: ${item.value}`);
  }
}

if (missingTechnicalAssets.length > 0) {
  console.log('\nRequired technical launch assets are missing:');
  for (const asset of missingTechnicalAssets) console.log(`- ${asset}`);
}

if (
  deadHashLinks.length > 0 ||
  unsafeAny.length > 0 ||
  placeholderReferences.length > 0 ||
  missingTechnicalAssets.length > 0
) {
  console.error('\nReadiness integrity failures detected.');
  process.exitCode = 1;
} else {
  console.log('\nInteraction and technical asset integrity checks passed.');
}
