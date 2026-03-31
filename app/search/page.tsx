"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  metricSearchResults,
  programs,
  resources,
  workItems,
} from "@/lib/mock-data/portal-data";
import type { SearchResult } from "@/lib/types/portal";

type ResultTypeFilter = "All" | "Resource" | "Request" | "Review" | "Metric";

function buildSearchResults(): SearchResult[] {
  const resourceResults: SearchResult[] = resources.map((resource) => {
    const isReview = resource.resourceType === "Review Deck";

    return {
      id: resource.id,
      type: isReview ? "Review" : "Resource",
      title: resource.title,
      description: resource.description,
      programId: resource.programId,
      programName: programs.find((p) => p.id === resource.programId)?.name,
      topic: resource.topic,
      dateLabel: resource.dateLabel,
      actionLabel: isReview ? "Open Review Resource" : "Open Resource",
    };
  });

  const requestResults: SearchResult[] = workItems.map((request) => ({
    id: request.id,
    type: "Request",
    title: request.title,
    description: request.detail,
    programId: request.programId,
    programName: programs.find((p) => p.id === request.programId)?.name,
    topic: request.topic,
    dateLabel: "Updated recently",
    stage: request.stage,
    priority: request.priority,
    targetDate: request.targetDate,
    actionLabel: "Open Request",
  }));

  return [...resourceResults, ...requestResults, ...metricSearchResults];
}

function getResultAction(result: SearchResult) {
  if (result.type === "Resource" || result.type === "Review") {
    return {
      href: `/materials/${result.id}`,
      label: result.actionLabel ?? "Open Resource",
    };
  }

  if (result.type === "Request") {
    return {
      href: `/open-work/${result.id}`,
      label: result.actionLabel ?? "Open Request",
    };
  }

  return {
    href: result.programId ? `/programs/${result.programId}` : "/search",
    label: result.actionLabel ?? "Open Result",
  };
}

export default function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(urlQuery);
  const [selectedType, setSelectedType] = useState<ResultTypeFilter>("All");
  const [selectedProgramId, setSelectedProgramId] = useState("all");

  useEffect(() => {
    setQuery(urlQuery);
  }, [urlQuery]);

  const allSearchResults = useMemo(() => buildSearchResults(), []);

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = query.trim();

    if (!trimmed) {
      router.push("/search");
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  const filteredResults = useMemo(() => {
    return allSearchResults.filter((result) => {
      const matchesQuery =
        urlQuery.trim().length === 0
          ? true
          : [
              result.title,
              result.description,
              result.programName ?? "",
              result.type,
              result.topic ?? "",
              result.stage ?? "",
              result.priority ?? "",
              result.targetDate ?? "",
            ]
              .join(" ")
              .toLowerCase()
              .includes(urlQuery.toLowerCase());

      const matchesType =
        selectedType === "All" ? true : result.type === selectedType;

      const matchesProgram =
        selectedProgramId === "all" ? true : result.programId === selectedProgramId;

      return matchesQuery && matchesType && matchesProgram;
    });
  }, [allSearchResults, selectedProgramId, selectedType, urlQuery]);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
        <p className="mt-2 text-slate-600">
          Unified retrieval across resources, requests, reviews, and metric references.
        </p>
      </section>

      <Card>
        <div className="space-y-4">
          <form onSubmit={handleSearchSubmit} className="space-y-2">
            <label className="block text-sm font-medium text-slate-700">
              Search query
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by program, topic, resource, or request"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
              />
              <button
                type="submit"
                className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white"
              >
                Search
              </button>
            </div>
          </form>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-medium text-slate-700">Result type</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as ResultTypeFilter)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
              >
                <option value="All">All</option>
                <option value="Resource">Resources</option>
                <option value="Request">Requests</option>
                <option value="Review">Reviews</option>
                <option value="Metric">Metrics</option>
              </select>
            </label>

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
          </div>

          <div className="flex flex-wrap gap-3">
            <Badge>Cross-entity search</Badge>
            <Badge>Program-aware</Badge>
            <Badge>Resource Library included</Badge>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            {urlQuery ? (
              <>
                Showing results for:{" "}
                <span className="font-medium text-slate-900">{urlQuery}</span>
              </>
            ) : (
              "Showing all searchable mock results"
            )}
          </div>
        </div>
      </Card>

      <section>
        <SectionHeading
          title="Results"
          description={`${filteredResults.length} result${
            filteredResults.length === 1 ? "" : "s"
          }`}
        />
        <div className="space-y-4">
          {filteredResults.map((result) => {
            const action = getResultAction(result);

            return (
              <Card key={`${result.type}-${result.id}`}>
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Badge>{result.type}</Badge>
                      {result.topic ? <Badge>{result.topic}</Badge> : null}
                      {result.stage ? <Badge>{result.stage}</Badge> : null}
                    </div>

                    <h2 className="mt-3 text-lg font-semibold">{result.title}</h2>
                    <p className="mt-2 text-sm text-slate-600">{result.description}</p>

                    <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-400">
                      {result.programName ? <span>{result.programName}</span> : null}
                      <span>{result.dateLabel}</span>
                      {result.priority ? <span>Priority: {result.priority}</span> : null}
                      {result.targetDate ? <span>Target: {result.targetDate}</span> : null}
                    </div>
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

          {filteredResults.length === 0 ? (
            <Card>
              <div className="space-y-3">
                <p className="font-medium text-slate-900">No results found</p>
                <p className="text-sm text-slate-600">
                  No resources, requests, reviews, or metrics matched that search.
                  Try a program name, work type, reporting topic, or resource title.
                </p>
                <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                  <span>Example: Interboro</span>
                  <span>Example: Reporting</span>
                  <span>Example: Contracting</span>
                  <span>Example: Guideline Update</span>
                </div>
              </div>
            </Card>
          ) : null}
        </div>
      </section>
    </div>
  );
}