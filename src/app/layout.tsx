import type { Metadata } from "next";
import { Jost } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { SiteShell } from "@/components/layout/site-shell";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="en" className={jost.variable}>
      <body className="scroll-smooth bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-screen flex-col">
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
