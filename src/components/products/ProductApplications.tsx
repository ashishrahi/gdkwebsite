type ProductApplicationsProps = {
  applications: string[];
  description?: string;
};

export function ProductApplications({ applications, description }: ProductApplicationsProps) {
  return (
    <section aria-labelledby="product-applications" className="space-y-4">
      <div className="space-y-1">
        <h2
          id="product-applications"
          className="text-2xl font-semibold tracking-tight text-slate-900"
        >
          Applications
        </h2>
        <p className="text-sm text-slate-600">
          {description ?? "Used across food service, retail, and industrial packing."}
        </p>
      </div>
      <ol className="grid gap-3 sm:grid-cols-2">
        {applications.map((application, index) => (
          <li
            key={application}
            className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1450c8]/10 text-xs font-semibold text-[#1450c8]">
              {index + 1}
            </span>
            <span className="leading-6">{application}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
