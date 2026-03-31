"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminModeToggle } from "@/components/admin/admin-mode-toggle";
import { useDemoRole } from "@/lib/hooks/use-demo-role";

type DraftAgendaItem = {
  id: string;
  title: string;
  durationMinutes: number;
  lead: string;
  slideRange: string;
};

type DraftAttachment = {
  id: string;
  name: string;
  sizeLabel: string;
};

export default function NewReviewCyclePage() {
  const { isAdmin, isPartner } = useDemoRole();

  const [meetingTitle, setMeetingTitle] = useState("March 2026 Operating Review");
  const [meetingDate, setMeetingDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("11:00");
  const [summary, setSummary] = useState("");
  const [actionItems, setActionItems] = useState("");
  const [attachments, setAttachments] = useState<DraftAttachment[]>([]);

  const [agendaItems, setAgendaItems] = useState<DraftAgendaItem[]>([
    {
      id: "1",
      title: "Production trends review",
      durationMinutes: 10,
      lead: "Partner UW Lead",
      slideRange: "1-4",
    },
    {
      id: "2",
      title: "Loss performance analysis",
      durationMinutes: 15,
      lead: "MGA Claims Lead",
      slideRange: "5-9",
    },
    {
      id: "3",
      title: "Profitability review",
      durationMinutes: 15,
      lead: "Portfolio Manager",
      slideRange: "10-15",
    },
    {
      id: "4",
      title: "UW guidelines updates",
      durationMinutes: 10,
      lead: "MGA Underwriting",
      slideRange: "16-20",
    },
    {
      id: "5",
      title: "Decisions and next steps",
      durationMinutes: 10,
      lead: "All",
      slideRange: "21-24",
    },
  ]);

  const totalMinutes = useMemo(
    () => agendaItems.reduce((sum, item) => sum + item.durationMinutes, 0),
    [agendaItems]
  );

  const canSave =
    meetingTitle.trim().length > 0 &&
    meetingDate.trim().length > 0 &&
    startTime.trim().length > 0 &&
    endTime.trim().length > 0 &&
    totalMinutes === 60 &&
    agendaItems.every((item) => item.title.trim().length > 0);

  function updateAgenda(
    id: string,
    field: keyof DraftAgendaItem,
    value: string | number
  ) {
    setAgendaItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  }

  function addAttachments(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const nextFiles = Array.from(fileList).map((file, index) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${index}`,
      name: file.name,
      sizeLabel:
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`,
    }));

    setAttachments((current) => [...current, ...nextFiles]);
  }

  function removeAttachment(id: string) {
    setAttachments((current) => current.filter((file) => file.id !== id));
  }

  if (isPartner) {
    return (
      <div className="space-y-8">
        <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-medium text-slate-500">Admin-only function</p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
                Create Operating Review
              </h1>
              <p className="mt-3 text-slate-600">
                Program Partners do not schedule Operating Reviews. This flow is
                available only to SageSure Admin users.
              </p>
            </div>

            <div className="w-full max-w-md">
              <AdminModeToggle />
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Link
              href="/review-cycles"
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
            >
              Back to Op Reviews
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-6 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">Admin draft flow</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900">
              Create Operating Review
            </h1>
            <p className="mt-2 max-w-3xl text-slate-600">
              This is the SageSure-side scheduling draft. Program partners do not schedule reviews.
            </p>
          </div>

          <div className="w-full max-w-md">
            <AdminModeToggle />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm md:col-span-2">
            <span className="font-medium text-slate-700">
              Meeting title <span className="text-red-500">*</span>
            </span>
            <input
              value={meetingTitle}
              onChange={(e) => setMeetingTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">
              Meeting date <span className="text-red-500">*</span>
            </span>
            <input
              type="date"
              value={meetingDate}
              onChange={(e) => setMeetingDate(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Holding company</span>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3">
              <option>Valence</option>
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">
              Start time <span className="text-red-500">*</span>
            </span>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">
              End time <span className="text-red-500">*</span>
            </span>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
        </div>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-slate-900">Agenda topics</h2>
            <p
              className={`text-sm font-medium ${
                totalMinutes === 60 ? "text-emerald-700" : "text-amber-700"
              }`}
            >
              {totalMinutes} / 60 minutes
            </p>
          </div>

          <div className="space-y-4">
            {agendaItems.map((item, index) => (
              <div
                key={item.id}
                className="grid gap-4 rounded-2xl border border-slate-200 p-4 lg:grid-cols-[1.8fr_0.8fr_1.2fr_1fr]"
              >
                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-700">
                    Agenda topic {index + 1}
                  </span>
                  <input
                    value={item.title}
                    onChange={(e) =>
                      updateAgenda(item.id, "title", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-700">Duration</span>
                  <input
                    type="number"
                    value={item.durationMinutes}
                    onChange={(e) =>
                      updateAgenda(
                        item.id,
                        "durationMinutes",
                        Number(e.target.value || 0)
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-700">Lead</span>
                  <input
                    value={item.lead}
                    onChange={(e) =>
                      updateAgenda(item.id, "lead", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  />
                </label>

                <label className="space-y-2 text-sm">
                  <span className="font-medium text-slate-700">Slides</span>
                  <input
                    value={item.slideRange}
                    onChange={(e) =>
                      updateAgenda(item.id, "slideRange", e.target.value)
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Meeting summary</span>
            <textarea
              rows={4}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Action items</span>
            <textarea
              rows={4}
              value={actionItems}
              onChange={(e) => setActionItems(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700">
                Pre-read materials {attachments.length}
              </p>
            </div>
          </div>

          <div className="mt-3">
            {attachments.length === 0 ? (
              <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">
                <p className="text-base font-medium text-slate-800">
                  Drag your files or choose files
                </p>
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => addAttachments(e.target.files)}
                />
              </label>
            ) : (
              <div className="space-y-3">
                <label className="inline-flex cursor-pointer rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
                  Add more
                  <input
                    type="file"
                    multiple
                    className="hidden"
                    onChange={(e) => addAttachments(e.target.files)}
                  />
                </label>

                {attachments.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                  >
                    <div>
                      <p className="font-medium text-slate-900">{file.name}</p>
                      <p className="mt-1 text-xs text-slate-500">{file.sizeLabel}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeAttachment(file.id)}
                      className="rounded-xl border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            disabled={!canSave}
            className={`rounded-xl px-4 py-2 text-sm font-medium text-white ${
              canSave ? "bg-slate-900" : "cursor-not-allowed bg-slate-300"
            }`}
          >
            Save meeting
          </button>
        </div>
      </section>
    </div>
  );
}