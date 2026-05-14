"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Trash2 } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  type EnquiryItem,
  useEnquiry,
} from "@/components/enquiry/enquiry-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { useSendLead } from "@/hooks/useSendLead";
import { cn } from "@/lib/utils";

const enquirySchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phone: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Phone must contain at least 10 digits",
    }),
  message: z.string().optional(),
});

type EnquiryFormValues = z.infer<typeof enquirySchema>;

const contactFieldBase = cn(
  "w-full rounded-xl border border-input !bg-white px-4 text-base !text-ds-text-strong shadow-sm",
  "placeholder:text-ds-text-subtle md:px-5 md:text-sm",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
  "focus-visible:border-ring focus-visible:!bg-white focus-visible:ring-4",
  "focus-visible:ring-[color:color-mix(in_srgb,var(--ring)_22%,transparent)]",
  "aria-invalid:border-[var(--brand-red)] aria-invalid:ring-4 aria-invalid:ring-[color:color-mix(in_srgb,var(--brand-red)_18%,transparent)]",
  "aria-invalid:focus-visible:border-[var(--brand-red)] aria-invalid:focus-visible:ring-4 aria-invalid:focus-visible:ring-[color:color-mix(in_srgb,var(--brand-red)_22%,transparent)]",
);

const contactInputClassName = cn(
  contactFieldBase,
  "min-h-[48px] py-3 md:h-14 md:min-h-0 md:py-0",
);

const contactTextareaClassName = cn(
  contactFieldBase,
  "min-h-[112px] resize-none py-2.5 sm:min-h-[128px] sm:py-3",
);

const modalScrollbarClassName = cn(
  "scroll-smooth [scrollbar-width:thin]",
  "[scrollbar-color:color-mix(in_srgb,var(--brand-blue-500)_34%,transparent)_transparent]",
  "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[color-mix(in_srgb,var(--brand-blue-500)_28%,transparent)]",
);

function getCategoryLine(item: EnquiryItem) {
  return item.subcategory ? `${item.category} / ${item.subcategory}` : item.category;
}

function getVariantText(item: EnquiryItem) {
  if (item.variants?.length) return item.variants.join(", ");
  return item.variantLabel;
}

function getSelectedProductsMessage(items: EnquiryItem[]) {
  if (!items.length) return "";

  const productLines = items
    .map((item) => {
      const variantText = getVariantText(item);
      const details = [
        getCategoryLine(item),
        variantText ? `Variants: ${variantText}` : null,
      ]
        .filter(Boolean)
        .join("; ");

      return `- ${item.title}${details ? ` (${details})` : ""}`;
    })
    .join("\n");

  return `Selected enquiry products:\n${productLines}\n\nRequirement notes:\n`;
}

export function EnquiryModal() {
  const { sendLead } = useSendLead();
  const {
    items: enquiryItems,
    isEnquiryModalOpen,
    setEnquiryModalOpen,
    removeItem,
    clearItems,
    closeDrawer,
  } = useEnquiry();
  const lastAutoMessageRef = useRef("");
  const selectedProductNames = useMemo(
    () => enquiryItems.map((item) => item.title).join(", "),
    [enquiryItems],
  );
  const selectedProductsMessage = useMemo(
    () => getSelectedProductsMessage(enquiryItems),
    [enquiryItems],
  );
  const enquiryTitle = enquiryItems.length === 1
    ? enquiryItems[0].title
    : `${enquiryItems.length || "selected"} products`;

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  useEffect(() => {
    if (!isEnquiryModalOpen) return;

    const currentMessage = getValues("message") ?? "";
    if (currentMessage.trim() && currentMessage !== lastAutoMessageRef.current) {
      return;
    }

    setValue("message", selectedProductsMessage, {
      shouldDirty: false,
      shouldValidate: false,
    });
    lastAutoMessageRef.current = selectedProductsMessage;
  }, [getValues, isEnquiryModalOpen, selectedProductsMessage, setValue]);

  const onSubmit = async (values: EnquiryFormValues) => {
    try {
      await sendLead({
        ...values,
        message: values.message?.trim() ? values.message : selectedProductsMessage,
        productName: selectedProductNames || "General enquiry",
        type: "ENQUIRY",
      });
      toast.success("Enquiry submitted");
      setEnquiryModalOpen(false);
      closeDrawer();
      clearItems();
      reset({
        name: "",
        phone: "",
        message: "",
      });
      reset();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={isEnquiryModalOpen} onOpenChange={setEnquiryModalOpen}>
      <DialogContent className={cn(cardSurfaceVariants({ variant: "elevated" }), "fixed top-[calc(50dvh+(var(--ds-safe-area-top)-var(--ds-safe-area-bottom))/2)] flex min-h-0 max-h-[calc(100dvh-1rem-var(--ds-safe-area-top)-var(--ds-safe-area-bottom))] w-[calc(100%-1rem)] max-w-152 flex-col gap-0 overflow-hidden rounded-ds-card-lg bg-white/95 p-0 text-base text-ds-text-strong backdrop-blur-sm ring-[color-mix(in_srgb,var(--brand-blue-500)_28%,transparent)] sm:max-h-[calc(100dvh-3rem-var(--ds-safe-area-top)-var(--ds-safe-area-bottom))] sm:w-full sm:max-w-152 [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:bg-transparent! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:bg-none! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:shadow-none! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:border-0! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:text-ds-text-muted! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:hover:bg-transparent!")}>

        <DialogHeader className="shrink-0 space-y-2 border-b border-ds-border-subtle px-5 pb-4 pt-6 pr-14 text-left sm:px-8 sm:pb-5 sm:pt-8 sm:pr-16">
          <DialogTitle className="text-h3 text-ds-text-strong">
            Enquiry for {enquiryTitle}
          </DialogTitle>
          <DialogDescription className="text-body-sm text-ds-text-muted">
            Share your details and our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        <form className="flex min-h-0 flex-1 flex-col overflow-hidden" onSubmit={handleSubmit(onSubmit)}>
          <div className={cn("min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6", modalScrollbarClassName)}>
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-2.5">
                <p id="enquiry-products-label" className="block text-sm font-medium tracking-[0.02em] text-ds-text-muted">
                  Selected products
                </p>
                {enquiryItems.length ? (
                  <ul
                    aria-labelledby="enquiry-products-label"
                    className={cn(
                      "max-h-[clamp(6.5rem,20dvh,11rem)] space-y-2 overflow-y-auto overscroll-contain rounded-2xl border border-ds-border-subtle bg-white/70 p-2 pr-2.5",
                      modalScrollbarClassName,
                    )}
                  >
                    {enquiryItems.map((item) => {
                      const variantText = getVariantText(item);

                      return (
                        <li
                          key={item.id}
                          className="flex items-start justify-between gap-3 rounded-xl bg-ds-surface-muted px-3 py-2.5"
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-semibold leading-5 text-ds-text-strong">
                              {item.title}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-ds-text-muted">
                              {getCategoryLine(item)}
                            </p>
                            {variantText ? (
                              <p className="mt-1 text-xs leading-5 text-ds-text-muted">
                                Variants: {variantText}
                              </p>
                            ) : null}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            aria-label={`Remove ${item.title} from enquiry`}
                            className="flex size-8 shrink-0 items-center justify-center rounded-full text-ds-text-subtle transition-colors hover:bg-[color-mix(in_srgb,var(--brand-red)_8%,white)] hover:text-(--brand-red)"
                          >
                            <Trash2 className="size-4" aria-hidden />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="rounded-2xl border border-ds-border-subtle bg-ds-surface-muted px-4 py-3 text-sm leading-6 text-ds-text-muted">
                    No products selected. Add products to build your enquiry.
                  </p>
                )}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="enquiry-name" className="block text-sm font-medium tracking-[0.02em] text-ds-text-muted">
                  Name
                </label>
                <Input
                  id="enquiry-name"
                  placeholder="Your full name"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.name)}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="text-sm font-medium text-(--brand-red)" role="alert">
                    {errors.name.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="enquiry-phone" className="block text-sm font-medium tracking-[0.02em] text-ds-text-muted">
                  Phone
                </label>
                <Input
                  id="enquiry-phone"
                  placeholder="+91 98894 71453"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="text-sm font-medium text-(--brand-red)" role="alert">
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="enquiry-message" className="block text-sm font-medium tracking-[0.02em] text-ds-text-muted">
                  Message
                </label>
                <Textarea
                  id="enquiry-message"
                  placeholder="Tell us your quantity, timeline, and packaging requirements."
                  className={contactTextareaClassName}
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
                {errors.message ? (
                  <p className="text-sm font-medium text-(--brand-red)" role="alert">
                    {errors.message.message}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <DialogFooter className="mx-0 mb-0 flex shrink-0 flex-col gap-0 rounded-none border-x-0 border-b-0 border-t border-ds-border-subtle bg-white/95 px-5 pb-[calc(1rem+var(--ds-safe-area-bottom))] pt-4 shadow-none backdrop-blur sm:flex-row sm:justify-end sm:px-8 sm:pb-6 sm:pt-5">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-12.5 w-full rounded-full px-8 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) shadow-(--ds-shadow-submit) transition-[transform,box-shadow,opacity] duration-200 ease-out hover:shadow-(--ds-shadow-submit-hover) active:translate-y-px disabled:shadow-none"
            >
              {isSubmitting ? "Sending..." : "Send Enquiry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
