import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const config: Config = {
	darkMode: "class",
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				// China Explained Palette (Legacy)
				imperialRed: '#B52719',
				warmGold: '#D8B45A',
				sealRed: '#9A1E23',
				inkBlack: '#060708',
				mistInk: '#1A1B1F',
				ricePaper: '#F3E7D6',
				cloudGrey: '#E0D7C9',
				pineGreen: '#57786A',
				riverTeal: '#4C8C86',

				// Bubble Navigation Design Tokens
				ink: {
					black: '#070708',
					deep: '#0B0B0C',
					soft: '#151821',
				},
				parchment: {
					light: '#F3E7D6',
					mist: '#E8E2D3',
				},
				imperial: {
					red: '#A30D0D',
					redSoft: '#B52719',
					gold: '#D6A94A',
				},
				watercolor: {
					bluegrey: '#A7B7C5',
					pine: '#57786A',
					river: '#4C8C86',
				},
				bubble: {
					idle: '#1B2029',
					hover: '#232938',
					active: '#2A3142',
				},
				route: {
					glowFrom: '#A30D0D',
					glowTo: '#D6A94A',
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				}
			},
			fontFamily: {
				serif: ['var(--font-cormorant)', 'serif'],
				subSerif: ['var(--font-lora)', 'serif'],
				sans: ['var(--font-inter)', 'sans-serif'],
			},
			borderRadius: {
				lg: `var(--radius)`,
				md: `calc(var(--radius) - 2px)`,
				sm: `calc(var(--radius) - 4px)`,
				// Bubble Navigation
				bubble: '9999px',
				card: '1.5rem',
				map: '1.75rem',
			},
			boxShadow: {
				'bubble-soft': '0 8px 25px rgba(0,0,0,0.45), 0 0 0 1px rgba(214,169,74,0.28)',
				'card-glass': '0 24px 60px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.08)',
			},
			backdropBlur: {
				glass: '18px',
			},
		}
	},
	plugins: [tailwindcssAnimate],
};
export default config;
