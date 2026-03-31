"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AdminModeToggle } from "@/components/admin/admin-mode-toggle";
import { useDemoRole } from "@/lib/hooks/use-demo-role";
import {
  agendaItemRequests,
  getCompletedReviews,
  getUpcomingReview,
  type AgendaRequest,
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

function RequestAgendaItemModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [attachments, setAttachments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) {
    return null;
  }

  const canSubmit = title.trim().length > 0 && description.trim().length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">Request Agenda Item</h3>
            <p className="mt-1 text-sm text-slate-500">
              Suggest a topic for the next Operating Review. SageSure will review and fold it into the session as appropriate.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 hover:bg-slate-200"
          >
            Close
          </button>
        </div>

        {submitted ? (
          <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
            <p className="font-medium text-emerald-900">Agenda item request submitted</p>
            <p className="mt-1 text-sm text-emerald-800">
              For the demo, this submission is shown as successful locally. In the real build, it would create a tracked request record.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">Agenda item title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Example: Review Q2 retention outlook for Florida coastal business"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={5}
                placeholder="Add context on the question, why it matters, and anything SageSure should prepare before the meeting."
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-800">Supporting attachments</label>
              <input
                value={attachments}
                onChange={(event) => setAttachments(event.target.value)}
                placeholder="Example: retention-analysis.pdf, q2-notes.docx"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none ring-0 placeholder:text-slate-400 focus:border-slate-400"
              />
              <p className="mt-2 text-xs text-slate-500">Demo input only. Comma-separate filenames for now.</p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!canSubmit}
                onClick={() => setSubmitted(true)}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              >
                Submit request
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TopicPills({ topics }: { topics: { id: string; label: string }[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {topics.map((topic) => (
        <span
          key={topic.id}
          className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
        >
          {topic.label}
        </span>
      ))}
    </div>
  );
}

function AgendaRequestCard({ request }: { request: AgendaRequest }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-center justify-between gap-3">
        <h4 className="text-sm font-semibold text-slate-900">{request.title}</h4>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium capitalize text-amber-700">
          {request.status}
        </span>
      </div>
      <p className="text-sm text-slate-600">{request.description}</p>
      <div className="mt-3 space-y-1 text-xs text-slate-500">
        <p>Submitted by: {request.submittedBy}</p>
        <p>Submitted: {formatDateTime(request.submittedAt)}</p>
        <p>Attachments: {request.attachments.length ? request.attachments.join(", ") : "None"}</p>
      </div>
    </div>
  );
}

export function OperatingReviewsHub() {
  const { isAdmin, isReady } = useDemoRole();
  const [activeTab, setActiveTab] = useState<"reviews" | "actions">("reviews");
  const [isAgendaModalOpen, setIsAgendaModalOpen] = useState(false);

  const upcomingReview = useMemo(() => getUpcomingReview(), []);
  const recentReviews = useMemo(() => getCompletedReviews(), []);
  const upcomingAgendaRequests = useMemo(
    () => agendaItemRequests.filter((request) => request.reviewId === upcomingReview.id),
    [upcomingReview.id],
  );
  const allActions = useMemo(
    () => recentReviews.flatMap((review) => review.actionsAndAgreements),
    [recentReviews],
  );

  if (!isReady) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">Loading Operating Reviews…</div>;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Operating Reviews Hub</p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-950">Portfolio review cycles, decisions, and follow-up work</h1>
            <p className="mt-2 max-w-3xl text-sm text-slate-600">
              Track upcoming reviews, revisit prior meetings, and keep actions tied to operational decisions visible across the partnership.
            </p>
          </div>

          <div className="flex w-full flex-col gap-3 xl:max-w-md xl:items-end">
            <AdminModeToggle />
            {isAdmin ? (
              <Link
                href="/review-cycles/new"
                className="inline-flex rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
              >
                Create another review
              </Link>
            ) : null}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`rounded-2xl px-4 py-2 text-sm font-medium ${
              activeTab === "reviews" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Operating Reviews
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("actions")}
            className={`rounded-2xl px-4 py-2 text-sm font-medium ${
              activeTab === "actions" ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Actions & Agreements
          </button>
        </div>
      </section>

      {activeTab === "reviews" ? (
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Upcoming operating review</p>
                <h2 className="mt-2 text-2xl font-semibold text-slate-950">{upcomingReview.title}</h2>
                <p className="mt-2 text-sm text-slate-600">
                  Everything below applies to this specific upcoming meeting so partners can understand the session at a glance.
                </p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {upcomingReview.holdingCompany}
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">When</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{formatDateTime(upcomingReview.scheduledFor)}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Programs</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{upcomingReview.programs.join(", ")}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4 md:col-span-2 xl:col-span-1">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Attendees</p>
                <p className="mt-2 text-sm font-medium text-slate-900">{upcomingReview.attendees.length} invited</p>
              </div>
            </div>

            <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-900">Meeting summary</p>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {upcomingReview.summary.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="mt-1 block h-1.5 w-1.5 rounded-full bg-slate-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-900">Key topics</p>
                  <TopicPills topics={upcomingReview.keyTopics} />
                </div>

                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-900">Attendees</p>
                  <div className="grid gap-2 md:grid-cols-2">
                    {upcomingReview.attendees.map((attendee) => (
                      <div key={attendee} className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                        {attendee}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {isAdmin ? (
                  <div>
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Submitted agenda requests</p>
                        <p className="mt-1 text-xs text-slate-500">Partner-submitted topics for this upcoming meeting.</p>
                      </div>
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        {upcomingAgendaRequests.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {upcomingAgendaRequests.length ? (
                        upcomingAgendaRequests.map((request) => <AgendaRequestCard key={request.id} request={request} />)
                      ) : (
                        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                          No agenda requests have been submitted for this review yet.
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-3">
                  {isAdmin ? (
                    <Link
                      href={`/review-cycles/${upcomingReview.id}`}
                      className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                    >
                      Edit meeting
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAgendaModalOpen(true)}
                      className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
                    >
                      Request Agenda Item
                    </button>
                  )}

                  <Link
                    href={`/review-cycles/${upcomingReview.id}`}
                    className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    View meeting detail
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Recent operating reviews</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">Past meetings and their outcomes</h2>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                {recentReviews.length} reviews
              </span>
            </div>

            <div className="space-y-4">
              {recentReviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-slate-200 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">{review.title}</p>
                      <p className="mt-1 text-sm text-slate-500">{formatDateTime(review.scheduledFor)}</p>
                      <div className="mt-3">
                        <TopicPills topics={review.keyTopics} />
                      </div>
                    </div>
                    <Link
                      href={`/review-cycles/${review.id}`}
                      className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    >
                      View review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Actions & agreements</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Follow-up work across completed operating reviews</h2>
            </div>
            <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
              {allActions.length} items
            </span>
          </div>

          <div className="space-y-4">
            {allActions.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Owner: {item.owner} · Due {item.dueDate} · Programs: {item.programs.join(", ")}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium capitalize text-slate-700">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <RequestAgendaItemModal isOpen={isAgendaModalOpen} onClose={() => setIsAgendaModalOpen(false)} />
    </div>
  );
}