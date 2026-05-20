import type { ReactNode } from "react";

import { GlobalBreadcrumb } from "@/components/layout/global-breadcrumb";

const careerBreadcrumbCrumbs = [
  { href: "/", label: "Home" },
  { href: "/career", label: "Career" },
] as const;

export default function CareerLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GlobalBreadcrumb crumbs={[...careerBreadcrumbCrumbs]} />
      {children}
    </>
  );
}
