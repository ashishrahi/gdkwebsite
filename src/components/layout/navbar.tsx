"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Heart, Menu, Search, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    dropdown: [
      { href: "/about#company-profile", label: "Company Profile" },
      { href: "/about#infrastructure", label: "Infrastructure" },
      { href: "/about#certifications", label: "Certifications" },
      { href: "/about#our-process", label: "Our Process" },
    ],
  },
  {
    href: "/products",
    label: "Products",
    dropdown: [
      { href: "/products/corrugated-boxes", label: "Corrugated Boxes" },
      { href: "/products/stretch-film", label: "Stretch Film" },
      { href: "/products/bopp-tapes", label: "BOPP Tapes" },
      { href: "/products/courier-bags", label: "Courier Bags" },
    ],
  },
  { href: "/industries", label: "Industries" },
  { href: "/contact", label: "Contact" },
];

type NavbarProps = {
  overlayOnTop?: boolean;
};

export function Navbar({ overlayOnTop = false }: NavbarProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isRouteActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);
  return (
    <header
      className={cn(
        "fixed top-4 right-0 left-0 z-50 w-full px-4 sm:px-5 lg:px-6",
        overlayOnTop ? "top-4" : "top-4"
      )}
    >
      <nav className="mx-auto flex w-full max-w-[1450px] items-center justify-between rounded-[28px] border border-white/50 bg-white/70 px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.1)] backdrop-blur-2xl sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-3.5 text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
          onClick={closeMobileMenu}
        >
          <span className="inline-flex size-10 items-center justify-center rounded-xl border border-[#f26a21]/70 bg-white/90 text-sm font-extrabold tracking-wider text-[#f26a21] shadow-[0_10px_24px_rgba(242,106,33,0.24)]">
            GDK
          </span>
          <span className="text-[0.95em] leading-none">
            Packaging
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex xl:gap-10">
          {navLinks.map((link) => {
            const isActive = isRouteActive(link.href);
            return (
              <div key={link.href} className="group relative">
                <Link
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "relative inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-800 transition-all duration-300 hover:text-[#1450c8]",
                    isActive && "bg-[#1450c8]/10 text-[#1450c8]"
                  )}
                >
                  {link.label}
                  {link.dropdown ? (
                    <ChevronDown className="size-4 transition-transform duration-300 group-hover:-rotate-180 group-focus-within:-rotate-180" />
                  ) : null}
                  <span
                    className={cn(
                      "pointer-events-none absolute -bottom-0.5 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-[#1450c8] transition-all duration-300",
                      isActive ? "w-[72%] opacity-100" : "w-0 opacity-0 group-hover:w-[72%] group-hover:opacity-100"
                    )}
                  />
                </Link>

                {link.dropdown ? (
                  <div className="pointer-events-none absolute top-full left-1/2 z-40 mt-4 w-[290px] -translate-x-1/2 scale-95 rounded-3xl border border-slate-100 bg-white p-3 opacity-0 shadow-[0_30px_80px_rgba(0,0,0,0.12)] transition-all duration-300 ease-out group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:scale-100 group-focus-within:opacity-100">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-2xl px-4 py-4 text-sm font-medium text-slate-700 transition-colors duration-200 hover:bg-slate-50 hover:text-[#1450c8]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="hidden items-center gap-2.5 md:flex">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:text-[#1450c8]"
          >
            <Search className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Wishlist"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/80 bg-white/80 text-slate-700 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:text-[#1450c8]"
          >
            <Heart className="size-4" />
          </button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#f26a21] px-7 py-3 text-white shadow-[0_14px_30px_rgba(242,106,33,0.34)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#df5c17]"
          >
            <Link href="/contact">Get Quote</Link>
          </Button>
        </div>

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setIsMobileMenuOpen((previous) => !previous)}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            className="rounded-full border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 hover:text-[#1450c8]"
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {isMobileMenuOpen ? (
        <div className="mx-auto mt-3 w-full max-w-[1450px] rounded-[28px] border border-white/60 bg-white/95 px-4 py-4 shadow-[0_20px_60px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = isRouteActive(link.href);
              return (
                <div key={link.href} className="rounded-2xl border border-slate-100 p-1">
                  <Link
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "block rounded-xl px-3 py-2 text-sm font-medium text-slate-800 transition-colors duration-200 hover:bg-slate-50 hover:text-[#1450c8]",
                      isActive && "bg-slate-50 text-[#1450c8]"
                    )}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                  {link.dropdown ? (
                    <div className="mt-1 space-y-1 px-2 pb-2">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="block rounded-xl px-3 py-2 text-xs font-medium text-slate-600 transition-colors duration-200 hover:bg-slate-50 hover:text-[#1450c8]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
            <div className="mt-3 flex items-center gap-3">
              <button
                type="button"
                aria-label="Search"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:shadow-md hover:text-[#1450c8]"
              >
                <Search className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Wishlist"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition-all duration-200 hover:shadow-md hover:text-[#1450c8]"
              >
                <Heart className="size-4" />
              </button>
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="inline-flex flex-1 items-center justify-center rounded-full bg-[#f26a21] px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#df5c17]"
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
