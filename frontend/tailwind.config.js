/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Background Colors
        'primary-bg': '#0f1419',
        'secondary-bg': '#1a202c',
        'tertiary-bg': '#242e3e',
        
        // Accent Colors
        'primary-accent': '#06b6d4', // Cyan/Teal
        'secondary-accent': '#d4af37', // Gold
        'accent-hover': '#0891b2', // Darker Teal
        
        // Semantic Colors
        'success': '#10b981',
        'warning': '#f59e0b',
        'danger': '#ef4444',
        'info': '#3b82f6',
        
        // Text Colors
        'primary-text': '#f8fafc',
        'secondary-text': '#cbd5e1',
        'muted-text': '#94a3b8',
        
        // Neutral Grays
        'border-color': '#334155',
        'hover-state': '#475569',
        'disabled-state': '#1e293b',
      },
      borderRadius: {
        'xs': '2px',
        'sm': '4px',
        'base': '8px',
        'md': '12px',
        'lg': '16px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.15)',
        'lg': '0 10px 20px rgba(0, 0, 0, 0.2)',
        'xl': '0 20px 40px rgba(0, 0, 0, 0.25)',
      },
      spacing: {
        'xs': '2px',
        'sm': '4px',
        'base': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '64px',
        '6xl': '80px',
      },
      fontSize: {
        'h1': ['36px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.02em' }],
        'h2': ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['20px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'body': ['14px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['12px', { lineHeight: '1.4', fontWeight: '400' }],
        'large': ['16px', { lineHeight: '1.5', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}