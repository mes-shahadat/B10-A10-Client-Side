/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

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
    themes: ["retro", "wireframe", "garden", "valentine", "aqua", "dracula", "black"],
    darkTheme: "dracula",
    base: true,
    styled: true,
    utils: true
  },
}