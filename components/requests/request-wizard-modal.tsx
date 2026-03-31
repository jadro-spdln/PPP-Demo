"use client";

import { useMemo, useState } from "react";
import { programs } from "@/lib/mock-data/portal-data";

type RequestWizardModalProps = {
  triggerLabel: string;
  triggerClassName?: string;
  defaultProgramId?: string;
  defaultTopic?: string;
};

type Step = 1 | 2 | 3;

type MockAttachment = {
  id: string;
  name: string;
  sizeLabel: string;
};

const workTypeOptions = [
  "Portfolio",
  "Product",
  "Reporting & Analysis",
  "Communications",
  "Audit/Compliance",
  "Presentation Support",
  "Contracting",
  "Miscellaneous",
];

export function RequestWizardModal({
  triggerLabel,
  triggerClassName,
}: RequestWizardModalProps) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);

  const [programId, setProgramId] = useState("");
  const [workType, setWorkType] = useState("");
  const [priority, setPriority] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState<MockAttachment[]>([]);

  const selectedProgram = useMemo(
    () => programs.find((program) => program.id === programId),
    [programId]
  );

  const isProgramValid = programId.trim().length > 0;
  const isWorkTypeValid = workType.trim().length > 0;
  const isTitleValid = title.trim().length > 0;
  const isDescriptionValid = description.trim().length > 0;

  const canSubmit =
    isProgramValid && isWorkTypeValid && isTitleValid && isDescriptionValid;

  function resetWizard() {
    setStep(1);
    setSubmitted(false);
    setProgramId("");
    setWorkType("");
    setPriority("");
    setTargetDate("");
    setTitle("");
    setDescription("");
    setAttachments([]);
  }

  function closeModal() {
    setOpen(false);
    resetWizard();
  }

  function openModal() {
    setOpen(true);
  }

  function nextStep() {
    if (step < 3) setStep((step + 1) as Step);
  }

  function prevStep() {
    if (step > 1) setStep((step - 1) as Step);
  }

  function submitRequest() {
    if (!canSubmit) return;
    setSubmitted(true);
  }

  function addMockAttachments(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;

    const nextFiles = Array.from(fileList).map((file, index) => ({
      id: `${file.name}-${file.size}-${index}-${Date.now()}`,
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

  const selectBaseClassName =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3";
  const selectPlaceholderClassName = "text-slate-400";
  const selectFilledClassName = "text-slate-900";

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={
          triggerClassName ??
          "rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        }
      >
        {triggerLabel}
      </button>

      {open ? (
        <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center bg-slate-900/50 p-4 sm:p-6">
          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div>
                <p className="text-sm font-medium text-slate-500">Ask SageSure</p>
                <h2 className="mt-1 text-2xl font-semibold text-slate-900">
                  Submit a request
                </h2>
                <p className="mt-2 max-w-2xl text-sm text-slate-600">
                  Every request submitted to SageSure is reviewed, placed into a
                  priority tier, and routed to the appropriate team. You’ll always
                  be able to see where your request stands - and if priorities
                  change, we’ll update it here.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
              >
                Close
              </button>
            </div>

            <div className="border-b border-slate-200 px-6 py-4">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span
                  className={`rounded-full px-3 py-1 ${
                    step === 1
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  1. Context
                </span>
                <span
                  className={`rounded-full px-3 py-1 ${
                    step === 2
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  2. Details
                </span>
                <span
                  className={`rounded-full px-3 py-1 ${
                    step === 3
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  3. Review
                </span>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {!submitted ? (
                <>
                  {step === 1 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                      <label className="flex flex-col gap-2 text-sm">
                        <span className="font-medium text-slate-700">
                          Program <span className="text-red-500">*</span>
                        </span>
                        <select
                          value={programId}
                          onChange={(e) => setProgramId(e.target.value)}
                          className={`${selectBaseClassName} ${
                            programId ? selectFilledClassName : selectPlaceholderClassName
                          }`}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {programs.map((program) => (
                            <option
                              key={program.id}
                              value={program.id}
                              className="text-slate-900"
                            >
                              {program.name}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="flex flex-col gap-2 text-sm">
                        <span className="font-medium text-slate-700">
                          Work type <span className="text-red-500">*</span>
                        </span>
                        <select
                          value={workType}
                          onChange={(e) => setWorkType(e.target.value)}
                          className={`${selectBaseClassName} ${
                            workType ? selectFilledClassName : selectPlaceholderClassName
                          }`}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          {workTypeOptions.map((option) => (
                            <option
                              key={option}
                              value={option}
                              className="text-slate-900"
                            >
                              {option}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className="flex flex-col gap-2 text-sm">
                        <span className="font-medium text-slate-700">Priority</span>
                        <select
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          className={`${selectBaseClassName} ${
                            priority ? selectFilledClassName : selectPlaceholderClassName
                          }`}
                        >
                          <option value="" disabled>
                            Select
                          </option>
                          <option value="1" className="text-slate-900">
                            1
                          </option>
                          <option value="2" className="text-slate-900">
                            2
                          </option>
                          <option value="3" className="text-slate-900">
                            3
                          </option>
                          <option value="4" className="text-slate-900">
                            4
                          </option>
                          <option value="5" className="text-slate-900">
                            5
                          </option>
                        </select>
                        <p className="text-center text-xs text-slate-500">
                          1 = Very high (needed immediately), 5 = Very low
                          (backlog item)
                        </p>
                      </label>

                      <label className="flex flex-col gap-2 text-sm">
                        <span className="font-medium text-slate-700">
                          Target date
                        </span>
                        <input
                          type="date"
                          value={targetDate}
                          onChange={(e) => setTargetDate(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900"
                        />
                      </label>
                    </div>
                  ) : null}

                  {step === 2 ? (
                    <div className="space-y-4">
                      <label className="block space-y-2 text-sm">
                        <span className="font-medium text-slate-700">
                          Title <span className="text-red-500">*</span>
                        </span>
                        <input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                          placeholder="What do you need help with?"
                        />
                      </label>

                      <label className="block space-y-2 text-sm">
                        <span className="font-medium text-slate-700">
                          Description <span className="text-red-500">*</span>
                        </span>
                        <textarea
                          rows={6}
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
                          placeholder="Add helpful context, timing, and what outcome you need."
                        />
                      </label>

                      <div className="space-y-2 text-sm">
                        <span className="font-medium text-slate-700">
                          Attachments
                        </span>

                        <label className="block cursor-pointer rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-slate-400 hover:bg-slate-100">
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-slate-800">
                              Drag your files here
                            </p>
                            <p className="text-xs text-slate-500">
                              Or click to add one or more attachments. Supports
                              PDFs, DOCs, XLS, CSVs, EMLs, MP3s, and more.
                            </p>
                            <p className="text-xs text-slate-400">
                              Demo behavior: files are shown in the UI only and
                              are not stored.
                            </p>
                          </div>

                          <input
                            type="file"
                            multiple
                            className="hidden"
                            onChange={(e) => addMockAttachments(e.target.files)}
                          />
                        </label>

                        {attachments.length > 0 ? (
                          <div className="space-y-2 rounded-2xl border border-slate-200 bg-white p-4">
                            {attachments.map((file) => (
                              <div
                                key={file.id}
                                className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-3 py-2"
                              >
                                <div className="min-w-0">
                                  <p className="truncate text-sm font-medium text-slate-800">
                                    {file.name}
                                  </p>
                                  <p className="text-xs text-slate-500">
                                    {file.sizeLabel}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => removeAttachment(file.id)}
                                  className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                                >
                                  Remove
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ) : null}

                  {step === 3 ? (
                    <div className="space-y-5">
                      <div className="rounded-2xl bg-slate-50 p-5">
                        <h3 className="text-lg font-semibold text-slate-900">
                          Review request
                        </h3>

                        <div className="mt-4 grid gap-4 md:grid-cols-2">
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Program
                            </p>
                            <p className="mt-1 text-sm text-slate-800">
                              {selectedProgram?.name || "Not selected"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Work type
                            </p>
                            <p className="mt-1 text-sm text-slate-800">
                              {workType || "Not selected"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Priority
                            </p>
                            <p className="mt-1 text-sm text-slate-800">
                              {priority || "Not specified"}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-slate-500">
                              Target date
                            </p>
                            <p className="mt-1 text-sm text-slate-800">
                              {targetDate || "Not specified"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-wide text-slate-500">
                            Title
                          </p>
                          <p className="mt-1 text-sm text-slate-800">
                            {title || "Untitled request"}
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-wide text-slate-500">
                            Description
                          </p>
                          <p className="mt-1 whitespace-pre-wrap text-sm text-slate-800">
                            {description || "No description provided."}
                          </p>
                        </div>

                        <div className="mt-4">
                          <p className="text-xs uppercase tracking-wide text-slate-500">
                            Attachments
                          </p>
                          <p className="mt-1 text-sm text-slate-800">
                            {attachments.length > 0
                              ? `${attachments.length} file${
                                  attachments.length === 1 ? "" : "s"
                                } attached`
                              : "No attachments added"}
                          </p>
                        </div>
                      </div>

                      {!canSubmit ? (
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                          <p className="text-sm text-amber-800">
                            Complete all required fields before submitting:
                            Program, Work type, Title, and Description.
                          </p>
                        </div>
                      ) : null}

                      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                        <p className="text-sm text-amber-800">
                          Demo behavior: submitting here simulates creating a
                          Jira-backed request that starts in the{" "}
                          <span className="font-medium">Submitted</span> stage.
                        </p>
                      </div>
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <p className="text-lg font-semibold text-emerald-800">
                    Request submitted
                  </p>
                  <p className="mt-2 text-sm text-emerald-700">
                    Your request has been captured. In the real product, this
                    would create a Jira-backed item beginning in the{" "}
                    <span className="font-medium">Submitted</span> stage.
                  </p>

                  <div className="mt-4 rounded-xl bg-white p-4 text-sm text-slate-700">
                    <p>
                      <span className="font-medium">Program:</span>{" "}
                      {selectedProgram?.name || "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Work type:</span>{" "}
                      {workType || "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Title:</span>{" "}
                      {title || "Untitled request"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-6 py-5">
              <div>
                {!submitted && step > 1 ? (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                  >
                    Cancel
                  </button>
                )}
              </div>

              <div className="flex gap-3">
                {!submitted && step < 3 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Continue
                  </button>
                ) : null}

                {!submitted && step === 3 ? (
                  <button
                    type="button"
                    onClick={submitRequest}
                    disabled={!canSubmit}
                    className={`rounded-xl px-4 py-2 text-sm font-medium text-white ${
                      canSubmit
                        ? "bg-slate-900"
                        : "cursor-not-allowed bg-slate-300"
                    }`}
                  >
                    Submit Request
                  </button>
                ) : null}

                {submitted ? (
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                  >
                    Done
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}