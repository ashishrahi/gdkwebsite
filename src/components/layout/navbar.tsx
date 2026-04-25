"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronUp, Globe, Menu, Package, Sparkles, Star, X } from "lucide-react";

import { Button } from "@/components/ui/button";
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
  overlayOnTop?: boolean;
};

export function Navbar({ overlayOnTop = false }: NavbarProps) {
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
      const heroSection = document.getElementById("home");
      const heroHeight = heroSection?.offsetHeight ?? window.innerHeight;
      setScrolled(window.scrollY > heroHeight - 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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

  return (
    <header
      className={cn(
        "fixed top-4 right-0 left-0 z-50 w-full px-4 sm:px-5 lg:px-6",
        overlayOnTop ? "top-4" : "top-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-[72px] w-full max-w-[1450px] items-center justify-between rounded-full px-4 backdrop-blur-2xl transition-all duration-300 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:px-7",
          scrolled
            ? "border border-slate-200/85 bg-white/95 shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
            : "border border-slate-200 bg-white/85 shadow-sm backdrop-blur-xl"
        )}
      >
        <div className="hidden items-center justify-start lg:flex">
          <Link href="/#home" className="flex items-center" onClick={closeMobileMenu}>
            <Image
              src="/logo-white.png"
              alt="GDK Packaging"
              width={220}
              height={60}
              className="h-10 w-auto object-contain drop-shadow-[0_1px_2px_rgba(15,23,42,0.45)] lg:h-11"
              priority
            />
          </Link>
        </div>
        <Link href="/#home" className="flex items-center justify-start lg:hidden" onClick={closeMobileMenu}>
          <Image
            src="/logo-white.png"
            alt="GDK Packaging"
            width={220}
            height={60}
            className="h-10 w-auto object-contain drop-shadow-[0_1px_2px_rgba(15,23,42,0.45)] lg:h-11"
            priority
          />
        </Link>

        <div className="hidden h-11 items-center justify-center gap-5 lg:flex">
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
                      className={cn(
                        "relative inline-flex h-10 items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                        scrolled
                          ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          : "text-slate-800 hover:bg-slate-100 hover:text-slate-900",
                        isActive &&
                          (scrolled
                            ? "bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]"
                            : "bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]")
                      )}
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
                        "pointer-events-none absolute top-full left-1/2 z-50 mt-8 w-[740px] -translate-x-1/2 opacity-0 invisible translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        activeDesktopMenu === "about" &&
                          "pointer-events-auto opacity-100 visible translate-y-0"
                      )}
                    >
                      <div className="relative rounded-3xl border border-gray-200/90 bg-white p-7 shadow-[0_32px_70px_rgba(15,23,42,0.22)]">
                        <div className="absolute top-[-11px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 rotate-45 border-t border-l border-gray-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]" />
                        <div className="grid grid-cols-[1fr_1.6fr] gap-8">
                          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
                              About GDK
                            </p>
                            <ul className="mt-3 space-y-2">
                              {aboutHighlights.map((item) => (
                                <li key={item} className="text-sm font-medium text-slate-800">
                                  {item}
                                </li>
                              ))}
                            </ul>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600">
                              Premium packaging partner delivering precision manufacturing with
                              consistency, compliance, and scale.
                            </p>
                          </div>
                          <div className="grid grid-cols-1 gap-4.5">
                            {aboutMegaCards.map((card) => (
                              <Link
                                key={card.title}
                                href={card.href}
                                className="group/card flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-accent)] hover:shadow-[0_14px_26px_rgba(15,23,42,0.12)]"
                              >
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-[var(--brand-accent)] to-[var(--brand-accent-hover)] text-white">
                                  <card.icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className="text-sm leading-5 font-semibold text-slate-900">{card.title}</p>
                                  <p className="mt-1.5 text-xs leading-[1.55] text-slate-600">
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
                      className={cn(
                        "relative inline-flex h-10 items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                        scrolled
                          ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          : "text-slate-800 hover:bg-slate-100 hover:text-slate-900",
                        isActive &&
                          (scrolled
                            ? "bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]"
                            : "bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]")
                      )}
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
                        "pointer-events-none absolute top-full left-1/2 z-50 mt-8 w-[860px] -translate-x-1/2 opacity-0 invisible translate-y-4 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        activeDesktopMenu === "products" &&
                          "pointer-events-auto opacity-100 visible translate-y-0"
                      )}
                    >
                      <div className="relative rounded-3xl border border-gray-200/90 bg-white p-7 shadow-[0_32px_70px_rgba(15,23,42,0.22)]">
                        <div className="absolute top-[-11px] left-1/2 z-10 h-5 w-5 -translate-x-1/2 rotate-45 border-t border-l border-gray-200 bg-white shadow-[0_12px_28px_rgba(15,23,42,0.16)]" />
                        <div className="grid grid-cols-[1.05fr_1fr] gap-8">
                          <div className="grid grid-cols-1 gap-4.5">
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
                                    "group/category flex items-start gap-3.5 rounded-2xl border bg-white p-4 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(15,23,42,0.12)]",
                                    isCategoryActive
                                      ? "border-[var(--brand-accent)] shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-accent)_24%,transparent)]"
                                      : "border-slate-200 hover:border-[color:color-mix(in_srgb,var(--brand-accent)_70%,transparent)]"
                                  )}
                                >
                                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                    <CategoryIcon className="h-6 w-6 text-[var(--brand-accent)]" />
                                  </div>
                                  <div>
                                    <p className="text-sm leading-5 font-semibold text-slate-900">{category.title}</p>
                                    <p className="mt-1.5 text-xs leading-[1.55] text-slate-600">
                                      {category.description}
                                    </p>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                          <div className="group/panel block rounded-2xl border border-slate-200 bg-slate-50 p-6 transition-all duration-200 hover:border-[var(--brand-accent)]">
                            <Link href={activeDesktopProductCategory.href}>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-accent)]">
                                {activeDesktopProductCategory.title}
                              </p>
                            </Link>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600">
                              Product sub-categories crafted for performance, consistency, and scalable
                              manufacturing.
                            </p>
                            <div className="mt-4 grid grid-cols-1 gap-2.5">
                            {activeDesktopProductCategory.subcategories.map((product) => (
                                <Link
                                  href={product.href}
                                  key={product.slug}
                                  className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 transition-all duration-200 hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
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
                    className={cn(
                      "relative inline-flex h-10 items-center gap-1 rounded-full px-5 py-2 text-sm font-medium transition-all duration-300",
                      scrolled
                        ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        : "text-slate-800 hover:bg-slate-100 hover:text-slate-900",
                      isActive &&
                        (scrolled
                          ? "bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]"
                          : "bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]")
                    )}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden h-11 items-center justify-end gap-3 lg:flex">
          <button
            type="button"
            aria-label="Wishlist"
            style={{ padding: 0, minHeight: 0 }}
            className={cn(
              "group inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[color:color-mix(in_srgb,var(--brand-accent)_18%,#e2e8f0)] bg-white/95 text-[var(--brand-accent)] shadow-[0_8px_18px_rgba(15,23,42,0.08)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[var(--brand-accent)] hover:bg-[color:color-mix(in_srgb,var(--brand-accent)_8%,white)] hover:shadow-[0_14px_26px_color-mix(in_srgb,var(--brand-accent)_24%,transparent)]",
              scrolled
                ? "ring-1 ring-slate-100/80"
                : "ring-1 ring-white/80"
            )}
          >
            <Star className="size-[18px] shrink-0 transition-transform duration-300 group-hover:scale-110" />
          </button>
          <Button
            asChild
            size="lg"
            className="h-11 rounded-full bg-[var(--primary)] px-7 py-3 text-white shadow-[0_16px_34px_color-mix(in_srgb,var(--primary)_42%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[var(--primary-hover)] hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
          >
            <Link href="/#contact" style={{ color: "#fff" }}>
              Get Quote
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={isMobileMenuOpen}
            className="h-11 w-11 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-md flex items-center justify-center transition-all duration-200 hover:scale-[1.03] active:scale-[0.96]"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div
          className="absolute top-full left-0 right-0 z-50 w-full px-4 pt-3 md:hidden"
        >
          <div className="w-full rounded-[32px] bg-white px-4 py-4 shadow-xl">
            <div className="flex flex-col gap-2">
            <div className="mb-1 flex items-center justify-between px-1">
              <Link href="/#home" className="flex items-center" onClick={closeMobileMenu}>
                <Image
                  src="/logo-white.png"
                  alt="GDK Packaging"
                  width={220}
                  height={60}
                  className="h-10 w-auto object-contain drop-shadow-[0_1px_2px_rgba(15,23,42,0.45)]"
                />
              </Link>
              <button
                type="button"
                onClick={closeMobileMenu}
                aria-label="Close menu"
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500 shadow-lg hover:bg-orange-600"
              >
                <X className="h-6 w-6 text-white stroke-[2.5]" />
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
                    "border border-slate-200"
                  )}
                >
                  {isAboutLink ? (
                    <div>
                      <button
                        type="button"
                        aria-expanded={isMobileAboutOpen}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
                          scrolled
                            ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                          isActive &&
                            "bg-slate-100 text-slate-900"
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
                              "space-y-1 rounded-xl border p-2",
                              "border-slate-200 bg-slate-50"
                            )}
                          >
                            {aboutMegaCards.map((card) => (
                              <Link
                                key={card.title}
                                href={card.href}
                                className={cn(
                                  "block rounded-lg px-3 py-2 text-xs font-medium transition-colors duration-200",
                                  scrolled
                                    ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                    : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
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
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
                          scrolled
                            ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                          isActive &&
                            "bg-slate-100 text-slate-900"
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
                              "space-y-2 rounded-xl border p-2",
                              "border-slate-200 bg-slate-50"
                            )}
                          >
                            {PRODUCT_MEGA_MENU_CATEGORIES.map((category) => {
                              const isCategoryOpen = activeMobileProductKey === category.key;
                              return (
                                <div
                                  key={category.key}
                                  className={cn(
                                    "rounded-lg border transition-colors duration-200",
                                    "border-slate-200 bg-white"
                                  )}
                                >
                                  <button
                                    type="button"
                                    className={cn(
                                      "flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold transition-colors duration-200",
                                      scrolled
                                        ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                                        : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                                      isCategoryOpen && "bg-slate-100 text-slate-900"
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
                                    <div className="min-h-0 space-y-1">
                                      {category.subcategories.map((product) => (
                                        <Link
                                          key={product.slug}
                                          href={product.href}
                                          className={cn(
                                            "block rounded-md px-2 py-1.5 text-xs font-medium transition-colors duration-200",
                                            scrolled
                                              ? "text-slate-600 hover:bg-slate-100 hover:text-[var(--brand-accent)]"
                                              : "text-slate-600 hover:bg-slate-100 hover:text-[var(--brand-accent)]"
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
                        "block rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
                        scrolled
                          ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                        isActive && "bg-slate-100 text-slate-900"
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
            <div className="mt-3 flex items-center gap-3">
              <button
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
              </button>
              <Link
                href="/#contact"
                onClick={() => {
                  setActiveSection("home");
                  closeMobileMenu();
                }}
                style={{ color: "#fff" }}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[var(--primary-hover)] hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
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
