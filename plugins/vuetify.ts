// plugins/vuetify.ts
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md2 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
    },
    blueprint: md2,
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: {
        mdi,
      },
    },
    ssr: true,
    components,
    directives,
    defaults: {
      global: {
        ripple: true,
      },
    },
  });

  nuxtApp.vueApp.use(vuetify);
});
