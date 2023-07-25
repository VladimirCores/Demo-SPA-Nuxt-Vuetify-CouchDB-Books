<template>
  <v-app v-if="isAppReady">
    <NuxtLayout :app-errors="errors">
      <NuxtPage v-if="isPagesNavigationAllowed" />
      <MessageErrorsOnStartup v-else-if="hasErrors" :errors="errors" />
      <MessageOnlyLoginUsers v-else />
    </NuxtLayout>
    <Breadcrumbs />
  </v-app>
  <div v-else class="d-flex justify-center align-center w-screen h-screen overflow-hidden">
    <v-progress-circular
      indeterminate
      size="60"
      width="2"
      color="primary"
    />
  </div>
</template>
<script setup lang="ts">
import MessageOnlyLoginUsers from '~/components/messages/MessageOnlyLoginUsers.vue';
import MessageErrorsOnStartup from '~/components/messages/MessageErrorsOnStartup.vue';
const isAppReady = ref<boolean>(false);
const errors = ref<any[]>([]);
const { isExists: isUserExists, resetProfile, setupProfile } = useUser();
const { isPagesNavigationAllowed } = useNavigator();
const hasErrors = computed(() => errors.value.length);
const db = useNuxtApp().$connect();
db.getSession().then((session: any) => {
  console.log('> App -> getSession:', session);
  // eslint-disable-next-line prefer-promise-reject-errors
  if (!session.ok) { return Promise.reject({ name: 'session', status: -1 }); }
  if (!session.info.authenticated) {
    db.logOut().finally(resetProfile);
  } else if (!isUserExists.value) {
    return db.getUser(session.userCtx.name)
      .then(setupProfile);
  }
}).catch((e: any) => errors.value.push(e))
  .finally(() => isAppReady.value = true);
console.log(`> App -> isNavigationAllowed = ${isPagesNavigationAllowed.value}`);
</script>
