import { defineNuxtConfig } from "nuxt3";

export default defineNuxtConfig({
  target: "static",
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  buildDir: "/dist",
});
