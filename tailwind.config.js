/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
   "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
		colors: {
        'background': '#1a1a1a', // Our dark background
        'text-primary': '#e0e0e0', // Our soft white text
        'text-heading': '#ffffff', // Our bright white for headings
        'accent': '#00aaff',      // Our cool blue accent
      },
	},
  },
  plugins: [],
}