export const radiusTokens = {
  base: "0.875rem",
  sm: "0.625rem",
  md: "0.75rem",
  lg: "0.875rem",
  xl: "1rem",
  "2xl": "1.25rem",
  "3xl": "1.75rem",
  card: "1.25rem",
  cardLarge: "1.75rem",
  panel: "1.75rem",
  modal: "1.75rem",
  pill: "9999px",
  mobileMenu: "32px",
  heroMediaInner: "22px",
} as const;

export type RadiusTokens = typeof radiusTokens;
