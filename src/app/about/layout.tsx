import type { ReactNode } from "react";

import { GlobalBreadcrumb } from "@/components/layout/global-breadcrumb";

const aboutBreadcrumbCrumbs = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#kb-ropes", label: "K.B. Ropes" },
] as const;

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalBreadcrumb crumbs={[...aboutBreadcrumbCrumbs]} />
      {children}
    </>
  );
}
