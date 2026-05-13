import { cardIconClassNames, cardSurfaceVariants } from "../shadcn/card.variants";

export const marketingPatternClassNames = {
  sectionContainer: "mx-auto max-w-7xl space-y-ds-section-gap px-ds-page-x",
  sectionHeading: "ds-section-header",
  sectionEyebrow:
    "ds-eyebrow",
  sectionTitle: "text-h2 text-ds-text-strong",
  sectionDescription: "text-body-lg text-ds-text-body",
  marketingCard:
    cardSurfaceVariants({ variant: "interactive" }),
  contactCard:
    `${cardSurfaceVariants({ variant: "minimal", padding: "default" })} flex items-start gap-4`,
  iconBoxBrand:
    `${cardIconClassNames.brand} h-9 w-9`,
  iconBoxSecondary:
    `${cardIconClassNames.secondary} border border-[color:color-mix(in_srgb,var(--secondary)_24%,transparent)] p-3`,
} as const;
