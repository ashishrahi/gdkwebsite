import { cva, type VariantProps } from "class-variance-authority";

export const cardVariants = cva(
  "group/card flex flex-col overflow-hidden rounded-ds-card border py-6 text-sm text-card-foreground transition-[border-color,box-shadow,transform,background-color] duration-200 ease-ds-out has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-ds-card *:[img:last-child]:rounded-b-ds-card",
  {
    variants: {
      variant: {
        default: "border-ds-border-subtle bg-card shadow-ds-card-elevated",
        elevated: "border-ds-border-subtle bg-card shadow-ds-card-medium",
        interactive:
          "border-ds-border-subtle bg-card shadow-ds-card-subtle hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--brand-accent)_28%,var(--border))] hover:shadow-ds-card-medium",
        feature:
          "border-ds-border-subtle bg-card shadow-ds-card-subtle hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--brand-accent)_28%,var(--border))] hover:shadow-ds-card-medium",
        minimal:
          "border-ds-border-subtle bg-card shadow-ds-card-subtle hover:border-[color:color-mix(in_srgb,var(--brand-accent)_24%,var(--border))] hover:shadow-ds-sm",
        gradient:
          "border-[color:color-mix(in_srgb,var(--brand-blue-500)_22%,var(--border))] bg-[linear-gradient(135deg,var(--brand-orange-100)_0%,white_48%,var(--brand-blue-100)_100%)] shadow-ds-card-subtle",
        bordered: "border-ds-border-subtle bg-card shadow-none",
      },
      size: {
        default: "gap-5",
        sm: "gap-4 rounded-xl py-4 has-data-[slot=card-footer]:pb-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export type CardVariantProps = VariantProps<typeof cardVariants>;

export const cardSurfaceVariants = cva(
  "group/card relative overflow-hidden rounded-ds-card border text-card-foreground transition-[border-color,box-shadow,transform,background-color] duration-200 ease-ds-out",
  {
    variants: {
      variant: {
        default: "border-ds-border-subtle bg-card shadow-ds-card-elevated",
        elevated: "border-ds-border-subtle bg-card shadow-ds-card-medium",
        interactive:
          "border-ds-border-subtle bg-card shadow-ds-card-subtle hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--brand-accent)_28%,var(--border))] hover:shadow-ds-card-medium",
        feature:
          "border-ds-border-subtle bg-card shadow-ds-card-subtle hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--brand-accent)_28%,var(--border))] hover:shadow-ds-card-medium",
        minimal:
          "border-ds-border-subtle bg-card shadow-ds-card-subtle hover:border-[color:color-mix(in_srgb,var(--brand-accent)_24%,var(--border))] hover:shadow-ds-sm",
        gradient:
          "border-[color:color-mix(in_srgb,var(--brand-blue-500)_22%,var(--border))] bg-[linear-gradient(135deg,var(--brand-orange-100)_0%,white_48%,var(--brand-blue-100)_100%)] shadow-ds-card-subtle",
        bordered: "border-ds-border-subtle bg-card shadow-none",
      },
      padding: {
        none: "",
        sm: "p-4 sm:p-5",
        default: "p-5 sm:p-6",
        lg: "p-6 sm:p-7",
        xl: "p-6 sm:p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "none",
    },
  },
);

export type CardSurfaceVariantProps = VariantProps<typeof cardSurfaceVariants>;

export const cardIconClassNames = {
  brand:
    "inline-flex shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_srgb,var(--brand-accent)_12%,white)] text-[var(--brand-accent)] transition-transform duration-200 ease-ds-out group-hover/card:scale-[1.02]",
  secondary:
    "inline-flex shrink-0 items-center justify-center rounded-xl bg-[color:color-mix(in_srgb,var(--secondary)_12%,white)] text-[var(--secondary)] transition-transform duration-200 ease-ds-out group-hover/card:scale-[1.02]",
  inverse:
    "inline-flex shrink-0 items-center justify-center rounded-xl bg-[var(--primary)] text-white transition-transform duration-200 ease-ds-out group-hover/card:scale-[1.02]",
} as const;

export const cardTextClassNames = {
  eyebrow:
    "text-caption font-semibold tracking-[var(--ds-type-eyebrow-letter-spacing)] text-[var(--brand-accent)] uppercase",
  title: "text-h4 text-ds-text-strong",
  titleSm: "text-base font-semibold leading-snug tracking-[-0.015em] text-ds-text-strong",
  body: "text-body-sm text-ds-text-muted",
  meta: "text-caption text-ds-text-subtle",
  cta: "inline-flex items-center gap-1 text-sm font-semibold text-[var(--secondary)] transition-colors duration-200 ease-ds-out hover:text-[var(--secondary-hover)]",
} as const;

export const cardClassNames = {
  root: cardVariants(),
  header:
    "group/card-header @container/card-header grid auto-rows-min items-start gap-2 rounded-t-ds-card px-6 group-data-[size=sm]/card:px-5 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-5 group-data-[size=sm]/card:[.border-b]:pb-4",
  title: "font-heading text-[1rem] leading-snug font-semibold tracking-[-0.015em] text-card-foreground group-data-[size=sm]/card:text-sm",
  description: "text-sm leading-6 text-muted-foreground",
  action: "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
  content: "px-6 text-sm leading-6 text-ds-text-body group-data-[size=sm]/card:px-5",
  footer:
    "flex items-center rounded-b-ds-card border-t border-ds-border-subtle bg-muted/45 p-6 group-data-[size=sm]/card:p-5",
} as const;
