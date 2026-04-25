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
  { href: "/#products", label: "LDPE Bags" },
  { href: "/#products", label: "HDPE Rolls" },
  { href: "/#products", label: "Packaging Films" },
  { href: "/#products", label: "Industrial Packaging" },
];

const companyLinks = [
  { href: "/", label: "Gdk Solutions" },
  { href: "/", label: "K.B.Ropes Pvt Ltd" },
  { href: "/#contact", label: "Enquiry" },
];

const legalLinks = [
  { href: "/", label: "Privacy" },
  { href: "/", label: "Terms" },
  { href: "/", label: "Sitemap" },
];

const socialLinks = [
  { href: "https://www.facebook.com", label: "Facebook", icon: FaFacebookF, hoverClass: "hover:text-[#1877F2]" },
  { href: "https://www.instagram.com", label: "Instagram", icon: FaInstagram, hoverClass: "hover:text-[#E4405F]" },
  { href: "https://www.linkedin.com", label: "LinkedIn", icon: FaLinkedinIn, hoverClass: "hover:text-[#0A66C2]" },
  { href: "https://www.youtube.com", label: "YouTube", icon: FaYoutube, hoverClass: "hover:text-[#FF0000]" },
  { href: "https://wa.me/919889271007", label: "WhatsApp", icon: FaWhatsapp, hoverClass: "hover:text-[#25D366]" },
];

export function Footer() {
  return (
    <footer id="site-footer" className="bg-[#f8f8f6] text-slate-900" aria-label="Site footer">
      <div className="border-y border-slate-200 bg-white">
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
          <p className="text-sm text-slate-600">
            Built for quality and industrial growth
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-7xl px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-900">
              <Briefcase className="h-[18px] w-[18px] text-[var(--brand-accent)]" />
              Company Info
            </h3>
            <div className="space-y-2 text-sm leading-7 text-slate-600">
              <p className="text-base font-semibold text-slate-900">GDK Packaging</p>
              <p>26/59 Birhana Road</p>
              <p>Kanpur - 208001</p>
            </div>
            <div className="space-y-2 text-sm text-slate-600">
              <a
                href="mailto:info@gdk.co.in"
                className="inline-flex items-center gap-2 transition-colors hover:text-slate-900"
              >
                <Mail className="size-4" />
                info@gdk.co.in
              </a>
              <a
                href="tel:+919889271007"
                className="inline-flex items-center gap-2 transition-colors hover:text-slate-900"
              >
                <Phone className="size-4 text-[var(--brand-accent)]" />
                +91 9889271007
              </a>
              <a
                href="tel:+919889449000"
                className="inline-flex items-center gap-2 transition-colors hover:text-slate-900"
              >
                <Phone className="size-4 text-[var(--brand-accent)]" />
                +91 9889449000
              </a>
            </div>
            <div className="text-sm leading-7 text-slate-600">
              <p className="font-medium text-slate-900">Business Hours:</p>
              <p>Mon - Sat : 10AM - 7PM</p>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-900">
              <Layers className="h-[18px] w-[18px] text-[var(--brand-accent)]" />
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-900">
              <Package className="h-[18px] w-[18px] text-[var(--brand-accent)]" />
              Products
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {products.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-900">
              <Globe className="h-[18px] w-[18px] text-[var(--brand-accent)]" />
              Company
            </h3>
            <ul className="space-y-3 text-sm text-slate-600">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--brand-accent)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-900">
              <MapPin className="h-[18px] w-[18px] text-[var(--brand-accent)]" />
              Google Map
            </h3>
            <div className="overflow-hidden rounded-xl border border-slate-200">
              <iframe
                title="GDK Office Location"
                src="https://www.google.com/maps?q=26/59%20Birhana%20Road,%20Kanpur%20-%20208001&output=embed"
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-6 px-6 py-8 sm:px-8 md:flex-row lg:px-10">
          <p className="text-sm text-slate-600">© 2024 GDK Packaging</p>

          <div className="flex items-center gap-3">
            {socialLinks.map(({ href, label, icon: Icon, hoverClass }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className={`inline-flex size-9 sm:size-10 items-center justify-center rounded-full border border-slate-200/90 bg-white text-slate-600 shadow-sm transition-all duration-300 hover:scale-105 hover:border-slate-300 ${hoverClass}`}
              >
                <Icon className="size-4 sm:size-[17px]" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5 text-sm text-slate-600">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="transition-colors hover:text-slate-900"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
