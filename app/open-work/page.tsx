"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { programs, workItems } from "@/lib/mock-data/portal-data";
import type { JiraStage } from "@/lib/types/portal";

function getStageTone(stage: JiraStage): "default" | "success" | "warning" {
  if (stage === "Complete") return "success";
  if (stage === "Complete - Pending Review") return "warning";
  return "default";
}

export default function OpenWorkPage() {
  const [selectedProgramId, setSelectedProgramId] = useState<string>("all");

  const filteredRequests = useMemo(() => {
    if (selectedProgramId === "all") return workItems;
    return workItems.filter((item) => item.programId === selectedProgramId);
  }, [selectedProgramId]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Requests</h1>
        <p className="mt-2 text-slate-600">
          Carrier requests and operating review follow-up requests unified into one tracked surface.
        </p>
      </section>

      <Card>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-3">
            <Badge>Program</Badge>
            <Badge>Topic</Badge>
            <Badge>Priority</Badge>
            <Badge>Stage</Badge>
            <Badge>Target Date</Badge>
          </div>

          <div className="flex items-center gap-3">
            <label className="text-sm text-slate-600">Program</label>
            <select
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm"
            >
              <option value="all">All Programs</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      <section>
        <SectionHeading
          title="All requests"
          description="Using the client’s exact Jira-backed stages."
        />
        <div className="space-y-4">
          {filteredRequests.map((item) => {
            const program = programs.find((program) => program.id === item.programId);

            return (
              <Card key={item.id}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-xl font-semibold">{item.title}</h2>
                      <Badge tone={getStageTone(item.stage)}>{item.stage}</Badge>
                    </div>

                    <p className="mt-2 text-sm text-slate-600">{item.detail}</p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                      <span>{program?.name}</span>
                      <span>{item.topic}</span>
                      <span>Priority: {item.priority}</span>
                      <span>Target: {item.targetDate}</span>
                      <span>Submitted by: {item.submittedBy}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`/open-work/${item.id}`}
                      className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                    >
                      View Request
                    </a>
                    <button className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">
                      Add Update
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}

          {filteredRequests.length === 0 ? (
            <Card>
              <p className="text-sm text-slate-600">
                No requests are available for that program in the current mock dataset.
              </p>
            </Card>
          ) : null}
        </div>
      </section>
    </div>
  );
}