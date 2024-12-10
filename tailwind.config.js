const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		fontFamily: {
			poppins: ["Poppins", "sans-serif"],
		},
		colors: {
			...colors,
			"bg-light": "#F5F5F5",
			"accent-cyan": "#3FC1C9",
			"accent-dark-blue": "#364F6B",
			"accent-pink": "#FC5185",
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["light"],
	},
};
