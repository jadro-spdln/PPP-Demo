import Link from "next/link";

type ProgramSubnavProps = {
  programId: string;
  active: "overview" | "materials" | "open-work";
};

export function ProgramSubnav({
  programId,
  active,
}: ProgramSubnavProps) {
  const items = [
    {
      key: "overview",
      label: "Overview",
      href: `/programs/${programId}`,
    },
    {
      key: "materials",
      label: "Resources",
      href: `/programs/${programId}/materials`,
    },
    {
      key: "open-work",
      label: "Requests",
      href: `/programs/${programId}/open-work`,
    },
  ] as const;

  return (
    <div className="mt-6 flex flex-wrap gap-3">
      {items.map((item) => {
        const isActive = active === item.key;

        return (
          <Link
            key={item.key}
            href={item.href}
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              isActive
                ? "bg-slate-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );
}