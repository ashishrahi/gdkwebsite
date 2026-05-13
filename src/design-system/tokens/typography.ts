export const typographyTokens = {
  fontFamily: {
    sans: 'var(--font-inter), "Segoe UI", Roboto, Arial, sans-serif',
    heading: 'var(--font-playfair), "Cormorant Garamond", Georgia, serif',
    mono: 'var(--font-geist-mono), "SFMono-Regular", Consolas, "Liberation Mono", monospace',
  },
  global: {
    bodyLineHeight: "1.68",
    bodyLetterSpacing: "0",
    headingLineHeight: "1.16",
    headingLetterSpacing: "-0.026em",
  },
  scale: {
    display: {
      size: "clamp(2.5rem, 5.2vw, 4.25rem)",
      lineHeight: "1.02",
      letterSpacing: "-0.045em",
      weight: 760,
    },
    h1: {
      size: "clamp(2.125rem, 4vw, 3.25rem)",
      lineHeight: "1.08",
      letterSpacing: "-0.038em",
      weight: 740,
    },
    h2: {
      size: "clamp(1.75rem, 3vw, 2.4rem)",
      lineHeight: "1.16",
      letterSpacing: "-0.026em",
      weight: 680,
    },
    h3: {
      size: "clamp(1.25rem, 1.8vw, 1.625rem)",
      lineHeight: "1.26",
      letterSpacing: "-0.02em",
      weight: 660,
    },
    h4: {
      size: "clamp(1.125rem, 1.4vw, 1.375rem)",
      lineHeight: "1.25",
      letterSpacing: "-0.018em",
      weight: 660,
    },
    bodyLg: {
      size: "clamp(1rem, 1vw, 1.125rem)",
      lineHeight: "1.74",
    },
    body: {
      size: "1rem",
      lineHeight: "1.68",
    },
    bodySm: {
      size: "0.875rem",
      lineHeight: "1.58",
    },
    caption: {
      size: "0.75rem",
      lineHeight: "1.45",
    },
    label: {
      size: "0.8125rem",
      lineHeight: "1.2",
      letterSpacing: "0.01em",
      weight: 650,
    },
  },
  tracking: {
    tight: "-0.038em",
    tighter: "-0.055em",
    sectionEyebrow: "0.14em",
    navEyebrow: "0.14em",
    processEyebrow: "0.2em",
    badge: "0.08em",
  },
} as const;

export type TypographyTokens = typeof typographyTokens;
