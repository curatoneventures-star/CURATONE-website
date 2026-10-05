"use client";
import { useState } from "react";
type V = { title: string; category: string; src: string; poster: string; description: string };
export default function VideoCard({ v }: { v: V }) {
  const [play, setPlay] = useState(false);
  return (
    <figure className="card overflow-hidden !p-0">
      <div className="relative aspect-video bg-navy-deep">
        {play ? <video src={v.src} poster={v.poster} controls autoPlay playsInline className="h-full w-full object-contain" />
          : <button onClick={() => setPlay(true)} aria-label={`Play ${v.title}`} className="group h-full w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v.poster} alt={v.title} loading="lazy" className="h-full w-full object-cover" />
              <span className="absolute inset-0 grid place-items-center bg-navy-deep/30 transition group-hover:bg-navy-deep/10"><span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-xl text-navy-deep">▶</span></span>
            </button>}
      </div>
      <figcaption className="p-4"><span className="text-xs font-bold uppercase text-coral">{v.category}</span><h3 className="font-bold">{v.title}</h3><p className="text-sm text-navy/70">{v.description}</p></figcaption>
    </figure>
  );
}
