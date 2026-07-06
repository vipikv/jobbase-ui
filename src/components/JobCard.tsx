import type { JobPost } from "@/lib/api";

export function JobCard({ job }: { job: JobPost }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-cyan-400">{job.jobType || "Full time"}</p>
          <h3 className="text-xl font-semibold text-white">{job.title}</h3>
        </div>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-300">
          {job.status || "Open"}
        </span>
      </div>

      <p className="mb-4 line-clamp-3 text-sm text-slate-400">{job.description}</p>
      <div className="mb-4 flex flex-wrap gap-2 text-sm text-slate-300">
        <span className="rounded-full bg-slate-800 px-3 py-1">{job.location}</span>
        <span className="rounded-full bg-slate-800 px-3 py-1">
          {job.salary ? `$${job.salary.toLocaleString()}` : "Salary negotiable"}
        </span>
        <span className="rounded-full bg-slate-800 px-3 py-1">{job.experience || "Any level"}</span>
      </div>

      <div className="flex items-center justify-between text-sm text-slate-400">
        <span>{job.employer?.name || "Hiring team"}</span>
        <button className="rounded-full border border-cyan-500/40 px-3 py-2 font-medium text-cyan-300 transition hover:border-cyan-400 hover:bg-cyan-500/10">
          Apply now
        </button>
      </div>
    </article>
  );
}
