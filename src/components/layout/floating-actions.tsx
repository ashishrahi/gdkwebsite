"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const WHATSAPP_NUMBER = "919889271007";
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
  className="h-14 w-14 rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center"
>
  <ArrowUp className="h-6 w-6 stroke-[2.5]" />
</button>
      </div>

      <div className="fixed right-5 bottom-6 z-50 max-md:right-4 max-md:bottom-4">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/35 animate-ping [animation-duration:2.4s]"
        />
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-white/40 bg-[#25D366] text-white shadow-[0_20px_44px_rgba(37,211,102,0.42)] ring-4 ring-white/80 transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] active:bg-[#1da851] max-md:h-11 max-md:w-11"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"
          />
          <FaWhatsapp className="relative z-10 h-[30px] w-[30px] max-md:h-[24px] max-md:w-[24px] text-white" />
        </a>
      </div>
    </>
  );
}
