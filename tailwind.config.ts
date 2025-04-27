
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1440px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#005B8F',
					foreground: '#FFFFFF',
					50: '#E6F0F5',
					100: '#CCE0EB',
					200: '#99C1D7',
					300: '#66A2C3',
					400: '#3383AF',
					500: '#005B8F',
					600: '#004E7A',
					700: '#004066',
					800: '#003351',
					900: '#00273D',
				},
				secondary: {
					DEFAULT: '#F28C00',
					foreground: '#FFFFFF',
					50: '#FEF3E6',
					100: '#FDE6CC',
					200: '#FBCD99',
					300: '#F9B466',
					400: '#F7A033',
					500: '#F28C00',
					600: '#CF7800',
					700: '#AB6300',
					800: '#884F00',
					900: '#653B00',
				},
				destructive: {
					DEFAULT: '#EF4444',
					foreground: '#FFFFFF',
				},
				warning: {
					DEFAULT: '#FFB547',
					foreground: '#000000',
				},
				success: {
					DEFAULT: '#10B981',
					foreground: '#FFFFFF',
				},
				info: {
					DEFAULT: '#3B82F6',
					foreground: '#FFFFFF',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				"accordion-up": {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				"pulse-slow": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.5" },
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" },
				},
				"slide-in": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(0)" },
				},
				"rotate-refresh": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(360deg)" },
				},
				"border-pulse": {
					"0%, 100%": { borderLeftColor: "transparent" },
					"50%": { borderLeftColor: "#EF4444" },
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse-slow": "pulse-slow 3s ease-in-out infinite",
				"fade-in": "fade-in 0.5s ease-out",
				"slide-in": "slide-in 0.3s ease-out",
				"rotate-refresh": "rotate-refresh 0.6s ease-out",
				"border-pulse": "border-pulse 2s infinite",
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
			},
			spacing: {
				'4': '4px',
				'8': '8px', 
				'12': '12px',
				'16': '16px',
				'20': '20px',
				'24': '24px',
				'32': '32px',
				'40': '40px',
				'48': '48px',
				'64': '64px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
