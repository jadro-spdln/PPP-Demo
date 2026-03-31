import Link from "next/link";

type ResourceDetail = {
  id: string;
  title: string;
  type: string;
  category: string;
  deliveredBy: string;
  updatedAt: string;
  fileSize: string;
  description: string;
  highlights: string[];
  previewLines: string[];
};

const resourcesById: Record<string, ResourceDetail> = {
  "resource-valence-march-review-pdf": {
    id: "resource-valence-march-review-pdf",
    title: "Valence March Operating Review",
    type: "PDF",
    category: "Meeting deck",
    deliveredBy: "SageSure Carrier Ops",
    updatedAt: "Mar 21, 2026",
    fileSize: "2.4 MB",
    description:
      "Monthly operating review deck summarizing written premium, retention performance, loss commentary, and decisions heading into the next cycle.",
    highlights: [
      "Written premium tracking above plan through March.",
      "Retention softness isolated to a narrower coastal segment than previously assumed.",
      "Next-step decisions documented for underwriting guidance and Q2 readiness.",
    ],
    previewLines: [
      "Valence Monthly Operating Review",
      "March 2026 · Portfolio Performance Summary",
      "Sections included: production, retention, profitability, action items, and launch readiness.",
    ],
  },
  "resource-coastal-guidance-docx": {
    id: "resource-coastal-guidance-docx",
    title: "Coastal Underwriting Guidance Update",
    type: "DOCX",
    category: "Guidance memo",
    deliveredBy: "SageSure Underwriting",
    updatedAt: "Mar 19, 2026",
    fileSize: "640 KB",
    description:
      "Operational summary of revised coastal underwriting parameters with emphasis on referrals, restrictions, and expected reviewer handling.",
    highlights: [
      "Clarifies new referral thresholds by coastal proximity.",
      "Distinguishes restricted ZIP clusters from cautionary guidance areas.",
      "Adds examples to support partner underwriting teams.",
    ],
    previewLines: [
      "Coastal Underwriting Guidance Update",
      "Prepared for program partners and carrier stakeholders.",
      "Use this memo alongside the latest appetite matrix for operational decisions.",
    ],
  },
  "resource-commission-settlement-csv": {
    id: "resource-commission-settlement-csv",
    title: "Commission Settlement Detail",
    type: "CSV",
    category: "Settlement export",
    deliveredBy: "SageSure Finance",
    updatedAt: "Mar 18, 2026",
    fileSize: "190 KB",
    description:
      "Settlement extract supporting commission reconciliation across the current month-end close cycle.",
    highlights: [
      "Includes February adjustments and late policy movements.",
      "Prepared for partner-side finance reconciliation.",
      "Useful supporting export for downstream internal reporting.",
    ],
    previewLines: [
      "program_id,month,written_premium,commission_due,adjustment_flag",
      "safechoice,2026-02,2410000,180750,false",
      "interboro,2026-02,1950000,146250,true",
    ],
  },
  "resource-loss-ratio-workbook-xlsx": {
    id: "resource-loss-ratio-workbook-xlsx",
    title: "Loss Ratio Trend Workbook",
    type: "XLSX",
    category: "Analytics workbook",
    deliveredBy: "SageSure Analytics",
    updatedAt: "Mar 17, 2026",
    fileSize: "1.1 MB",
    description:
      "Workbook used to analyze recent loss ratio movement across the portfolio and highlight deviations versus expected performance bands.",
    highlights: [
      "Shows monthly movement in YTD loss ratio across the book.",
      "Supports leadership review conversations.",
      "Pairs with operating review commentary and loss review materials.",
    ],
    previewLines: [
      "Sheet 1: Portfolio YTD Loss Ratio",
      "Sheet 2: Program-Level Variance",
      "Sheet 3: Large-Loss Commentary Inputs",
    ],
  },
  "resource-program-admin-agreement-pdf": {
    id: "resource-program-admin-agreement-pdf",
    title: "Program Administrator Agreement",
    type: "PDF",
    category: "Governance document",
    deliveredBy: "SageSure Legal",
    updatedAt: "Mar 12, 2026",
    fileSize: "880 KB",
    description:
      "Core governance agreement governing the operating relationship, responsibilities, and commercial framework for the partnership.",
    highlights: [
      "Current operative agreement version for the program relationship.",
      "Important for onboarding, governance, and reference.",
      "One of the documents leadership users are likely to revisit often.",
    ],
    previewLines: [
      "Program Administrator Agreement",
      "This preview represents a governance reference document within the demo.",
      "Formal legal language omitted for brevity in this mock experience.",
    ],
  },
  "resource-q2-launch-readiness-pptx": {
    id: "resource-q2-launch-readiness-pptx",
    title: "Q2 Launch Readiness Plan",
    type: "PPTX",
    category: "Launch plan",
    deliveredBy: "SageSure Product",
    updatedAt: "Mar 10, 2026",
    fileSize: "3.0 MB",
    description:
      "Readiness deck outlining dependencies, milestone timing, communication needs, and launch-critical coordination items for the next release window.",
    highlights: [
      "Covers launch milestones, dependencies, and owners.",
      "Useful for operating review preparation and partner visibility.",
      "Provides a believable preview file for the homepage demo flow.",
    ],
    previewLines: [
      "Q2 Launch Readiness Plan",
      "Milestones · Dependencies · Communications · Operational Readiness",
      "Prepared for leadership visibility across the entire portfolio.",
    ],
  },
};

export default async function MaterialDetailPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  const resource = resourcesById[materialId];

  if (!resource) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Resource Preview</p>
          <h1 className="mt-2 text-2xl font-semibold text-slate-950">Resource not found</h1>
          <p className="mt-3 max-w-2xl text-sm text-slate-600">
            The requested mock preview file is not available in this demo state.
          </p>
          <Link
            href="/materials"
            className="mt-5 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <Link href="/materials" className="text-sm font-medium text-slate-500 hover:text-slate-700">
          ← Back to Resource Library
        </Link>

        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                {resource.type}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {resource.category}
              </span>
            </div>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">{resource.title}</h1>
            <p className="mt-3 max-w-3xl text-sm text-slate-600">{resource.description}</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 lg:min-w-[260px]">
            <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">File details</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-medium text-slate-900">Delivered by:</span> {resource.deliveredBy}
              </p>
              <p>
                <span className="font-medium text-slate-900">Updated:</span> {resource.updatedAt}
              </p>
              <p>
                <span className="font-medium text-slate-900">Size:</span> {resource.fileSize}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Mock preview</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Preview file contents</h2>

          <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="space-y-3 text-sm text-slate-700">
              {resource.previewLines.map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Why it matters</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Key takeaways</h2>
          <ul className="mt-5 space-y-3 text-sm text-slate-600">
            {resource.highlights.map((highlight, index) => (
              <li key={index} className="flex gap-2">
                <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}