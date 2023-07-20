// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify from 'vite-plugin-vuetify';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      DATA_SOURCE_URL: '',
      DATA_SOURCE_PORT: '',
    },
  },
  telemetry: false,
  ssr: false,
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
  eslint: {
    lintOnStart: false,
  },
  css: [
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  build: {
    transpile: ['vuetify'],
  },
  vite: {
    define: { global: 'window' },
  },
});
