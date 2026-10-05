// AI abstraction layer. UI talks ONLY to getAIService(). Swap the provider (Gemini, etc.) here.
export type ChatMessage = { role: "user" | "assistant"; content: string };
export interface AIService { send(history: ChatMessage[], userId?: string): Promise<string>; }

class MockAIService implements AIService {
  async send(history: ChatMessage[]) {
    await new Promise((r) => setTimeout(r, 600));
    const q = history[history.length - 1]?.content.toLowerCase() ?? "";
    if (q.includes("programme")) return "We offer Piano, Keyboard, Music Theory, Voice & Singing, a Children's Music Programme, Performance Training, Examination Preparation and Music Production. See the Programmes section for details.";
    if (q.includes("instrument")) return "Piano and keyboard are great starting points for most learners. Book a trial class and our team will help you choose.";
    if (q.includes("about") || q.includes("curatone")) return "CURATONE MUSIC ACADEMY in Enugu State, Nigeria provides structured, engaging music education, founded and directed by Othniel Chuks.";
    return "Curatone AI is still being connected, so I can't answer that in full yet. Please use 'Talk to the academy' or the enquiry form and the team will help.";
  }
}
// Live provider: server route /api/ai calls Gemini (key stays server-side). Set NEXT_PUBLIC_AI_MODE=mock to use canned answers.
class HttpAIService implements AIService {
  async send(history: ChatMessage[], userId?: string) {
    const r = await fetch("/api/ai", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ history, userId }) });
    return (await r.json()).reply as string;
  }
}
export const getAIService = (): AIService => process.env.NEXT_PUBLIC_AI_MODE === "mock" ? new MockAIService() : new HttpAIService();
