/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        light: {
          base: "var(--color-text-light-base)",
          muted: "var(--color-text-light-muted)",
        },
        dark: {
          base: "var(--color-text-dark-base)",
          muted: "var(--color-text-dark-muted)",
        },
      },

      backgroundColor: {
        light: {
          fill: "var(--color-light-fill)",
          muted: "var(--color-fill-light-muted)",
          button: "var(--color-light-button)",
          "button-hover": "var(--color-button-light-hover)",
          "button-selected": "var(--color-button-light-selected)",
          "button-selected-hover": "var(--color-button-light-selected-hover)",
          "list-selected": "var(--color-list-light-selected)",
          "list-hover": "var(--color-list-light-hover)",
        },
        dark: {
          fill: "var(--color-dark-fill)",
          muted: "var(--color-fill-dark-muted)",
          button: "var(--color-dark-button)",
          "button-hover": "var(--color-button-dark-hover)",
          "button-selected": "var(--color-button-dark-selected)",
          "button-selected-hover": "var(--color-button-dark-selected-hover)",
          "list-selected": "var(--color-list-dark-selected)",
          "list-hover": "var(--color-list-dark-hover)",
        },
      },
    },
  },
  plugins: [],
};
