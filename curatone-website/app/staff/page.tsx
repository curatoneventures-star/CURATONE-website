import { redirect } from "next/navigation";
import { currentProfile, supabase } from "@/lib/supabase/server";
import { isStaff, type Student } from "@/lib/roles";
import { logout } from "../actions";
import { updateStudent, addEntry, createStudent, linkAccount } from "./actions";

export const metadata = { title: "Staff | Curatone Music Academy", robots: { index: false } };
export const dynamic = "force-dynamic";
const I = "rounded-xl border border-navy/20 bg-white px-3 py-2 text-sm";

export default async function Staff() {
  const me = await currentProfile();
  if (!me) redirect("/login");
  if (!isStaff(me.role)) redirect("/dashboard");
  const sb = await supabase();
  const { data } = await sb.from("students").select("*, progress_entries(*)").order("full_name");
  const list = (data ?? []) as Student[];
  return (
    <main className="min-h-dvh bg-cream">
      <header className="border-b border-navy/10 bg-white"><div className="mx-auto flex max-w-5xl items-center gap-3 px-5 py-3">
        <b className="font-display">{me.role === "admin" ? "Admin" : "Teacher"} Dashboard</b><span className="ml-auto text-sm">{me.full_name}</span>
        <form action={logout}><button className="btn-ghost !px-4 !py-1.5 text-sm">Log out</button></form></div></header>
      <div className="mx-auto max-w-5xl space-y-6 px-5 py-8">
        {me.role === "admin" && (
          <form action={createStudent} className="card grid gap-3 sm:grid-cols-5">
            <input required name="full_name" placeholder="Student name" className={`${I} sm:col-span-2`} /><input name="age" type="number" placeholder="Age" className={I} />
            <input name="programme" placeholder="Programme" className={I} /><input name="teacher_email" type="email" placeholder="Teacher email (optional)" className={I} />
            <button className="btn-primary sm:col-span-5">Add student</button>
          </form>
        )}
        {list.length === 0 && <p className="card">No students yet.</p>}
        {list.map((s) => (
          <article key={s.id} className="card space-y-4">
            <h2 className="font-display text-xl font-bold">{s.full_name} <span className="text-sm font-normal text-navy/60">{s.programme}</span></h2>
            <form action={updateStudent} className="grid gap-2 sm:grid-cols-4"><input type="hidden" name="id" value={s.id} />
              <input name="level" defaultValue={s.level} placeholder="Level" className={I} /><input name="attendance" type="number" min={0} max={100} defaultValue={s.attendance} className={I} />
              <input name="next_lesson" defaultValue={s.next_lesson ?? ""} placeholder="Next lesson" className={I} /><button className="btn-primary !py-2 text-sm">Save</button></form>
            <form action={addEntry} className="grid gap-2 sm:grid-cols-[150px_1fr_auto]"><input type="hidden" name="id" value={s.id} />
              <select name="kind" className={I}><option value="comment">Comment</option><option value="achievement">Achievement</option><option value="certificate">Certificate</option></select>
              <input required name="body" placeholder="Write an entry parents and the student will see" className={I} /><button className="btn-gold !py-2 text-sm">Add</button></form>
            {me.role === "admin" && (
              <form action={linkAccount} className="flex flex-wrap gap-2"><input type="hidden" name="id" value={s.id} />
                <input required name="email" type="email" placeholder="Link student/parent account email" className={`${I} min-w-0 flex-1`} /><button className="btn-ghost !py-2 text-sm">Link</button></form>
            )}
            <ul className="space-y-1 text-sm">{s.progress_entries.map((e) => <li key={e.id}><b className="capitalize">{e.kind}:</b> {e.body}</li>)}</ul>
          </article>
        ))}
      </div>
    </main>
  );
}
