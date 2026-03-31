import Link from "next/link";

const programs = [
  {
    id: "safechoice",
    name: "SafeChoice",
    carrierGroup: "Valence",
    carrier: "SafeChoice",
    states: ["FL", "LA", "SC"],
    writtenPremium: "$12.4M",
    lossRatio: "16.9%",
    status: "Performing above plan",
  },
  {
    id: "interboro-preferred",
    name: "Interboro Preferred",
    carrierGroup: "Valence",
    carrier: "Interboro",
    states: ["NY", "NJ", "CT"],
    writtenPremium: "$9.8M",
    lossRatio: "20.8%",
    status: "Needs monitoring",
  },
  {
    id: "auros-coastal",
    name: "Auros Coastal",
    carrierGroup: "Valence",
    carrier: "Auros",
    states: ["FL", "TX"],
    writtenPremium: "$7.1M",
    lossRatio: "18.2%",
    status: "Slightly behind plan",
  },
];

export default function ProgramsPage() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-slate-500">Programs</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-950">Portfolio programs at a glance</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600">
          Review each program, jump into operating reviews, and open the related request queue with the right
          program context already in focus.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        {programs.map((program) => (
          <article key={program.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.14em] text-slate-500">
                  {program.carrierGroup}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-slate-950">{program.name}</h2>
                <p className="mt-1 text-sm text-slate-500">Carrier: {program.carrier}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                {program.states.join(", ")}
              </span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Written Premium</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{program.writtenPremium}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Loss Ratio</p>
                <p className="mt-2 text-lg font-semibold text-slate-950">{program.lossRatio}</p>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-slate-200 p-4">
              <p className="text-xs font-medium uppercase tracking-[0.12em] text-slate-500">Current read</p>
              <p className="mt-2 text-sm font-medium text-slate-900">{program.status}</p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/programs/${program.id}`}
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                View Details
              </Link>
              <Link
                href="/review-cycles"
                className="rounded-2xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                View Review Cycle
              </Link>
              <Link
                href={`/requests?program=${encodeURIComponent(program.name)}`}
                className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Open Requests
              </Link>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}