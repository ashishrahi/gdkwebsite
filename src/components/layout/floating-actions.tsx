"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";
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
          className="h-12 w-12 rounded-full border border-neutral-200 bg-white text-neutral-800 shadow-lg transition-all duration-300 hover:scale-105 max-md:h-11 max-md:w-11 flex items-center justify-center"
        >
          <ChevronUp size={20} />
        </button>
      </div>

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed right-5 bottom-6 z-50 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.38)] ring-4 ring-white/80 border border-white/40 transition-all duration-300 hover:scale-105 hover:bg-[#20ba5a] active:bg-[#1da851] flex items-center justify-center overflow-hidden before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent max-md:right-4 max-md:bottom-4 max-md:h-11 max-md:w-11"
      >
        <FaWhatsapp className="relative z-10 h-[30px] w-[30px] max-md:h-[26px] max-md:w-[26px] text-white" />
      </a>
    </>
  );
}
