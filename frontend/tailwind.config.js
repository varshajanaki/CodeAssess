/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Enable dark mode
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primaryBg: "black",
        primaryText: "#FAFAFA",
        secondaryText: "#8C8C8C",
        buttonBg: "white",
        buttonText: "#1E1E1E",
        borderColor: "black",
        border: "#27272a",
        input: "#2D2D2D",
        ring: "#2D2D2D",
        background: "#1E1E1E",
        foreground: "#FFFFFF",
        primary: {
          DEFAULT: "#FFA116",
          foreground: "#1E1E1E",
        },
        secondary: {
          DEFAULT: "#8C8C8C",
          foreground: "#FAFAFA",
        },
        destructive: {
          DEFAULT: "#E53E3E",
          foreground: "#FFFFFF",
        },
        muted: {
          DEFAULT: "#6B7280",
          foreground: "#E5E7EB",
        },
        accent: {
          DEFAULT: "#10B981",
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "#374151",
          foreground: "#E5E7EB",
        },
        card: {
          DEFAULT: "#1E1E1E",
          foreground: "#FFFFFF",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
