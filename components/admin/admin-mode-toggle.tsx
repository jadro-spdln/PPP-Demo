"use client";

import { useDemoRole } from "@/lib/hooks/use-demo-role";

export function AdminModeToggle() {
  const { isReady, role, setRole } = useDemoRole();

  if (!isReady) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-2 text-sm text-slate-500 shadow-sm">
        Loading role controls…
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Viewing as</p>
          <p className="text-xs text-slate-500">Toggle the Operating Reviews experience by role.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {role === "admin" ? "SageSure Admin" : "Program Partner"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setRole("partner")}
          className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
            role === "partner"
              ? "bg-slate-900 text-white"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          Program Partner
        </button>
        <button
          type="button"
          onClick={() => setRole("admin")}
          className={`rounded-xl px-3 py-2 text-sm font-medium transition ${
            role === "admin"
              ? "bg-slate-900 text-white"
              : "bg-slate-50 text-slate-700 hover:bg-slate-100"
          }`}
        >
          SageSure Admin
        </button>
      </div>
    </div>
  );
}