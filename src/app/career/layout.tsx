import type { ReactNode } from "react";

import { GlobalBreadcrumb } from "@/components/layout/global-breadcrumb";

const careerBreadcrumbCrumbs = [
  { href: "/", label: "Home" },
  { href: "/career", label: "Career" },
] as const;

export default function CareerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="ds-page-shell flex flex-col gap-10 lg:gap-12">
      <GlobalBreadcrumb crumbs={[...careerBreadcrumbCrumbs]} contained={false} />
      {children}
    </div>
  );
}
