# Asset Requirements

Because the previous website was hosted on Wix, all existing images are locked in the Wix CDN. Attempting to extract and hotlink them violates the project guidelines and risks broken images if the Wix account is closed.

Therefore, **original source photography must be provided by the client.**

Currently, the Next.js application uses tasteful, neutral SVG placeholders in `public/images/placeholders/`. 

## Required Image List

When replacing images, save them to the designated path inside the `public/images/` directory. Update the path strings in `src/content/site.ts` or `projects.ts` if the filenames differ.

### 1. Hero Photography
- **Purpose:** Primary visual on the homepage.
- **Specs:** 1920x1080 (16:9), WebP or high-quality JPG. Needs to look cinematic. 
- **Target Path:** `/images/bryan/hero/[filename]`
- **Configuration:** Not explicitly in config, hardcoded placeholder in `HeroSection.tsx` for now.

### 2. Acting Reel Poster
- **Purpose:** Cover image for the YouTube video player before it plays.
- **Specs:** 1920x1080 (16:9), WebP or JPG.
- **Target Path:** `/images/bryan/projects/[filename]`
- **Configuration:** Hardcoded in `ReelPlayer.tsx`.

### 3. Current Work Stills (Featured Projects)
- **Purpose:** Large editorial features on the homepage.
- **Specs:** 1200x900 (4:3), WebP or JPG.
- **Target Paths:** `/images/bryan/projects/[filename]`
- **Configuration:** Update `featuredProjects` array in `src/content/projects.ts`.
- **Needed For:**
  1. The Overview Effect
  2. Quiet After Supper
  3. Darling (Album Art - Square or 4:3)

### 4. Selected Work Stills (Project Grid)
- **Purpose:** Smaller grid items in the portfolio section.
- **Specs:** 900x1200 (3:4 portrait), WebP or JPG.
- **Target Paths:** `/images/bryan/projects/[filename]`
- **Configuration:** Update `selectedProjects` array in `src/content/projects.ts`.
- **Needed For:** Julius, Blood and Sex Over Ambition, Goldilocks..., Give, The Last Five Years, Arabesque.

### 5. Discipline Introduction Images
- **Purpose:** Cards linking to internal pages.
- **Specs:** 900x1200 (3:4) or 1200x900 (4:3) depending on size variant.
- **Target Paths:** `/images/bryan/headshots/` or `/projects/`
- **Configuration:** Update `disciplines` array in `src/content/projects.ts`.
- **Needed For:** Acting, Voice-Over, Music, Writing & Filmmaking.

### 6. SEO OpenGraph Image
- **Purpose:** The image shown when sharing the website on iMessage, Twitter, Facebook, etc.
- **Specs:** 1200x630, JPG or PNG.
- **Target Path:** `/images/og-default.jpg`
- **Configuration:** Update `ogImage` in `src/content/site.ts`.

### 7. Resume PDF
- **Purpose:** The downloadable resume linked across the site.
- **Specs:** PDF document.
- **Target Path:** `/bryan-mittelstadt-resume.pdf` (root of public folder)
- **Configuration:** Update `resumeUrl` in `src/content/site.ts`.
