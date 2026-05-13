export const spacingTokens = {
  page: {
    mainY: "4.5rem",
    mainX: "clamp(1.25rem, 3vw, 3rem)",
    contactTop: "8rem",
    contactBottom: "5.5rem",
  },
  section: {
    ySmall: "clamp(3.75rem, 6vw, 5.5rem)",
    y: "clamp(4.5rem, 7.5vw, 7.25rem)",
    yLarge: "clamp(5.75rem, 8.5vw, 8.5rem)",
    gap: "clamp(2.75rem, 5vw, 4.75rem)",
    gapSmall: "1.75rem",
    headingGap: "1.125rem",
    headerBadgeTitleGap: "clamp(1.5rem, 2.5vw, 2.125rem)",
    headerTitleDescriptionGap: "clamp(0.875rem, 1.4vw, 1.25rem)",
    headingMaxWidth: "48rem",
  },
  container: {
    x: "1.25rem",
    smX: "1.5rem",
    lgX: "2.5rem",
    shellX: "clamp(1.25rem, 3vw, 2.5rem)",
  },
  component: {
    cardPadding: "clamp(1.625rem, 2.4vw, 2.125rem)",
    cardPaddingLarge: "clamp(2rem, 3vw, 2.75rem)",
    formControlX: "1rem",
    formControlY: "0.875rem",
    buttonX: "1.75rem",
    buttonY: "0.8125rem",
    badgeX: "0.875rem",
    badgeY: "0.375rem",
  },
  navbar: {
    height: "76px",
    top: "1rem",
    desktopItemHeight: "2.75rem",
    ctaHeight: "2.875rem",
  },
} as const;

export type SpacingTokens = typeof spacingTokens;
