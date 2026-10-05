import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WhatsAppFab from "@/components/WhatsAppFab";
import VideoCard from "@/components/VideoCard";
import EnquiryForm from "@/components/EnquiryForm";
import { site, media, programmes, ageGroups, steps } from "@/lib/site";

const Soon = ({ children }: { children: React.ReactNode }) => <div className="card border-2 border-dashed border-navy/15 text-center text-navy/70">{children}</div>;

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <section id="home" className="relative overflow-hidden bg-gradient-to-br from-gold-soft via-cream to-white">
          <div className="section grid items-center gap-10 !py-12 md:grid-cols-2 md:!py-20">
            <div>
              <p className="eyebrow">♪ {site.name} · Enugu</p>
              <h1 className="mt-3 font-display text-4xl font-bold leading-tight md:text-6xl">Discover the Joy of Music. <span className="text-coral">Build the Skills for Life.</span></h1>
              <p className="mt-5 max-w-xl text-lg text-navy/80">Curatone Music Academy provides structured, engaging music education that helps children, teenagers and aspiring musicians develop confidence, creativity, musical skills and a lasting love for music.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#programmes" className="btn-primary">Explore Our Programmes</a>
                <a href="#enrol" className="btn-gold">Book a Trial Class</a>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -inset-3 rotate-3 rounded-[2rem] bg-gradient-to-br from-gold to-coral opacity-70" />
              <Image src={media.hero} alt="A Curatone student practising on a keyboard from sheet music" width={960} height={1280} priority className="relative aspect-[4/5] rounded-[2rem] object-cover shadow-2xl" />
            </div>
          </div>
        </section>

        <section id="about" className="section">
          <p className="eyebrow">About Us</p><h2 className="h2">Music education that builds the whole child</h2>
          <p className="mt-4 max-w-3xl text-lg text-navy/80">Our mission is to nurture creativity, confidence and discipline through structured music learning, combining musical knowledge, practical skills, performance and cognitive development for long-term growth.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {ageGroups.map((a, i) => <div key={a.title} className="card"><span className={`text-3xl`}>{["🌱", "🎵", "🎸", "🎹"][i]}</span><h3 className="mt-2 font-bold">{a.title}</h3><p className="text-sm text-navy/70">{a.note}</p></div>)}
          </div>
        </section>

        <section id="founder" className="bg-navy text-white">
          <div className="section grid items-center gap-10 md:grid-cols-[320px_1fr]">
            <Image src={media.founder} alt="Othniel Chuks, Founder and Director" width={800} height={1000} className="mx-auto w-full max-w-xs rounded-3xl object-cover shadow-2xl ring-4 ring-gold" />
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-gold">Meet the Founder & Director</p>
              <h2 className="mt-2 font-display text-4xl font-bold">Othniel Chuks</h2>
              <p className="mt-1 font-semibold text-gold">Founder & Director, Curatone Music Academy</p>
              <p className="text-sm text-white/70">Music Educator | Physiotherapist</p>
              <p className="mt-5 text-white/90">Othniel has years of experience teaching music and a strong passion for working with children. His vision is to help them discover their musical abilities, develop confidence, creativity and discipline, build musical knowledge and strengthen cognitive abilities, with skills that benefit them whether or not they pursue music professionally. His background as a physiotherapist has deepened his appreciation for people, development, learning and care.</p>
              <blockquote className="mt-6 border-l-4 border-gold pl-4 font-display text-lg italic">“I believe every child deserves the opportunity to discover what they can do. Through music, we can help children develop knowledge, confidence, creativity and skills that can stay with them for life.”</blockquote>
            </div>
          </div>
        </section>

        <section id="programmes" className="section">
          <p className="eyebrow">Programmes</p><h2 className="h2">Find your sound</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {programmes.map((p) => <article key={p.id} className="card transition hover:-translate-y-1"><div className="text-4xl">{p.icon}</div><h3 className="mt-3 font-display text-xl font-bold">{p.title}</h3><p className="mt-1 text-sm text-navy/70">{p.text}</p></article>)}
          </div>
        </section>

        <section className="bg-gold-soft">
          <div className="section">
            <p className="eyebrow">How Learning Works</p><h2 className="h2">Four steps, one musical journey</h2>
            <ol className="mt-8 grid gap-5 md:grid-cols-4">
              {steps.map((s) => <li key={s.n} className="card"><span className="font-display text-4xl font-bold text-coral">{s.n}</span><h3 className="mt-2 font-bold">{s.t}</h3><p className="text-sm text-navy/70">{s.d}</p></li>)}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="rounded-3xl bg-gradient-to-br from-navy to-navy-deep p-8 text-white md:p-12">
            <h2 className="font-display text-3xl font-bold md:text-4xl">Take Your Music Further</h2>
            <p className="mt-3 max-w-3xl text-white/85">Curatone Music Academy prepares interested students for recognized external music examination pathways, subject to the requirements of the relevant examining body.</p>
          </div>
        </section>

        <section id="resources" className="section !pt-0">
          <p className="eyebrow">Curatone Music Resources</p><h2 className="h2">Videos, audio and song sheets</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <Soon>🎬 <b>Videos</b><br />See our class videos in the Gallery below.</Soon>
            <Soon>🎧 <b>Audio</b><br />Practice tracks and ear training. Coming soon.</Soon>
            <Soon>📄 <b>Song Sheets</b><br />Scores, worksheets and exercises. Coming soon.</Soon>
          </div>
        </section>

        <section id="students" className="section !pt-0">
          <p className="eyebrow">Students</p><h2 className="h2">Meet Our Young Musicians</h2>
          <p className="mt-3 max-w-2xl text-navy/70">Student photos, performances and achievements appear here only with approved media consent from a parent or guardian.</p>
        </section>

        <section id="gallery" className="section !pt-0">
          <p className="eyebrow">Gallery</p><h2 className="h2">Inside our classes</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {media.videos.map((v) => <VideoCard key={v.id} v={v} />)}
            <Image src={media.hero} alt="Student reading sheet music at a keyboard" width={480} height={640} loading="lazy" className="h-full w-full rounded-3xl object-cover shadow-lg" />
          </div>
        </section>

        <section id="events" className="section !pt-0"><p className="eyebrow">Events</p><h2 className="h2">Recitals, workshops & open days</h2><div className="mt-6"><Soon>No events published yet. Check back soon.</Soon></div></section>
        <section id="blog" className="section !pt-0"><p className="eyebrow">Curatone Music Journal</p><h2 className="h2">Tips, theory and stories</h2><div className="mt-6"><Soon>Our first articles are on the way.</Soon></div></section>

        <section id="enrol" className="bg-gold-soft">
          <div className="section"><p className="eyebrow">Enrolment</p><h2 className="h2 mb-8">Start Your Musical Journey</h2><EnquiryForm /></div>
        </section>

        <section id="contact" className="section text-center">
          <h2 className="h2">Contact</h2>
          <p className="mt-4 font-bold">{site.name}</p><p>{site.location}</p>
          <a className="font-semibold text-coral" href={`mailto:${site.email}`}>{site.email}</a>
          <div className="mt-6 flex flex-wrap justify-center gap-3"><a href={site.social.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-gold">Chat on WhatsApp</a><a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="btn-ghost">Follow on Instagram</a></div>
        </section>
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  );
}
