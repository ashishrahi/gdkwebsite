"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#home", hash: "#home", label: "Home" },
  { href: "/#about", hash: "#about", label: "About" },
  { href: "/#products", hash: "#products", label: "Products" },
  { href: "/#industries", hash: "#industries", label: "Industries" },
  { href: "/#why-choose-us", hash: "#why-choose-us", label: "Why Us" },
];

type NavbarProps = {
  overlayOnTop?: boolean;
};

export function Navbar({ overlayOnTop = false }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

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

  const isRouteActive = (hash: string) => activeSection === hash.replace("#", "");

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <header
      className={cn(
        "fixed top-4 right-0 left-0 z-50 w-full px-4 sm:px-5 lg:px-6",
        overlayOnTop ? "top-4" : "top-4"
      )}
    >
      <nav
        className={cn(
          "mx-auto flex h-[72px] w-full max-w-[1450px] items-center justify-between rounded-full px-4 backdrop-blur-2xl transition-all duration-300 sm:px-6 lg:px-7",
          scrolled
            ? "border border-slate-200/85 bg-white/95 shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
            : "border border-white/28 bg-[#06162f]/44 shadow-[0_24px_60px_rgba(2,8,23,0.34)]"
        )}
      >
        <Link
          href="/#home"
          className={cn(
            "inline-flex h-11 items-center gap-3 text-base font-semibold tracking-tight sm:text-lg transition-colors duration-300",
            scrolled ? "text-slate-900" : "text-white"
          )}
          onClick={closeMobileMenu}
        >
          <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[#f26a21]/70 bg-[#f26a21]/14 text-sm font-extrabold tracking-wider text-[#f26a21] shadow-[0_12px_30px_rgba(242,106,33,0.38)]">
            GDK
          </span>
          <span
            className={cn(
              "text-[0.95em] leading-none transition-colors duration-300",
              scrolled ? "text-slate-900" : "text-white"
            )}
          >
            Packaging
          </span>
        </Link>

        <div className="hidden h-11 flex-1 items-center justify-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const isActive = isRouteActive(link.hash);
            return (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => {
                    setActiveSection(link.hash.replace("#", ""));
                    closeMobileMenu();
                  }}
                  className={cn(
                    "relative inline-flex h-10 items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300",
                    scrolled
                      ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                      : "text-white/95 hover:bg-white/16 hover:text-white",
                    isActive &&
                      (scrolled
                        ? "bg-slate-100 text-slate-900 shadow-[inset_0_0_0_1px_rgba(15,23,42,0.08)]"
                        : "bg-white/14 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]")
                  )}
                >
                  {link.label}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="hidden h-11 items-center gap-2.5 md:flex">
          <button
            type="button"
            aria-label="Search"
            style={{ padding: 0, minHeight: 0 }}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5",
              scrolled
                ? "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                : "border border-white/35 bg-white/12 text-white/95 hover:border-white/50 hover:bg-white/20 hover:text-white"
            )}
          >
            <Search className="size-4 shrink-0" />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            style={{ padding: 0, minHeight: 0 }}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:-translate-y-0.5",
              scrolled
                ? "border border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                : "border border-white/35 bg-white/12 text-white/95 hover:border-white/50 hover:bg-white/20 hover:text-white"
            )}
          >
            <Heart className="size-4 shrink-0" />
          </button>
          <Button
            asChild
            size="lg"
            className="h-11 rounded-full bg-[#f26a21] px-7 py-3 text-white shadow-[0_16px_34px_rgba(242,106,33,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#de5b17] hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
          >
            <Link href="/#contact" style={{ color: "#fff" }}>
              Get Quote
            </Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className={cn(
              "rounded-full transition-all duration-300",
              scrolled
                ? "border border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900"
                : "border border-white/30 bg-white/12 text-white hover:border-white/45 hover:bg-white/20 hover:text-white"
            )}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div
          className={cn(
            "mx-auto mt-3 w-full max-w-[1450px] rounded-[28px] px-4 py-4 backdrop-blur-2xl transition-all duration-300 md:hidden",
            scrolled
              ? "border border-slate-200/85 bg-white/95 shadow-[0_16px_36px_rgba(15,23,42,0.12)]"
              : "border border-white/30 bg-[#06162f]/90 shadow-[0_22px_52px_rgba(2,8,23,0.4)]"
          )}
        >
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = isRouteActive(link.hash);
              return (
                <div
                  key={link.href}
                  className={cn(
                    "rounded-2xl p-1 transition-colors duration-300",
                    scrolled ? "border border-slate-200" : "border border-white/15"
                  )}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
                      scrolled
                        ? "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                        : "text-white/95 hover:bg-white/16 hover:text-white",
                      isActive && (scrolled ? "bg-slate-100 text-slate-900" : "bg-white/14 text-white")
                    )}
                    onClick={() => {
                      setActiveSection(link.hash.replace("#", ""));
                      closeMobileMenu();
                    }}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                aria-label="Search"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200",
                  scrolled
                    ? "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                    : "border border-white/35 bg-white/14 text-white/95 hover:bg-white/22 hover:text-white"
                )}
              >
                <Search className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Wishlist"
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200",
                  scrolled
                    ? "border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-slate-900"
                    : "border border-white/35 bg-white/14 text-white/95 hover:bg-white/22 hover:text-white"
                )}
              >
                <Heart className="size-4" />
              </button>
              <Link
                href="/#contact"
                onClick={() => {
                  setActiveSection("home");
                  closeMobileMenu();
                }}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#f26a21] px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#df5c17] hover:text-white [&_svg]:stroke-white [&_svg]:text-white"
              >
                Get Quote
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
