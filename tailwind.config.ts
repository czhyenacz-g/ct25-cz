import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#101418",
        surface: "#171c22",
        line: "#2a3138",
        accent: "#e2b93b",
        warn: "#c0392b",
      },
    },
  },
  plugins: [],
} satisfies Config;
