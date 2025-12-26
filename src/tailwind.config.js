/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    '../*.php',
    '../inc/**/*.php',
    '../templates/**/*.php',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    function ({ addBase, theme }) {
      function extractColorVars(colorObj, colorGroup = '') {
        return Object.keys(colorObj).reduce((vars, colorKey) => {
          const value = colorObj[colorKey];
          // Replace dots with hyphens for valid CSS variable names
          const sanitizedKey = colorKey.replace(/\./g, '-');
          const cssVariable = colorGroup 
            ? `--${colorGroup}-${sanitizedKey}` 
            : `--${sanitizedKey}`;

          if (typeof value === 'string') {
            vars[cssVariable] = value;
          }
          return vars;
        }, {});
      }

      addBase({
        ':root': {
          ...extractColorVars(theme('spacing'), 'spacing'),
        }
      });
    }
  ],
  daisyui: {
    themes: [
      {
        benddark: {
          "name": "black",
          "default": "true",
          "prefersdark": "true",
          "color-scheme": "dark",
          "--color-base-100": "oklch(0% 0 0)",
          "--color-base-200": "oklch(19% 0 0)",
          "--color-base-300": "oklch(22% 0 0)",
          "--color-base-content": "oklch(95% 0 0)",
          "--color-primary": "oklch(35% 0 0)",
          "--color-primary-content": "oklch(100% 0 0)",
          "--color-secondary": "oklch(35% 0 0)",
          "--color-secondary-content": "oklch(100% 0 0)",
          "--color-accent": "oklch(35% 0 0)",
          "--color-accent-content": "oklch(100% 0 0)",
          "--color-neutral": "oklch(35% 0 0)",
          "--color-neutral-content": "oklch(100% 0 0)",
          "--color-info": "oklch(48% 0.243 264.376)",
          "--color-info-content": "oklch(89.04% 0.062 264.052)",
          "--color-success": "oklch(62% 0.194 149.214)",
          "--color-success-content": "oklch(90.395% 0.035 142.495)",
          "--color-warning": "oklch(85% 0.199 91.936)",
          "--color-warning-content": "oklch(19.359% 0.042 109.769)",
          "--color-error": "oklch(57% 0.245 27.325)",
          "--color-error-content": "oklch(12.559% 0.051 29.233)",
          "--radius-selector": "2rem",
          "--radius-field": "0.5rem",
          "--radius-box": "2rem",
          "--size-selector": "0.25rem",
          "--size-field": "0.28125rem",
          "--border": "1.5px",
          "--depth": "1",
          "--noise": "1"
        },
        bendlight: {
          "name": "pastel",
          "default": "false",
          "prefersdark": "false",
          "color-scheme": "light",
          "--color-base-100": "oklch(100% 0 0)",
          "--color-base-200": "oklch(98.462% 0.001 247.838)",
          "--color-base-300": "oklch(92.462% 0.001 247.838)",
          "--color-base-content": "oklch(20% 0 0)",
          "--color-primary": "oklch(90% 0.063 306.703)",
          "--color-primary-content": "oklch(49% 0.265 301.924)",
          "--color-secondary": "oklch(89% 0.058 10.001)",
          "--color-secondary-content": "oklch(51% 0.222 16.935)",
          "--color-accent": "oklch(90% 0.093 164.15)",
          "--color-accent-content": "oklch(50% 0.118 165.612)",
          "--color-neutral": "oklch(55% 0.046 257.417)",
          "--color-neutral-content": "oklch(92% 0.013 255.508)",
          "--color-info": "oklch(86% 0.127 207.078)",
          "--color-info-content": "oklch(52% 0.105 223.128)",
          "--color-success": "oklch(87% 0.15 154.449)",
          "--color-success-content": "oklch(52% 0.154 150.069)",
          "--color-warning": "oklch(83% 0.128 66.29)",
          "--color-warning-content": "oklch(55% 0.195 38.402)",
          "--color-error": "oklch(80% 0.114 19.571)",
          "--color-error-content": "oklch(50% 0.213 27.518)",
          "--radius-selector": "1rem",
          "--radius-field": "2rem",
          "--radius-box": "1rem",
          "--size-selector": "0.25rem",
          "--size-field": "0.25rem",
          "--border": "2px",
          "--depth": "0",
          "--noise": "0"
        }
      },
      'light',
      'dark'
    ],
    darkTheme: 'dark',
    base: true,
    styled: true,
    utils: true,
    prefix: '',
    logs: true,
    themeRoot: ':root'
  }
}
