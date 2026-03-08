import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom dark theme palette - deep slate/navy, not black
        surface: {
          DEFAULT: "#111827",   // bg-surface: primary background (gray-900)
          card: "#1f2937",      // bg-surface-card: card background (gray-800)
          raised: "#283344",    // slightly elevated cards
          border: "#374151",    // border color (gray-700)
          muted: "#4b5563",     // muted borders
        },
        brand: {
          primary: "#6366f1",   // indigo-500
          secondary: "#8b5cf6", // violet-500
          accent: "#ec4899",    // pink-500
        },
        trend: {
          up: "#22c55e",        // green-500
          down: "#ef4444",      // red-500
          new: "#f59e0b",       // amber-500
          hot: "#f97316",       // orange-500
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
