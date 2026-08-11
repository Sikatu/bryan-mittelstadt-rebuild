import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const errors = [];
const expectedPageFiles = [
  'src/app/page.tsx',
  'src/app/about/page.tsx',
  'src/app/acting/page.tsx',
  'src/app/contact/page.tsx',
  'src/app/headshots/page.tsx',
  'src/app/music/page.tsx',
  'src/app/lmntl-studios/page.tsx',
  'src/app/resume/page.tsx',
  'src/app/voice-over/page.tsx',
  'src/app/writing-filmmaking/page.tsx',
];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8');
}

function requireFile(relativePath) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    errors.push(`Missing required Phase 6 file: ${relativePath}`);
    return false;
  }
  return true;
}

for (const file of [
  ...expectedPageFiles,
  'src/app/layout.tsx',
  'src/app/not-found.tsx',
  'src/app/manifest.ts',
  'src/app/opengraph-image.tsx',
  'src/app/twitter-image.tsx',
  'src/app/robots.ts',
  'src/app/sitemap.ts',
  'next.config.ts',
]) {
  requireFile(file);
}

const sourceFiles = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(fullPath);
    else if (/\.(?:ts|tsx|mjs)$/.test(entry.name)) sourceFiles.push(fullPath);
  }
}
walk(path.join(root, 'src'));

const sourceText = sourceFiles.map((file) => fs.readFileSync(file, 'utf8')).join('\n');
const mainCount = (sourceText.match(/<main(?:\s|>)/g) ?? []).length;
if (mainCount !== 1) errors.push(`Expected exactly one <main> landmark; found ${mainCount}.`);

const layout = read('src/app/layout.tsx');
if (!layout.includes('lang="en"')) errors.push('Root layout must declare lang="en".');
if (!layout.includes('id="main-content"') || !layout.includes('tabIndex={-1}')) {
  errors.push('The skip-link target must be a programmatically focusable main landmark.');
}
if (!layout.includes('export const viewport')) errors.push('Root viewport configuration is missing.');

for (const pageFile of expectedPageFiles) {
  const page = read(pageFile);
  if (!page.includes('export const metadata')) errors.push(`${pageFile} does not export route metadata.`);
  const hasH1 = /<h1(?:\s|>)/.test(page) || /SectionHeading[^>]*as="h1"/.test(page) || page.includes('<HeroSection');
  if (!hasH1) errors.push(`${pageFile} does not expose an identifiable h1.`);
}

const home = read('src/app/page.tsx');
if (!home.includes('absoluteTitle: true')) errors.push('Homepage metadata must use an absolute title to avoid duplicate branding.');
if (home.includes('as="h3"')) errors.push('Homepage contains a heading-level skip.');

const about = read('src/app/about/page.tsx');
if (about.includes('<main')) errors.push('About page must not nest another main landmark inside the root layout.');

const ogImage = read('src/app/opengraph-image.tsx');
if (/zIndex\s*:/.test(ogImage)) errors.push('Open Graph ImageResponse still contains unsupported zIndex styling.');

const config = read('next.config.ts');
for (const marker of [
  'poweredByHeader: false',
  'Content-Security-Policy',
  'Referrer-Policy',
  'X-Content-Type-Options',
  'X-Frame-Options',
  'Permissions-Policy',
  'Strict-Transport-Security',
]) {
  if (!config.includes(marker)) errors.push(`Security configuration is missing ${marker}.`);
}

const sitemap = read('src/app/sitemap.ts');
if (sitemap.includes('lastModified: new Date()')) errors.push('Sitemap must not claim every page changed at build time.');
if (!sitemap.includes('siteConfig.seo.lastUpdated')) errors.push('Sitemap must use the tracked content update date.');

const robots = read('src/app/robots.ts');
if (!robots.includes('/sitemap.xml')) errors.push('robots.ts must publish the sitemap URL.');

const mobileNavigation = read('src/components/MobileNavigation.tsx');
const siteHeader = read('src/components/SiteHeader.tsx');
if (!mobileNavigation.includes('aria-hidden={!isOpen}')) errors.push('Closed mobile navigation must be hidden from assistive technology.');
if (!siteHeader.includes('mobileMenuButtonRef.current?.focus()')) errors.push('Mobile navigation must restore focus to its opener.');

const inquiryForm = read('src/components/InquiryForm.tsx');
for (const marker of ['category-description', 'message-requirements', 'aria-live="polite"']) {
  if (!inquiryForm.includes(marker)) errors.push(`Inquiry form accessibility marker missing: ${marker}.`);
}

const css = read('src/app/globals.css');
for (const marker of ['prefers-reduced-motion', ':focus-visible', '@media print']) {
  if (!css.includes(marker)) errors.push(`Global accessibility/print styling missing: ${marker}.`);
}

const iframeCount = (sourceText.match(/<iframe(?:\s|>)/g) ?? []).length;
const titledIframeCount = (sourceText.match(/<iframe[\s\S]*?title=/g) ?? []).length;
if (titledIframeCount < iframeCount) errors.push('Every iframe must have a descriptive title.');

const targetBlankCount = (sourceText.match(/target="_blank"/g) ?? []).length;
const noopenerCount = (sourceText.match(/rel="noopener noreferrer"/g) ?? []).length;
if (noopenerCount < targetBlankCount) errors.push('Every target="_blank" link must include noopener noreferrer.');

console.log('\nBryan Mittelstadt Phase 6 quality readiness audit');
console.log('==================================================');
console.log(`Application source files scanned: ${sourceFiles.length}`);
console.log(`Expected public pages: ${expectedPageFiles.length}`);
console.log(`Main landmarks: ${mainCount}`);
console.log(`Iframes with titles: ${titledIframeCount}/${iframeCount}`);
console.log(`External links with target=\"_blank\": ${targetBlankCount}`);
console.log(`noopener/noreferrer markers: ${noopenerCount}`);
console.log('Security header configuration: present');
console.log('Generated social-card compatibility: configured');

if (errors.length > 0) {
  console.error('\nQuality readiness failures:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log('\nSEO, accessibility, security, and source-level QA checks passed.');
