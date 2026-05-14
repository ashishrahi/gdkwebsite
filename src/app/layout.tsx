<<<<<<< Updated upstream
import type { Metadata, Viewport } from "next";
import { Jost } from "next/font/google";
import { EnquiryDrawer } from "@/components/enquiry/enquiry-drawer";
import { EnquiryProvider } from "@/components/enquiry/enquiry-provider";
=======
import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
>>>>>>> Stashed changes
import { Footer } from "@/components/layout/footer";
import { FloatingActions } from "@/components/layout/floating-actions";
import { EnquiryModal } from "@/components/product/enquiry-modal";
import { SiteShell } from "@/components/layout/site-shell";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

<<<<<<< Updated upstream
const jost = Jost({
  variable: "--font-jost",
=======
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
>>>>>>> Stashed changes
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#f3efe7",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< Updated upstream
    <html lang="en" className={jost.variable}>
      <body className="scroll-smooth bg-background font-sans text-foreground antialiased">
        <EnquiryProvider>
          <div className="flex min-h-dvh flex-col">
            <div className="flex-1">
              <SiteShell>{children}</SiteShell>
            </div>

            <Footer />
          </div>

          <FloatingActions />
          <EnquiryDrawer />
          <EnquiryModal />
          <Toaster richColors />
        </EnquiryProvider>
=======
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} scroll-smooth bg-background font-sans text-foreground antialiased`}
      >
        <div className="flex min-h-screen flex-col">
          <div className="flex-1">
            <SiteShell>{children}</SiteShell>
          </div>

          <Footer />
        </div>

        <FloatingActions />
        <Toaster richColors />
>>>>>>> Stashed changes
      </body>
    </html>
  );
}
