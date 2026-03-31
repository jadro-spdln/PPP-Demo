import Link from "next/link";

type ProgramDetail = {
  id: string;
  name: string;
  carrierGroup: string;
  carrier: string;
  states: string[];
  summary: string;
  writtenPremium: string;
  writtenPremiumDelta: string;
  writtenPremiumPositive: boolean;
  lossRatio: string;
  lossRatioDelta: string;
  lossRatioPositive: boolean;
  requestsOpen: string;
  nextReview: string;
  milestones: { title: string; detail: string; date: string }[];
  updates: { title: string; detail: string; time: string }[];
  requests: { title: string; status: string; submittedOn: string }[];
  recentlyDelivered: ResourceItem[];
  recentlyViewed: ResourceItem[];
  performance: {
    ytdWrittenPremium: string;
    ytdWrittenPremiumDelta: string;
    retention: string;
    retentionDelta: string;
    lossRatio: string;
    lossRatioDelta: string;
    combinedRatio: string;
    combinedRatioDelta: string;
  };
};

type ResourceItem = {
  id: string;
  title: string;
  type: string;
  subtitle: string;
  meta: string;
};

const programsById: Record<string, ProgramDetail> = {
  safechoice: {
    id: "safechoice",
    name: "SafeChoice",
    carrierGroup: "Valence",
    carrier: "SafeChoice",
    states: ["FL", "LA", "SC"],
    summary:
      "SafeChoice is currently pacing ahead of plan, with strong written premium performance and stable underwriting results across the active footprint.",
    writtenPremium: "$12.4M",
    writtenPremiumDelta: "+8.6% vs plan",
    writtenPremiumPositive: true,
    lossRatio: "16.9%",
    lossRatioDelta: "-2.1 pts",
    lossRatioPositive: true,
    requestsOpen: "3",
    nextReview: "April 9, 2026",
    milestones: [
      {
        title: "Coastal pricing package effective",
        detail: "New-business pricing package is expected to go live pending final filing timing.",
        date: "Apr 1, 2026",
      },
      {
        title: "Guidance recap distribution",
        detail: "Operational summary memo to be shared with partner underwriters.",
        date: "Apr 4, 2026",
      },
    ],
    updates: [
      {
        title: "Guidance package delivered",
        detail: "Updated underwriting memo posted to Resources for partner review.",
        time: "Yesterday",
      },
      {
        title: "Request moved to In Review",
        detail: "Commission settlement export refresh is now being worked by SageSure.",
        time: "2 days ago",
      },
    ],
    requests: [
      {
        title: "Clarify coastal underwriting memo",
        status: "Waiting on SageSure",
        submittedOn: "Mar 18, 2026",
      },
      {
        title: "Commission settlement export refresh",
        status: "In Review",
        submittedOn: "Mar 20, 2026",
      },
    ],
    performance: {
      ytdWrittenPremium: "$12.4M",
      ytdWrittenPremiumDelta: "+8.6% vs plan",
      retention: "84.2%",
      retentionDelta: "+1.8 pts YoY",
      lossRatio: "16.9%",
      lossRatioDelta: "-2.1 pts vs prior quarter",
      combinedRatio: "87.4%",
      combinedRatioDelta: "-1.6 pts vs plan",
    },
    recentlyDelivered: [
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
    recentlyViewed: [
      {
        id: "resource-program-admin-agreement-pdf",
        title: "Program Administrator Agreement",
        type: "PDF",
        subtitle: "Governance document · Recently viewed",
        meta: "Viewed Mar 22, 2026 · 880 KB",
      },
      {
        id: "resource-loss-ratio-workbook-xlsx",
        title: "Loss Ratio Trend Workbook",
        type: "XLSX",
        subtitle: "Analytics workbook · Recently viewed",
        meta: "Viewed Mar 24, 2026 · 1.1 MB",
      },
    ],
  },
  "interboro-preferred": {
    id: "interboro-preferred",
    name: "Interboro Preferred",
    carrierGroup: "Valence",
    carrier: "Interboro",
    states: ["NY", "NJ", "CT"],
    summary:
      "Interboro Preferred remains an important program within the portfolio, with healthy premium scale but some performance pressure that leadership is actively monitoring.",
    writtenPremium: "$9.8M",
    writtenPremiumDelta: "+4.2% vs plan",
    writtenPremiumPositive: true,
    lossRatio: "20.8%",
    lossRatioDelta: "+1.4 pts",
    lossRatioPositive: false,
    requestsOpen: "4",
    nextReview: "March 29, 2026",
    milestones: [
      {
        title: "Operating review prep materials due",
        detail: "Finalize the next review deck with loss commentary and premium pacing notes.",
        date: "Mar 27, 2026",
      },
      {
        title: "Retention deep-dive follow-up",
        detail: "Align on whether the latest retention softness requires action before the April review.",
        date: "Apr 3, 2026",
      },
    ],
    updates: [
      {
        title: "Review materials refreshed",
        detail: "The Interboro operating review deck was updated with the latest written premium detail.",
        time: "Today",
      },
      {
        title: "Request submitted for updated support file",
        detail: "A new request is open for the workbook behind the most recent loss trend narrative.",
        time: "Yesterday",
      },
    ],
    requests: [
      {
        title: "Request latest loss run support file",
        status: "Delivered",
        submittedOn: "Mar 14, 2026",
      },
      {
        title: "Review retention movement in NJ segment",
        status: "In Review",
        submittedOn: "Mar 21, 2026",
      },
    ],
    performance: {
      ytdWrittenPremium: "$9.8M",
      ytdWrittenPremiumDelta: "+4.2% vs plan",
      retention: "78.6%",
      retentionDelta: "-1.2 pts YoY",
      lossRatio: "20.8%",
      lossRatioDelta: "+1.4 pts vs prior quarter",
      combinedRatio: "94.1%",
      combinedRatioDelta: "+2.3 pts vs plan",
    },
    recentlyDelivered: [
      {
        id: "resource-valence-march-review-pdf",
        title: "Valence March Operating Review",
        type: "PDF",
        subtitle: "Meeting deck · Delivered by SageSure",
        meta: "Uploaded Mar 21, 2026 · 2.4 MB",
      },
      {
        id: "resource-commission-settlement-csv",
        title: "Commission Settlement Detail",
        type: "CSV",
        subtitle: "Settlement export · Delivered by SageSure",
        meta: "Uploaded Mar 18, 2026 · 190 KB",
      },
    ],
    recentlyViewed: [
      {
        id: "resource-loss-ratio-workbook-xlsx",
        title: "Loss Ratio Trend Workbook",
        type: "XLSX",
        subtitle: "Analytics workbook · Recently viewed",
        meta: "Viewed Mar 24, 2026 · 1.1 MB",
      },
      {
        id: "resource-q2-launch-readiness-pptx",
        title: "Q2 Launch Readiness Plan",
        type: "PPTX",
        subtitle: "Launch plan · Recently viewed",
        meta: "Viewed Mar 20, 2026 · 3.0 MB",
      },
    ],
  },
  "auros-coastal": {
    id: "auros-coastal",
    name: "Auros Coastal",
    carrierGroup: "Valence",
    carrier: "Auros",
    states: ["FL", "TX"],
    summary:
      "Auros Coastal is slightly behind plan, but still within a manageable range as SageSure and partner leadership refine next-quarter actions.",
    writtenPremium: "$7.1M",
    writtenPremiumDelta: "-1.3% vs plan",
    writtenPremiumPositive: false,
    lossRatio: "18.2%",
    lossRatioDelta: "-1.1 pts",
    lossRatioPositive: true,
    requestsOpen: "2",
    nextReview: "April 9, 2026",
    milestones: [
      {
        title: "Launch readiness checkpoint",
        detail: "Confirm dependencies and outstanding readiness needs before next review cycle.",
        date: "Apr 2, 2026",
      },
    ],
    updates: [
      {
        title: "Launch timing note added",
        detail: "Product update timing was clarified in the latest operating review support deck.",
        time: "2 days ago",
      },
    ],
    requests: [
      {
        title: "Provide clearer Q2 launch timing summary",
        status: "New",
        submittedOn: "Mar 23, 2026",
      },
    ],
    performance: {
      ytdWrittenPremium: "$7.1M",
      ytdWrittenPremiumDelta: "-1.3% vs plan",
      retention: "81.4%",
      retentionDelta: "+0.4 pts YoY",
      lossRatio: "18.2%",
      lossRatioDelta: "-1.1 pts vs prior quarter",
      combinedRatio: "90.6%",
      combinedRatioDelta: "-0.7 pts vs plan",
    },
    recentlyDelivered: [
      {
        id: "resource-q2-launch-readiness-pptx",
        title: "Q2 Launch Readiness Plan",
        type: "PPTX",
        subtitle: "Launch plan · Delivered by SageSure",
        meta: "Uploaded Mar 10, 2026 · 3.0 MB",
      },
    ],
    recentlyViewed: [
      {
        id: "resource-program-admin-agreement-pdf",
        title: "Program Administrator Agreement",
        type: "PDF",
        subtitle: "Governance document · Recently viewed",
        meta: "Viewed Mar 22, 2026 · 880 KB",
      },
    ],
  },
};

function MetricBadge({
  value,
  positive,
}: {
  value: string;
  positive: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
        positive ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"
      }`}
    >
      {value}
    </span>
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

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ programId: string }>;
}) {
  const { programId } = await params;
  const program = programsById[programId];

  if (!program) {
    return (
      <div className="space-y-6">
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Program</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Program not found</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            The requested program detail view is not available in this demo state.
          </p>
          <Link
            href="/programs"
            className="mt-5 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Programs
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/programs" className="text-sm font-medium text-slate-500 hover:text-slate-700">
          ← Back to Programs
        </Link>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">{program.carrierGroup}</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">{program.name}</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">{program.summary}</p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/materials?program=${encodeURIComponent(program.name)}`}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Resources
              </Link>
              <Link
                href={`/requests?program=${encodeURIComponent(program.name)}`}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Requests
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:min-w-[260px]">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Program details</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Carrier:</span> {program.carrier}
              </p>
              <p>
                <span className="font-medium text-slate-900">States:</span> {program.states.join(", ")}
              </p>
              <p>
                <span className="font-medium text-slate-900">Next review:</span> {program.nextReview}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Embedded performance concept</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">Leadership performance view</h2>
            <p className="mt-2 text-sm text-slate-500">
              A simple embedded concept showing the type of portfolio performance signal leadership users care about most.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">YTD Written Premium</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{program.performance.ytdWrittenPremium}</p>
            <p className="mt-2 text-sm font-medium text-emerald-700">{program.performance.ytdWrittenPremiumDelta}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Retention</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{program.performance.retention}</p>
            <p className="mt-2 text-sm font-medium text-rose-700">{program.performance.retentionDelta}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Loss Ratio</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{program.performance.lossRatio}</p>
            <p className="mt-2 text-sm font-medium text-rose-700">{program.performance.lossRatioDelta}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Combined Ratio</p>
            <p className="mt-3 text-2xl font-semibold text-slate-950">{program.performance.combinedRatio}</p>
            <p className="mt-2 text-sm font-medium text-rose-700">{program.performance.combinedRatioDelta}</p>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Program Snapshot</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Current operating read</h2>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Written Premium</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{program.writtenPremium}</p>
              <div className="mt-2">
                <MetricBadge value={program.writtenPremiumDelta} positive={program.writtenPremiumPositive} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Loss Ratio</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{program.lossRatio}</p>
              <div className="mt-2">
                <MetricBadge value={program.lossRatioDelta} positive={program.lossRatioPositive} />
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Requests</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{program.requestsOpen}</p>
              <p className="mt-2 text-sm text-slate-500">Currently open</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Next Review</p>
              <p className="mt-3 text-2xl font-semibold text-slate-950">{program.nextReview}</p>
              <p className="mt-2 text-sm text-slate-500">Scheduled review date</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Next milestones</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Upcoming work to watch</h2>
            </div>
          </div>

          <div className="space-y-4">
            {program.milestones.map((milestone) => (
              <div key={milestone.title} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{milestone.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{milestone.detail}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {milestone.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">What changed</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Recent program activity</h2>
            </div>
            <Link href="/activity" className="text-sm font-medium text-slate-500 hover:text-slate-700">
              Open Activity
            </Link>
          </div>

          <div className="space-y-4">
            {program.updates.map((update) => (
              <div key={update.title} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-semibold text-slate-900">{update.title}</p>
                <p className="mt-1 text-sm text-slate-600">{update.detail}</p>
                <p className="mt-2 text-xs text-slate-500">{update.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Requests</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Requests tied to this program</h2>
            </div>
            <Link
              href={`/requests?program=${encodeURIComponent(program.name)}`}
              className="text-sm font-medium text-slate-500 hover:text-slate-700"
            >
              Open Requests
            </Link>
          </div>

          <div className="space-y-4">
            {program.requests.map((request) => (
              <div key={request.title} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-900">{request.title}</p>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                    {request.status}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-500">Submitted {request.submittedOn}</p>
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
            {program.recentlyDelivered.map((resource) => (
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
            {program.recentlyViewed.map((resource) => (
              <ResourceRow key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}