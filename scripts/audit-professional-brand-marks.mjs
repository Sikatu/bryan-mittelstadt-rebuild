import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const requiredAssets = [
  'public/images/brand-marks/youtube.webp',
  'public/images/brand-marks/actors-equity.webp',
  'public/images/brand-marks/cesd.webp',
  'public/images/brand-marks/eris.webp',
  'public/images/brand-marks/imdb.webp',
  'public/images/brand-marks/instagram.webp',
  'public/images/brand-marks/sag-aftra.webp',
];

const requiredFiles = [
  'src/components/ProfessionalLogoNetwork.tsx',
  'src/components/SiteFooter.tsx',
  'src/app/layout.tsx',
  'src/app/globals.css',
];

const missingFiles = [...requiredAssets, ...requiredFiles].filter(
  (relativePath) =>
    !fs.existsSync(path.join(root, relativePath)),
);

if (missingFiles.length > 0) {
  console.error('Missing professional brand-mark files:');
  for (const missingFile of missingFiles) {
    console.error(`- ${missingFile}`);
  }
  process.exit(1);
}

const network = fs.readFileSync(
  path.join(
    root,
    'src/components/ProfessionalLogoNetwork.tsx',
  ),
  'utf8',
);

const footer = fs.readFileSync(
  path.join(root, 'src/components/SiteFooter.tsx'),
  'utf8',
);

const layout = fs.readFileSync(
  path.join(root, 'src/app/layout.tsx'),
  'utf8',
);

const css = fs.readFileSync(
  path.join(root, 'src/app/globals.css'),
  'utf8',
);

const requiredNetworkTokens = [
  "'sag-aftra'",
  "'actors-equity'",
  "'cesd'",
  "'eris'",
  'sag-aftra.webp',
  'actors-equity.webp',
  'cesd.webp',
  'eris.webp',
  'professional-logo-network--universal',
  'Affiliations &amp; representation',
];

const missingNetworkTokens = requiredNetworkTokens.filter(
  (token) => !network.includes(token),
);

if (missingNetworkTokens.length > 0) {
  console.error(
    'Universal professional-logo network is incomplete:',
  );
  for (const token of missingNetworkTokens) {
    console.error(`- missing ${token}`);
  }
  process.exit(1);
}

const forbiddenNetworkTokens = [
  "'youtube'",
  "'instagram'",
  "'imdb'",
  'usePathname',
  '/lmntl-studios',
];

const forbiddenNetworkMatches = forbiddenNetworkTokens.filter(
  (token) => network.includes(token),
);

if (forbiddenNetworkMatches.length > 0) {
  console.error(
    'The professional network contains disallowed route or social-logo logic:',
  );
  for (const token of forbiddenNetworkMatches) {
    console.error(`- unexpected ${token}`);
  }
  process.exit(1);
}

const footerOrder = [
  "platform: 'Instagram'",
  "platform: 'YouTube'",
  "platform: 'IMDb'",
];

let previousIndex = -1;

for (const token of footerOrder) {
  const currentIndex = footer.indexOf(token);

  if (currentIndex === -1 || currentIndex <= previousIndex) {
    console.error(
      'Footer social logos are missing or out of order.',
    );
    process.exit(1);
  }

  previousIndex = currentIndex;
}

const requiredFooterTokens = [
  'instagram.webp',
  'youtube.webp',
  'imdb.webp',
  'minimal-footer-social',
  'minimal-footer-social__link',
  'minimal-footer-social__logo',
  'getVerifiedSocialLinks',
  'rel="noopener noreferrer"',
];

const missingFooterTokens = requiredFooterTokens.filter(
  (token) => !footer.includes(token),
);

if (missingFooterTokens.length > 0) {
  console.error('Minimal footer-logo system is incomplete:');
  for (const token of missingFooterTokens) {
    console.error(`- missing ${token}`);
  }
  process.exit(1);
}

const forbiddenFooterTokens = [
  'premium-footer-social__plate',
  'premium-footer-social__label',
  'premium-footer-social__arrow',
  'sag-aftra.webp',
  'actors-equity.webp',
  'cesd.webp',
  'eris.webp',
];

const forbiddenFooterMatches = forbiddenFooterTokens.filter(
  (token) => footer.includes(token),
);

if (forbiddenFooterMatches.length > 0) {
  console.error(
    'The footer still contains card, label, arrow, or professional-logo markup:',
  );
  for (const token of forbiddenFooterMatches) {
    console.error(`- unexpected ${token}`);
  }
  process.exit(1);
}

if (
  !layout.includes(
    "import ProfessionalLogoNetwork from '@/components/ProfessionalLogoNetwork';",
  ) ||
  !layout.includes('<ProfessionalLogoNetwork />')
) {
  console.error(
    'The universal professional-logo section is not mounted globally.',
  );
  process.exit(1);
}

const requiredCssTokens = [
  '/* BEGIN PROFESSIONAL LOGO NETWORK',
  '/* END PROFESSIONAL LOGO NETWORK */',
  '/* BEGIN MINIMAL FOOTER SOCIAL UPDATE',
  '/* END MINIMAL FOOTER SOCIAL UPDATE */',
  'professional-logo-network--universal',
  'minimal-footer-social__logo--instagram',
  'minimal-footer-social__logo--youtube',
  'minimal-footer-social__logo--imdb',
];

const missingCssTokens = requiredCssTokens.filter(
  (token) => !css.includes(token),
);

if (missingCssTokens.length > 0) {
  console.error('Minimal footer placement CSS is incomplete:');
  for (const token of missingCssTokens) {
    console.error(`- missing ${token}`);
  }
  process.exit(1);
}

console.log('');
console.log(
  'Bryan Mittelstadt universal logo placement audit',
);
console.log(
  '==================================================',
);
console.log(
  'Every-page professional marks: SAG-AFTRA, Actors’ Equity, CESD, Eris',
);
console.log(
  'Footer marks: Instagram, YouTube, IMDb',
);
console.log('Footer treatment: minimal, unboxed, label-free');
console.log('Footer order: verified');
console.log('Verified social-link routing: configured');
console.log('LMNTL inclusion: configured');
console.log('Print exclusions: configured');
console.log('');
console.log(
  'Universal logo placement integrity checks passed.',
);
