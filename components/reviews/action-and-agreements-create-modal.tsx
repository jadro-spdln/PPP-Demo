"use client";

import { useMemo, useState } from "react";
import { programs } from "@/lib/mock-data/portal-data";

type MockFile = {
  id: string;
  name: string;
  sizeLabel: string;
};

export function ActionAgreementCreateModal() {
  const [open, setOpen] = useState(false);
  const [meetingDate, setMeetingDate] = useState("");
  const [selectedProgramIds, setSelectedProgramIds] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<MockFile[]>([]);

  const canSubmit = useMemo(() => {
    return (
      meetingDate.trim().length > 0 &&
      selectedProgramIds.length > 0 &&
      title.trim().length > 0 &&
      description.trim().length > 0
    );
  }, [description, meetingDate, selectedProgramIds, title]);

  function toggleProgram(programId: string) {
    setSelectedProgramIds((current) =>
      current.includes(programId)
        ? current.filter((id) => id !== programId)
        : [...current, programId]
    );
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const next = Array.from(fileList).map((file, i) => ({
      id: `${file.name}-${i}-${Date.now()}`,
      name: file.name,
      sizeLabel:
        file.size > 1024 * 1024
          ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          : `${Math.max(1, Math.round(file.size / 1024))} KB`,
    }));
    setFiles((current) => [...current, ...next]);
  }

  function removeFile(id: string) {
    setFiles((current) => current.filter((file) => file.id !== id));
  }

  function resetAndClose() {
    setOpen(false);
    setMeetingDate("");
    setSelectedProgramIds([]);
    setTitle("");
    setDescription("");
    setFiles([]);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
      >
        New Action
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between">
              <h2 className="text-3xl font-semibold">New action</h2>
              <button
                onClick={resetAndClose}
                className="rounded-xl border border-slate-200 px-3 py-2 text-sm"
              >
                ×
              </button>
            </div>

            <div className="mt-6 space-y-5">
              <label className="block space-y-2 text-sm">
                <span className="font-medium">
                  Meeting date <span className="text-red-500">*</span>
                </span>
                <input
                  type="date"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>

              <div className="space-y-2 text-sm">
                <span className="font-medium">
                  Program(s) <span className="text-red-500">*</span>
                </span>
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {programs.map((program) => (
                      <label key={program.id} className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={selectedProgramIds.includes(program.id)}
                          onChange={() => toggleProgram(program.id)}
                        />
                        <span>{program.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">
                  Agreement title <span className="text-red-500">*</span>
                </span>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
              </label>

              <label className="block space-y-2 text-sm">
                <span className="font-medium">
                  Action or agreement <span className="text-red-500">*</span>
                </span>
                <textarea
                  rows={5}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-3"
                />
                <p className="text-xs text-slate-500">{description.length}/1000</p>
              </label>

              <div className="space-y-2 text-sm">
                <span className="font-medium">Attach files</span>
                <p className="text-xs text-slate-500">PDF, JPG, DOC up to 150MB each</p>

                {files.length === 0 ? (
                  <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 p-8 text-center">
                    <div className="space-y-3">
                      <p className="text-lg font-medium">Drag your files or</p>
                      <span className="inline-block rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium">
                        Choose files
                      </span>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => addFiles(e.target.files)}
                    />
                  </label>
                ) : (
                  <div className="space-y-3">
                    <div className="flex justify-end">
                      <label className="cursor-pointer rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700">
                        Add more
                        <input
                          type="file"
                          multiple
                          className="hidden"
                          onChange={(e) => addFiles(e.target.files)}
                        />
                      </label>
                    </div>

                    {files.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                      >
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-slate-500">{file.sizeLabel}</p>
                        </div>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="rounded-full border border-slate-300 px-3 py-1 text-sm"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                disabled={!canSubmit}
                className={`rounded-xl px-5 py-3 text-sm font-medium text-white ${
                  canSubmit ? "bg-slate-900" : "cursor-not-allowed bg-slate-300"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}