import { redirect } from "next/navigation";
import Image from "next/image";
import { currentProfile, supabase } from "@/lib/supabase/server";
import { isStaff, type Student } from "@/lib/roles";
import { logout } from "../actions";
import { media } from "@/lib/site";

export const metadata = { title: "Dashboard | Curatone Music Academy", robots: { index: false } };
export const dynamic = "force-dynamic";

const List = ({ t, items, empty }: { t: string; items: string[]; empty: string }) => (
  <div><h4 className="text-sm font-bold uppercase tracking-wide text-coral">{t}</h4>
    {items.length ? <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{items.map((i, n) => <li key={n}>{i}</li>)}</ul> : <p className="mt-1 text-sm text-navy/50">{empty}</p>}</div>
);
function Child({ s }: { s: Student }) {
  const of = (k: string) => s.progress_entries.filter((e) => e.kind === k).map((e) => e.body);
  return (
    <article className="card space-y-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div><h2 className="font-display text-2xl font-bold">{s.full_name}</h2><p className="text-sm text-navy/70">{s.programme}{s.age ? ` · Age ${s.age}` : ""}</p></div>
        <span className="rounded-full bg-gold px-4 py-1 text-sm font-bold">{s.level}</span>
      </div>
      <div>
        <div className="flex justify-between text-sm font-semibold"><span>Attendance</span><span>{s.attendance}%</span></div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-navy/10" role="progressbar" aria-valuenow={s.attendance} aria-valuemin={0} aria-valuemax={100}><div className="h-full rounded-full bg-teal" style={{ width: `${s.attendance}%` }} /></div>
      </div>
      {s.next_lesson && <p className="rounded-xl bg-gold-soft p-3 text-sm"><b>Next lesson:</b> {s.next_lesson}</p>}
      <div className="grid gap-5 md:grid-cols-3">
        <List t="Achievements" items={of("achievement")} empty="None yet" />
        <List t="Certificates" items={of("certificate")} empty="None yet" />
        <List t="Teacher comments" items={of("comment")} empty="No comments yet" />
      </div>
    </article>
  );
}
export default async function Dashboard() {
  const user = await currentProfile();
  if (!user) redirect("/login");
  if (isStaff(user.role)) redirect("/staff");
  const sb = await supabase(); // RLS returns only this user's linked students
  const { data } = await sb.from("students").select("*, progress_entries(*)").order("full_name");
  const mine = (data ?? []) as Student[];
  return (
    <main className="min-h-dvh bg-cream">
      <header className="border-b border-navy/10 bg-white"><div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-3">
        <Image src={media.logo} alt="" width={36} height={36} /><b className="font-display">{user.role === "parent" ? "Parent Dashboard" : "Student Dashboard"}</b>
        <span className="ml-auto hidden text-sm text-navy/70 sm:block">{user.full_name}</span>
        <form action={logout}><button className="btn-ghost !px-4 !py-1.5 text-sm">Log out</button></form></div></header>
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-8">
        <h1 className="font-display text-3xl font-bold">Welcome, {user.full_name} 🎵</h1>
        {mine.length ? mine.map((s) => <Child key={s.id} s={s} />) : <p className="card">No student records are linked to your account yet. Please contact the academy.</p>}
      </div>
    </main>
  );
}
