import Link from "next/link";
import { Briefcase, Camera, Mail, MapPin, Phone, Send } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/contact", label: "Contact" },
];

const productLinks = [
  { href: "/products", label: "LDPE Bags" },
  { href: "/products", label: "HDPE Rolls" },
  { href: "/products", label: "Packaging Films" },
  { href: "/products", label: "Industrial Packaging" },
];

const socialLinks = [
  { href: "#", label: "Twitter", icon: Send },
  { href: "#", label: "LinkedIn", icon: Briefcase },
  { href: "#", label: "Instagram", icon: Camera },
];

export function Footer() {
  return (
    <footer
      id="contact"
      className="mt-auto border-t border-white/15 bg-[#12171c] text-slate-100"
      aria-label="Site footer"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-y-12 px-6 py-12 sm:px-8 md:gap-x-12 lg:grid-cols-4 lg:gap-x-14 lg:px-10 lg:py-14">
        <div className="space-y-6">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-10 min-w-10 items-center justify-center rounded-md border border-[#f26a21]/45 bg-[#f26a21]/10 px-2 text-sm font-extrabold tracking-[0.18em] text-[#f26a21]">
              GDK
            </span>
            <span className="text-base font-semibold tracking-tight text-white">Packaging</span>
          </Link>
          <p className="max-w-xs text-sm leading-7 text-slate-300/95">
            Delivering reliable industrial packaging solutions engineered for strength, consistency,
            and long-term supply confidence.
          </p>
          <div className="flex items-center gap-3">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                  className="inline-flex size-9 items-center justify-center rounded-md border border-white/20 bg-white/10 text-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#f26a21]/55 hover:bg-[#f26a21]/14 hover:text-[#f26a21]"
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Quick Links</h3>
          <ul className="space-y-4 text-sm">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-slate-300/95 transition-colors duration-200 hover:text-[#f26a21]"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Products</h3>
          <ul className="space-y-4 text-sm">
            {productLinks.map((product) => (
              <li key={product.label}>
                <Link
                  href={product.href}
                  className="text-slate-300/95 transition-colors duration-200 hover:text-[#f26a21]"
                >
                  {product.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-white">Contact Info</h3>
          <ul className="space-y-4.5 text-sm leading-7 text-slate-300/95">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#2f8f83]" />
              <span>Plot 18, Industrial Estate, Howrah, West Bengal 711101</span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-[#f26a21]" />
              <a className="text-slate-300/95 transition-colors duration-200 hover:text-[#f26a21]" href="tel:+919876543210">
                +91 98765 43210
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-[#2f8f83]" />
              <a
                className="text-slate-300/95 transition-colors duration-200 hover:text-[#f26a21]"
                href="mailto:sales@gdkpackaging.com"
              >
                sales@gdkpackaging.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/12">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 text-xs leading-6 text-slate-300/80 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <p className="m-0">© {new Date().getFullYear()} GDK Packaging. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-400">
            <Link href="#" className="transition-colors duration-200 hover:text-[#f26a21]">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors duration-200 hover:text-[#f26a21]">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
