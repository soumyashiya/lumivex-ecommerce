import type { Config } from 'tailwindcss';

/**
 * Tokens mirror the AG1 (drinkag1.com) system measured from the live site:
 * a deep-forest brand green over warm off-whites, one neo-grotesque at weight
 * 400 for every section heading, a high-contrast serif reserved for hero
 * display type, and a monospace face for small uppercase labels.
 *
 * Numbers below are the reference system's own values — 48px/-0.03em section
 * headings (32px on mobile), 32px button radius, 8px card radius, a 4px
 * spacing scale with named steps, and a 200ms cubic-bezier(.4,0,.2,1) ease.
 */
const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '480px',
      tablet: '768px',
      md: '768px',
      desktop: '1024px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Brand greens
        green: {
          DEFAULT: '#023d3d',
          deep: '#0f2e2f',
          mid: '#0d3a3b',
          light: '#105c5c',
          hover: '#001c0f',
        },
        sage: {
          DEFAULT: '#5a9d71',
          light: '#aed3bb',
        },
        bright: '#46de46',
        earth: {
          DEFAULT: '#806b47',
          light: '#c69d70',
        },

        // Surfaces
        'off-white': '#f6f5f1',
        cream: '#f4f1ea',
        stone: '#edebe4',
        mint: '#f0f9f3',
        mist: '#edf0ee',

        // Grey ramp
        grey: {
          25: '#f7f8f7',
          50: '#e6e9e7',
          75: '#d9dddb',
          100: '#cdd2cf',
          200: '#b2b3b2',
          300: '#989998',
          500: '#707170',
          700: '#3d3d3d',
        },

        // Cool neutrals — catalogue cards and the bestseller feature panel.
        cool: {
          50: '#f4f4f4',
          100: '#eeeeee',
          300: '#a8a8a8',
          400: '#8a8a8a',
          600: '#6b6b6b',
          800: '#55585e',
        },

        // Status
        success: '#226954',
        'success-bg': '#f0f5ee',
        warning: '#ffaf46',
        'warning-bg': '#fef8e2',
        danger: '#f93933',
        'danger-bg': '#ffd3d3',
        'info-bg': '#eef2f5',

        // Tags
        'tag-discount': '#fddcb1',
        'tag-sale': '#aa252d',
      },

      fontFamily: {
        sans: ['var(--font-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-serif)', 'Times New Roman', 'Times', 'serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },

      fontSize: {
        xxs: ['10px', { lineHeight: '14px' }],
        xs: ['12px', { lineHeight: '16px' }],
        sm: ['14px', { lineHeight: '20px' }],
        base: ['16px', { lineHeight: '24px' }],
        md: ['18px', { lineHeight: '27px' }],
        lg: ['20px', { lineHeight: '28px' }],
        xl: ['24px', { lineHeight: '32px' }],
        '2xl': ['30px', { lineHeight: '36px' }],
        '3xl': ['36px', { lineHeight: '40px' }],
        '4xl': ['48px', { lineHeight: '48px' }],
        '5xl': ['60px', { lineHeight: '60px' }],
        '6xl': ['72px', { lineHeight: '68px' }],

        /* Fluid steps measured off the reference site: 32px at 390px wide,
           the desktop value at 1440px. Line height tracks the size exactly
           (1.0 for sans headings, 0.95 for the serif), weight stays 400. */
        'display-serif': [
          'clamp(2rem, 1.09rem + 3.64vw, 4.5rem)',
          { lineHeight: '0.95', letterSpacing: '-0.005em' },
        ],
        h1: [
          'clamp(2rem, 1.09rem + 3.64vw, 4.5rem)',
          { lineHeight: '1', letterSpacing: '-0.03em' },
        ],
        h2: [
          'clamp(2rem, 1.43rem + 2.29vw, 3.5rem)',
          { lineHeight: '1', letterSpacing: '-0.03em' },
        ],
        h3: [
          'clamp(1.25rem, 1.07rem + 0.71vw, 1.875rem)',
          { lineHeight: '1.1', letterSpacing: '-0.025em' },
        ],
        statement: [
          'clamp(1.5rem, 1.14rem + 1.43vw, 2.25rem)',
          { lineHeight: '1.25', letterSpacing: '-0.02em' },
        ],
      },

      letterSpacing: {
        tightest: '-0.04em',
        tighter: '-0.03em',
        tight: '-0.025em',
        normal: '0em',
        wide: '0.025em',
        label: '0.06em',
        widest: '0.1em',
      },

      spacing: {
        xxs: '2px',
        xs: '4px',
        xsm: '6px',
        sm: '8px',
        smd: '12px',
        md: '16px',
        mdl: '20px',
        lg: '24px',
        xl: '32px',
        '2xl': '40px',
        '3xl': '48px',
        '4xl': '56px',
        '5xl': '60px',
        '6xl': '70px',
        '7xl': '80px',
        '8xl': '100px',
        '9xl': '120px',
        '10xl': '160px',
      },

      borderRadius: {
        xs: '2px',
        sm: '4px',
        smd: '6px',
        card: '8px',
        mdl: '10px',
        'card-round': '12px',
        'card-lg': '14px',
        xl: '16px',
        '2xl': '24px',
        round: '32px',
        pill: '99px',
      },

      maxWidth: {
        container: '1280px',
        wide: '1440px',
        prose: '68ch',
      },

      backgroundImage: {
        'green-grad': 'linear-gradient(12deg, #023d3d -16.58%, #105c5c 56.02%)',
        'green-grad-rev':
          'linear-gradient(234deg, #105c5c 27.26%, #023d3d 75.96%)',
        'green-radial':
          'radial-gradient(#105c5c 0%, #094d4d 25%, #023d3d 50%, #0f2e2f 100%)',
        'total-card': 'linear-gradient(to right, #06362e, #073f31)',
        'mint-grad': 'linear-gradient(135deg, #f0f9f3 0%, #e1f0e7 100%)',
      },

      transitionTimingFunction: {
        ag: 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ag-out': 'cubic-bezier(0, 0, 0.2, 1)',
      },

      boxShadow: {
        card: '0 1px 2px rgba(0, 28, 15, 0.04)',
        lift: '0 8px 24px -12px rgba(0, 28, 15, 0.18)',
        menu: '0 12px 32px -16px rgba(0, 28, 15, 0.22)',
      },

      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },

      animation: {
        marquee: 'marquee 38s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
        'fade-up': 'fade-up 0.45s cubic-bezier(0, 0, 0.2, 1) both',
      },
    },
  },
  plugins: [],
};

export default config;
