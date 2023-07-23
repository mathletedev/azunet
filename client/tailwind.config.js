/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,svelte,ts}"],
	theme: {
		extend: {}
	},
	plugins: [
		require("@catppuccin/tailwindcss")({
			defaultFlavour: "mocha"
		})
	]
};
