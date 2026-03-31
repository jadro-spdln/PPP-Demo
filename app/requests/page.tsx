"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RequestWizardModal } from "@/components/requests/request-wizard-modal";

type SupportRequest = {
  id: string;
  title: string;
  program: string;
  topic: string;
  priority: 1 | 2 | 3 | 4 | 5;
  status: string;
  submittedOn: string;
  requestedBy: string;
  summary: string;
  businessNeed: string;
  details: string[];
  attachments: string[];
};

const supportRequests: SupportRequest[] = [
  {
    id: "req-001",
    title: "Commission settlement export refresh",
    program: "SafeChoice",
    topic: "Reporting",
    priority: 2,
    status: "In Review",
    submittedOn: "Mar 20, 2026",
    requestedBy: "Program Partner",
    summary:
      "Requested an updated commission settlement export with February adjustments included before month-end reconciliation.",
    businessNeed:
      "Carrier finance team needs a refreshed settlement file before internal close to reconcile late endorsements and premium adjustments.",
    details: [
      "Need updated commission values for February close.",
      "Current extract appears to exclude late policy adjustments.",
      "Requested delivery before Friday morning review with finance leadership.",
    ],
    attachments: ["settlement-notes.pdf", "finance-close-checklist.xlsx"],
  },
  {
    id: "req-002",
    title: "Clarify revised coastal underwriting guidance",
    program: "Auros Coastal",
    topic: "Product & Underwriting",
    priority: 3,
    status: "Waiting on SageSure",
    submittedOn: "Mar 18, 2026",
    requestedBy: "Program Partner",
    summary:
      "Requested a clearer summary of which ZIP clusters moved to referral versus outright restriction under the revised coastal guidelines.",
    businessNeed:
      "Partner underwriting teams need a simpler operating summary so submission handling is consistent and faster.",
    details: [
      "Current memo is comprehensive but too dense for quick operational use.",
      "Would like examples for borderline submissions.",
      "Need clarity before next training session with underwriting staff.",
    ],
    attachments: ["coastal-guidance-comments.docx"],
  },
  {
    id: "req-003",
    title: "Request latest loss run support file",
    program: "Interboro Preferred",
    topic: "Reporting",
    priority: 4,
    status: "Delivered",
    submittedOn: "Mar 14, 2026",
    requestedBy: "Program Partner",
    summary:
      "Requested the latest supporting file behind the loss review workbook used during the most recent operating review.",
    businessNeed:
      "Leadership needed the raw support file to validate large-loss commentary before the monthly review readout.",
    details: [
      "Delivered by SageSure on Mar 16.",
      "Used to validate recent loss ratio discussion.",
      "Kept here as a believable completed request example for the demo.",
    ],
    attachments: ["loss-run-request-email.pdf"],
  },
  {
    id: "req-004",
    title: "Review retention movement in NJ segment",
    program: "Interboro Preferred",
    topic: "Portfolio Management",
    priority: 1,
    status: "In Review",
    submittedOn: "Mar 21, 2026",
    requestedBy: "Program Partner",
    summary:
      "Requested a deeper explanation for recent retention movement in the New Jersey segment ahead of the next operating review.",
    businessNeed:
      "Leadership wants to understand whether the movement reflects pricing pressure, appetite shifts, or operational friction.",
    details: [
      "Need segment-level explanation before the upcoming review cycle.",
      "Would like supporting context for producer behavior if available.",
      "Request tied directly to leadership review prep.",
    ],
    attachments: ["nj-retention-question.docx"],
  },
  {
    id: "req-005",
    title: "Provide clearer Q2 launch timing summary",
    program: "Auros Coastal",
    topic: "Presentations & Meeting Materials",
    priority: 5,
    status: "New",
    submittedOn: "Mar 23, 2026",
    requestedBy: "Program Partner",
    summary:
      "Requested a simpler launch-readiness summary that can be circulated internally without the full deck.",
    businessNeed:
      "Teams need a lightweight update for planning purposes, but this is not blocking any immediate operating decision.",
    details: [
      "Looking for milestone summary only.",
      "Not urgent, but useful for broader stakeholder alignment.",
      "Can be handled as backlog work if needed.",
    ],
    attachments: [],
  },
];

function PriorityBadge({ priority }: { priority: SupportRequest["priority"] }) {
  const tone =
    priority === 1
      ? "bg-rose-50 text-rose-700"
      : priority === 2
        ? "bg-amber-50 text-amber-700"
        : priority === 3
          ? "bg-sky-50 text-sky-700"
          : priority === 4
            ? "bg-slate-100 text-slate-700"
            : "bg-slate-100 text-slate-500";

  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{priority}</span>;
}

function RequestDetailModal({
  request,
  onClose,
}: {
  request: SupportRequest | null;
  onClose: () => void;
}) {
  if (!request) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Support Request</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">{request.title}</h3>
            <p className="mt-2 text-sm text-slate-500">
              {request.program} · {request.topic} · Submitted {request.submittedOn}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Priority</p>
            <div className="mt-3">
              <PriorityBadge priority={request.priority} />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Status</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">{request.status}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Requested By</p>
            <p className="mt-3 text-sm font-semibold text-slate-900">{request.requestedBy}</p>
          </div>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <p className="text-sm font-semibold text-slate-900">Request summary</p>
            <p className="mt-2 text-sm text-slate-600">{request.summary}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Business need</p>
            <p className="mt-2 text-sm text-slate-600">{request.businessNeed}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Details</p>
            <ul className="mt-2 space-y-2 text-sm text-slate-600">
              {request.details.map((detail, index) => (
                <li key={index} className="flex gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Attachments</p>
            <div className="mt-2 space-y-2 text-sm text-slate-600">
              {request.attachments.length ? (
                request.attachments.map((attachment) => (
                  <div key={attachment} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                    {attachment}
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-500">No attachments</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RequestsPage() {
  const searchParams = useSearchParams();
  const initialProgram = searchParams.get("program") ?? "All Programs";
  const [selectedProgram, setSelectedProgram] = useState(initialProgram);
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);

  const filteredRequests = useMemo(() => {
    if (!selectedProgram || selectedProgram === "All Programs") {
      return supportRequests;
    }

    return supportRequests.filter((request) => request.program === selectedProgram);
  }, [selectedProgram]);

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Requests</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Support Requests</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">
              Review submitted support requests, track current status, and open a detailed read-only view of each request as it exists in the workflow.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 lg:max-w-sm lg:items-end">
            <div className="w-full">
              <label className="mb-2 block text-sm font-medium text-slate-700">Program</label>
              <select
                value={selectedProgram}
                onChange={(event) => setSelectedProgram(event.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              >
                <option>All Programs</option>
                <option>SafeChoice</option>
                <option>Interboro Preferred</option>
                <option>Auros Coastal</option>
              </select>
            </div>
            <RequestWizardModal
              triggerLabel="Submit a Request"
              triggerClassName="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
            />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Queue</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">Current support requests</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {filteredRequests.length} items
          </span>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Request</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Program</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Topic</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Priority</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr
                    key={request.id}
                    onClick={() => setSelectedRequest(request)}
                    className="cursor-pointer border-t border-slate-200 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-4 text-sm font-semibold text-slate-900">{request.title}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{request.program}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{request.topic}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">
                      <PriorityBadge priority={request.priority} />
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-600">{request.status}</td>
                    <td className="px-4 py-4 text-sm text-slate-600">{request.submittedOn}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <RequestDetailModal request={selectedRequest} onClose={() => setSelectedRequest(null)} />
    </div>
  );
}