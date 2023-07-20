// plugins/vuetify.ts
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md2 } from 'vuetify/blueprints';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
    },
    blueprint: md2,
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
