"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import { programs } from "@/lib/mock-data/portal-data";

export default function NewRequestPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-semibold tracking-tight">Ask SageSure</h1>
        <p className="mt-2 max-w-3xl text-slate-600">
          A lightweight intake flow for questions, requests, and follow-up items.
          In the real product, this would create a Jira-backed request using the
          client’s required stage model.
        </p>
      </section>

      <Card>
        <SectionHeading title="Request details" />
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Program</span>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3">
              {programs.map((program) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Topic</span>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3">
              <option>Reporting</option>
              <option>Operating Reviews</option>
              <option>Product & Underwriting</option>
              <option>Claims</option>
              <option>Modeling & Projections</option>
            </select>
          </label>
        </div>

        <label className="mt-4 block space-y-2 text-sm">
          <span className="font-medium text-slate-700">Title</span>
          <input className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3" />
        </label>

        <label className="mt-4 block space-y-2 text-sm">
          <span className="font-medium text-slate-700">Description</span>
          <textarea
            rows={6}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
          />
        </label>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Priority</span>
            <select className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
              <option>Critical</option>
            </select>
          </label>

          <label className="space-y-2 text-sm">
            <span className="font-medium text-slate-700">Target date</span>
            <input
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3"
            />
          </label>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setSubmitted(true)}
            className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Submit Request
          </button>
          <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            Cancel
          </button>
        </div>

        {submitted ? (
          <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-medium text-emerald-800">Request submitted</p>
            <p className="mt-2 text-sm text-emerald-700">
              In the real product, this would create a Jira-backed item beginning in
              the <span className="font-medium">Submitted</span> stage.
            </p>
          </div>
        ) : null}
      </Card>
    </div>
  );
}