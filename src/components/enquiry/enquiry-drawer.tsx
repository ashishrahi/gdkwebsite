"use client";

import Image from "next/image";
import Link from "next/link";
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import {
  ArrowRight,
  ClipboardList,
  Layers3,
  PackageCheck,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { cn } from "@/lib/utils";
import { useEnquiry } from "./enquiry-provider";

function productCountLabel(count: number) {
  return `${count} ${count === 1 ? "product" : "products"}`;
}

export function EnquiryDrawer() {
  const {
    items,
    count,
    isDrawerOpen,
    recentlyAddedId,
    removeItem,
    clearItems,
    closeDrawer,
    setDrawerOpen,
    openEnquiryModal,
  } = useEnquiry();

  const handleProceedToEnquiry = () => {
    closeDrawer();
    openEnquiryModal();
  };

  return (
    <DialogPrimitive.Root open={isDrawerOpen} onOpenChange={setDrawerOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Backdrop
          className={cn(
            "fixed inset-0 z-80 bg-[#07140c]/35 backdrop-blur-[2px] transition-opacity duration-300 ease-ds-out",
            "data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
          )}
        />
        <DialogPrimitive.Popup
          className={cn(
            "fixed z-81 flex w-full flex-col bg-white text-ds-text-strong shadow-[0_24px_80px_rgba(7,20,12,0.20)] outline-none",
            "inset-x-0 bottom-0 max-h-[calc(100dvh-var(--ds-safe-area-top))] rounded-t-[1.75rem] border-t border-ds-border-subtle",
            "translate-y-full transition-transform duration-300 ease-ds-out data-open:translate-y-0 data-closed:translate-y-full",
            "md:inset-y-0 md:right-0 md:left-auto md:h-dvh md:max-h-none md:max-w-[460px] md:translate-x-full md:translate-y-0 md:rounded-none md:rounded-l-[1.75rem] md:border-t-0 md:border-l md:data-open:translate-x-0 md:data-closed:translate-x-full",
          )}
        >
          <div className="flex items-start justify-between gap-4 border-b border-ds-border-subtle px-5 py-5 sm:px-6">
            <div className="min-w-0 space-y-1.5">
              <DialogPrimitive.Title className="text-h3 text-ds-text-strong">
                Products in Enquiry
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="text-sm text-ds-text-muted">
                {count ? `${productCountLabel(count)} selected for sample or catalogue discussion.` : "Build a focused product enquiry as you browse."}
              </DialogPrimitive.Description>
            </div>
            <button
              type="button"
              onClick={closeDrawer}
              aria-label="Close enquiry drawer"
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ds-border-subtle bg-white text-ds-text-muted shadow-ds-card-subtle transition-colors hover:bg-ds-surface-muted hover:text-ds-text-strong"
            >
              <X className="size-4.5" aria-hidden />
            </button>
          </div>

          {count ? (
            <>
              <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-[color-mix(in_srgb,var(--brand-accent)_22%,var(--border))] bg-[color-mix(in_srgb,var(--brand-accent)_8%,white)] px-3 py-1.5 text-xs font-medium uppercase tracking-(--ds-type-label-letter-spacing) text-brand-accent">
                  <PackageCheck className="size-3.5" aria-hidden />
                  Enquiry basket
                </div>
                <button
                  type="button"
                  onClick={clearItems}
                  className="rounded-full px-3 py-1.5 text-xs font-medium text-ds-text-muted transition-colors hover:bg-ds-surface-muted hover:text-ds-text-strong"
                >
                  Clear all
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-5 sm:px-6">
                <ul className="space-y-3">
                  {items.map((item) => {
                    const isRecentlyAdded = recentlyAddedId === item.id;

                    return (
                      <li
                        key={item.id}
                        className={cn(
                          cardSurfaceVariants({ variant: "minimal" }),
                          "grid grid-cols-[5rem_1fr] gap-4 rounded-2xl bg-white p-3 transition-[border-color,box-shadow,transform] duration-300",
                          isRecentlyAdded &&
                            "border-[color-mix(in_srgb,var(--brand-accent)_42%,var(--border))] shadow-[0_16px_36px_color-mix(in_srgb,var(--brand-accent)_16%,transparent)]",
                        )}
                      >
                        <Link
                          href={item.href}
                          onClick={closeDrawer}
                          className="relative h-20 overflow-hidden rounded-xl bg-ds-surface-muted"
                          aria-label={`View ${item.title}`}
                        >
                          <Image
                            src={item.imageSrc}
                            alt={item.imageAlt}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </Link>

                        <div className="min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <Link
                                href={item.href}
                                onClick={closeDrawer}
                                className="block text-sm font-semibold leading-5 text-ds-text-strong transition-colors hover:text-brand-accent"
                              >
                                {item.title}
                              </Link>
                              <p className="mt-1 text-xs leading-5 text-ds-text-muted">
                                {item.category}
                                {item.subcategory ? ` / ${item.subcategory}` : null}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              aria-label={`Remove ${item.title} from enquiry`}
                              className="flex size-8 shrink-0 items-center justify-center rounded-full text-ds-text-subtle transition-colors hover:bg-[color-mix(in_srgb,var(--brand-red)_8%,white)] hover:text-(--brand-red)"
                            >
                              <Trash2 className="size-4" aria-hidden />
                            </button>
                          </div>
                          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-ds-surface-muted px-2.5 py-1 text-[11px] font-medium text-ds-text-muted">
                            <Layers3 className="size-3" aria-hidden />
                            {item.variantLabel ?? "Variant to be confirmed"}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="border-t border-ds-border-subtle bg-white/96 px-5 pb-[calc(1rem+var(--ds-safe-area-bottom))] pt-4 backdrop-blur sm:px-6">
                <div className="mb-4 flex items-center justify-between rounded-2xl bg-ds-surface-muted px-4 py-3">
                  <span className="text-sm font-medium text-ds-text-muted">Total selected products</span>
                  <span className="text-sm font-semibold text-ds-text-strong">{count}</span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={closeDrawer}
                    className="h-12 rounded-full"
                  >
                    Continue Browsing
                  </Button>
                  <Button
                    type="button"
                    onClick={handleProceedToEnquiry}
                    className="h-12 rounded-full"
                  >
                    Proceed to Enquiry
                    <ArrowRight className="size-4" aria-hidden />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex min-h-[min(34rem,70dvh)] flex-1 flex-col items-center justify-center px-6 py-12 text-center">
              <div className="relative mb-6 flex size-20 items-center justify-center rounded-3xl border border-[color-mix(in_srgb,var(--brand-accent)_18%,var(--border))] bg-[linear-gradient(135deg,color-mix(in_srgb,var(--brand-accent)_10%,white),white)] shadow-ds-card-subtle">
                <span className="absolute inset-3 rounded-2xl border border-white/80" aria-hidden />
                <ClipboardList className="relative size-9 text-brand-accent" aria-hidden />
              </div>
              <h2 className="text-h3 text-ds-text-strong">Select products to build your enquiry</h2>
              <p className="mt-3 max-w-xs text-body-sm text-ds-text-muted">
                Add samples or catalogue items and send one focused request to the GDK team.
              </p>
              <Button type="button" onClick={closeDrawer} className="mt-7 h-12 rounded-full px-7">
                Continue Browsing
              </Button>
            </div>
          )}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
