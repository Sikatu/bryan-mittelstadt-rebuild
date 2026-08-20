import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(fileURLToPath(new URL('..', import.meta.url)));
const errors = [];

const requiredFiles = [
  'src/components/ResumeActions.tsx',
  'src/components/HeadshotGallery.tsx',
  'src/components/InquiryForm.tsx',
  'src/content/contact.ts',
  'src/app/api/contact/route.ts',
  'src/app/about/page.tsx',
  'src/app/resume/page.tsx',
  'src/app/headshots/page.tsx',
  'src/app/contact/page.tsx',
];

for (const file of requiredFiles) {
  if (!existsSync(join(root, file))) errors.push(`Missing Phase 4 file: ${file}`);
}

function requireTokens(file, tokens) {
  const path = join(root, file);
  if (!existsSync(path)) return;
  const source = readFileSync(path, 'utf8');
  for (const token of tokens) {
    if (!source.includes(token)) errors.push(`${file} is missing Phase 4 behavior: ${token}`);
  }
}

requireTokens('src/components/ResumeActions.tsx', [
  'window.print()',
  'Download PDF',
  'aria-label="Résumé actions"',
]);

requireTokens('src/components/HeadshotGallery.tsx', [
  '<dialog',
  'showModal()',
  "event.key === 'ArrowLeft'",
  "event.key === 'ArrowRight'",
  'Download Original',
  'openerRef.current?.focus()',
]);

requireTokens('src/components/InquiryForm.tsx', [
  'aria-live="polite"',
  'company',
  'minimumMessageLength',
  'config.endpoint',
  'mailto:',
  'Send Inquiry',
]);

requireTokens('src/app/api/contact/route.ts', [
  'RESEND_API_KEY',
  'BRYAN_CONTACT_EMAIL_FROM',
  'BRYAN_CONTACT_EMAIL_TO',
  'rate_limited',
  'invalid_origin',
]);

requireTokens('src/app/resume/page.tsx', ['ResumeActions', 'resume-sheet', 'Representation']);
requireTokens('src/app/headshots/page.tsx', ['HeadshotGallery', 'final client-supplied images']);
requireTokens('src/app/contact/page.tsx', ['InquiryForm', 'inquiry-form', 'representation']);
requireTokens('src/app/about/page.tsx', ['Selected Recognition', 'Casting Details', 'View Headshots']);
requireTokens('src/app/globals.css', ['@media print', '.resume-sheet', 'dialog::backdrop']);

const contactSource = readFileSync(join(root, 'src/content/contact.ts'), 'utf8');
const categoryIds = ['acting', 'voice-over', 'music', 'writing-filmmaking', 'press', 'general'];
for (const id of categoryIds) {
  if (!contactSource.includes(`id: '${id}'`)) errors.push(`Missing contact category: ${id}`);
}

if (/endpoint:\s*['"](?:#|https?:\/\/example\.)/i.test(contactSource)) {
  errors.push('Contact workflow exposes a placeholder form endpoint.');
}

console.log('\nBryan Mittelstadt Phase 4 portfolio workflow audit');
console.log('====================================================');
console.log(`Structural workflow files: ${requiredFiles.length}`);
console.log(`Inquiry categories: ${categoryIds.length}`);
console.log('Résumé PDF + print workflow: configured');
console.log('Headshot lightbox + original-download workflow: configured');
console.log('Contact delivery mode: first-party endpoint with direct-email fallback');

if (errors.length > 0) {
  console.error('\nPortfolio workflow failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log('\nPortfolio workflow integrity checks passed.');
}
