"use client";

import Link from "next/link";
import { use, useMemo, useState } from "react";
import { useDemoRole } from "@/lib/hooks/use-demo-role";
import {
  getAgendaRequestsForReview,
  getReviewById,
} from "@/lib/mock-data/reviews-data";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function ReviewDetailPage({
  params,
}: {
  params: Promise<{ reviewId: string }>;
}) {
  const resolvedParams = use(params);
  const { isAdmin, isReady } = useDemoRole();

  const review = useMemo(() => getReviewById(resolvedParams.reviewId), [resolvedParams.reviewId]);
  const agendaRequests = useMemo(
    () => getAgendaRequestsForReview(resolvedParams.reviewId),
    [resolvedParams.reviewId],
  );

  const [summaryDraft, setSummaryDraft] = useState(() => review?.summary.join("\n") ?? "");
  const [topicsDraft, setTopicsDraft] = useState(
    () => review?.keyTopics.map((topic) => topic.label).join(", ") ?? "",
  );

  if (!isReady) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading review…</div>;
  }

  if (!review) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-lg font-semibold text-slate-900">Review not found</p>
        <p className="mt-2 text-sm text-slate-500">
          The requested Operating Review could not be located in the demo data.
        </p>
        <Link
          href="/review-cycles"
          className="mt-4 inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to Operating Reviews
        </Link>
      </div>
    );
  }

  const renderedSummary = summaryDraft
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const renderedTopics = topicsDraft
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link
            href="/review-cycles"
            className="text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            ← Back to Operating Reviews Hub
          </Link>
          <h1 className="mt-2 text-3xl font-semibold text-slate-950">{review.title}</h1>
          <p className="mt-2 text-sm text-slate-600">
            {review.holdingCompany} · {formatDateTime(review.scheduledFor)} · {review.location}
          </p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          {isAdmin ? "SageSure Admin view" : "Program Partner view"}
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.45fr_0.95fr]">
        <section className="space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <p className="text-sm font-semibold text-slate-900">Programs in scope</p>
            <p className="mt-2 text-sm text-slate-600">{review.programs.join(", ")}</p>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">Key topics</p>
              {isAdmin ? <span className="text-xs text-slate-500">Editable in admin mode</span> : null}
            </div>

            {isAdmin ? (
              <textarea
                value={topicsDraft}
                onChange={(event) => setTopicsDraft(event.target.value)}
                rows={3}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              />
            ) : null}

            <div className="mt-3 flex flex-wrap gap-2">
              {renderedTopics.map((topic) => (
                <span
                  key={topic}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-slate-900">Meeting summary</p>
              {isAdmin ? <span className="text-xs text-slate-500">Editable in admin mode</span> : null}
            </div>

            {isAdmin ? (
              <textarea
                value={summaryDraft}
                onChange={(event) => setSummaryDraft(event.target.value)}
                rows={7}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none focus:border-slate-400"
              />
            ) : null}

            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              {renderedSummary.map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-2">
                  <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-slate-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {review.notes ? (
            <div>
              <p className="text-sm font-semibold text-slate-900">Facilitator note</p>
              <p className="mt-2 text-sm text-slate-600">{review.notes}</p>
            </div>
          ) : null}
        </section>

        <aside className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Attendees</p>
            <div className="mt-4 space-y-2">
              {review.attendees.map((attendee) => (
                <div key={attendee} className="rounded-2xl bg-slate-50 px-3 py-2 text-sm text-slate-700">
                  {attendee}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-slate-900">Actions & Agreements</p>
                <p className="mt-1 text-xs text-slate-500">
                  Follow-up work and documented commitments tied to this review.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {review.actionsAndAgreements.length}
              </span>
            </div>
            <div className="space-y-3">
              {review.actionsAndAgreements.length ? (
                review.actionsAndAgreements.map((item) => (
                  <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-xs text-slate-500">Owner: {item.owner}</p>
                    <p className="mt-1 text-xs text-slate-500">Due: {item.dueDate}</p>
                    <p className="mt-1 text-xs text-slate-500">Programs: {item.programs.join(", ")}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                  No actions or agreements have been linked to this review yet.
                </div>
              )}
            </div>
          </section>

          {isAdmin ? (
            <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Submitted agenda requests</p>
                  <p className="mt-1 text-xs text-slate-500">
                    Partner-submitted items awaiting review or incorporation.
                  </p>
                </div>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  {agendaRequests.length}
                </span>
              </div>
              <div className="space-y-3">
                {agendaRequests.length ? (
                  agendaRequests.map((request) => (
                    <div key={request.id} className="rounded-2xl border border-slate-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-semibold text-slate-900">{request.title}</p>
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
                          {request.status}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{request.description}</p>
                      <div className="mt-3 space-y-1 text-xs text-slate-500">
                        <p>Submitted by: {request.submittedBy}</p>
                        <p>Submitted: {formatDateTime(request.submittedAt)}</p>
                        <p>Attachments: {request.attachments.length ? request.attachments.join(", ") : "None"}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                    No agenda requests have been submitted for this review.
                  </div>
                )}
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}