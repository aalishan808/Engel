// postcss.config.mjs
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Use the new v4 PostCSS plugin for Tailwind CSS
    autoprefixer: {}, // Explicitly add autoprefixer with an empty options object
  },
};