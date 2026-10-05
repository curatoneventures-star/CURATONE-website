"use client";
import { useActionState } from "react";
import { login } from "../actions";
export default function Login() {
  const [err, action, pending] = useActionState(login, null);
  return (
    <main className="grid min-h-dvh place-items-center bg-gradient-to-br from-gold-soft to-white p-5">
      <form action={action} className="card w-full max-w-sm space-y-4">
        <a href="/" className="text-sm text-coral">← Back to website</a>
        <h1 className="font-display text-3xl font-bold">Student & Parent Portal</h1>
        <input required name="email" type="email" autoComplete="username" placeholder="Email" className="w-full rounded-xl border border-navy/20 px-4 py-3" />
        <input required name="password" type="password" autoComplete="current-password" placeholder="Password" className="w-full rounded-xl border border-navy/20 px-4 py-3" />
        {err && <p role="alert" className="text-sm font-semibold text-coral">{err}</p>}
        <button disabled={pending} className="btn-primary w-full">{pending ? "Signing in…" : "Sign in"}</button>
      </form>
    </main>
  );
}
