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
  "w-full rounded-xl border border-slate-300 !bg-white px-4 text-base !text-neutral-900 shadow-sm",
  "placeholder:text-neutral-400 md:px-5 md:text-sm",
  "transition-[border-color,box-shadow,background-color] duration-200 ease-out",
  "focus-visible:border-[var(--secondary)] focus-visible:!bg-white focus-visible:ring-4",
  "focus-visible:ring-[color:color-mix(in_srgb,var(--secondary)_20%,white)]",
  "aria-invalid:border-red-500 aria-invalid:ring-4 aria-invalid:ring-red-500/20",
  "aria-invalid:focus-visible:border-red-500 aria-invalid:focus-visible:ring-4 aria-invalid:focus-visible:ring-red-500/25",
);

const contactInputClassName = cn(
  contactFieldBase,
  "min-h-[44px] py-3 md:h-14 md:min-h-0 md:py-0",
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
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="inline-flex h-9 items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white! transition-colors hover:bg-orange-600">
        Enquire Now
      </DialogTrigger>
      <DialogContent className="min-h-0 max-w-lg gap-0 rounded-3xl border border-slate-200/90 bg-white/95 px-6 py-6 text-base text-neutral-900 shadow-md backdrop-blur-sm ring-slate-200/90 sm:max-w-lg sm:px-8 sm:py-7 [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:!bg-transparent [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:!bg-none [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:!shadow-none [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:!border-0 [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:!text-slate-600 [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:hover:!bg-transparent">

        <DialogHeader className="space-y-1.5 text-left">
          <DialogTitle className="text-2xl font-semibold tracking-tight text-neutral-900">
            Enquiry for {productName}
          </DialogTitle>
          <DialogDescription className="text-sm leading-6 text-neutral-600">
            Share your details and our team will contact you shortly.
          </DialogDescription>
        </DialogHeader>

        <form className="mt-4 space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-1.5">
            <label htmlFor="enquiry-name" className="block text-sm font-semibold text-neutral-600">
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
              <p className="text-sm font-medium text-red-600" role="alert">
                {errors.name.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="enquiry-phone" className="block text-sm font-semibold text-neutral-600">
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
              <p className="text-sm font-medium text-red-600" role="alert">
                {errors.phone.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-1.5">
            <label htmlFor="enquiry-message" className="block text-sm font-semibold text-neutral-600">
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
              <p className="text-sm font-medium text-red-600" role="alert">
                {errors.message.message}
              </p>
            ) : null}
          </div>

          <DialogFooter className="mx-0 mb-0 mt-0 flex flex-col gap-0 border-0 bg-transparent p-0 pt-1 shadow-none sm:flex-row sm:justify-end">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 w-full rounded-xl px-6 text-sm font-semibold shadow-[0_8px_22px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition-[transform,box-shadow,opacity] duration-200 ease-out hover:shadow-[0_10px_26px_color-mix(in_srgb,var(--primary)_36%,transparent)] active:translate-y-px disabled:shadow-none md:h-11"
            >
              {isSubmitting ? "Sending..." : "Send Enquiry"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
