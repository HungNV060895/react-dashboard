/** @type {import('tailwindcss').Config} */
export default {
	mode: 'jit',
	content: [
		"./index.html",
		"./src/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				sidebar: {
					DEFAULT: '#0F172A', 
					text: '#fff',
					light: '#fff'
				},
				main: {
					DEFAULT: '#111827',
					light: '#',
				},
				status: {
					active: '#16a34a',
					pending: '#f59e0b',
					suspended: '#dc2626',
					inactive: '#6b7280',
				},
			}
		},
	},
	plugins: [],
}
