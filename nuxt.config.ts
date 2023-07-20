// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  telemetry: false,
  devtools: { enabled: false },
  modules: [
    '@nuxtjs/eslint-module',
    async(_, nuxt) => {
      await nuxt.hooks.hook('vite:extendConfig',
        (config, __) => {
          config.plugins?.push(vuetify());
        });
    },
  ],
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
});
