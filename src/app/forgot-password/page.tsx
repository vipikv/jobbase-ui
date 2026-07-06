"use client";

import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      await forgotPassword(email);
      setMessage("If that email exists, a reset token has been generated. Use your API backend to complete the reset flow.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to request reset");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-800 bg-slate-950/75 p-8 shadow-2xl shadow-slate-950/40">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Reset access</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Forgot your password?</h1>
        <p className="mt-4 text-lg text-slate-400">Enter the email tied to your account and we will begin the reset flow.</p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <label className="mb-2 block text-sm text-slate-300">Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" placeholder="you@example.com" />
          {message ? <p className="mt-4 text-sm text-emerald-400">{message}</p> : null}
          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
          <button disabled={isLoading} className="mt-6 w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70">
            {isLoading ? "Submitting..." : "Send reset request"}
          </button>
          <p className="mt-3 text-sm text-slate-400">
            Back to <Link href="/login" className="text-cyan-300">login</Link>
          </p>
        </form>
      </div>
    </main>
  );
}
