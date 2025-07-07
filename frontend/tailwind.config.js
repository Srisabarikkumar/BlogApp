/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import daisyUIThemes from "daisyui/src/theming/themes";
import Typography from '@tailwindcss/typography';

export default {
   content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui, Typography],
  daisyui: {
		themes: [
			{
				light: {
					...daisyUIThemes["light"],
					primary: "rgb(186, 104, 200)",
					secondary: "rgb(190, 96, 200)",
				},
			},
		],
	},
}

