// eslint-disable-next-line import/no-extraneous-dependencies
import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  typescript: {
    strict: true,
  },
  buildModules: [
    '@unocss/nuxt',
  ],
  unocss: {
    autoImport: true, // inject `uno.css`
    preflight: false, // inject `@unocss/reset/tailwind.css`
    components: true, // install UnoCSS components

    // presets
    uno: true, // enabled `@unocss/preset-uno`
    attributify: false, // enabled `@unocss/preset-attributify`
    icons: true, // enabled `@unocss/preset-icons`
    webFonts: true, // enabled `@unocss/preset-web-fonts`
    typography: true, // enabled `@unocss/preset-typography`

    // core options
    shortcuts: [],
    rules: [],
  },
});
