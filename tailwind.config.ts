import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",

  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "400px",
        "3xl": "1820px",
      },
    },
  },
  plugins: [require("tailwindcss-rtl")],
};
export default config;
