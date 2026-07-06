"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { updateUserProfile } from "@/lib/api";

export default function SettingsPage() {
  const router = useRouter();
  const { user, token, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || "");
  const [city, setCity] = useState(user?.address?.city || "");
  const [country, setCountry] = useState(user?.address?.country || "");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    }
  }, [router, token]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user?._id) return;
    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await updateUserProfile(user._id, {
        name,
        phoneNumber,
        address: { city, country },
      });
      updateUser(response.user);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_45%),linear-gradient(135deg,_#020617,_#111827)] px-4 py-16 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl border border-slate-800 bg-slate-950/75 p-8 shadow-2xl shadow-slate-950/40 lg:p-12">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Account settings</p>
        <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">Update your profile and preferences.</h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-400">This view uses the same Express user update route as the backend so your account data stays in sync.</p>

        <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-slate-300">Full name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Phone number</label>
              <input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">City</label>
              <input value={city} onChange={(e) => setCity(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
            </div>
            <div>
              <label className="mb-2 block text-sm text-slate-300">Country</label>
              <input value={country} onChange={(e) => setCountry(e.target.value)} className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-400" />
            </div>
          </div>
          {message ? <p className="mt-4 text-sm text-emerald-400">{message}</p> : null}
          {error ? <p className="mt-4 text-sm text-rose-400">{error}</p> : null}
          <button disabled={isSaving} className="mt-6 rounded-full bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:opacity-70">
            {isSaving ? "Saving..." : "Save changes"}
          </button>
        </form>
      </div>
    </main>
  );
}
