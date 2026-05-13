"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919889471453";
const SCROLL_THRESHOLD = 250;

export function FloatingActions() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > SCROLL_THRESHOLD);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className={`fixed left-5 bottom-6 z-50 transition-all duration-300 md:left-5 md:bottom-6 ${
          showScrollTop
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-3 opacity-0 pointer-events-none"
        } max-md:left-4 max-md:bottom-4`}
      >
     <button
  type="button"
  onClick={scrollToTop}
  aria-label="Scroll to top"
  className="flex h-11 w-11 items-center justify-center rounded-full border border-ds-border-subtle bg-white text-ds-text-strong shadow-ds-card-subtle transition-all duration-200 hover:border-brand-blue hover:bg-accent"
>
  <ArrowUp className="h-5 w-5 stroke-[2.5]" />
</button>
      </div>

      <div className="fixed right-5 bottom-6 z-50 max-md:right-4 max-md:bottom-4">
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-[var(--ds-color-whatsapp)] text-white shadow-ds-card-medium ring-4 ring-white/80 transition-colors duration-200 hover:bg-[var(--ds-color-whatsapp-hover)] active:bg-[var(--primary-hover)] max-md:h-11 max-md:w-11"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
          />
          <FaWhatsapp className="relative z-10 h-6 w-6 text-white max-md:h-[24px] max-md:w-[24px]" />
        </a>
      </div>
    </>
  );
}
