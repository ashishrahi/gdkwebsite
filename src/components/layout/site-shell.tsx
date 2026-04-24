"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isProductsRoute = pathname.startsWith("/products");

  return (
    <div className="w-full bg-white text-slate-900">
      {!isProductsRoute ? <Navbar /> : null}
      {children}
    </div>
  );
}
