// eslint-disable-next-line import/no-extraneous-dependencies
import { defineNuxtConfig } from 'nuxt3';

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  publicRuntimeConfig: {
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID,
    FREE_COUNTER_URL: process.env.FREE_COUNTER_URL,
  },
  privateRuntimeConfig: {
  },
  typescript: {
    strict: true,
  },
  css: [
    'bootstrap/scss/bootstrap.scss',
  ],
});
