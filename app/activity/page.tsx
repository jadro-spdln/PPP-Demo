"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { activityItems, programs } from "@/lib/mock-data/portal-data";
import type { ActivityEventType } from "@/lib/types/portal";

function getEventLabel(type: ActivityEventType) {
  switch (type) {
    case "resource_published":
      return "Resource";
    case "scheduled_report_available":
      return "Reporting";
    case "request_created":
    case "request_stage_changed":
      return "Work";
    case "review_scheduled":
    case "summary_posted":
      return "Review";
    default:
      return "Activity";
  }
}

function getEventAction(item: (typeof activityItems)[number]) {
  if (item.relatedEntityType === "resource" && item.relatedEntityId) {
    return {
      href: `/materials/${item.relatedEntityId}`,
      label: "Open Resource",
    };
  }

  if (item.relatedEntityType === "work" && item.relatedEntityId) {
    return {
      href: `/open-work/${item.relatedEntityId}`,
      label: "Open Work Item",
    };
  }

  if (item.relatedEntityType === "review") {
    return {
      href: "/review-cycles/new",
      label: "Open Review Flow",
    };
  }

  if (item.programId) {
    return {
      href: `/programs/${item.programId}`,
      label: "Open Program",
    };
  }

  return {
    href: "/activity",
    label: "View Activity",
  };
}

export default function ActivityPage() {
  const [selectedProgramId, setSelectedProgramId] = useState("all");
  const [selectedType, setSelectedType] = useState<ActivityEventType | "all">("all");
  const [selectedPriority, setSelectedPriority] = useState<"all" | "Low" | "Normal" | "High">("all");
  const [selectedTimeBucket, setSelectedTimeBucket] = useState<"all" | "Today" | "This Week" | "Earlier">("all");

  const filteredItems = useMemo(() => {
    return activityItems.filter((item) => {
      const matchesProgram =
        selectedProgramId === "all" || item.programId === selectedProgramId;
      const matchesType = selectedType === "all" || item.type === selectedType;
      const matchesPriority =
        selectedPriority === "all" || item.priority === selectedPriority;
      const matchesTimeBucket =
        selectedTimeBucket === "all" || item.timeBucket === selectedTimeBucket;

      return matchesProgram && matchesType && matchesPriority && matchesTimeBucket;
    });
  }, [selectedProgramId, selectedPriority, selectedTimeBucket, selectedType]);

  const grouped = {
    Today: filteredItems.filter((item) => item.timeBucket === "Today"),
    "This Week": filteredItems.filter((item) => item.timeBucket === "This Week"),
    Earlier: filteredItems.filter((item) => item.timeBucket === "Earlier"),
  };

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Activity</h1>
        <p className="mt-2 text-slate-600">
          Track what has changed across your relationship with SageSure through a
          deterministic stream of platform events.
        </p>
      </section>

      <Card>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Program</span>
            <select
              value={selectedProgramId}
              onChange={(e) => setSelectedProgramId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <option value="all">All Programs</option>
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Event type</span>
            <select
              value={selectedType}
              onChange={(e) =>
                setSelectedType(e.target.value as ActivityEventType | "all")
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <option value="all">All event types</option>
              <option value="resource_published">Resource</option>
              <option value="scheduled_report_available">Reporting</option>
              <option value="request_created">Work created</option>
              <option value="request_stage_changed">Work updated</option>
              <option value="review_scheduled">Review scheduled</option>
              <option value="summary_posted">Summary posted</option>
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Priority</span>
            <select
              value={selectedPriority}
              onChange={(e) =>
                setSelectedPriority(e.target.value as "all" | "Low" | "Normal" | "High")
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <option value="all">All priorities</option>
              <option value="High">High</option>
              <option value="Normal">Normal</option>
              <option value="Low">Low</option>
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Timeframe</span>
            <select
              value={selectedTimeBucket}
              onChange={(e) =>
                setSelectedTimeBucket(
                  e.target.value as "all" | "Today" | "This Week" | "Earlier"
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <option value="all">All time</option>
              <option value="Today">Today</option>
              <option value="This Week">This Week</option>
              <option value="Earlier">Earlier</option>
            </select>
          </label>
        </div>
      </Card>

      {(["Today", "This Week", "Earlier"] as const).map((bucket) => {
        const items = grouped[bucket];
        if (items.length === 0) return null;

        return (
          <section key={bucket}>
            <SectionHeading title={bucket} />
            <div className="space-y-4">
              {items.map((item) => {
                const action = getEventAction(item);
                const program = programs.find((program) => program.id === item.programId);

                return (
                  <Card key={item.id}>
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge>{getEventLabel(item.type)}</Badge>
                          <Badge tone={item.priority === "High" ? "warning" : "default"}>
                            {item.priority}
                          </Badge>
                        </div>

                        <p className="mt-3 font-medium text-slate-900">{item.title}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.detail}</p>
                        <p className="mt-3 text-xs text-slate-400">
                          {program ? `${program.name} • ` : ""}
                          {item.timestamp}
                        </p>
                      </div>

                      <Link
                        href={action.href}
                        className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700"
                      >
                        {action.label}
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>
        );
      })}

      {filteredItems.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-600">
            No activity matched those filters. Try broadening the program, type,
            priority, or timeframe.
          </p>
        </Card>
      ) : null}
    </div>
  );
}