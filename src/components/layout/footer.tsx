import Link from "next/link";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp, FaYoutube } from "react-icons/fa";
import {
  ArrowRight,
  Briefcase,
  Globe,
  Layers,
  Mail,
  MapPin,
  Package,
  Phone,
} from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#about", label: "About" },
  { href: "/#products", label: "Products" },
  { href: "/#industries", label: "Industries" },
  { href: "/#contact", label: "Contact" },
];

const products = [
  { href: "/#products", label: "ESD Trays" },
  { href: "/#products", label: "PP Containers" },
  { href: "/#products", label: "PET Containers" },
  { href: "/#products", label: "IML Sweet Boxes" },
  { href: "/#products", label: "Printed Products" },
];

const companyLinks = [
  { href: "/", label: "GDK Solutions" },
  { href: "/", label: "K.B.Ropes Pvt Ltd" },
  { href: "/#contact", label: "Enquiry" },
];

const legalLinks = [
  { href: "/", label: "Privacy" },
  { href: "/", label: "Terms" },
  { href: "/", label: "Sitemap" },
];

const socialLinks = [
  { href: "https://www.facebook.com", label: "Facebook", icon: FaFacebookF },
  { href: "https://www.instagram.com", label: "Instagram", icon: FaInstagram },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: FaLinkedinIn },
  { href: "https://www.youtube.com", label: "YouTube", icon: FaYoutube },
  { href: "https://wa.me/919889271007", label: "WhatsApp", icon: FaWhatsapp },
];

export function Footer() {
  return (
    <footer id="site-footer" className="bg-black w-full shrink-0">

      {/* TOP STRIP */}
      <div className="border-y border-black/20 bg-white text-black">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-5 px-6 py-4 sm:px-8 lg:px-10">
          <Link href="/" className="inline-flex items-center">
            <Image
              src="/logo-white.png"
              alt="GDK Packaging"
              width={190}
              height={52}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>
          <p className="text-base text-white">
            Built for quality and industrial growth
          </p>
        </div>
      </div>


      {/* BLACK HERO SECTION */}
      <div className="relative bg-black text-white overflow-hidden">

        {/* GLOW */}
        <div className="pointer-events-none absolute right-[18%] top-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-white/5 blur-[120px] rounded-full z-0" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-5">

        <div className="grid grid-cols-2 items-center gap-6 lg:flex lg:flex-row lg:justify-between">

            {/* LOGO */}
            <Image
              src="/logo-white1.webp"
              alt="GDK Packaging"
              width={250}
              height={170}
              className="object-contain w-[180px] sm:w-[220px] md:w-[250px] h-auto"
            />

            {/* TEXT */}
            <div className="flex-1 flex justify-end mt-20">
              <h2 className="relative z-20 text-right font-[300] text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">

                <span className="block text-[34px] sm:text-[48px] md:text-[72px] lg:text-[72px] leading-tight">
                  Sustainable Packaging
                </span>

                <span className="block text-[34px] sm:text-[48px] md:text-[72px] lg:text-[72px] leading-tight">
                  Solutions
                </span>

              </h2>
            </div>
          </div>

          {/* BOTTOM */}
          <div className="mt-10 flex flex-col md:flex-row items-center justify-between">

            {/* SOCIAL */}
            <div className="flex items-center gap-6">
              {socialLinks.map(({ href, label, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer">
                  <Icon className="size-5 text-white hover:scale-110 transition" />
                </a>
              ))}
            </div>

            {/* COPYRIGHT */}
            <div className="text-sm text-white/80 mt-4 md:mt-0">
              © 2026 GDK Packaging Pvt. Ltd.
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}