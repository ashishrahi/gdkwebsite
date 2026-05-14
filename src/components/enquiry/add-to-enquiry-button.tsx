"use client";

import { Check, Plus } from "lucide-react";
import type { MouseEvent } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type EnquiryItem, useEnquiry } from "./enquiry-provider";

type AddToEnquiryButtonProps = {
  item: EnquiryItem;
  className?: string;
  size?: "hero" | "quick" | "card";
};

export function AddToEnquiryButton({
  item,
  className,
  size = "hero",
}: AddToEnquiryButtonProps) {
  const { addItem, isSelected, openDrawer, recentlyAddedId } = useEnquiry();
  const selected = isSelected(item.id);
  const justAdded = recentlyAddedId === item.id;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (selected) {
      openDrawer();
      return;
    }

    addItem(item);
  };

  if (size === "quick") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={selected ? `${item.title} is in enquiry. Open enquiry drawer.` : `Add ${item.title} to enquiry`}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/92 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[#123c24] shadow-[0_10px_26px_rgba(7,20,12,0.16)] backdrop-blur transition-[background-color,border-color,box-shadow,color] duration-200 hover:border-[color-mix(in_srgb,var(--brand-accent)_30%,white)] hover:bg-white hover:text-brand-accent focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/70",
          selected && "border-[color-mix(in_srgb,var(--brand-accent)_28%,white)] text-brand-accent",
          className,
        )}
      >
        {selected ? <Check className="size-3.5" aria-hidden /> : <Plus className="size-3.5" aria-hidden />}
        {selected ? "Added" : "Quick add"}
      </button>
    );
  }

  if (size === "card") {
    return (
      <button
        type="button"
        onClick={handleClick}
        aria-label={selected ? `${item.title} is in enquiry. Open enquiry drawer.` : `Add ${item.title} to enquiry`}
        className={cn(
          "inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border px-4 py-2.5 text-[0.75rem] font-semibold uppercase tracking-[0.11em] shadow-[0_10px_24px_color-mix(in_srgb,var(--brand-green-950)_10%,transparent)] transition-[background-color,border-color,box-shadow,color] duration-200 ease-ds-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[color-mix(in_srgb,var(--brand-accent)_18%,transparent)]",
          selected
            ? "border-[color-mix(in_srgb,var(--brand-accent)_28%,var(--border))] bg-[color-mix(in_srgb,var(--brand-accent)_10%,white)] text-brand-accent shadow-none hover:border-[color-mix(in_srgb,var(--brand-accent)_42%,var(--border))] hover:bg-[color-mix(in_srgb,var(--brand-accent)_14%,white)]"
            : "border-[color-mix(in_srgb,var(--brand-green-900)_16%,transparent)] bg-brand-green-deep text-white hover:bg-brand-green-950 hover:text-white hover:shadow-[0_14px_30px_color-mix(in_srgb,var(--brand-green-950)_16%,transparent)]",
          className,
        )}
      >
        {selected ? null : <Plus className="size-3.5" aria-hidden />}
        {selected ? "✓ Added" : "Add to Enquiry"}
      </button>
    );
  }

  return (
    <Button
      type="button"
      size="lg"
      onClick={handleClick}
      aria-label={selected ? `${item.title} is in enquiry. Open enquiry drawer.` : `Add ${item.title} to enquiry`}
      className={cn(
        "min-h-12 rounded-full bg-white px-7 text-[0.8125rem] font-semibold uppercase tracking-[0.12em] text-[#123c24] shadow-[0_16px_38px_rgba(7,20,12,0.22)] hover:bg-white hover:text-brand-accent hover:shadow-[0_20px_48px_rgba(7,20,12,0.28)]",
        selected && "text-brand-accent",
        justAdded && "scale-[1.015]",
        className,
      )}
    >
      {selected ? <Check className="size-4" aria-hidden /> : <Plus className="size-4" aria-hidden />}
      {selected ? "Added ✓" : "Add to Enquiry"}
    </Button>
  );
}
