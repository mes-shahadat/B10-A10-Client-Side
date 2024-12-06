/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
import { retro } from "daisyui/src/theming/themes"

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        retro: {
          ...retro,
          ".menu li > *:not(ul):not(.menu-title):not(details).active": {
            color: "oklch(var(--er))", 
            backgroundColor: "transparent",
          },
        },
      },
      
      "cmyk",
      "luxury",
      "dim",
      "dracula",
    ],
    darkTheme: "dracula",
    base: true,
    styled: true,
    utils: true
  },
}