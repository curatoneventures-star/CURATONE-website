import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Profile } from "../roles";

export async function supabase() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: { getAll: () => store.getAll(), setAll: (l) => { try { l.forEach(({ name, value, options }) => store.set(name, value, options)); } catch { /* called from a Server Component */ } } },
  });
}
// getUser() verifies the token with Supabase (never trust getSession() on the server).
export async function currentProfile(): Promise<Profile | null> {
  const sb = await supabase();
  const { data: { user } } = await sb.auth.getUser();
  if (!user) return null;
  const { data } = await sb.from("profiles").select("id, full_name, role").eq("id", user.id).single();
  return (data as Profile) ?? null;
}
