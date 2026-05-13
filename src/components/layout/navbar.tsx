"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Globe, Menu, Package, Sparkles, Star, X } from "lucide-react";

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
  { href: "/#why-choose-us", hash: "#why-choose-us", label: "Why Us" },
];

const aboutHighlights = [
  "About GDK Packaging",
  "Trusted manufacturer",
  "25+ Years Experience",
  "ISO Standards",
];

const aboutMegaCards = [
  {
    href: "/about",
    title: "GDK Solution",
    description: "Discover our complete packaging capabilities and engineered product line.",
    icon: Sparkles,
  },
  {
    href: "/about#kb-ropes",
    title: "K.B. Ropes Pvt Ltd",
    description: "Explore our group strength and the extended manufacturing ecosystem.",
    icon: Globe,
  },
  {
    href: "/about#vision-mission",
    title: "Vision & Mission",
    description: "Read the principles guiding quality, innovation, and long-term partnerships.",
    icon: Star,
  },
];

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
  const [scrolled, setScrolled] = useState(false);
  const desktopMenuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.hash.replace("#", ""));
    const visibleRatios = new Map<string, number>();

    const updateFromHash = () => {
      const next = (window.location.hash || "#home").replace("#", "");
      if (sectionIds.includes(next)) {
        setActiveSection(next);
      }
    };

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

        for (const id of sectionIds) {
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

    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (section) {
        observer.observe(section);
      }
    }

    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);

    return () => {
      window.removeEventListener("hashchange", updateFromHash);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(homeVariant ? window.scrollY > 16 : window.scrollY > 0);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [homeVariant]);

  const isRouteActive = (hash: string) => {
    if (pathname.startsWith("/products")) {
      return hash === "#products";
    }

    if (pathname.startsWith("/about")) {
      return hash === "#about";
    }

    if (pathname !== "/") {
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

  useEffect(() => {
    return () => {
      clearDesktopMenuCloseTimeout();
    };
  }, []);

  const activeDesktopProductCategory =
    getMegaMenuCategoryByKey(activeDesktopProductKey) ??
    getMegaMenuCategoryByKey(DEFAULT_PRODUCT_MEGA_MENU_CATEGORY_KEY) ??
    PRODUCT_MEGA_MENU_CATEGORIES[0];
  const useHomeNavSurface = homeVariant;
  const logoLinkClassName =
    "flex items-center";
  const logoImageClassName =
    "h-9 w-auto object-contain";
  const desktopNavLinkClassName = (isActive: boolean) =>
    cn(
      "relative inline-flex h-10 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold tracking-[0.01em] transition-all duration-200",
      "text-[#1f4d2f] hover:bg-white/75 hover:text-[#0f3f24] hover:shadow-[inset_0_0_0_1px_rgb(88_139_96/0.18),0_6px_18px_rgb(20_83_45/0.08)]",
      isActive &&
        "bg-white text-[#0f3f24] shadow-[inset_0_0_0_1px_rgb(88_139_96/0.22),0_8px_22px_rgb(20_83_45/0.1)]"
    );

  return (
    <header
      className={cn(
        "sticky top-0 isolate z-50 w-full shrink-0 border-b bg-[#f2faf3] px-ds-page-x transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300",
        homeVariant
          ? "border-[#cfe8d2] shadow-[0_10px_28px_rgb(20_83_45/0.12)]"
          : "border-[#d5ead8] shadow-[0_8px_22px_rgb(20_83_45/0.08)]"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-(--ds-layout-navbar-h) w-full max-w-ds-page items-center justify-between px-0 transition-all duration-200 lg:grid lg:grid-cols-[1fr_auto_1fr]",
          scrolled
            ? "shadow-ds-nav"
            : "shadow-none"
        )}
      >
        <div className="hidden items-center justify-start lg:flex">
          <Link href="/#home" className={logoLinkClassName} onClick={closeMobileMenu}>
            <Image
              src="/logo-white.png"
              alt="GDK Packaging"
              width={220}
              height={60}
              className={logoImageClassName}
              priority
            />
          </Link>
        </div>
        <Link href="/#home" className={cn(logoLinkClassName, "justify-start lg:hidden")} onClick={closeMobileMenu}>
          <Image
            src="/logo-white.png"
            alt="GDK Packaging"
            width={220}
            height={60}
            className={logoImageClassName}
            priority
          />
        </Link>

        <div
          className={cn(
            "hidden h-11 items-center justify-center gap-1.5 lg:flex",
            useHomeNavSurface &&
              "rounded-full border border-[#d5ead8] bg-white/55 px-1.5 shadow-[0_8px_20px_rgb(20_83_45/0.08)]"
          )}
        >
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
                      aria-current={isActive ? "page" : undefined}
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
                        "pointer-events-none invisible absolute top-full left-1/2 z-50 mt-4 w-[700px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 ease-ds-out",
                        activeDesktopMenu === "about" &&
                          "pointer-events-auto opacity-100 visible translate-y-0"
                      )}
                    >
                      <div className={cn(cardSurfaceVariants({ variant: "elevated", padding: "lg" }), "rounded-ds-card-lg bg-ds-surface")}>
                        <div className="absolute top-[-11px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 rotate-45 border-t border-l border-ds-border-subtle bg-ds-surface shadow-ds-card-subtle" />
                        <div className="grid grid-cols-[1fr_1.6fr] gap-8">
                          <div className={cn(cardSurfaceVariants({ variant: "minimal", padding: "lg" }), "bg-ds-surface-muted")}>
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                              About GDK
                            </p>
                            <ul className="mt-4 space-y-2.5">
                              {aboutHighlights.map((item) => (
                                <li key={item} className="text-sm font-medium text-ds-text-strong">
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-4 text-sm leading-relaxed text-ds-text-muted">
                              Premium packaging partner delivering precision manufacturing with
                              consistency, compliance, and scale.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-5">
                            {aboutMegaCards.map((card) => (
                              <Link
                                key={card.title}
                                href={card.href}
                                className={cn(
                                  "flex items-start gap-4",
                                  cardSurfaceVariants({ variant: "interactive", padding: "sm" })
                                )}
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-accent text-white">
                                  <card.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="text-sm leading-5 font-semibold text-ds-text-strong">{card.title}</p>
                                  <p className="mt-1.5 text-xs leading-[1.55] text-ds-text-muted">
                                    {card.description}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : isProductsLink ? (
                  <>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "page" : undefined}
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
                        "pointer-events-none invisible absolute top-full left-1/2 z-50 mt-4 w-[820px] -translate-x-1/2 translate-y-2 opacity-0 transition-all duration-200 ease-ds-out",
                        activeDesktopMenu === "products" &&
                          "pointer-events-auto opacity-100 visible translate-y-0"
                      )}
                    >
                      <div className={cn(cardSurfaceVariants({ variant: "elevated", padding: "lg" }), "rounded-ds-card-lg bg-ds-surface")}>
                        <div className="absolute top-[-11px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 rotate-45 border-t border-l border-ds-border-subtle bg-ds-surface shadow-ds-card-subtle" />
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
                                    <p className="text-sm leading-5 font-semibold text-ds-text-strong">{category.title}</p>
                                    <p className="mt-1.5 text-xs leading-[1.55] text-ds-text-muted">
                                      {category.description}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          <div className={cn("group/panel block bg-ds-surface-muted", cardSurfaceVariants({ variant: "minimal", padding: "lg" }))}>
                            <Link href={activeDesktopProductCategory.href}>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-accent">
                                {activeDesktopProductCategory.title}
                              </p>
                            </Link>
                            <p className="mt-3 text-sm leading-relaxed text-ds-text-muted">
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

        <div className="hidden h-11 items-center justify-end gap-4 lg:flex">
         
          <Button
            asChild
            size="lg"
            className="h-11 rounded-full bg-brand-accent px-6 py-2.5 text-sm text-white shadow-(--ds-shadow-button-primary) transition-all duration-200 hover:-translate-y-0.5 hover:bg-brand-accent-hover hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
          >
            <Link href="/#contact" className="text-white! hover:text-white!">
              Get Quote
            </Link>
          </Button>
        </div>

        <div className="lg:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123c24] text-white shadow-sm transition-all duration-200 hover:bg-[#0f3f24] active:scale-[0.96]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div
          className="absolute top-full left-0 right-0 z-50 w-full px-ds-page-x pt-3 lg:hidden"
        >
          <div className={cn(cardSurfaceVariants({ variant: "elevated" }), "w-full rounded-ds-card-lg bg-[#f8fcf8] px-5 py-5")}>
            <div className="flex flex-col gap-3">
            <div className="mb-1 flex items-center justify-between px-1">
              <Link href="/#home" className={logoLinkClassName} onClick={closeMobileMenu}>
                <Image
                  src="/logo-white.png"
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
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#123c24] shadow-sm hover:bg-[#0f3f24]"
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
                    "rounded-2xl p-1 transition-colors duration-300",
                    "border border-[#d5ead8] bg-white/55"
                  )}
                >
                  {isAboutLink ? (
                    <div>
                      <button
                        type="button"
                        aria-expanded={isMobileAboutOpen}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                          "text-[#1f4d2f] hover:bg-[#edf7ee] hover:text-[#0f3f24]",
                          isActive &&
                            "bg-[#edf7ee] text-[#0f3f24] shadow-[inset_0_0_0_1px_rgb(88_139_96/0.18)]"
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
                              "border-[#d5ead8] bg-[#f2faf3]"
                            )}
                          >
                            {aboutMegaCards.map((card) => (
                              <Link
                                key={card.title}
                                href={card.href}
                                className={cn(
                                  "block rounded-lg px-3 py-2.5 text-xs font-medium transition-colors duration-200",
                                  "text-[#24583a] hover:bg-white hover:text-[#0f3f24]"
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
                          "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                          "text-[#1f4d2f] hover:bg-[#edf7ee] hover:text-[#0f3f24]",
                          isActive &&
                            "bg-[#edf7ee] text-[#0f3f24] shadow-[inset_0_0_0_1px_rgb(88_139_96/0.18)]"
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
                              "border-[#d5ead8] bg-[#f2faf3]"
                            )}
                          >
                            {PRODUCT_MEGA_MENU_CATEGORIES.map((category) => {
                              const isCategoryOpen = activeMobileProductKey === category.key;
                              return (
                                <div
                                  key={category.key}
                                  className={cn(
                                    "rounded-lg border transition-colors duration-200",
                                    "border-[#d5ead8] bg-white"
                                  )}
                                >
                                  <button
                                    type="button"
                                    className={cn(
                                      "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-semibold transition-colors duration-200",
                                      "text-[#24583a] hover:bg-[#edf7ee] hover:text-[#0f3f24]",
                                      isCategoryOpen && "bg-[#edf7ee] text-[#0f3f24]"
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
                                            "text-[#406f51] hover:bg-[#edf7ee] hover:text-[#0f3f24]"
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
                        "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                        "text-[#1f4d2f] hover:bg-[#edf7ee] hover:text-[#0f3f24]",
                        isActive &&
                          "bg-[#edf7ee] text-[#0f3f24] shadow-[inset_0_0_0_1px_rgb(88_139_96/0.18)]"
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
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-full bg-brand-accent px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-accent-hover hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
              >
                Get Quote
              </Link>
            </div>
          </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
