import type { Config } from "tailwindcss";

const config: Config = {
  mode: 'jit',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'todo': 'rgb(243,242,240)',
        'progress': 'rgb(238,246,250)',
        'done': 'rgb(242,248,242)',
      },
      position: {
        'fixed': 'fixed',
        'sticky': 'sticky',
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
