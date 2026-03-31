import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProgramSubnav } from "@/components/programs/program-subnav";
import { programs, workItems } from "@/lib/mock-data/portal-data";

type ProgramOpenWorkPageProps = {
  params: Promise<{ programId: string }>;
};

export default async function ProgramOpenWorkPage({
  params,
}: ProgramOpenWorkPageProps) {
  const { programId } = await params;
  const program = programs.find((item) => item.id === programId);

  if (!program) notFound();

  const scopedRequests = workItems.filter((item) => item.programId === program.id);

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">
          {program.carrierGroup} • {program.carrier}
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">{program.name}</h1>
        <ProgramSubnav programId={program.id} active="open-work" />
      </section>

      <section>
        <SectionHeading title="Program Requests" />
        <div className="space-y-4">
          {scopedRequests.map((item) => (
            <Card key={item.id}>
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href={`/open-work/${item.id}`}
                  className="text-xl font-semibold text-slate-900 underline underline-offset-4"
                >
                  {item.title}
                </Link>
                <Badge>{item.stage}</Badge>
              </div>

              <p className="mt-2 text-sm text-slate-600">{item.detail}</p>

              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                <span>{item.topic}</span>
                <span>Priority: {item.priority}</span>
                <span>Target: {item.targetDate}</span>
                <span>Submitted by: {item.submittedBy}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}