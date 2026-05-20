"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Upload, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { useCareerApply } from "@/components/career/career-apply-provider";
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
import { cardSurfaceVariants } from "@/design-system/shadcn/card.variants";
import { formPatternClassNames } from "@/design-system/patterns/forms";
import { useSendLead } from "@/hooks/useSendLead";
import { cn } from "@/lib/utils";

const ACCEPTED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

const ACCEPTED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

const MAX_RESUME_SIZE_BYTES = 5 * 1024 * 1024;

const careerApplicationSchema = z.object({
  name: z.string().trim().min(1, "Full name is required"),
  email: z.string().trim().email("Enter a valid email"),
  mobile: z
    .string()
    .trim()
    .refine((value) => value.replace(/\D/g, "").length >= 10, {
      message: "Mobile number must contain at least 10 digits",
    }),
  designation: z.string().trim().min(1, "Designation is required"),
});

type CareerApplicationFormValues = z.infer<typeof careerApplicationSchema>;

const contactFieldBase = cn(
  formPatternClassNames.enquiryFieldBase,
  "shadow-sm",
);

const contactInputClassName = cn(
  contactFieldBase,
  formPatternClassNames.contactInput,
);

const fieldLabelClassName =
  "block text-sm font-medium tracking-[0.02em] text-ds-text-muted";

const modalScrollbarClassName = cn(
  "scroll-smooth [scrollbar-width:thin]",
  "[scrollbar-color:color-mix(in_srgb,var(--brand-blue-500)_34%,transparent)_transparent]",
  "[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent",
  "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[color-mix(in_srgb,var(--brand-blue-500)_28%,transparent)]",
);

function isAcceptedResumeFile(file: File) {
  const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
  return (
    ACCEPTED_RESUME_TYPES.includes(
      file.type as (typeof ACCEPTED_RESUME_TYPES)[number],
    ) || ACCEPTED_RESUME_EXTENSIONS.includes(
      extension as (typeof ACCEPTED_RESUME_EXTENSIONS)[number],
    )
  );
}

function validateResumeFile(file: File | null): string | null {
  if (!file) return "Resume is required";

  if (!isAcceptedResumeFile(file)) {
    return "Please upload a PDF, DOC, or DOCX file";
  }

  if (file.size > MAX_RESUME_SIZE_BYTES) {
    return "Resume must be 5 MB or smaller";
  }

  return null;
}

export function CareerApplyModal() {
  const { sendLead } = useSendLead();
  const { isOpen, selectedOpening, setApplyModalOpen } = useCareerApply();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CareerApplicationFormValues>({
    resolver: zodResolver(careerApplicationSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      designation: "",
    },
  });

  const resetForm = useCallback(() => {
    reset({
      name: "",
      email: "",
      mobile: "",
      designation: "",
    });
    setResumeFile(null);
    setResumeError(null);
    setIsDragging(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [reset]);

  useEffect(() => {
    if (!isOpen) return;

    setValue("designation", selectedOpening?.title ?? "", {
      shouldDirty: false,
      shouldValidate: false,
    });
  }, [isOpen, selectedOpening, setValue]);

  const handleOpenChange = (open: boolean) => {
    setApplyModalOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleResumeSelection = (file: File | null) => {
    const validationMessage = validateResumeFile(file);
    setResumeFile(file);
    setResumeError(validationMessage);
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    handleResumeSelection(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files?.[0] ?? null;
    handleResumeSelection(file);
  };

  const removeResume = () => {
    handleResumeSelection(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (values: CareerApplicationFormValues) => {
    const resumeValidationMessage = validateResumeFile(resumeFile);
    if (resumeValidationMessage) {
      setResumeError(resumeValidationMessage);
      return;
    }

    const openingDetails = selectedOpening
      ? [
          `Role: ${selectedOpening.title}`,
          `Department: ${selectedOpening.department}`,
          `Location: ${selectedOpening.location}`,
        ].join("\n")
      : "Role: General application";

    const message = [
      "Career Application",
      "",
      openingDetails,
      `Designation: ${values.designation}`,
      `Resume: ${resumeFile?.name ?? ""}`,
    ].join("\n");

    try {
      await sendLead({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        productName: values.designation,
        message,
        type: "CAREER",
      });
      toast.success("Application submitted successfully");
      setApplyModalOpen(false);
      resetForm();
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          cardSurfaceVariants({ variant: "elevated" }),
          "fixed top-[calc(50dvh+(var(--ds-safe-area-top)-var(--ds-safe-area-bottom))/2)] flex min-h-0 max-h-[calc(100dvh-1rem-var(--ds-safe-area-top)-var(--ds-safe-area-bottom))] w-[calc(100%-1rem)] max-w-152 flex-col gap-0 overflow-hidden rounded-ds-card-lg bg-white/95 p-0 text-base text-ds-text-strong backdrop-blur-sm ring-[color-mix(in_srgb,var(--brand-blue-500)_28%,transparent)] sm:max-h-[calc(100dvh-3rem-var(--ds-safe-area-top)-var(--ds-safe-area-bottom))] sm:w-full sm:max-w-152 [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:border-0! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:bg-transparent! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:bg-none! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:text-ds-text-muted! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:shadow-none! [&_[data-radix-dialog-close],&_[data-slot='dialog-close']]:hover:bg-transparent!",
        )}
      >
        <DialogHeader className="shrink-0 space-y-2 border-b border-ds-border-subtle px-5 pb-4 pt-6 pr-14 text-left sm:px-8 sm:pb-5 sm:pt-8 sm:pr-16">
          <DialogTitle className="text-h3 uppercase tracking-(--ds-type-label-letter-spacing) text-ds-text-strong">
            Join Our Team
          </DialogTitle>
          <DialogDescription className="text-body-sm text-ds-text-muted">
            Take the next step in your career and apply with us.
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex min-h-0 flex-1 flex-col overflow-hidden"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div
            className={cn(
              "min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 py-5 sm:px-8 sm:py-6",
              modalScrollbarClassName,
            )}
          >
            <div className="space-y-5 sm:space-y-6">
              <div className="space-y-2.5">
                <label htmlFor="career-name" className={fieldLabelClassName}>
                  Full Name
                </label>
                <Input
                  id="career-name"
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
                <label htmlFor="career-email" className={fieldLabelClassName}>
                  Email
                </label>
                <Input
                  id="career-email"
                  type="email"
                  placeholder="you@example.com"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                />
                {errors.email ? (
                  <p className="text-sm font-medium text-(--brand-red)" role="alert">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="career-mobile" className={fieldLabelClassName}>
                  Mobile Number
                </label>
                <Input
                  id="career-mobile"
                  type="tel"
                  placeholder="+91 98894 71453"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.mobile)}
                  {...register("mobile")}
                />
                {errors.mobile ? (
                  <p className="text-sm font-medium text-(--brand-red)" role="alert">
                    {errors.mobile.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <label htmlFor="career-designation" className={fieldLabelClassName}>
                  Designation
                </label>
                <Input
                  id="career-designation"
                  placeholder="Role you are applying for"
                  className={contactInputClassName}
                  aria-invalid={Boolean(errors.designation)}
                  {...register("designation")}
                />
                {errors.designation ? (
                  <p className="text-sm font-medium text-(--brand-red)" role="alert">
                    {errors.designation.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2.5">
                <p id="career-resume-label" className={fieldLabelClassName}>
                  Upload Resume
                </p>
                <input
                  ref={fileInputRef}
                  id="career-resume"
                  type="file"
                  accept={ACCEPTED_RESUME_EXTENSIONS.join(",")}
                  className="sr-only"
                  aria-labelledby="career-resume-label"
                  aria-invalid={Boolean(resumeError)}
                  onChange={handleFileInputChange}
                />

                {resumeFile ? (
                  <div
                    className={cn(
                      "flex items-center gap-3 rounded-xl border border-ds-border-subtle bg-ds-surface-muted px-4 py-3.5",
                      resumeError && "border-[var(--brand-red)]",
                    )}
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--brand-blue-500)_10%,white)] text-brand-blue">
                      <FileText className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ds-text-strong">
                        {resumeFile.name}
                      </p>
                      <p className="text-xs text-ds-text-muted">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeResume}
                      aria-label="Remove resume"
                      className="flex size-8 shrink-0 items-center justify-center rounded-full text-ds-text-subtle transition-colors hover:bg-[color-mix(in_srgb,var(--brand-red)_8%,white)] hover:text-(--brand-red)"
                    >
                      <X className="size-4" aria-hidden />
                    </button>
                  </div>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    aria-labelledby="career-resume-label"
                    aria-describedby="career-resume-hint"
                    aria-invalid={Boolean(resumeError)}
                    onClick={() => fileInputRef.current?.click()}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        fileInputRef.current?.click();
                      }
                    }}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={cn(
                      "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition-[border-color,background-color,box-shadow] duration-200 ease-out",
                      isDragging
                        ? "border-ring bg-[color-mix(in_srgb,var(--brand-blue-500)_8%,white)] shadow-ds-xs"
                        : "border-ds-border-subtle bg-white/70 hover:border-[color-mix(in_srgb,var(--brand-blue-500)_36%,var(--border))] hover:bg-ds-surface-muted/70",
                      resumeError &&
                        "border-[var(--brand-red)] bg-[color-mix(in_srgb,var(--brand-red)_4%,white)]",
                    )}
                  >
                    <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--brand-accent)_10%,white)] text-brand-accent">
                      <Upload className="size-5" aria-hidden />
                    </span>
                    <p className="text-sm font-medium text-ds-text-strong">
                      Drag & drop your resume or{" "}
                      <span className="text-brand-accent">browse file</span>
                    </p>
                    <p
                      id="career-resume-hint"
                      className="mt-1.5 text-xs text-ds-text-subtle"
                    >
                      PDF, DOC, or DOCX up to 5 MB
                    </p>
                  </div>
                )}

                {resumeError ? (
                  <p className="text-sm font-medium text-(--brand-red)" role="alert">
                    {resumeError}
                  </p>
                ) : null}
              </div>
            </div>
          </div>

          <DialogFooter className="mx-0 mb-0 flex shrink-0 flex-col gap-3 rounded-none border-x-0 border-b-0 border-t border-ds-border-subtle bg-white/95 px-5 pb-[calc(1rem+var(--ds-safe-area-bottom))] pt-4 shadow-none backdrop-blur sm:flex-row sm:justify-end sm:px-8 sm:pb-6 sm:pt-5">
            <Button
              type="button"
              variant="outline"
              disabled={isSubmitting}
              className="h-12.5 w-full rounded-full px-8 text-[0.8125rem] font-medium uppercase tracking-(--ds-type-label-letter-spacing) sm:w-auto"
              onClick={() => handleOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className={cn(formPatternClassNames.submitButton, "sm:w-auto sm:min-w-48")}
            >
              {isSubmitting ? "Submitting..." : "Submit Application"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
