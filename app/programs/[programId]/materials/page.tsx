import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramSubnav } from "@/components/programs/program-subnav";
import {
  programs,
  recentlyViewedResources,
  resources,
} from "@/lib/mock-data/portal-data";

type ProgramMaterialsPageProps = {
  params: Promise<{ programId: string }>;
};

export default async function ProgramMaterialsPage({
  params,
}: ProgramMaterialsPageProps) {
  const { programId } = await params;
  const program = programs.find((item) => item.id === programId);

  if (!program) notFound();

  const scopedResources = resources.filter((item) => item.programId === program.id);
  const scopedRecentlyViewed = recentlyViewedResources.filter(
    (item) => item.programId === program.id
  );

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">
          {program.carrierGroup} • {program.carrier}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          {program.name}
        </h1>
        <ProgramSubnav programId={program.id} active="materials" />
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <SectionHeading title="Recently delivered" />
          <div className="space-y-4">
            {scopedResources.slice(0, 3).map((resource) => (
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
            ))}
          </div>
        </Card>

        <Card>
          <SectionHeading title="Recently viewed" />
          <div className="space-y-4">
            {scopedRecentlyViewed.slice(0, 3).map((resource) => (
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
                <p className="mt-2 text-xs text-slate-400">{resource.dateLabel}</p>
              </div>
            ))}
          </div>
        </Card>
      </section>

      <section>
        <SectionHeading title="Program Resources" />
        <div className="space-y-4">
          {scopedResources.map((resource) => (
            <Card key={resource.id}>
              <p className="text-sm text-slate-500">{resource.resourceType}</p>
              <Link
                href={`/materials/${resource.id}`}
                className="mt-1 inline-block text-xl font-semibold text-slate-900 underline underline-offset-4"
              >
                {resource.title}
              </Link>
              <p className="mt-2 text-sm text-slate-600">{resource.description}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                <span>{resource.topic}</span>
                <span>{resource.dateLabel}</span>
                <span>{resource.audience}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}