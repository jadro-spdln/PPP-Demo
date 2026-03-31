"use client";

import { useState } from "react";
import { programs } from "@/lib/mock-data/portal-data";
import type { ActionAgreement } from "@/lib/types/portal";

export function ActionAgreementViewModal({
  item,
}: {
  item: ActionAgreement;
}) {
  const [open, setOpen] = useState(false);

  const programNames = item.programIds
    .map((id) => programs.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left font-medium text-slate-900 underline underline-offset-4"
      >
        {item.title}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900">{item.title}</h2>
                <p className="mt-3 max-w-3xl text-slate-700">{item.description}</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                ×
              </button>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 p-4">
              <div className="grid gap-4 md:grid-cols-4">
                <div>
                  <p className="text-xs text-slate-500">Program(s)</p>
                  <p className="mt-1 text-sm font-medium">{programNames}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Status</p>
                  <p className="mt-1 text-sm font-medium">{item.status}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Meeting date</p>
                  <p className="mt-1 text-sm font-medium">{item.meetingDate}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Date delivered</p>
                  <p className="mt-1 text-sm font-medium">{item.deliveredDate}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <p className="mb-3 text-sm font-medium text-slate-700">Attached files</p>
              <div className="space-y-3">
                {item.attachments.length > 0 ? (
                  item.attachments.map((file) => (
                    <div
                      key={file.id}
                      className="rounded-2xl border border-slate-200 px-4 py-3"
                    >
                      <p className="font-medium">{file.name}</p>
                      <p className="text-sm text-slate-500">{file.sizeLabel}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-slate-500">No attached files</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}