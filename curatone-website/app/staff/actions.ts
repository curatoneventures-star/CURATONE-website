"use server";
import { revalidatePath } from "next/cache";
import { supabase, currentProfile } from "@/lib/supabase/server";
import { isStaff } from "@/lib/roles";

// Every action re-checks the role on the server; Postgres RLS is a second, independent lock.
async function staff() { const p = await currentProfile(); if (!p || !isStaff(p.role)) throw new Error("Forbidden"); return p; }
async function admin() { const p = await staff(); if (p.role !== "admin") throw new Error("Forbidden"); return p; }
const s = (fd: FormData, k: string) => String(fd.get(k) ?? "").trim();

export async function updateStudent(fd: FormData) {
  await staff(); const sb = await supabase();
  await sb.from("students").update({ level: s(fd, "level"), attendance: Math.min(100, Math.max(0, Number(s(fd, "attendance")) || 0)), next_lesson: s(fd, "next_lesson") }).eq("id", s(fd, "id"));
  revalidatePath("/staff"); revalidatePath("/dashboard");
}
export async function addEntry(fd: FormData) {
  const p = await staff(); const sb = await supabase(); const kind = s(fd, "kind"), body = s(fd, "body");
  if (!["achievement", "certificate", "comment"].includes(kind) || !body) return;
  await sb.from("progress_entries").insert({ student_id: s(fd, "id"), kind, body, created_by: p.id });
  revalidatePath("/staff"); revalidatePath("/dashboard");
}
export async function createStudent(fd: FormData) {
  await admin(); const sb = await supabase();
  let teacher_id: string | null = null;
  if (s(fd, "teacher_email")) { const { data } = await sb.from("profiles").select("id").eq("email", s(fd, "teacher_email").toLowerCase()).eq("role", "teacher").single(); teacher_id = data?.id ?? null; }
  await sb.from("students").insert({ full_name: s(fd, "full_name"), age: Number(s(fd, "age")) || null, programme: s(fd, "programme"), teacher_id });
  revalidatePath("/staff");
}
export async function linkAccount(fd: FormData) {
  await admin(); const sb = await supabase();
  const { data: u } = await sb.from("profiles").select("id").eq("email", s(fd, "email").toLowerCase()).single();
  if (u) await sb.from("student_links").upsert({ student_id: s(fd, "id"), user_id: u.id });
  revalidatePath("/staff"); revalidatePath("/dashboard");
}
