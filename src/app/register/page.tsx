"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "job_seeker",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      await register(form);
      setMessage("Account created successfully. Please sign in.");
      setTimeout(() => router.push("/login"), 900);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/75 p-8 shadow-2xl shadow-slate-950/40 lg:p-12">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Create account</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Join JobBase as a job seeker or employer.</h1>
          <p className="mt-4 text-lg text-slate-400">The register endpoint is already wired to the Express API and will create a user record for your workspace backend.</p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm text-slate-300">Full name</label>
            <input required value={form.name} onChange={(e) => handleChange("name", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Email</label>
            <input type="email" required value={form.email} onChange={(e) => handleChange("email", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Phone number</label>
            <input required value={form.phoneNumber} onChange={(e) => handleChange("phoneNumber", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Password</label>
            <input type="password" required value={form.password} onChange={(e) => handleChange("password", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-300">Role</label>
            <select value={form.role} onChange={(e) => handleChange("role", e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400">
              <option value="job_seeker">Job seeker</option>
              <option value="employer">Employer</option>
            </select>
          </div>
          <div className="md:col-span-2">
            {message ? <p className="text-sm text-emerald-400">{message}</p> : null}
            {error ? <p className="text-sm text-rose-400">{error}</p> : null}
            <button disabled={isLoading} className="mt-4 w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70">
              {isLoading ? "Creating account..." : "Create account"}
            </button>
            <p className="mt-3 text-sm text-slate-400">
              Already have an account? <Link href="/login" className="text-cyan-300">Sign in</Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
