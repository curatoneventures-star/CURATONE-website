// Backend abstraction: replace body with Supabase/Firebase insert or POST /api/enquiries.
export type Enquiry = Record<string, string>;
export async function submitEnquiry(data: Enquiry): Promise<{ ok: boolean }> {
  const body = encodeURIComponent(Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n"));
  if (typeof window !== "undefined") window.location.href = `mailto:curatone.ventures@gmail.com?subject=${encodeURIComponent("Enquiry - CURATONE MUSIC ACADEMY")}&body=${body}`;
  return { ok: true };
}
