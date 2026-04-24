import type { ReactNode } from "react";
import { GlobalBreadcrumb } from "@/components/layout/global-breadcrumb";
import { Navbar } from "@/components/layout/navbar";

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <GlobalBreadcrumb />
      {children}
    </>
  );
}
