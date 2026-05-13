export const motionTokens = {
  duration: {
    fast: "120ms",
    base: "200ms",
    moderate: "300ms",
    slow: "500ms",
    entrance: "700ms",
  },
  easing: {
    standard: "cubic-bezier(0.2, 0, 0, 1)",
    out: "cubic-bezier(0.16, 1, 0.3, 1)",
    premium: "cubic-bezier(0.22, 1, 0.36, 1)",
  },
  translate: {
    hoverSubtle: "-0.125rem",
    hoverCard: "-0.25rem",
    hoverLift: "-0.5rem",
    activePress: "1px",
  },
  scale: {
    hoverIcon: "1.06",
    hoverCard: "1.02",
    hoverImage: "1.05",
    activeMobileButton: "0.96",
  },
} as const;

export type MotionTokens = typeof motionTokens;
