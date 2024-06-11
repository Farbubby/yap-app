import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        fadeInUp: {
          "0%": { transform: "translateY(2rem)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeOutDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(2rem)", opacity: "0" },
        },
      },
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out",
        fadeOutDown: "fadeOutDown 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
