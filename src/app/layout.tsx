import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteShell } from "@/components/layout/site-shell";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDK Group",
  description: "Industrial packaging website built with Next.js and shadcn/ui.",
  icons: {
    icon: "/logo-white.png",
    shortcut: "/logo-white.png",
    apple: "/logo-white.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
 <body
  className={`bg-white ${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased`}
>
  <div className="min-h-screen flex flex-col">

    <div className="flex-1">
      <SiteShell>{children}</SiteShell>
    </div>

    <Footer />

  </div>

  <FloatingActions />
  <Toaster richColors />
</body>
    </html>
  );
}
