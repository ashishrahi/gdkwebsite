"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Globe, Menu, Package, Sparkles, X } from "lucide-react";

import { EnquiryNavButton } from "@/components/enquiry/enquiry-nav-button";
import { Button } from "@/components/ui/button";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import {
  DEFAULT_PRODUCT_MEGA_MENU_CATEGORY_KEY,
  PRODUCT_MEGA_MENU_CATEGORIES,
  getMegaMenuCategoryByKey,
} from "@/lib/data/product-mega-menu";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#home", hash: "#home", label: "Home" },
  { href: "/#about", hash: "#about", label: "About" },
  { href: "/#products", hash: "#products", label: "Products" },
  { href: "/#industries", hash: "#industries", label: "Industries" },
  { href: "/career", hash: "#career", label: "Career" },
  { href: "/#why-choose-us", hash: "#why-choose-us", label: "Why Us" },
];

const homeSectionIds = new Set(
  navLinks.filter((link) => link.href.startsWith("/#")).map((link) => link.hash.replace("#", ""))
);



const aboutAtAGlance = {
  heading: "GDK At A Glance",
  subtext: "Create premium animated counters.",
  bullets: [
    "30+ Years of Manufacturing Excellence",
    "100+ Packaging SKUs",
    "Trusted by Leading FMCG & Dairy Brands",
    "In-house Tool Room & R&D Center",
    "Advanced European Printing Technology",
    "PET, HIPS & PP Extrusion Capabilities",
    "Corporate Supply Network Across India",
    "Rapid Product Development & Sampling",
  ],
} as const;

const aboutMegaCards = [
  {
    href: "/about",
    title: "GDK Solution",
    description: "Discover our complete packaging capabilities and engineered product line.",
    icon: Sparkles,
  },
] as const;

const productMegaCategoryIcons = {
  "esd-trays": Package,
  thermoforming: Globe,
  "printed-products": Sparkles,
} as const;

type NavbarProps = {
  homeVariant?: boolean;
};

export function Navbar({ homeVariant = false }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [activeMobileProductKey, setActiveMobileProductKey] = useState<
    (typeof PRODUCT_MEGA_MENU_CATEGORIES)[number]["key"] | null
  >(null);
  const [activeDesktopProductKey, setActiveDesktopProductKey] = useState<
    (typeof PRODUCT_MEGA_MENU_CATEGORIES)[number]["key"]
  >(DEFAULT_PRODUCT_MEGA_MENU_CATEGORY_KEY);
  const [activeDesktopMenu, setActiveDesktopMenu] = useState<"about" | "products" | null>(null);
  const [activeSection, setActiveSection] = useState("home");
  const desktopMenuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const syncActiveSectionFromRoute = () => {
      if (pathname.startsWith("/products")) {
        setActiveSection("products");
        return;
      }

      if (pathname.startsWith("/about")) {
        setActiveSection("about");
        return;
      }

      if (pathname.startsWith("/career")) {
        setActiveSection("career");
        return;
      }

      if (pathname !== "/") {
        return;
      }

      const next = (window.location.hash || "#home").replace("#", "");
      setActiveSection(homeSectionIds.has(next) ? next : "home");
    };

    syncActiveSectionFromRoute();
    window.addEventListener("hashchange", syncActiveSectionFromRoute);

    return () => {
      window.removeEventListener("hashchange", syncActiveSectionFromRoute);
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname !== "/") {
      return;
    }

    const homeSectionIdList = [...homeSectionIds];
    const visibleRatios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const sectionId = entry.target.id;
          visibleRatios.set(sectionId, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        if (window.scrollY < 32) {
          setActiveSection("home");
          return;
        }

        let nextSection = "home";
        let bestRatio = 0;

        for (const id of homeSectionIdList) {
          const ratio = visibleRatios.get(id) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            nextSection = id;
          }
        }

        setActiveSection(nextSection);
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    for (const id of homeSectionIdList) {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    }

    return () => {
      observer.disconnect();
    };
  }, [pathname]);

  const isRouteActive = (hash: string) => {
    if (pathname.startsWith("/products")) {
      return hash === "#products";
    }

    if (pathname.startsWith("/about")) {
      return hash === "#about";
    }

    if (pathname.startsWith("/career")) {
      return hash === "#career";
    }

    if (pathname !== "/") {
      return false;
    }

    if (hash === "#career") {
      return false;
    }

    return activeSection === hash.replace("#", "");
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileAboutOpen(false);
    setIsMobileProductsOpen(false);
    setActiveMobileProductKey(null);
  };

  const handleLogoClick = () => {
    setActiveSection("home");
    closeMobileMenu();
  };

  const clearDesktopMenuCloseTimeout = () => {
    if (desktopMenuCloseTimeoutRef.current) {
      clearTimeout(desktopMenuCloseTimeoutRef.current);
      desktopMenuCloseTimeoutRef.current = null;
    }
  };

  const openDesktopMenu = (menu: "about" | "products") => {
    clearDesktopMenuCloseTimeout();
    setActiveDesktopMenu(menu);
  };

  const closeDesktopMenuWithDelay = () => {
    clearDesktopMenuCloseTimeout();
    desktopMenuCloseTimeoutRef.current = setTimeout(() => {
      setActiveDesktopMenu(null);
    }, 180);
  };

  const handleDesktopMenuTouchStart = (
    event: React.PointerEvent<HTMLAnchorElement>,
    menu: "about" | "products"
  ) => {
    if (event.pointerType !== "touch" && event.pointerType !== "pen") {
      return;
    }

    if (activeDesktopMenu !== menu) {
      event.preventDefault();
      openDesktopMenu(menu);
    }
  };

  useEffect(() => {
    return () => {
      clearDesktopMenuCloseTimeout();
    };
  }, []);

  useEffect(() => {
    if (!activeDesktopMenu) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDesktopMenu(null);
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
      setActiveDesktopMenu(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [activeDesktopMenu]);

  const activeDesktopProductCategory =
    getMegaMenuCategoryByKey(activeDesktopProductKey) ??
    getMegaMenuCategoryByKey(DEFAULT_PRODUCT_MEGA_MENU_CATEGORY_KEY) ??
    PRODUCT_MEGA_MENU_CATEGORIES[0];
  const logoLinkClassName = "flex items-center";
  const logoImageClassName = "h-10 w-auto object-contain sm:h-12";
  const desktopNavLinkClassName = (isActive: boolean) =>
    cn(
      "relative inline-flex items-center gap-1 py-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-ds-text-muted transition-colors duration-200",
      "after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-brand-accent after:transition-transform after:duration-200",
      "hover:text-brand-accent hover:after:scale-x-100",
      isActive && "text-brand-accent after:scale-x-100"
    );

  return (
    <>
      <header
        ref={headerRef}
        className={cn(
          "fixed inset-x-0 top-0 isolate z-50 w-full shrink-0 border-b bg-white/94 px-ds-page-x shadow-none backdrop-blur-md transition-[background-color,border-color] duration-300",
          homeVariant
            ? "border-black/5"
            : "border-ds-border-subtle"
        )}
      >
        <nav className="mx-auto flex h-(--ds-layout-navbar-h) w-full max-w-352 items-center justify-between px-0 lg:grid lg:grid-cols-[1fr_auto_1fr]">
          <div className="hidden items-center justify-start lg:flex">
            <Link href="/#home" className={logoLinkClassName} onClick={handleLogoClick}>
              <Image
                src="/GDK_LOGO.jpg"
                alt="GDK Packaging"
                width={220}
                height={60}
                className={logoImageClassName}
                priority
              />
            </Link>
          </div>
          <Link href="/#home" className={cn(logoLinkClassName, "justify-start lg:hidden")} onClick={handleLogoClick}>
            <Image
              src="/GDK_LOGO.jpg"
              alt="GDK Packaging"
              width={220}
              height={60}
              className={logoImageClassName}
              priority
            />
          </Link>

          <div className="hidden items-center justify-center gap-8 lg:flex xl:gap-11">
            {navLinks.map((link) => {
              const isActive = isRouteActive(link.hash);
              const isAboutLink = link.label === "About";
              const isProductsLink = link.label === "Products";
              return (
                <div
                  key={link.href}
                  className="group relative"
                  onMouseEnter={
                    isAboutLink ? () => openDesktopMenu("about") : isProductsLink ? () => openDesktopMenu("products") : undefined
                  }
                  onMouseLeave={isAboutLink || isProductsLink ? closeDesktopMenuWithDelay : undefined}
                >
                  {isAboutLink ? (
                    <>
                      <Link
                        href={link.href}
                        aria-haspopup="menu"
                        aria-expanded={activeDesktopMenu === "about"}
                        aria-current={isActive ? "page" : undefined}
                        onFocus={() => openDesktopMenu("about")}
                        onPointerDown={(event) => handleDesktopMenuTouchStart(event, "about")}
                        onClick={() => {
                          setActiveSection(link.hash.replace("#", ""));
                          setActiveDesktopMenu(null);
                          closeMobileMenu();
                        }}
                        className={desktopNavLinkClassName(isActive)}
                      >
                        {link.label}
                        {activeDesktopMenu === "about" ? (
                          <ChevronUp className="size-3.5" />
                        ) : (
                          <ChevronDown className="size-3.5" />
                        )}
                      </Link>
                      <div
                        className={cn(
                          "pointer-events-none invisible absolute top-full left-1/2 z-50 w-[min(calc(100vw-2rem),440px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-2 pt-8 opacity-0 transition-all duration-200 ease-ds-out",
                          activeDesktopMenu === "about" &&
                            "pointer-events-auto visible translate-y-0 opacity-100"
                        )}
                        onFocus={() => openDesktopMenu("about")}
                        onBlur={(event) => {
                          if (!event.currentTarget.contains(event.relatedTarget)) {
                            closeDesktopMenuWithDelay();
                          }
                        }}
                      >
                        <div
                          className={cn(
                            cardSurfaceVariants({
                              variant: "elevated",
                              padding: "none",
                            }),
                            "max-h-[calc(100dvh-var(--ds-layout-navbar-h)-2rem)] overflow-y-auto overscroll-contain rounded-ds-card-lg bg-ds-surface p-3.5 shadow-ds-card-medium sm:p-4"
                          )}
                        >
                          <div className="absolute top-[-11px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 rotate-45 border-t border-l border-ds-border-subtle bg-ds-surface shadow-ds-card-subtle" />
                          <div className="flex min-w-0 flex-col gap-3.5">
                            {aboutMegaCards.map((card) => (
                              <Link
                                key={card.title}
                                href={card.href}
                                className={cn(
                                  "flex items-center gap-3",
                                  cardSurfaceVariants({
                                    variant: "interactive",
                                    padding: "none",
                                  }),
                                  "px-3.5 py-3 transition-[border-color,box-shadow] duration-200 ease-ds-out"
                                )}
                              >
                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-brand-accent text-white">
                                  <card.icon className="size-4" aria-hidden />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <p className="text-sm font-medium leading-snug text-ds-text-strong">
                                    {card.title}
                                  </p>
                                  <p className="mt-0.5 text-caption leading-relaxed text-ds-text-muted">
                                    {card.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                            <div
                              className={cn(
                                cardSurfaceVariants({
                                  variant: "minimal",
                                  padding: "none",
                                }),
                                "flex flex-col bg-ds-surface-muted p-3.5 sm:p-4"
                              )}
                            >
                              <p className="text-sm font-semibold leading-tight tracking-[-0.01em] text-ds-text-strong">
                                {aboutAtAGlance.heading}
                              </p>
                              <p className="mt-1.5 text-body-sm leading-relaxed text-ds-text-muted">
                                {aboutAtAGlance.subtext}
                              </p>
                              <ul className="mt-3 space-y-2">
                                {aboutAtAGlance.bullets.map((item) => (
                                  <li
                                    key={item}
                                    className="flex gap-2.5 text-sm font-medium leading-normal text-ds-text-strong"
                                  >
                                    <span
                                      className="mt-[0.4em] h-1 w-1 shrink-0 rounded-full bg-ds-text-strong"
                                      aria-hidden
                                    />
                                    <span className="min-w-0 flex-1">{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : isProductsLink ? (
                    <>
                      <Link
                        href={link.href}
                        aria-haspopup="menu"
                        aria-expanded={activeDesktopMenu === "products"}
                        aria-current={isActive ? "page" : undefined}
                        onFocus={() => openDesktopMenu("products")}
                        onPointerDown={(event) => handleDesktopMenuTouchStart(event, "products")}
                        onClick={() => {
                          setActiveSection(link.hash.replace("#", ""));
                          setActiveDesktopMenu(null);
                          closeMobileMenu();
                        }}
                        className={desktopNavLinkClassName(isActive)}
                      >
                        {link.label}
                        {activeDesktopMenu === "products" ? (
                          <ChevronUp className="size-3.5" />
                        ) : (
                          <ChevronDown className="size-3.5" />
                        )}
                      </Link>
                      <div
                        className={cn(
                          "pointer-events-none invisible absolute top-full left-1/2 z-50 w-[min(calc(100vw-2rem),820px)] max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-2 pt-8 opacity-0 transition-all duration-200 ease-ds-out",
                          activeDesktopMenu === "products" &&
                          "pointer-events-auto opacity-100 visible translate-y-0"
                        )}
                        onFocus={() => openDesktopMenu("products")}
                        onBlur={(event) => {
                          if (!event.currentTarget.contains(event.relatedTarget)) {
                            closeDesktopMenuWithDelay();
                          }
                        }}
                      >
                        <div className={cn(cardSurfaceVariants({ variant: "elevated", padding: "lg" }), "max-h-[calc(100dvh-var(--ds-layout-navbar-h)-2rem)] overflow-y-auto overscroll-contain rounded-ds-card-lg bg-ds-surface")}>
                          <div className="absolute -top-2.75 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rotate-45 border-t border-l border-ds-border-subtle bg-ds-surface shadow-ds-card-subtle" />
                          <div className="grid grid-cols-[1.05fr_1fr] gap-8">
                            <div className="grid grid-cols-1 gap-5">
                              {PRODUCT_MEGA_MENU_CATEGORIES.map((category) => {
                                const isCategoryActive = activeDesktopProductKey === category.key;
                                const CategoryIcon =
                                  productMegaCategoryIcons[
                                  category.key as keyof typeof productMegaCategoryIcons
                                  ] ?? Package;
                                return (
                                  <button
                                    key={category.key}
                                    type="button"
                                    onMouseEnter={() => setActiveDesktopProductKey(category.key)}
                                    onFocus={() => setActiveDesktopProductKey(category.key)}
                                    onClick={() => setActiveDesktopProductKey(category.key)}
                                    className={cn(
                                      "group/category flex items-start gap-4 text-left",
                                      cardSurfaceVariants({ variant: "interactive", padding: "sm" }),
                                      isCategoryActive
                                        ? "border-brand-accent shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-accent)_24%,transparent)]"
                                        : "hover:border-[color-mix(in_srgb,var(--brand-accent)_70%,transparent)]"
                                    )}
                                  >
                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent">
                                      <CategoryIcon className="h-6 w-6 text-brand-accent" />
                                    </div>
                                    <div>
                                      <p className="text-sm leading-5 font-medium text-ds-text-strong">{category.title}</p>
                                      <p className="mt-1.5 text-caption text-ds-text-muted">
                                        {category.description}
                                      </p>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                            <div className={cn("group/panel block bg-ds-surface-muted", cardSurfaceVariants({ variant: "minimal", padding: "lg" }))}>
                              <Link href={activeDesktopProductCategory.href}>
                                <p className="text-xs font-medium uppercase tracking-(--ds-type-eyebrow-letter-spacing) text-brand-accent">
                                  {activeDesktopProductCategory.title}
                                </p>
                              </Link>
                              <p className="mt-3 text-body-sm text-ds-text-muted">
                                Product sub-categories crafted for performance, consistency, and scalable
                                manufacturing.
                              </p>
                              <div className="mt-5 grid grid-cols-1 gap-3">
                                {activeDesktopProductCategory.subcategories.map((product) => (
                                  <Link
                                    href={product.href}
                                    key={product.slug}
                                    className={cn(
                                      "block rounded-xl px-4 py-2.5 text-sm font-medium text-ds-text-body hover:text-brand-accent",
                                      cardSurfaceVariants({ variant: "bordered" })
                                    )}
                                  >
                                    {product.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => {
                        setActiveSection(link.hash.replace("#", ""));
                        closeMobileMenu();
                      }}
                      className={desktopNavLinkClassName(isActive)}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              );
            })}
          </div>

          <div className="hidden h-11 items-center justify-end gap-3 lg:flex">
            <EnquiryNavButton className="text-brand-charcoal [&>span]:ring-white" />
            <Button
              asChild
              size="lg"
              className="h-11 rounded-full bg-brand-accent px-6 py-2.5 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
            >
              <Link href="/#contact" className="text-white! hover:text-white!">
                Get Quote
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <EnquiryNavButton compact className="text-brand-charcoal [&>span]:ring-white" />
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={isMobileMenuOpen}
              className="relative z-10 flex size-10 shrink-0 items-center justify-center overflow-visible rounded-xl bg-brand-charcoal p-0 text-white shadow-sm transition-all duration-200 hover:bg-brand-charcoal-deep hover:text-white active:scale-[0.96] aria-expanded:bg-brand-charcoal aria-expanded:text-white [&_svg]:relative [&_svg]:z-10 [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-white [&_svg]:stroke-white"
            >
              <Menu className="size-5 text-white stroke-white stroke-[2.5]" aria-hidden="true" />
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen ? (
          <div
            className="absolute top-full left-0 right-0 z-50 w-full max-h-[calc(100dvh-var(--ds-layout-navbar-h)-1rem)] overflow-y-auto overscroll-contain px-ds-page-x pt-3 pb-[calc(1rem+var(--ds-safe-area-bottom))] lg:hidden"
          >
            <div className={cn(cardSurfaceVariants({ variant: "elevated" }), "w-full rounded-ds-card-lg bg-white px-5 py-5")}>
              <div className="flex flex-col gap-3">
                <div className="mb-1 flex items-center justify-between px-1">
                  <Link href="/#home" className={logoLinkClassName} onClick={handleLogoClick}>
                    <Image
                      src="/GDK_LOGO.jpg"
                      alt="GDK Packaging"
                      width={220}
                      height={60}
                      className={logoImageClassName}
                    />
                  </Link>
                  <button
                    type="button"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                    className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-charcoal shadow-sm hover:bg-brand-charcoal-deep"
                  >
                    <X className="h-5 w-5 text-white stroke-[2.5]" />
                  </button>
                </div>
                {navLinks.map((link) => {
                  const isActive = isRouteActive(link.hash);
                  const isAboutLink = link.label === "About";
                  const isProductsLink = link.label === "Products";
                  return (
                    <div
                      key={link.href}
                      className={cn(
                        "rounded-2xl p-0.5 transition-colors duration-300",
                        "border border-transparent bg-transparent"
                      )}
                    >
                      {isAboutLink ? (
                        <div>
                          <button
                            type="button"
                            aria-expanded={isMobileAboutOpen}
                            className={cn(
                              "flex w-full items-center justify-between rounded-full border border-transparent px-4 py-2.5 text-sm font-medium tracking-[0.02em] transition-[background-color,border-color,box-shadow,color] duration-200",
                              "text-ds-text-muted hover:border-ds-border-subtle hover:bg-[color-mix(in_srgb,var(--brand-accent)_8%,white)] hover:text-brand-accent",
                              isActive &&
                              "border-ds-border-subtle bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] text-brand-accent shadow-sm"
                            )}
                            onClick={() => setIsMobileAboutOpen((previous) => !previous)}
                          >
                            <span>About</span>
                            {isMobileAboutOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </button>
                          <div
                            className={cn(
                              "grid overflow-hidden px-2 transition-all duration-300",
                              isMobileAboutOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                            )}
                          >
                            <div className="min-h-0">
                              <div
                                className={cn(
                                  "space-y-1.5 rounded-xl border p-2.5",
                                  "border-ds-border-subtle bg-muted"
                                )}
                              >
                                {aboutMegaCards.map((card) => (
                                  <Link
                                    key={card.title}
                                    href={card.href}
                                    className={cn(
                                      "block rounded-lg px-3 py-2.5 text-xs font-medium transition-colors duration-200",
                                      "text-ds-text-muted hover:bg-white hover:text-brand-accent"
                                    )}
                                    onClick={() => {
                                      setActiveSection("about");
                                      closeMobileMenu();
                                    }}
                                  >
                                    {card.title}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : isProductsLink ? (
                        <div>
                          <button
                            type="button"
                            aria-expanded={isMobileProductsOpen}
                            className={cn(
                              "flex w-full items-center justify-between rounded-full border border-transparent px-4 py-2.5 text-sm font-medium tracking-[0.02em] transition-[background-color,border-color,box-shadow,color] duration-200",
                              "text-ds-text-muted hover:border-ds-border-subtle hover:bg-[color-mix(in_srgb,var(--brand-accent)_8%,white)] hover:text-brand-accent",
                              isActive &&
                              "border-ds-border-subtle bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] text-brand-accent shadow-sm"
                            )}
                            onClick={() => setIsMobileProductsOpen((previous) => !previous)}
                          >
                            <span>Products</span>
                            {isMobileProductsOpen ? (
                              <ChevronUp className="size-4" />
                            ) : (
                              <ChevronDown className="size-4" />
                            )}
                          </button>
                          <div
                            className={cn(
                              "grid overflow-hidden px-2 transition-all duration-300",
                              isMobileProductsOpen
                                ? "mt-2 grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            )}
                          >
                            <div className="min-h-0">
                              <div
                                className={cn(
                                  "space-y-2.5 rounded-xl border p-2.5",
                                  "border-ds-border-subtle bg-muted"
                                )}
                              >
                                {PRODUCT_MEGA_MENU_CATEGORIES.map((category) => {
                                  const isCategoryOpen = activeMobileProductKey === category.key;
                                  return (
                                    <div
                                      key={category.key}
                                      className={cn(
                                        "rounded-lg border transition-colors duration-200",
                                        "border-ds-border-subtle bg-white"
                                      )}
                                    >
                                      <button
                                        type="button"
                                        className={cn(
                                          "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-colors duration-200",
                                          "text-ds-text-muted hover:bg-accent hover:text-brand-accent",
                                          isCategoryOpen && "bg-accent text-brand-accent"
                                        )}
                                        onClick={() =>
                                          setActiveMobileProductKey((previous) =>
                                            previous === category.key ? null : category.key
                                          )
                                        }
                                      >
                                        <span>{category.title}</span>
                                        {isCategoryOpen ? (
                                          <ChevronUp className="size-3.5" />
                                        ) : (
                                          <ChevronDown className="size-3.5" />
                                        )}
                                      </button>
                                      <div
                                        className={cn(
                                          "grid overflow-hidden px-2 transition-all duration-300",
                                          isCategoryOpen
                                            ? "pb-2 grid-rows-[1fr] opacity-100"
                                            : "grid-rows-[0fr] opacity-0"
                                        )}
                                      >
                                        <div className="min-h-0 space-y-1.5">
                                          {category.subcategories.map((product) => (
                                            <Link
                                              key={product.slug}
                                              href={product.href}
                                              className={cn(
                                                "block rounded-md px-2.5 py-2 text-xs font-medium transition-colors duration-200",
                                                "text-ds-text-muted hover:bg-accent hover:text-brand-accent"
                                              )}
                                              onClick={() => {
                                                setActiveSection("products");
                                                closeMobileMenu();
                                              }}
                                            >
                                              {product.title}
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          aria-current={isActive ? "page" : undefined}
                          className={cn(
                            "block rounded-full border border-transparent px-4 py-2.5 text-sm font-medium tracking-[0.02em] transition-[background-color,border-color,box-shadow,color] duration-200",
                            "text-ds-text-muted hover:border-ds-border-subtle hover:bg-[color-mix(in_srgb,var(--brand-accent)_8%,white)] hover:text-brand-accent",
                            isActive &&
                            "border-ds-border-subtle bg-[color-mix(in_srgb,var(--brand-accent)_12%,white)] text-brand-accent shadow-sm"
                          )}
                          onClick={() => {
                            setActiveSection(link.hash.replace("#", ""));
                            closeMobileMenu();
                          }}
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  );
                })}
                <div className="mt-4 flex items-center gap-3">
                  {/* <button
                type="button"
                aria-label="Wishlist"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200",
                  scrolled
                    ? "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                    : "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <Star className="size-4" />
              </button> */}
                  <Link
                    href="/#contact"
                    onClick={() => {
                      setActiveSection("home");
                      closeMobileMenu();
                    }}
                    className="inline-flex min-h-12.5 flex-1 items-center justify-center rounded-full bg-brand-accent px-7 py-3 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) text-white transition-colors duration-200 hover:bg-brand-accent-hover hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
                  >
                    Get Quote
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>
      <div className="h-(--ds-layout-navbar-h) shrink-0" aria-hidden="true" />
    </>
  );
}
