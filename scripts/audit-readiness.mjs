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

const requiredAssets = [
  'public/images/og-default.jpg',
  'public/bryan-mittelstadt-resume.pdf',
];
const missingAssets = requiredAssets.filter((asset) => !existsSync(join(root, asset)));

console.log('\nBryan Mittelstadt rebuild readiness audit');
console.log('=========================================');
console.log(`Source files scanned: ${sourceFiles.length}`);
console.log(`Placeholder references: ${placeholderReferences.length}`);
console.log(`Dead hash-link files: ${deadHashLinks.length}`);
console.log(`Unsafe any files: ${unsafeAny.length}`);
console.log(`Missing required launch assets: ${missingAssets.length}`);

if (placeholderReferences.length > 0) {
  console.log('\nPlaceholder references still to replace:');
  for (const item of placeholderReferences) {
    console.log(`- ${item.file}: ${item.value}`);
  }
}

if (missingAssets.length > 0) {
  console.log('\nRequired launch assets not supplied:');
  for (const asset of missingAssets) console.log(`- ${asset}`);
}

if (deadHashLinks.length > 0 || unsafeAny.length > 0) {
  console.error('\nIntegrity failures detected.');
  process.exitCode = 1;
} else {
  console.log('\nInteraction integrity checks passed.');
}
