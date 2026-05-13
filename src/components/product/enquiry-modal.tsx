"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { useSendLead } from "@/hooks/useSendLead";
import { cn } from "@/lib/utils";

type EnquiryModalProps = {
  productName: string;
};

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

export function EnquiryModal({ productName }: EnquiryModalProps) {
  const { sendLead } = useSendLead();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
    },
  });

  const onSubmit = async (values: EnquiryFormValues) => {
    try {
      await sendLead({
        ...values,
        productName,
        type: "ENQUIRY",
      });
      toast.success("Enquiry submitted");
      reset();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-11.5 items-center justify-center rounded-full bg-brand-accent px-6 text-[0.8125rem] font-medium tracking-(--ds-type-label-letter-spacing) text-white! transition-colors hover:bg-brand-accent-hover">
        Enquire Now
      </DialogTrigger>
      <DialogContent className={cn(cardSurfaceVariants({ variant: "elevated" }), "min-h-0 max-w-lg gap-0 rounded-ds-card-lg bg-white/95 px-6 py-7 text-base text-ds-text-strong backdrop-blur-sm ring-[color-mix(in_srgb,var(--brand-blue-500)_28%,transparent)] sm:max-w-lg sm:px-8 sm:py-8 [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:bg-transparent! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:bg-none! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:shadow-none! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:border-0! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:text-ds-text-muted! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:hover:bg-transparent!")}>

        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-h3 text-ds-text-strong">
            Enquiry for {productName}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-ds-text-muted">
            Share your details and our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <div className="space-y-2">
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

          <DialogFooter className="mx-0 mb-0 mt-1 flex flex-col gap-0 border-0 bg-transparent p-0 pt-2 shadow-none sm:flex-row sm:justify-end">
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
