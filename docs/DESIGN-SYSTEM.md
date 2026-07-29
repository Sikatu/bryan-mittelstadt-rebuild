# Premium Editorial Design System

## Core Identity

A bright, refined portfolio system built around warm white surfaces, dark editorial typography, restrained terracotta accents, and generous spacing. The design should feel professional, cinematic, mature, and easy to scan without relying on heavy transparency or decorative effects.

## Color Palette

Defined in `src/app/globals.css` through Tailwind CSS v4 design tokens.

### Surfaces

- `--color-bg-primary` — `#F8F7F3`: warm ivory page background.
- `--color-bg-secondary` — `#FFFFFF`: primary cards and elevated sections.
- `--color-bg-light` — `#F0EEE9`: media placeholders and subtle alternate surfaces.

### Typography

- `--color-text-primary` — `#171717`: primary headings and important text.
- `--color-text-secondary` — `#5F5B55`: body copy and supporting information.
- `--color-text-muted` — `#77736D`: tertiary labels and unavailable states.

### Borders and Accent

- `--color-border-subtle` — `#DDD9D2`: standard dividers and card borders.
- `--color-border-light` — `#EBE7E0`: very subtle visual separation.
- `--color-accent` — `#9A5D3A`: terracotta interaction and eyebrow color.
- `--color-accent-hover` — `#7D492A`: accent hover and active state.

## Typography

- Display and section headings: Playfair Display.
- Body, navigation, labels, and controls: Inter.
- Paragraphs are constrained to readable line lengths with the `.body-text` utility.

## Interaction Rules

- Every visible control must perform an action or be explicitly disabled.
- Never use `href="#"` as a placeholder action.
- Client-dependent content uses the `ContentPending` component.
- Disabled actions state what input is still missing through their label or title.
- Focus indicators must remain visible.
- Motion remains subtle and respects `prefers-reduced-motion`.

## Component Inventory

- `SiteHeader`: fixed navigation that transitions from transparent to a light solid surface.
- `MobileNavigation`: accessible drawer with focus management and scroll locking.
- `SiteFooter`: contact, navigation, and verified social links.
- `HeroSection`: homepage identity and priority calls to action.
- `EditorialButton`: primary, secondary, and text variants with disabled/download states.
- `ContentPending`: honest empty state for unverified or unavailable material.
- `SectionHeading`: consistent editorial heading and eyebrow pattern.
- `ProjectFeature` and `ProjectCard`: featured and grid portfolio patterns.
- `ReelPlayer`: lazy YouTube embed with a noninteractive unavailable state.
