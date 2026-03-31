type SectionHeadingProps = {
  title: string;
  description?: string;
  actionLabel?: string;
};

export function SectionHeading({
  title,
  description,
  actionLabel,
}: SectionHeadingProps) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        ) : null}
      </div>
      {actionLabel ? (
        <button className="text-sm font-medium text-slate-700 underline underline-offset-4">
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}