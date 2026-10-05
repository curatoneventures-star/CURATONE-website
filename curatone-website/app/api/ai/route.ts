import { NextResponse } from "next/server";
import { systemPrompt } from "@/lib/knowledge";

const hits = new Map<string, number[]>(); // best-effort per-instance rate limit (use Upstash/Redis at scale)
const FALLBACK = "Curatone AI is resting for a moment. Please use the enquiry form or WhatsApp and the academy team will help.";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "anon";
  const now = Date.now(), recent = (hits.get(ip) ?? []).filter((t) => now - t < 60_000);
  if (recent.length >= 12) return NextResponse.json({ reply: "You're sending messages quickly. Please wait a minute and try again." }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const key = process.env.GEMINI_API_KEY;
  if (!key) return NextResponse.json({ reply: FALLBACK });
  try {
    const { history } = await req.json();
    const contents = (Array.isArray(history) ? history : []).slice(-10).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user", parts: [{ text: String(m.content ?? "").slice(0, 1000) }],
    }));
    while (contents.length && contents[0].role !== "user") contents.shift(); // Gemini needs a user turn first
    if (!contents.length) return NextResponse.json({ reply: "How can I help you today?" });

    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL ?? "gemini-2.5-flash"}:generateContent`, {
      method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({ systemInstruction: { parts: [{ text: systemPrompt }] }, contents, generationConfig: { maxOutputTokens: 600, temperature: 0.6 } }),
    });
    if (!r.ok) { console.error("Gemini error", r.status); return NextResponse.json({ reply: FALLBACK }); }
    const j = await r.json();
    const reply = j.candidates?.[0]?.content?.parts?.map((p: { text?: string }) => p.text ?? "").join("").trim();
    return NextResponse.json({ reply: reply || FALLBACK });
  } catch { return NextResponse.json({ reply: FALLBACK }); }
}
