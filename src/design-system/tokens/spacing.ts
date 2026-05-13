export const spacingTokens = {
  page: {
    mainY: "4rem",
    mainX: "clamp(1.25rem, 3vw, 2.5rem)",
    contactTop: "7.5rem",
    contactBottom: "5rem",
  },
  section: {
    ySmall: "clamp(3.25rem, 5.5vw, 5rem)",
    y: "clamp(4rem, 7vw, 6.5rem)",
    yLarge: "clamp(5rem, 8vw, 7.5rem)",
    gap: "clamp(2.25rem, 4.5vw, 4rem)",
    gapSmall: "1.5rem",
    headingGap: "1.25rem",
    headerBadgeTitleGap: "clamp(1.75rem, 3vw, 2.5rem)",
    headerTitleDescriptionGap: "clamp(1.125rem, 1.8vw, 1.625rem)",
    headingMaxWidth: "48rem",
  },
  container: {
    x: "1.25rem",
    smX: "1.5rem",
    lgX: "2.5rem",
    shellX: "clamp(1.25rem, 3vw, 2.5rem)",
  },
  component: {
    cardPadding: "clamp(1.5rem, 2.25vw, 2rem)",
    cardPaddingLarge: "clamp(1.75rem, 3vw, 2.5rem)",
    formControlX: "1rem",
    formControlY: "0.875rem",
    buttonX: "1.5rem",
    buttonY: "0.75rem",
    badgeX: "1rem",
    badgeY: "0.4375rem",
  },
  navbar: {
    height: "72px",
    top: "1rem",
    desktopItemHeight: "2.5rem",
    ctaHeight: "2.75rem",
  },
} as const;

export type SpacingTokens = typeof spacingTokens;
