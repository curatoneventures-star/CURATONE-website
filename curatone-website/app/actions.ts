"use server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase/server";
export async function login(_p: string | null, fd: FormData) {
  const sb = await supabase();
  const { error } = await sb.auth.signInWithPassword({ email: String(fd.get("email") ?? "").trim(), password: String(fd.get("password") ?? "") });
  if (error) return "Incorrect email or password.";
  redirect("/dashboard");
}
export async function logout() { await (await supabase()).auth.signOut(); redirect("/login"); }
