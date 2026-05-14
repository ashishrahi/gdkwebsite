"use client";

import { ClipboardList } from "lucide-react";

import { cn } from "@/lib/utils";
import { useEnquiry } from "./enquiry-provider";

type EnquiryNavButtonProps = {
  className?: string;
  compact?: boolean;
};

export function EnquiryNavButton({ className, compact = false }: EnquiryNavButtonProps) {
  const { count, hydrated, openDrawer } = useEnquiry();
  const visibleCount = hydrated ? count : 0;
  const hasItems = visibleCount > 0;
  const badgeLabel = visibleCount > 99 ? "99+" : String(visibleCount);

  return (
    <button
      type="button"
      onClick={openDrawer}
      aria-hidden={!hasItems}
      aria-label={`Open enquiry basket with ${visibleCount} selected ${
        visibleCount === 1 ? "product" : "products"
      }`}
      disabled={!hasItems}
      tabIndex={hasItems ? 0 : -1}
      className={cn(
        "group/enquiry-nav relative inline-flex shrink-0 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand-accent)_22%,var(--border))] bg-white/82 text-[#123c24] shadow-sm backdrop-blur transition-[opacity,transform,background-color,border-color,box-shadow,color] duration-200 ease-ds-out hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-accent)_42%,var(--border))] hover:bg-white hover:text-brand-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--brand-accent)_18%,transparent)] disabled:pointer-events-none disabled:cursor-default",
        compact ? "size-10" : "size-11",
        hasItems ? "scale-100 opacity-100" : "scale-95 opacity-0",
        className,
      )}
    >
      <ClipboardList className="size-4.5" aria-hidden />
      <span
        aria-hidden="true"
        className={cn(
          "absolute -top-1 -right-1 grid min-h-4.5 min-w-4.5 place-items-center rounded-full bg-brand-accent px-1 text-[10px] font-semibold leading-none text-white shadow-[0_8px_18px_color-mix(in_srgb,var(--brand-accent)_25%,transparent)] ring-2 ring-[#f2faf3] transition-[opacity,transform] duration-200 ease-ds-out",
          hasItems
            ? "scale-100 opacity-100 group-hover/enquiry-nav:scale-105"
            : "scale-90 opacity-0",
        )}
      >
        {badgeLabel}
      </span>
    </button>
  );
}
