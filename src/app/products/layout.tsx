import type { ReactNode } from "react";
import { GlobalBreadcrumb } from "@/components/layout/global-breadcrumb";
import { Navbar } from "@/components/layout/navbar";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="ds-container flex flex-col gap-6 pt-(--ds-space-page-top) pb-ds-section-y lg:gap-8">
        <GlobalBreadcrumb contained={false} />
        {children}
      </div>
    </>
  );
}
