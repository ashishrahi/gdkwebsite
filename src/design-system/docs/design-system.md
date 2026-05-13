# GDK Design System

This design system is the visual foundation for the GDK frontend. It keeps the existing product structure intact while standardizing typography, spacing, color, radius, shadow, motion, and shadcn/ui variants for a modern SaaS-quality interface.

## Principles

- Preserve current routes, content hierarchy, and responsive behavior.
- Reuse the existing shadcn/ui setup and Tailwind utilities.
- Treat `src/components/ui` as the runtime component layer.
- Treat `src/design-system` as the token, variant, and documentation layer.
- Add design decisions centrally before using them in page components.
- Prefer semantic tokens over raw hex values and one-off utility recipes.

## Current Token Sources

- Runtime CSS variables live in `src/design-system/styles/variables.css`.
- Base resets and reusable utilities live in `src/app/globals.css`.
- TypeScript token snapshots live in `src/design-system/tokens`.
- shadcn variant definitions live in `src/design-system/shadcn`.

## Colors

Core brand colors:

- Primary: `#e85f1c`
- Primary hover: `#c94f16`
- Secondary/accent: `#237d73`
- Secondary/accent hover: `#1d665f`
- Surface/background/card: `#ffffff`
- Foreground/card foreground: `#08111f`
- Border: `#d9e2ea`
- Border subtle: `#e7eef4`
- Input: `#d5e0e8`
- Muted: `#f1f5f9`
- Muted foreground: `#475569`
- Accent: `#e8f5f3`
- Accent foreground: `#123f39`

Additional repeated product and marketing values:

- Process gradient blue: `#0079a8`
- Process gradient dark blue: `#005b80`
- Product hero dark teal: `#042819`
- Product hero teal: `#063c25`
- WhatsApp green: `#25D366`

The legacy variables `--brand-accent`, `--brand-accent-hover`, and `--brand-red` are now defined centrally so existing components have consistent, accessible values.

Text hierarchy:

- Strong: `--ds-text-strong`
- Body: `--ds-text-body`
- Muted: `--ds-text-muted`
- Subtle: `--ds-text-subtle`
- Inverse: `--ds-text-inverse`

## Typography

The current stack uses Inter through `next/font/google` as the primary and heading font, with Geist Mono for monospace content.

Standard typography scale:

- `display`: large hero moments, tight tracking, strong weight.
- `h1`: page titles.
- `h2`: section titles.
- `h3`: section subsections and major card groups.
- `h4`: card titles and compact headings.
- `body-lg`: lead copy.
- `body`: default copy.
- `body-sm`: card descriptions and metadata.
- `caption`: small supporting text.
- `label`: buttons, inputs, nav, and form labels.

Use the matching utilities from `globals.css`: `text-display`, `text-h1`, `text-h2`, `text-h3`, `text-h4`, `text-body-lg`, `text-body`, `text-body-sm`, `text-caption`, and `text-label`.

## Spacing

Spacing rhythm:

- Page x padding: `clamp(1.25rem, 3vw, 2.5rem)`
- Default section y: `clamp(4.5rem, 8vw, 7rem)`
- Compact section y: `clamp(3.5rem, 6vw, 5rem)`
- Spacious section y: `clamp(5.5rem, 10vw, 8.5rem)`
- Section gap: `clamp(2.5rem, 5vw, 4rem)`
- Card padding: `clamp(1.25rem, 2vw, 1.75rem)`
- Large card padding: `clamp(1.5rem, 3vw, 2.25rem)`

## Radius

Radius system:

- Global radius: `0.875rem`
- Controls: `0.875rem` to `1rem`
- Cards: `1.25rem`
- Panels and dialogs: `1.75rem`
- Navbar and badges: `rounded-full`
- Mobile menu: `rounded-[32px]`
- Hero media inner panel: `rounded-[22px]`

## Shadows

Shadow system:

- `--ds-shadow-xs`: subtle field/card affordance.
- `--ds-shadow-sm`: low elevation hover.
- `--ds-shadow-card`: default card elevation.
- `--ds-shadow-card-soft`: shadcn card default.
- `--ds-shadow-card-hover`: card hover and dialogs.
- `--ds-shadow-nav`: sticky navigation.
- `--ds-shadow-mega-menu`: desktop navigation panels.
- `--ds-shadow-hero-panel`: hero feature panels.
- `--ds-shadow-focus`: accessible focus ring support.

## Motion

Motion principles:

- Fast transitions: `120ms`
- Forms and contact cards: `duration-200 ease-out`
- Marketing cards and navbar: `duration-300`
- Image hover scale: `duration-500`
- Hero entrance: `fade-in 0.7s ease-out`
- Premium easing: `cubic-bezier(0.22,1,0.36,1)`

## Tailwind Integration

Tailwind is configured through CSS-first Tailwind v4. The design-system layer exports `@theme inline` aliases from `variables.css`; it does not require a `tailwind.config.*` file.

Use semantic utilities such as `bg-background`, `text-ds-text-body`, `border-ds-border-subtle`, `rounded-ds-card`, `shadow-ds-card`, `px-ds-page-x`, and `ease-ds-out` for new work.

## What Was Intentionally Untouched

- Page route structure and content hierarchy.
- Form validation, submit behavior, scrolling logic, and menu state.
- Existing responsive breakpoints and product data contracts.
