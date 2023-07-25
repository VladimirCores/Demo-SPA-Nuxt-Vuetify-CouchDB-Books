// plugins/vuetify.ts
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { md2 } from 'vuetify/blueprints';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
// @ts-ignore
import colors from 'vuetify/lib/util/colors';

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          dark: false,
          colors: {
            primary: colors.blue.darken1,
            secondary: colors.blue.lighten4,
          },
        },
      },
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
