"use client";

import { useEffect, useState } from "react";
import { JobCard } from "@/components/JobCard";
import { getJobs, type JobPost } from "@/lib/api";

export default function Home() {
  const [jobs, setJobs] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJobs = async () => {
      try {
        console.log("Calling getJobs...");
        const response = await getJobs();
        console.log("api data coming ----------:", response);
        setJobs(response.jobPosts || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to load jobs");
        console.log("Error loading jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    loadJobs();
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.16),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-12 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto flex max-w-7xl flex-col gap-10 rounded-[2rem] border border-slate-800 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/35 lg:flex-row lg:items-center lg:justify-between lg:p-12">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Modern hiring experience</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
            Discover the right role and build your future with JobBase.
          </h1>
          <p className="mt-5 text-lg text-slate-400">
            Browse live job posts from the connected Express API, sign in instantly, and manage your profile from a polished Next.js experience.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/register" className="rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
              Create account
            </a>
            <a href="/login" className="rounded-full border border-slate-700 px-5 py-3 font-semibold text-slate-200 transition hover:border-slate-500 hover:text-cyan-300">
              Sign in
            </a>
          </div>
        </div>
        <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-400">Today&apos;s snapshot</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-800/80 p-4">
              <p className="text-3xl font-semibold text-white">{jobs.length}</p>
              <p className="mt-1 text-sm text-slate-400">Open roles</p>
            </div>
            <div className="rounded-2xl bg-slate-800/80 p-4">
              <p className="text-3xl font-semibold text-white">24/7</p>
              <p className="mt-1 text-sm text-slate-400">Access anytime</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-7xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Latest openings</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Job posts from the backend</h2>
        </div>

        {loading ? (
          <p className="text-slate-400">Loading jobs…</p>
        ) : error ? (
          <p className="text-rose-400">{error}</p>
        ) : jobs.length === 0 ? (
          <p className="text-slate-400">_ _</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {jobs.map((job) => (
              <JobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
