"use client";
import { useState } from "react";
import { submitEnquiry } from "@/lib/services/enquiries";
import { programmes } from "@/lib/site";

const F = "w-full rounded-xl border border-navy/20 bg-white px-4 py-3 text-sm";
export default function EnquiryForm() {
  const [done, setDone] = useState(false);
  return (
    <form className="card grid gap-3 sm:grid-cols-2" onSubmit={async (e) => {
      e.preventDefault(); await submitEnquiry(Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>); setDone(true);
    }}>
      <input required name="Parent/Guardian Name" placeholder="Parent/Guardian Name" className={F} />
      <input required name="Student Name" placeholder="Student Name" className={F} />
      <input required name="Age" type="number" min={2} placeholder="Age" className={F} />
      <input required name="Phone Number" type="tel" placeholder="Phone Number" className={F} />
      <input name="Email" type="email" placeholder="Email" className={`${F} sm:col-span-2`} />
      <select name="Preferred Programme" className={F} defaultValue="">
        <option value="" disabled>Preferred Programme</option>{programmes.map((p) => <option key={p.id}>{p.title}</option>)}
      </select>
      <input name="Instrument" placeholder="Instrument" className={F} />
      <select name="Previous Experience" className={F} defaultValue=""><option value="" disabled>Previous Experience</option><option>None</option><option>Some</option><option>Experienced</option></select>
      <select name="Preferred Lesson Type" className={F} defaultValue=""><option value="" disabled>Preferred Lesson Type</option><option>In-person</option><option>Online</option><option>Group</option><option>One-to-one</option></select>
      <textarea name="Message" rows={3} placeholder="Message" className={`${F} sm:col-span-2`} />
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <button className="btn-primary">Submit Enquiry</button>
        <button name="Request" value="Trial Class" className="btn-gold">Book a Trial Class</button>
      </div>
      {done && <p role="status" className="text-sm font-semibold text-teal sm:col-span-2">Thank you! Your email app should open to send your enquiry.</p>}
    </form>
  );
}
