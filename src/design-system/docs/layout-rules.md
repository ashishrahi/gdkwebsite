# Layout Rules

These rules describe the production layout architecture for the current frontend.

## Page Shell

- Root layout uses tokenized background, the Jost font variable, `scroll-smooth`, and antialiasing.
- `SiteShell` wraps page content.
- Global `main` styles set `max-width: 72rem`, centered layout, and tokenized horizontal padding.
- Several pages override `main` with Tailwind classes for full-width marketing layouts.

## Containers

Observed container patterns:

- Default content: `ds-container` or `mx-auto max-w-7xl px-ds-page-x`
- Hero: `mx-auto w-full max-w-[1450px]`
- Contact page: `mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10`
- Process section: `mx-auto w-full max-w-[1800px] px-6 md:px-10 xl:px-14`
- Copy width: `max-w-[56ch]` and `max-w-2xl`

Rule:

- Prefer the documented layout tokens for new sections.
- When migrating existing sections, keep the same max-width and breakpoint behavior.

## Sections

Section spacing:

- Default sections use `ds-section` or `--ds-space-section-y`.
- Compact sections use `ds-section-sm`.
- Spacious hero/process sections use `ds-section-lg`.
- Contact page starts below fixed nav with `pt-28 sm:pt-32 lg:pt-36`.
- About page sections use `mb-24` and `space-y-*` rhythm.

Rule:

- Keep fixed-nav offsets local to the route.
- Do not introduce nested max-width containers that reduce existing product grid capacity.

## Grids

Observed grid patterns:

- Product grids: `grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3`.
- Industry grids: `grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-4`.
- Process grids: `grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6`.
- Hero grid: `lg:grid-cols-[1fr_520px]`.
- Contact grid: `lg:grid-cols-[1fr_1.05fr]`.
- Mega menu grids: `grid-cols-[1fr_1.6fr]` and `grid-cols-[1.05fr_1fr]`.

Migration rule:

- Preserve arbitrary grid templates exactly.
- Avoid replacing with generic columns if it changes content width.

## Responsive Rules

Responsive pattern:

- `sm` adjusts horizontal padding and typography.
- `md` handles product grid splits, form text sizes, and some scroll offsets.
- `lg` introduces desktop nav layout, hero columns, and larger section spacing.
- `xl` and `2xl` are used for dense marketing/product grids.

Migration rule:

- Keep breakpoint behavior in-place during migration.
- When adding reusable layouts, use the same breakpoints already present in the consuming components.

## Motion Rules

Motion pattern:

- Interactive cards lift by `-translate-y-1`, `-translate-y-2`, or `-translate-y-0.5`.
- Image cards scale on hover with `duration-500`.
- Navbar and mega menus use `duration-300` to `duration-500`.
- Dialogs use shadcn animation classes with a token-aligned `duration-150`.
- About page and clientele section use Framer Motion.

Migration rule:

- Do not merge Framer Motion and CSS transition patterns yet.
- Preserve transform distances and timing values exactly when moving classes into recipes.

## Hardcoded Values To Track

These values are repeated and have token-backed equivalents available:

- `max-w-[1450px]`
- `max-w-[1800px]`
- `rounded-2xl`
- `rounded-3xl`
- `tracking-[0.16em]` -> `--ds-type-eyebrow-letter-spacing`
- Card shadows -> `shadow-ds-card`, `shadow-ds-card-soft`, `shadow-ds-card-hover`
- `transition-all duration-300` -> targeted transition properties with `duration-300 ease-ds-out`
- `ease-[cubic-bezier(0.22,1,0.36,1)]` -> `ease-ds-premium`

## Risk-Free Next Steps

- Add screenshot regression checks for home, contact, product category, product detail, and about pages.
- Migrate repeated section headings to `ds-eyebrow`, `text-h2`, and `text-body-lg`.
- Move remaining contact/enquiry form field recipes to `formPatternClassNames` where practical.
- Replace repeated card recipes with `marketingPatternClassNames.marketingCard` in focused route-level passes.
