type ProductFeaturesProps = {
  features: string[];
};

export function ProductFeatures({ features }: ProductFeaturesProps) {
  const featureIcons: Record<string, string> = {
    "Food Grade": "FG",
    "Leak Resistant": "LR",
    Durable: "DU",
    Reusable: "RE",
    "Microwave Safe": "MW",
    "Freezer Safe": "FZ",
    "Custom Branding Available": "CB",
    "Bulk Supply Ready": "BS",
  };

  return (
    <section aria-labelledby="product-features" className="space-y-4">
      <div className="space-y-1">
        <h2 id="product-features" className="text-2xl font-semibold tracking-tight text-slate-900">
          Key Features
        </h2>
        <p className="text-sm text-slate-600">Built for reliability, hygiene, and bulk operations.</p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm leading-6 text-slate-700 shadow-sm"
          >
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-xs font-bold text-orange-700">
              {featureIcons[feature] ?? "OK"}
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </section>
  );
}
