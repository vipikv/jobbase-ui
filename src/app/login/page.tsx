"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      router.push("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-3xl border border-slate-800 bg-slate-950/70 p-8 shadow-2xl shadow-slate-950/40 lg:flex-row lg:p-12">
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Welcome back</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Sign in to unlock the best opportunities.</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-400">
            Manage your profile, track applications, and discover roles created by employers through the connected job board.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <h2 className="text-2xl font-semibold text-white">Login</h2>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 focus:border-cyan-400" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none ring-0 focus:border-cyan-400" placeholder="••••••••" />
            </div>
          </div>
          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
          <button disabled={isLoading} className="mt-6 w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70">
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-400">
            <Link href="/forgot-password" className="hover:text-cyan-300">Forgot password?</Link>
            <Link href="/register" className="hover:text-cyan-300">Create account</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
