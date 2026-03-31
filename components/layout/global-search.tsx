"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type GlobalSearchProps = {
  initialValue?: string;
  className?: string;
};

export function GlobalSearch({
  initialValue = "",
  className = "",
}: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialValue);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search across the relationship..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm outline-none sm:w-72"
        />
        <button
          type="submit"
          className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
        >
          Search
        </button>
      </div>
    </form>
  );
}