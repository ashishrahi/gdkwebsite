export const layoutTokens = {
  content: {
    main: "72rem",
    page: "76rem",
    section: "76rem",
    hero: "1280px",
    process: "1280px",
    copy: "56ch",
    heading: "48rem",
    sectionTitle: "64rem",
    sectionCopy: "62ch",
  },
  section: {
    defaultY: "clamp(4.5rem, 7.5vw, 7.25rem)",
    compactY: "clamp(3.75rem, 6vw, 5.5rem)",
    spaciousY: "clamp(5.75rem, 8.5vw, 8.5rem)",
  },
  grid: {
    heroDesktop: "1fr 460px",
    contactDesktop: "1fr 1.05fr",
    aboutDesktop: "1.05fr 1fr",
    productsMegaMenu: "1.05fr 1fr",
    aboutMegaMenu: "1fr 1.6fr",
  },
  breakpoints: {
    sm: "40rem",
    md: "48rem",
    lg: "64rem",
    xl: "80rem",
    "2xl": "96rem",
  },
  zIndex: {
    navbar: "50",
    dialog: "50",
    floatingAction: "50",
  },
} as const;

export type LayoutTokens = typeof layoutTokens;
