"use client";
import { useEffect, useRef, useState } from "react";
import { getAIService, ChatMessage } from "@/lib/services/ai";

const prompts = ["Tell me about Curatone", "Explore our programmes", "Help me choose an instrument", "Teach me music", "Give me a practice exercise", "Find a music resource", "Talk to the academy"];

export default function AskAI({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<ChatMessage[]>([{ role: "assistant", content: "Hi! I'm Curatone AI. How can I help you today?" }]);
  const [text, setText] = useState(""); const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);
  useEffect(() => { const k = (e: KeyboardEvent) => e.key === "Escape" && onClose(); window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k); }, [onClose]);

  async function send(t: string) {
    if (!t.trim() || busy) return;
    const next = [...msgs, { role: "user" as const, content: t }];
    setMsgs(next); setText(""); setBusy(true);
    try { setMsgs([...next, { role: "assistant", content: await getAIService().send(next) }]); }
    catch { setMsgs([...next, { role: "assistant", content: "Sorry, something went wrong. Please try again." }]); }
    setBusy(false);
  }
  return (
    <div role="dialog" aria-modal="true" aria-label="Curatone AI" className="fixed inset-0 z-50 flex items-end justify-center bg-navy-deep/60 p-0 sm:items-center sm:p-4" onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} className="flex h-[85dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:h-[640px] sm:rounded-3xl">
        <div className="flex items-center justify-between bg-gradient-to-r from-navy to-navy-deep px-5 py-4 text-white">
          <b>✨ Curatone AI</b><button onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {msgs.map((m, i) => <p key={i} className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm ${m.role === "user" ? "ml-auto bg-navy text-white" : "bg-gold-soft"}`}>{m.content}</p>)}
          {busy && <p className="text-sm text-navy/50">Curatone AI is typing…</p>}
          {msgs.length === 1 && <div className="flex flex-wrap gap-2">{prompts.map((p) => <button key={p} onClick={() => send(p)} className="rounded-full border border-navy/20 px-3 py-1 text-xs hover:bg-gold-soft">{p}</button>)}</div>}
          <div ref={end} />
        </div>
        <div className="flex gap-2 border-t p-3">
          <input value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send(text)} placeholder="Ask about music or the academy…" className="min-w-0 flex-1 rounded-full border border-navy/20 px-4 py-2 text-sm" />
          <button onClick={() => send(text)} className="btn-primary !px-4 !py-2 text-sm">Send</button>
        </div>
      </div>
    </div>
  );
}
