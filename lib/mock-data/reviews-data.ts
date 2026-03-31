export type ReviewStatus = "upcoming" | "completed";
export type AgendaRequestStatus = "new" | "reviewing" | "incorporated";

export type ReviewTopic = {
  id: string;
  label: string;
};

export type AgendaRequest = {
  id: string;
  reviewId: string;
  title: string;
  description: string;
  submittedAt: string;
  submittedBy: string;
  attachments: string[];
  status: AgendaRequestStatus;
};

export type ReviewAction = {
  id: string;
  title: string;
  owner: string;
  dueDate: string;
  status: "active" | "closed";
  programs: string[];
};

export type OperatingReview = {
  id: string;
  title: string;
  holdingCompany: string;
  programs: string[];
  scheduledFor: string;
  location: string;
  attendees: string[];
  status: ReviewStatus;
  summary: string[];
  keyTopics: ReviewTopic[];
  notes?: string;
  actionsAndAgreements: ReviewAction[];
};

export const operatingReviews: OperatingReview[] = [
  {
    id: "review-valence-march-2026",
    title: "Valence Monthly Operating Review",
    holdingCompany: "Valence",
    programs: ["Auros", "Interboro", "SafeChoice"],
    scheduledFor: "2026-04-09T13:00:00",
    location: "Virtual · Google Meet",
    attendees: [
      "Terry Walsh",
      "Andy Nwaelele",
      "Christian Henson",
      "Valence Leadership Team",
    ],
    status: "upcoming",
    summary: [
      "Review March production against plan across the Valence portfolio.",
      "Discuss retention softness in two coastal segments and proposed underwriting adjustments.",
      "Confirm timing and readiness for the next product and guideline updates.",
    ],
    keyTopics: [
      { id: "topic-1", label: "Production vs Plan" },
      { id: "topic-2", label: "Retention Performance" },
      { id: "topic-3", label: "Guideline Updates" },
      { id: "topic-4", label: "Q2 Launch Readiness" },
    ],
    notes:
      "This meeting should balance portfolio performance review with forward-looking operating decisions that affect all three Valence entities.",
    actionsAndAgreements: [],
  },
  {
    id: "review-valence-feb-2026",
    title: "Valence Monthly Operating Review",
    holdingCompany: "Valence",
    programs: ["Auros", "Interboro", "SafeChoice"],
    scheduledFor: "2026-03-12T13:00:00",
    location: "Virtual · Google Meet",
    attendees: [
      "Terry Walsh",
      "Andy Nwaelele",
      "Christian Henson",
      "Valence Leadership Team",
    ],
    status: "completed",
    summary: [
      "February written premium finished slightly above plan, led by SafeChoice new business growth.",
      "Retention improved in two key states after late-January pricing and appetite refinements.",
      "SageSure committed to circulate updated underwriting guidance before the next review cycle.",
    ],
    keyTopics: [
      { id: "topic-1", label: "Written Premium" },
      { id: "topic-2", label: "Retention Recovery" },
      { id: "topic-3", label: "Underwriting Guidance" },
    ],
    actionsAndAgreements: [
      {
        id: "action-1",
        title: "Share revised coastal underwriting guidance with partner leadership",
        owner: "SageSure Product & Underwriting",
        dueDate: "2026-03-22",
        status: "active",
        programs: ["Auros", "Interboro"],
      },
      {
        id: "action-2",
        title: "Revisit Q2 production targets using updated retention assumptions",
        owner: "Valence Finance",
        dueDate: "2026-03-29",
        status: "active",
        programs: ["SafeChoice", "Interboro", "Auros"],
      },
    ],
  },
  {
    id: "review-valence-jan-2026",
    title: "Valence Monthly Operating Review",
    holdingCompany: "Valence",
    programs: ["Auros", "Interboro", "SafeChoice"],
    scheduledFor: "2026-02-13T13:00:00",
    location: "Virtual · Google Meet",
    attendees: [
      "Terry Walsh",
      "Andy Nwaelele",
      "Christian Henson",
      "Valence Leadership Team",
    ],
    status: "completed",
    summary: [
      "January loss ratio remained within tolerance, but margin pressure increased due to reinsurance costs.",
      "Leadership aligned on presenting product update timing more clearly to carrier teams.",
      "A standing agreement was made to carry open portfolio topics month to month until resolved.",
    ],
    keyTopics: [
      { id: "topic-1", label: "Loss Performance" },
      { id: "topic-2", label: "Margin Pressure" },
      { id: "topic-3", label: "Portfolio Topics" },
    ],
    actionsAndAgreements: [
      {
        id: "action-3",
        title: "Publish recurring operating review artifact pack before each monthly session",
        owner: "Carrier Ops",
        dueDate: "2026-02-28",
        status: "closed",
        programs: ["Auros", "Interboro", "SafeChoice"],
      },
    ],
  },
];

export const agendaItemRequests: AgendaRequest[] = [
  {
    id: "agenda-1",
    reviewId: "review-valence-march-2026",
    title: "Discuss Florida coastal retention drop",
    description:
      "We would like time in the next review to understand whether the recent retention softness is being driven more by pricing changes or by underwriting appetite shifts.",
    submittedAt: "2026-03-21T10:14:00",
    submittedBy: "Mike Reynolds · Valence",
    attachments: ["Retention commentary draft.pdf"],
    status: "reviewing",
  },
  {
    id: "agenda-2",
    reviewId: "review-valence-march-2026",
    title: "Add a short update on Q2 product rollout timing",
    description:
      "Please include a clear update on expected launch timing, dependencies, and any anticipated operational readiness needs from our teams.",
    submittedAt: "2026-03-23T15:42:00",
    submittedBy: "Alan Moore · SafeChoice",
    attachments: [],
    status: "new",
  },
];

export function getUpcomingReview() {
  return operatingReviews.find((review) => review.status === "upcoming") ?? operatingReviews[0];
}

export function getCompletedReviews() {
  return operatingReviews.filter((review) => review.status === "completed");
}

export function getReviewById(reviewId: string) {
  return operatingReviews.find((review) => review.id === reviewId);
}

export function getAgendaRequestsForReview(reviewId: string) {
  return agendaItemRequests.filter((request) => request.reviewId === reviewId);
}