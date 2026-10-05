import { site } from "@/lib/site";
export default function WhatsAppFab() {
  return <a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat with Curatone on WhatsApp" className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-2xl shadow-xl transition hover:scale-110">💬</a>;
}
