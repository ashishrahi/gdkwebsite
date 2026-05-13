export const typographyTokens = {
  fontFamily: {
    sans: 'var(--font-jost), "Segoe UI", Roboto, Arial, sans-serif',
    heading: 'var(--font-jost), "Segoe UI", Roboto, Arial, sans-serif',
    mono: 'var(--font-jost), "Segoe UI", Roboto, Arial, sans-serif',
  },
  global: {
    bodyLineHeight: "1.62",
    bodyLetterSpacing: "-0.001em",
    headingLineHeight: "1.14",
    headingLetterSpacing: "-0.024em",
  },
  scale: {
    display: {
      size: "clamp(2.35rem, 4.35vw, 3.7rem)",
      lineHeight: "1.04",
      letterSpacing: "-0.034em",
      weight: 640,
    },
    h1: {
      size: "clamp(2.05rem, 3.35vw, 3rem)",
      lineHeight: "1.08",
      letterSpacing: "-0.03em",
      weight: 640,
    },
    h2: {
      size: "clamp(1.625rem, 2.38vw, 2.15rem)",
      lineHeight: "1.14",
      letterSpacing: "-0.024em",
      weight: 620,
    },
    h3: {
      size: "clamp(1.1875rem, 1.48vw, 1.45rem)",
      lineHeight: "1.24",
      letterSpacing: "-0.018em",
      weight: 600,
    },
    h4: {
      size: "clamp(1.0625rem, 1.12vw, 1.2rem)",
      lineHeight: "1.28",
      letterSpacing: "-0.014em",
      weight: 600,
    },
    bodyLg: {
      size: "clamp(1rem, 0.92vw, 1.0625rem)",
      lineHeight: "1.64",
    },
    body: {
      size: "1rem",
      lineHeight: "1.62",
    },
    bodySm: {
      size: "0.875rem",
      lineHeight: "1.56",
    },
    caption: {
      size: "0.75rem",
      lineHeight: "1.45",
    },
    label: {
      size: "0.8125rem",
      lineHeight: "1.2",
      letterSpacing: "0.052em",
      weight: 600,
    },
  },
  tracking: {
    tight: "-0.03em",
    tighter: "-0.04em",
    sectionEyebrow: "0.13em",
    navEyebrow: "0.105em",
    processEyebrow: "0.13em",
    badge: "0.1em",
  },
} as const;

export type TypographyTokens = typeof typographyTokens;
