// Single source of truth for content. Later: swap for CMS / Supabase / Firebase via lib/services.
export const site = {
  name: "CURATONE MUSIC ACADEMY",
  location: "Enugu State, Nigeria",
  email: "curatone.ventures@gmail.com",
  founder: "Othniel Chuks",
    social: { instagram: "https://instagram.com/Othniel_chuks", whatsapp: "https://wa.me/2349060398109" } as Record<string, string>,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? process.env.URL ?? "http://localhost:3000", // set NEXT_PUBLIC_SITE_URL to your custom domain
};
export const media = {
  logo: "/images/logo.png",
  founder: "/images/founder.jpg",
  hero: "/images/class-keyboard.jpg",
  videos: [
    { id: 1, title: "Piano Class in Session", category: "Classes", src: "/videos/class-1.mp4", poster: "/images/class-1-poster.jpg", description: "Students at work during a Curatone class." },
    { id: 2, title: "Keyboard Lesson", category: "Classes", src: "/videos/class-2.mp4", poster: "/images/class-2-poster.jpg", description: "Guided keyboard practice with our teacher." },
    { id: 3, title: "Practice Time", category: "Behind the Scenes", src: "/videos/class-3.mp4", poster: "/images/class-3-poster.jpg", description: "A look at how we practise together." },
    { id: 4, title: "Student Moment", category: "Classes", src: "/videos/class-4.mp4", poster: "/images/class-4-poster.jpg", description: "Learning, playing and growing." },
  ],
};
export const programmes = [
  { id: "piano", icon: "🎹", title: "Piano", text: "Technique, reading and expressive playing from first notes onward.", active: true },
  { id: "keyboard", icon: "🎼", title: "Keyboard", text: "Chords, rhythm and styles on a modern keyboard.", active: true },
  { id: "theory", icon: "📖", title: "Music Theory", text: "Notation, scales, harmony and ear training made clear.", active: true },
  { id: "voice", icon: "🎤", title: "Voice & Singing", text: "Healthy vocal technique, breath and confident singing.", active: true },
  { id: "children", icon: "🌈", title: "Children's Music Programme", text: "Playful, structured early music learning for young children.", active: true },
  { id: "performance", icon: "🌟", title: "Performance Training", text: "Stage confidence, presentation and recital preparation.", active: true },
  { id: "exams", icon: "🏅", title: "Examination Preparation", text: "Guided preparation for recognized external exam pathways.", active: true },
  { id: "production", icon: "🎧", title: "Music Production", text: "Create, record and arrange your own music.", active: true },
].filter((p) => p.active);
export const ageGroups = [
  { title: "Little Musicians", note: "Early years" }, { title: "Young Musicians", note: "Children" },
  { title: "Teen Musicians", note: "Teenagers" }, { title: "Adult Learners", note: "Never too late" },
];
export const steps = [
  { n: "01", t: "Discover", d: "Identify interests, experience and goals." },
  { n: "02", t: "Learn", d: "Receive structured lessons and practical training." },
  { n: "03", t: "Practice", d: "Develop consistency through guided practice." },
  { n: "04", t: "Perform & Progress", d: "Demonstrate growth through assessments and performances." },
];
export const nav = [["Home", "#home"], ["About Us", "#about"], ["Programmes", "#programmes"], ["Music Resources", "#resources"], ["Students", "#students"], ["Gallery", "#gallery"], ["Events", "#events"], ["Blog", "#blog"], ["Contact", "#contact"], ["Portal", "/login"]];
