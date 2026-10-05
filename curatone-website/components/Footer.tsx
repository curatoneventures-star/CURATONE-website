import { site } from "@/lib/site";
export default function Footer() {
  const links = Object.entries(site.social).filter(([, u]) => u);
  return (
    <footer className="bg-navy-deep text-white/80">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
        <div><b className="text-white">{site.name}</b><p className="mt-2 text-sm">{site.location}</p><a className="text-sm text-gold" href={`mailto:${site.email}`}>{site.email}</a></div>
        <div className="text-sm"><b className="text-white">Explore</b><br /><a href="#programmes">Programmes</a><br /><a href="#resources">Resources</a><br /><a href="#contact">Contact</a></div>
        <div className="text-sm"><b className="text-white">Follow</b><br />{links.length ? links.map(([k, u]) => <a key={k} href={u} target="_blank" rel="noopener noreferrer" className="mr-3 capitalize hover:text-gold">{k}</a>) : <span>Instagram · WhatsApp (links coming soon)</span>}</div>
        <div className="text-sm"><b className="text-white">Legal</b><br /><a href="/privacy">Privacy Policy</a><br /><a href="/terms">Terms of Use</a><br /><a href="/child-safety">Child Safety / Media Consent</a></div>
      </div>
      <p className="border-t border-white/10 py-4 text-center text-xs">© {new Date().getFullYear()} Curatone Music Academy. All rights reserved.</p>
    </footer>
  );
}
