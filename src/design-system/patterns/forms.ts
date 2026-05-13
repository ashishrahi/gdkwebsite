export const formPatternClassNames = {
  contactFieldBase:
    "w-full rounded-xl border border-input bg-white px-4 text-base text-ds-text-strong shadow-ds-xs placeholder:text-ds-text-subtle md:px-5 md:text-sm transition-[border-color,box-shadow,background-color] duration-200 ease-ds-out focus-visible:border-ring focus-visible:bg-white focus-visible:ring-4 focus-visible:ring-[color:color-mix(in_srgb,var(--ring)_22%,transparent)] aria-invalid:border-[var(--brand-red)] aria-invalid:ring-4 aria-invalid:ring-[color:color-mix(in_srgb,var(--brand-red)_18%,transparent)] aria-invalid:focus-visible:border-[var(--brand-red)] aria-invalid:focus-visible:ring-4 aria-invalid:focus-visible:ring-[color:color-mix(in_srgb,var(--brand-red)_22%,transparent)]",
  enquiryFieldBase:
    "w-full rounded-xl border border-input !bg-white px-4 text-base !text-ds-text-strong shadow-ds-xs placeholder:text-ds-text-subtle md:px-5 md:text-sm transition-[border-color,box-shadow,background-color] duration-200 ease-ds-out focus-visible:border-ring focus-visible:!bg-white focus-visible:ring-4 focus-visible:ring-[color:color-mix(in_srgb,var(--ring)_22%,transparent)] aria-invalid:border-[var(--brand-red)] aria-invalid:ring-4 aria-invalid:ring-[color:color-mix(in_srgb,var(--brand-red)_18%,transparent)] aria-invalid:focus-visible:border-[var(--brand-red)] aria-invalid:focus-visible:ring-4 aria-invalid:focus-visible:ring-[color:color-mix(in_srgb,var(--brand-red)_22%,transparent)]",
  contactInput: "min-h-[48px] py-3 md:h-14 md:min-h-0 md:py-0",
  contactTextarea: "min-h-[140px] resize-none py-3 sm:min-h-[160px] sm:py-4",
  enquiryTextarea: "min-h-[112px] resize-none py-2.5 sm:min-h-[128px] sm:py-3",
  submitButton:
    "h-12 w-full rounded-xl px-6 text-sm font-semibold shadow-[var(--ds-shadow-submit)] transition-[transform,box-shadow,opacity] duration-200 ease-ds-out hover:shadow-[var(--ds-shadow-submit-hover)] active:translate-y-px disabled:shadow-none",
} as const;
