import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { navy: { DEFAULT: "#0b2a6b", deep: "#061a45" }, gold: { DEFAULT: "#e8b43a", soft: "#fff4d6" }, coral: "#ff6b5b", teal: "#14b8a6", cream: "#fffaf0" },
    fontFamily: { display: ["var(--font-display)", "serif"], sans: ["var(--font-sans)", "system-ui", "sans-serif"] },
  } },
  plugins: [],
} satisfies Config;
