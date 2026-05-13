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
  const isHomeRoute = pathname === "/";

  return (
    <div className="w-full bg-background text-foreground">
      {!isProductsRoute ? <Navbar homeVariant={isHomeRoute} /> : null}
      {children}
    </div>
  );
}
