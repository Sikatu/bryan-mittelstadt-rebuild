import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];

function read(relativePath) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) {
    errors.push(`Missing LMNTL file: ${relativePath}`);
    return '';
  }
  return fs.readFileSync(absolutePath, 'utf8');
}

const page = read('src/app/lmntl-studios/page.tsx');
const content = read('src/content/lmntl.ts');
const emblem = read('src/components/LmntlEmblem.tsx');
const navigation = read('src/content/navigation.ts');
const sitemap = read('src/app/sitemap.ts');
const contact = read('src/content/contact.ts');
const header = read('src/components/SiteHeader.tsx');
const packageJson = JSON.parse(read('package.json') || '{}');

const requiredImages = [
  'public/images/lmntl/spotlights.webp',
  'public/images/lmntl/earth.webp',
  'public/images/lmntl/air.webp',
  'public/images/lmntl/fire.webp',
  'public/images/lmntl/water.webp',
  'public/images/lmntl/nebula.webp',
];

for (const relativePath of requiredImages) {
  const absolutePath = path.join(root, relativePath);
  if (!fs.existsSync(absolutePath)) errors.push(`Missing LMNTL image: ${relativePath}`);
}

for (const marker of [
  'export const metadata',
  '<h1',
  'The Elemental Framework',
  'The Fifth Element',
  'Founder & Creative Lead',
  'LMNTL Inquiry',
]) {
  if (!page.includes(marker)) errors.push(`LMNTL page is missing ${marker}.`);
}

for (const element of ['Earth', 'Air', 'Fire', 'Water']) {
  if (!content.includes(`name: '${element}'`)) errors.push(`LMNTL content is missing ${element}.`);
}

if (!emblem.includes('Fifth element — the artist')) errors.push('LMNTL emblem is missing the fifth-element marker.');
if (!navigation.includes("href: '/lmntl-studios'")) errors.push('Primary navigation is missing LMNTL Studios.');
if (!sitemap.includes("'/lmntl-studios'")) errors.push('Sitemap is missing LMNTL Studios.');
if (!contact.includes("id: 'lmntl-studios'")) errors.push('Contact categories are missing LMNTL Studios.');
if (!header.includes("pathname === '/lmntl-studios'")) errors.push('Header is not configured for the LMNTL dark route.');
if (!packageJson.scripts?.['audit:lmntl']) errors.push('package.json is missing audit:lmntl.');

console.log('\nLMNTL STUDIOS page audit');
console.log('==========================');
console.log('Route: /lmntl-studios');
console.log('Elemental framework: configured');
console.log('Code-built emblem: configured');
console.log('Elemental image system: 6 optimized assets configured');
console.log('Navigation and sitemap: configured');
console.log('Studio inquiry category: configured');

if (errors.length > 0) {
  console.error('\nLMNTL page failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nLMNTL STUDIOS page integrity checks passed.');
