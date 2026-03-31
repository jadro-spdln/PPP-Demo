"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { RequestWizardModal } from "@/components/requests/request-wizard-modal";

const homeMetrics = [
  {
    label: "Active Programs",
    value: "3",
    detail: "Across the current portfolio",
  },
  {
    label: "Open Requests",
    value: "18",
    detail: "6 due this week",
  },
  {
    label: "Resources Delivered",
    value: "42",
    detail: "9 in the last 30 days",
  },
  {
    label: "Upcoming Reviews",
    value: "3",
    detail: "Next one this Thursday",
  },
];

const myRequests = [
  {
    id: "req-commission-export",
    title: "Commission settlement export refresh",
    status: "In Review",
    submittedOn: "Mar 20, 2026",
    program: "SafeChoice",
    summary:
      "Requested an updated commission settlement export with February adjustments included before month-end reconciliation.",
    details: [
      "Submitted to confirm February settlement changes before internal close.",
      "Carrier finance team needs the refreshed export by Friday morning.",
      "Awaiting SageSure confirmation that late policy adjustments are included.",
    ],
  },
  {
    id: "req-guideline-clarity",
    title: "Clarify revised coastal underwriting guidance",
    status: "Waiting on SageSure",
    submittedOn: "Mar 18, 2026",
    program: "Auros",
    summary:
      "Requested a clearer summary of which ZIP clusters moved to referral versus outright restriction under the revised coastal guidelines.",
    details: [
      "Need a simpler operational summary for partner underwriters.",
      "Current document is comprehensive but not easy to action quickly.",
      "Would like examples for borderline submissions included.",
    ],
  },
  {
    id: "req-loss-run",
    title: "Request latest loss run support file",
    status: "Delivered",
    submittedOn: "Mar 14, 2026",
    program: "Interboro",
    summary:
      "Requested the latest supporting file behind the loss review workbook used during the most recent operating review.",
    details: [
      "Delivered by SageSure on Mar 16.",
      "Used by leadership to validate large-loss commentary.",
      "Kept here as a believable completed example for the demo.",
    ],
  },
];

const programsAtGlance = [
  {
    id: "safechoice",
    name: "SafeChoice",
    writtenPremium: "$12.4M",
    premiumDelta: "+8.6%",
    premiumDirection: "up",
    lossRatio: "16.9%",
    lossRatioDelta: "-2.1 pts",
    lossDirection: "up",
  },
  {
    id: "interboro",
    name: "Interboro",
    writtenPremium: "$9.8M",
    premiumDelta: "+4.2%",
    premiumDirection: "up",
    lossRatio: "20.8%",
    lossRatioDelta: "+1.4 pts",
    lossDirection: "down",
  },
  {
    id: "auros",
    name: "Auros",
    writtenPremium: "$7.1M",
    premiumDelta: "-1.3%",
    premiumDirection: "down",
    lossRatio: "18.2%",
    lossRatioDelta: "-1.1 pts",
    lossDirection: "up",
  },
];

const writtenPremiumTrend = [
  { month: "Jan", actual: 18.2, plan: 17.4 },
  { month: "Feb", actual: 18.9, plan: 17.9 },
  { month: "Mar", actual: 19.5, plan: 18.3 },
  { month: "Apr", actual: 20.4, plan: 19.0 },
  { month: "May", actual: 21.3, plan: 19.8 },
  { month: "Jun", actual: 22.1, plan: 20.4 },
];

const lossRatioTrend = [
  { month: "Jan", value: 21 },
  { month: "Feb", value: 20 },
  { month: "Mar", value: 19 },
  { month: "Apr", value: 18.4 },
  { month: "May", value: 17.6 },
  { month: "Jun", value: 17 },
];

const activityItems = [
  {
    id: "activity-1",
    title: "Updated underwriting guidance delivered",
    detail: "SafeChoice coastal guidance package posted to Resources.",
    time: "2 hours ago",
  },
  {
    id: "activity-2",
    title: "Operating Review deck uploaded",
    detail: "Valence March review materials are now available.",
    time: "Yesterday",
  },
  {
    id: "activity-3",
    title: "Request status changed",
    detail: "Commission settlement export refresh moved to In Review.",
    time: "Yesterday",
  },
];

const productUpdates = [
  {
    id: "update-1",
    title: "Rate change effective April 1",
    detail:
      "A revised coastal pricing package will go into effect for SafeChoice new business on April 1, pending final filing timing.",
    badge: "Rate Change",
    time: "Posted today",
  },
  {
    id: "update-2",
    title: "New claims form package issued",
    detail:
      "Updated claims intake forms and companion instructions are now available for partner teams using the current workflow.",
    badge: "Form Update",
    time: "Posted yesterday",
  },
  {
    id: "update-3",
    title: "Guideline memo published for coastal referrals",
    detail:
      "A new underwriting memo clarifies referral handling and reviewer expectations in coastal segments with recent appetite changes.",
    badge: "Guideline",
    time: "Posted Mar 24",
  },
];

const resourceGroups = {
  delivered: [
    {
      id: "resource-valence-march-review-pdf",
      title: "Valence March Operating Review",
      type: "PDF",
      subtitle: "Meeting deck · Delivered by SageSure",
      meta: "Uploaded Mar 21, 2026 · 2.4 MB",
    },
    {
      id: "resource-coastal-guidance-docx",
      title: "Coastal Underwriting Guidance Update",
      type: "DOCX",
      subtitle: "Guidance memo · Delivered by SageSure",
      meta: "Uploaded Mar 19, 2026 · 640 KB",
    },
    {
      id: "resource-commission-settlement-csv",
      title: "Commission Settlement Detail",
      type: "CSV",
      subtitle: "Settlement export · Delivered by SageSure",
      meta: "Uploaded Mar 18, 2026 · 190 KB",
    },
  ],
  viewed: [
    {
      id: "resource-loss-ratio-workbook-xlsx",
      title: "Loss Ratio Trend Workbook",
      type: "XLSX",
      subtitle: "Analytics workbook · Recently viewed",
      meta: "Viewed Mar 24, 2026 · 1.1 MB",
    },
    {
      id: "resource-program-admin-agreement-pdf",
      title: "Program Administrator Agreement",
      type: "PDF",
      subtitle: "Governance document · Recently viewed",
      meta: "Viewed Mar 22, 2026 · 880 KB",
    },
    {
      id: "resource-q2-launch-readiness-pptx",
      title: "Q2 Launch Readiness Plan",
      type: "PPTX",
      subtitle: "Launch plan · Recently viewed",
      meta: "Viewed Mar 20, 2026 · 3.0 MB",
    },
  ],
} as const;

type RequestItem = (typeof myRequests)[number];
type ResourceItem = (typeof resourceGroups.delivered)[number];

function TrendBadge({
  value,
  tone,
}: {
  value: string;
  tone: "positive" | "negative";
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        tone === "positive"
          ? "bg-emerald-50 text-emerald-700"
          : "bg-rose-50 text-rose-700"
      }`}
    >
      {value}
    </span>
  );
}

function MiniBarComparison({
  month,
  actual,
  plan,
  max,
}: {
  month: string;
  actual: number;
  plan: number;
  max: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-700">{month}</span>
        <span>
          ${actual.toFixed(1)}M vs ${plan.toFixed(1)}M
        </span>
      </div>
      <div className="space-y-1">
        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-emerald-600"
            style={{ width: `${(actual / max) * 100}%` }}
          />
        </div>
        <div className="h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-sky-500"
            style={{ width: `${(plan / max) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

function MiniLossBar({ month, value, max }: { month: string; value: number; max: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs text-slate-500">
        <span className="font-medium text-slate-700">{month}</span>
        <span>{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div
          className="h-2 rounded-full bg-violet-600"
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}

function RequestDetailModal({
  request,
  onClose,
  submitTrigger,
}: {
  request: RequestItem | null;
  onClose: () => void;
  submitTrigger: React.ReactNode;
}) {
  if (!request) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-semibold text-slate-900">My Requests</h3>
              {submitTrigger}
            </div>
            <p className="mt-3 text-lg font-semibold text-slate-900">{request.title}</p>
            <p className="mt-1 text-sm text-slate-500">
              {request.program} · Submitted {request.submittedOn}
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

        <div className="space-y-5">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Status</p>
            <p className="mt-2 text-sm font-semibold text-slate-900">{request.status}</p>
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-900">Request summary</p>
            <p className="mt-2 text-sm text-slate-600">{request.summary}</p>
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
        </div>
      </div>
    </div>
  );
}

function ResourceRow({ resource }: { resource: ResourceItem }) {
  return (
    <Link
      href={`/materials/${resource.id}`}
      className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 px-4 py-3 transition hover:bg-slate-50"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
            {resource.type}
          </span>
          <p className="truncate text-sm font-semibold text-slate-900">{resource.title}</p>
        </div>
        <p className="mt-1 text-sm text-slate-500">{resource.subtitle}</p>
        <p className="mt-1 text-xs text-slate-500">{resource.meta}</p>
      </div>
      <span className="text-sm font-medium text-slate-500">View</span>
    </Link>
  );
}

export default function HomePage() {
  const [selectedRequest, setSelectedRequest] = useState<RequestItem | null>(null);

  const premiumChartMax = useMemo(
    () => Math.max(...writtenPremiumTrend.flatMap((item) => [item.actual, item.plan])) + 1,
    [],
  );
  const lossChartMax = 24;

  const submitRequestTrigger = (
    <RequestWizardModal
      triggerLabel="Submit a Request"
      triggerClassName="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
    />
  );

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">
              Welcome to the Program Partner Portal
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">
              Your central place to collaborate with SageSure
            </h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">
              Stay close to portfolio performance, see what SageSure has delivered, and keep the work moving across the relationship.
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {homeMetrics.map((metric) => (
          <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">{metric.value}</p>
            <p className="mt-2 text-sm text-slate-500">{metric.detail}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Programs at a glance</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Portfolio snapshot by program</h2>
            </div>
            <Link href="/programs" className="text-sm font-medium text-slate-500 hover:text-slate-700">
              View all programs
            </Link>
          </div>

          <div className="space-y-4">
            {programsAtGlance.map((program) => {
              const premiumPositive = program.premiumDirection === "up";
              const lossPositive = program.lossDirection === "up";

              return (
                <div key={program.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{program.name}</p>
                      <p className="mt-1 text-sm text-slate-500">Current portfolio contribution and trend</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Written Premium</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-lg font-semibold text-slate-950">{program.writtenPremium}</span>
                          <TrendBadge value={program.premiumDelta} tone={premiumPositive ? "positive" : "negative"} />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Loss Ratio</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-lg font-semibold text-slate-950">{program.lossRatio}</span>
                          <TrendBadge value={program.lossRatioDelta} tone={lossPositive ? "positive" : "negative"} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">My Requests</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Requests you have in motion</h2>
            </div>
            {submitRequestTrigger}
          </div>

          <div className="space-y-3">
            {myRequests.map((request) => (
              <button
                key={request.id}
                type="button"
                onClick={() => setSelectedRequest(request)}
                className="w-full rounded-2xl border border-slate-200 p-4 text-left transition hover:bg-slate-50"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{request.title}</p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {request.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">{request.program}</p>
                <p className="mt-2 text-sm text-slate-600">{request.summary}</p>
                <p className="mt-3 text-xs text-slate-500">Submitted {request.submittedOn}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Portfolio performance</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">YTD Written Premium vs Plan</h2>
              <p className="mt-2 text-sm text-slate-500">Current YTD premium is $22.1M, up 8.3% to plan.</p>
            </div>
            <TrendBadge value="+8.3%" tone="positive" />
          </div>

          <div className="mb-4 flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="block h-2 w-6 rounded-full bg-emerald-600" />
              <span>Actual</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-2 w-6 rounded-full bg-sky-500" />
              <span>Plan</span>
            </div>
          </div>

          <div className="space-y-4">
            {writtenPremiumTrend.map((item) => (
              <MiniBarComparison
                key={item.month}
                month={item.month}
                actual={item.actual}
                plan={item.plan}
                max={premiumChartMax}
              />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Portfolio performance</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">YTD Loss Ratio</h2>
              <p className="mt-2 text-sm text-slate-500">Current YTD loss ratio is 17.0%, improving over recent months.</p>
            </div>
            <TrendBadge value="-4.0 pts" tone="positive" />
          </div>

          <div className="space-y-4">
            {lossRatioTrend.map((item) => (
              <MiniLossBar key={item.month} month={item.month} value={item.value} max={lossChartMax} />
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">What changed</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Recent portfolio activity</h2>
            </div>
            <Link href="/activity" className="text-sm font-medium text-slate-500 hover:text-slate-700">
              Open Activity
            </Link>
          </div>

          <div className="space-y-4">
            {activityItems.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                <p className="mt-2 text-xs text-slate-500">{item.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Product Updates</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">Recent announcements from SageSure</h2>
          </div>
          <div className="space-y-4">
            {productUpdates.map((update) => (
              <div key={update.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{update.title}</p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {update.badge}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{update.detail}</p>
                <p className="mt-3 text-xs text-slate-500">{update.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Recently delivered</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">New resources from SageSure</h2>
          </div>
          <div className="space-y-3">
            {resourceGroups.delivered.map((resource) => (
              <ResourceRow key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Recently viewed</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">Resources you opened recently</h2>
          </div>
          <div className="space-y-3">
            {resourceGroups.viewed.map((resource) => (
              <ResourceRow key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <RequestDetailModal
        request={selectedRequest}
        onClose={() => setSelectedRequest(null)}
        submitTrigger={submitRequestTrigger}
      />
    </div>
  );
}