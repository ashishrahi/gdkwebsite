"use client";

import { CareerApplyModal } from "@/components/career/career-apply-modal";
import { CareerApplyProvider } from "@/components/career/career-apply-provider";
import type { ReactNode } from "react";

type CareerPageShellProps = {
  children: ReactNode;
};

export function CareerPageShell({ children }: CareerPageShellProps) {
  return (
    <CareerApplyProvider>
      {children}
      <CareerApplyModal />
    </CareerApplyProvider>
  );
}
