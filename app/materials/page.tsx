import Link from "next/link";

const topicCards = [
  {
    title: "Portfolio Management",
    subtitle: "Projections, Profitability, Reinsurance, etc.",
  },
  {
    title: "Reporting",
    subtitle: "Financial, Compliance, Production, etc.",
  },
  {
    title: "Presentations & Meeting Materials",
    subtitle: "Operating Reviews, External Presentations, Recurring Touchbases, etc.",
  },
  {
    title: "Product & Underwriting",
    subtitle: "Guidelines, Rating Manuals, Forms Lists, etc.",
  },
];

const resources = [
  {
    id: "resource-valence-march-review-pdf",
    title: "Valence March Operating Review",
    type: "PDF",
    subtitle: "Operating review deck · Portfolio Management",
    meta: "Uploaded Mar 21, 2026 · 2.4 MB",
  },
  {
    id: "resource-coastal-guidance-docx",
    title: "Coastal Underwriting Guidance Update",
    type: "DOCX",
    subtitle: "Guidance memo · Product & Underwriting",
    meta: "Uploaded Mar 19, 2026 · 640 KB",
  },
  {
    id: "resource-commission-settlement-csv",
    title: "Commission Settlement Detail",
    type: "CSV",
    subtitle: "Settlement export · Reporting",
    meta: "Uploaded Mar 18, 2026 · 190 KB",
  },
  {
    id: "resource-loss-ratio-workbook-xlsx",
    title: "Loss Ratio Trend Workbook",
    type: "XLSX",
    subtitle: "Analytics workbook · Reporting",
    meta: "Uploaded Mar 17, 2026 · 1.1 MB",
  },
  {
    id: "resource-program-admin-agreement-pdf",
    title: "Program Administrator Agreement",
    type: "PDF",
    subtitle: "Governance document · Portfolio Management",
    meta: "Uploaded Mar 12, 2026 · 880 KB",
  },
  {
    id: "resource-q2-launch-readiness-pptx",
    title: "Q2 Launch Readiness Plan",
    type: "PPTX",
    subtitle: "Launch plan · Presentations & Meeting Materials",
    meta: "Uploaded Mar 10, 2026 · 3.0 MB",
  },
];

function ResourceRow({
  resource,
}: {
  resource: (typeof resources)[number];
}) {
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

export default function MaterialsPage() {
  const recentlyDelivered = resources.slice(0, 3);
  const recentlyViewed = [resources[3], resources[4], resources[5]];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Resources</p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-950">Resource Library</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">
              Browse program resources, meeting materials, reporting artifacts, and reference documents delivered across the partnership.
            </p>
          </div>

          <div className="w-full lg:max-w-xs">
            <label className="mb-2 block text-sm font-medium text-slate-700">Program</label>
            <select className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400">
              <option>All Programs</option>
              <option>SafeChoice</option>
              <option>Interboro Preferred</option>
              <option>Auros Coastal</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Topics</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Browse by resource topic</h2>
        </div>

        <div className="grid gap-4 min-[480px]:grid-cols-2 xl:grid-cols-4">
          {topicCards.map((topic) => (
            <div key={topic.title} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-base font-semibold text-slate-950">{topic.title}</p>
              <p className="mt-2 text-sm text-slate-500">{topic.subtitle}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Recently delivered</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">New resources from SageSure</h2>
          </div>
          <div className="space-y-3">
            {recentlyDelivered.map((resource) => (
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
            {recentlyViewed.map((resource) => (
              <ResourceRow key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">All resources</p>
            <h2 className="mt-2 text-xl font-semibold text-slate-950">Browse all files</h2>
          </div>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
            {resources.length} items
          </span>
        </div>

        <div className="space-y-3">
          {resources.map((resource) => (
            <ResourceRow key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}