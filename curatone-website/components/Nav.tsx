"use client";
import { useState } from "react";
import Image from "next/image";
import { nav, media, site } from "@/lib/site";
import AskAI from "./AskAI";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [ai, setAi] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <a href="#home" className="flex items-center gap-2" aria-label={site.name}>
          <Image src={media.logo} alt="" width={40} height={40} priority />
          <span className="hidden font-display text-sm font-bold leading-tight sm:block">CURATONE<br />MUSIC ACADEMY</span>
        </a>
        <nav className="ml-auto hidden items-center gap-4 text-sm font-medium xl:flex">
          {nav.map(([l, h]) => <a key={h} href={h} className="hover:text-coral">{l}</a>)}
        </nav>
        <button onClick={() => setAi(true)} className="btn-gold ml-auto !px-4 !py-2 text-sm xl:ml-2">✨ Ask Curatone AI</button>
        <a href="#enrol" className="btn-primary hidden !px-4 !py-2 text-sm md:inline-flex">Book a Trial Class</a>
        <button className="xl:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
      </div>
      {open && (
        <nav className="grid gap-1 border-t border-navy/10 bg-cream px-5 py-3 xl:hidden">
          {nav.map(([l, h]) => <a key={h} href={h} onClick={() => setOpen(false)} className="py-2 font-medium">{l}</a>)}
          <a href="#enrol" onClick={() => setOpen(false)} className="btn-primary mt-2">Book a Trial Class</a>
        </nav>
      )}
      {ai && <AskAI onClose={() => setAi(false)} />}
    </header>
  );
}
