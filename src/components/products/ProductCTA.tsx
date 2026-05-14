"use client";

<<<<<<< Updated upstream
=======
import { EnquiryModal } from "@/components/product/enquiry-modal";
>>>>>>> Stashed changes
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import type { ProductCta } from "@/lib/products-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

const CONTACT_PRIMARY_HREF = "/contact#contact-form";

function getContactFormSectionEl(): HTMLElement | null {
  return (
    document.getElementById("contact-form") ??
    document.querySelector<HTMLElement>("main form.contact-form")
  );
}

function scheduleScrollToContactForm(): void {
  let attempts = 0;
  const maxAttempts = 80;
  const id = window.setInterval(() => {
    attempts += 1;
    const el = getContactFormSectionEl();
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      window.clearInterval(id);
      return;
    }
    if (attempts >= maxAttempts) {
      window.clearInterval(id);
    }
  }, 50);
}

function isModifiedClick(e: React.MouseEvent<HTMLAnchorElement>) {
  const native = e.nativeEvent;
  return (
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey ||
    native.button === 1 ||
    (typeof native.which === "number" && native.which === 2)
  );
}

type ProductCTAProps = {
  productTitle: string;
  cta: ProductCta;
};

export function ProductCTA({ productTitle, cta }: ProductCTAProps) {
  const whatsappMessage = encodeURIComponent(
    `Hi GDK team, I need details for ${productTitle}. Please share pricing and MOQ.`,
  );

  return (
    <section className={cn(cardSurfaceVariants({ variant: "gradient" }), "p-6 sm:p-7")}>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <h2 className="text-h3 text-ds-text-strong">
            {cta.title}
          </h2>
<<<<<<< Updated upstream
          <p className="max-w-2xl text-body-sm text-ds-text-muted">
            {cta.description}
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap lg:justify-end">
=======
          <p className="max-w-2xl text-sm leading-6 text-ds-text-muted">
            {cta.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
>>>>>>> Stashed changes
          <Link
            href={CONTACT_PRIMARY_HREF}
            scroll={false}
            onClick={(e) => {
              if (isModifiedClick(e)) return;
              scheduleScrollToContactForm();
            }}
<<<<<<< Updated upstream
            className="inline-flex min-h-11.5 w-full items-center justify-center rounded-full bg-brand-accent px-6 py-2.5 text-center text-[0.8125rem] font-medium tracking-(--ds-type-label-letter-spacing) text-white! transition-colors hover:bg-brand-accent-hover sm:w-auto"
=======
            className="inline-flex h-11 items-center rounded-lg bg-[var(--brand-accent)] px-5 text-sm font-semibold text-white! transition-colors hover:bg-[var(--brand-accent-hover)]"
>>>>>>> Stashed changes
          >
            {cta.primaryLabel}
          </Link>
          <Link
            href="/contact"
<<<<<<< Updated upstream
            className="inline-flex min-h-11.5 w-full items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--brand-blue-500)_34%,var(--border))] bg-white px-6 py-2.5 text-center text-[0.8125rem] font-medium tracking-(--ds-type-label-letter-spacing) text-(--primary) transition-colors hover:border-brand-blue hover:bg-accent sm:w-auto"
=======
            className="inline-flex h-11 items-center rounded-lg border border-[color:color-mix(in_srgb,var(--brand-blue-500)_34%,var(--border))] bg-white px-5 text-sm font-semibold text-[var(--primary)] transition-colors hover:border-brand-blue hover:bg-accent"
>>>>>>> Stashed changes
          >
            {cta.secondaryLabel}
          </Link>
          <a
            href={`https://wa.me/?text=${whatsappMessage}`}
            target="_blank"
            rel="noreferrer"
<<<<<<< Updated upstream
            className="inline-flex min-h-11.5 w-full items-center justify-center gap-2 rounded-full border border-ds-whatsapp bg-white px-6 py-2.5 text-center text-[0.8125rem] font-medium tracking-(--ds-type-label-letter-spacing) text-ds-whatsapp transition-colors hover:bg-ds-whatsapp hover:text-white sm:w-auto"
=======
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--ds-color-whatsapp)] bg-white px-5 text-sm font-semibold text-[var(--ds-color-whatsapp)] transition-colors hover:bg-[var(--ds-color-whatsapp)] hover:text-white"
>>>>>>> Stashed changes
          >
            <FaWhatsapp className="size-4 shrink-0" />
            {cta.whatsappLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
