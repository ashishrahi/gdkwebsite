# Component Patterns

This document captures standardized UI patterns for the current frontend. These rules preserve the existing product structure while making new and migrated UI consistent.

## shadcn/ui Primitives

Current primitives:

- `Button`
- `Card`
- `Dialog`
- `Input`
- `Textarea`
- `Sonner`

The shadcn primitives keep their existing API. Their core class definitions live in `src/design-system/shadcn` so variants can be evolved centrally without changing call sites.

## Buttons

Standard button patterns:

- Primary CTA: `Button` default variant, orange brand fill, white text, tokenized elevation.
- Secondary CTA: `Button` secondary variant, teal fill, white text, tokenized elevation.
- Outline CTA: white/background fill, subtle tokenized border, neutral text, accent hover.
- WhatsApp CTA: `#25D366` border/text with hover green fill.
- Navbar CTA: `h-11 rounded-full px-7 shadow-[0_16px_34px_color-mix(in_srgb,var(--primary)_42%,transparent)]`.
- Submit CTA: full width, `h-11` or `h-12`, `rounded-xl`, submit shadow, disabled shadow removal.

Standardization target:

- Continue using `Button` for application actions.
- Preserve `asChild` for links rendered as buttons.
- Use `size="lg"` for primary marketing CTAs and `size="default"` or `size="sm"` for app controls.
- Avoid raw `button` elements for styled actions unless the component has a specific reason.

## Cards

Standard card patterns:

- shadcn base card: `rounded-ds-card`, `border-ds-border-subtle`, `bg-card`, `shadow-ds-card-soft`.
- Marketing cards: `rounded-ds-card`, subtle border, white/card background, tokenized card shadow.
- Hover cards: `duration-300 ease-ds-out`, subtle lift, `shadow-ds-card-hover`.
- Contact cards: `rounded-ds-card`, `shadow-ds-xs`, border-color hover, no excessive lift.
- Mega menu cards: `rounded-2xl border bg-white p-4 transition-all duration-300 hover:-translate-y-0.5`.

Standardization target:

- Keep the existing `Card` primitive as the low-level container.
- Use `marketingPatternClassNames.marketingCard` for new page-level marketing cards.
- Keep image cards using overflow-hidden containers and tokenized radius.

## Inputs

Standard input patterns:

- shadcn input: `h-10 rounded-xl border-input bg-background/80 px-3.5 shadow-ds-xs`.
- Contact/enquiry input: `rounded-xl border-input bg-white px-4 md:px-5 shadow-ds-xs`.
- Contact/enquiry focus: secondary border and ring with `color-mix`.
- Invalid state: red border and red ring.
- Textarea sizes vary between contact page and enquiry modal.

Standardization target:

- Preserve the base `Input` and `Textarea` styles.
- Use `formPatternClassNames` for contact/enquiry recipes.
- Keep form-specific size differences as local overrides.

## Pills And Eyebrows

Standard pattern:

- `ds-eyebrow`
- Used for section labels such as `OUR PRODUCTS`, `WHY CHOOSE US`, and `GET IN TOUCH`.

Standardization target:

- Prefer the utility class for new section labels.
- Keep label text uppercase and short.
- Use body copy below headings rather than loading long details into the eyebrow.

## Icon Boxes

Standard pattern:

- `inline-flex h-9 w-9 items-center justify-center rounded-lg`
- Larger cards use `h-11 w-11 rounded-xl`.
- Contact rows use `rounded-xl bg-secondary/95 p-3 text-white`.

Standardization target:

- Use tokenized background mixes and rounded-xl for new icon boxes.
- Keep icon sizes proportional to the box: `h-5 w-5` inside `h-9 w-9`, `h-6 w-6` inside `h-12 w-12`.

## Dialogs

Standard pattern:

- Base dialog content uses `rounded-ds-card-lg`, subtle border, popover background, and `shadow-ds-card-hover`.
- Enquiry modal overrides to `max-w-lg rounded-3xl border-slate-200/90 bg-white/95 px-6 py-6 shadow-md`.
- Close button is visually neutralized through scoped selectors.

Standardization target:

- Use `DialogTitle` for semantic titles and `DialogDescription` for supporting copy.
- If more dialogs are added, add a documented `marketing` dialog class recipe rather than duplicating page-local overrides.
