import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      primaryColor: "#1C2939",
      primaryColorDark: "#101A23",
      highlightColor: "#2496EC",
      headerColor: "rgba(217, 217, 217, 0.1)",
      greenPrimary: "#BEEE11",
      gray: "#A6A6A6",
      darkGray: "#323232",
      errorBg: "#DE0050",
      errorText: "#ffffff"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
