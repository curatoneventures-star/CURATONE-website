import { notFound } from "next/navigation";
const docs: Record<string, { t: string; b: string }> = {
  privacy: { t: "Privacy Policy", b: "How CURATONE MUSIC ACADEMY collects and protects personal information, especially that of children. Placeholder: have this reviewed before launch." },
  terms: { t: "Terms of Use", b: "Terms for using this website. Placeholder: have this reviewed before launch." },
  "child-safety": { t: "Child Safety / Media Consent", b: "Photos, audio and video of students are published only with written consent from a parent or guardian, which can be withdrawn at any time. Placeholder: finalise with the academy." },
};
export const generateStaticParams = () => Object.keys(docs).map((doc) => ({ doc }));
export default async function Doc({ params }: { params: Promise<{ doc: string }> }) {
  const d = docs[(await params).doc]; if (!d) notFound();
  return <main className="mx-auto max-w-3xl px-5 py-20"><a href="/" className="text-coral">← Home</a><h1 className="mt-4 font-display text-4xl font-bold">{d.t}</h1><p className="mt-4 text-lg">{d.b}</p></main>;
}
