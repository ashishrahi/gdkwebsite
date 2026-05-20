"use client";

import { useCareerApply } from "@/components/career/career-apply-provider";
import type { CareerOpening } from "@/lib/data/careers";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type CareerApplyButtonProps = {
  opening?: CareerOpening | null;
  className?: string;
  children: ReactNode;
};

export function CareerApplyButton({
  opening,
  className,
  children,
}: CareerApplyButtonProps) {
  const { openApplyModal } = useCareerApply();

  return (
    <button
      type="button"
      className={cn(className)}
      onClick={() => openApplyModal(opening)}
    >
      {children}
    </button>
  );
}
