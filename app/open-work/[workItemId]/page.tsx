import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { programs, resources, workItems } from "@/lib/mock-data/portal-data";

type WorkItemDetailPageProps = {
  params: Promise<{ workItemId: string }>;
};

function getRelatedResources(workItemId: string, programId: string) {
  const byProgram = resources.filter((item) => item.programId === programId);

  const manualMap: Record<string, string[]> = {
    w1: ["r5", "r9"],
    w2: ["r3"],
    w3: ["r2", "rv1"],
    w4: ["r1"],
    w5: ["r4"],
    w6: ["rv5"],
    w7: ["r7"],
    w8: ["r10"],
    w9: ["rv4"],
    w10: ["r1", "r2"],
  };

  const mappedIds = manualMap[workItemId] ?? [];
  const mapped = byProgram.filter((item) => mappedIds.includes(item.id));

  return mapped.slice(0, 3);
}

export default async function WorkItemDetailPage({
  params,
}: WorkItemDetailPageProps) {
  const { workItemId } = await params;
  const request = workItems.find((item) => item.id === workItemId);

  if (!request) notFound();

  const program = programs.find((item) => item.id === request.programId);
  const relatedResources = getRelatedResources(request.id, request.programId);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{request.title}</h1>
          <Badge>{request.stage}</Badge>
        </div>

        <p className="mt-3 max-w-3xl text-slate-600">{request.detail}</p>

        <div className="mt-6 flex flex-wrap gap-3 text-sm text-slate-500">
          <span>{program?.name}</span>
          <span>{request.topic}</span>
          <span>Priority: {request.priority}</span>
          <span>Target: {request.targetDate}</span>
          <span>Submitted by: {request.submittedBy}</span>
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <SectionHeading title="Request timeline" />
          <div className="space-y-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">Submitted</p>
              <p className="mt-1 text-sm text-slate-600">
                Request was received and entered into the workflow.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">Current stage</p>
              <p className="mt-1 text-sm text-slate-600">
                This request is currently in{" "}
                <span className="font-medium">{request.stage}</span>.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-sm font-medium text-slate-900">Target date</p>
              <p className="mt-1 text-sm text-slate-600">{request.targetDate}</p>
            </div>
          </div>
        </Card>

        <Card>
          <SectionHeading title="Request details" />
          <div className="space-y-3 text-sm text-slate-700">
            <p>
              <span className="font-medium">Program:</span> {program?.name}
            </p>
            <p>
              <span className="font-medium">Topic:</span> {request.topic}
            </p>
            <p>
              <span className="font-medium">Priority:</span> {request.priority}
            </p>
            <p>
              <span className="font-medium">Submitted by:</span> {request.submittedBy}
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <SectionHeading title="Related resources" />
          <div className="space-y-4">
            {relatedResources.length > 0 ? (
              relatedResources.map((resource) => (
                <div
                  key={resource.id}
                  className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                >
                  <Link
                    href={`/materials/${resource.id}`}
                    className="font-medium text-slate-900 underline underline-offset-4"
                  >
                    {resource.title}
                  </Link>
                  <p className="mt-1 text-sm text-slate-600">
                    {resource.description}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    {resource.resourceType} • {resource.dateLabel}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">
                No directly related resources are mapped for this request yet.
              </p>
            )}
          </div>
        </Card>

        <Card>
          <SectionHeading title="Actions" />
          <div className="space-y-3">
            <button className="w-full rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
              Add Update
            </button>
            <Link
              href={`/programs/${request.programId}`}
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700"
            >
              Open Program
            </Link>
            <Link
              href="/open-work"
              className="block w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700"
            >
              Back to Requests
            </Link>
          </div>
        </Card>
      </section>
    </div>
  );
}