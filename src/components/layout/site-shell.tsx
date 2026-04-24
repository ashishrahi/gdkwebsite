"use client";

import React from "react";

export function SiteShell({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full bg-white text-slate-900">{children}</div>;
}
