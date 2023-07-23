<template>
  <v-app v-if="isAppReady">
    <NuxtLayout>
      <NuxtPage v-if="isPagesNavigationAllowed" />
      <MessageOnlyLoginUsers v-else />
    </NuxtLayout>
    <Breadcrumbs />
  </v-app>
  <div v-else class="d-flex justify-center align-center w-screen h-screen overflow-hidden">
    <v-progress-circular
      v-if="hasNoErrors"
      indeterminate
      size="60"
      width="2"
      color="primary"
    />
    <MessageErrorsOnStartup v-else :errors="errorsOnStartup" />
  </div>
</template>
<script setup lang="ts">
import MessageOnlyLoginUsers from '~/components/messages/MessageOnlyLoginUsers.vue';
import MessageErrorsOnStartup from '~/components/messages/MessageErrorsOnStartup.vue';
const isAppReady = ref<boolean>(false);
const errorsOnStartup = ref<any[]>([]);
const { isExists: isUserExists, resetProfile, setupProfile } = useUser();
const { isPagesNavigationAllowed } = useNavigator();
const hasNoErrors = computed(() => !errorsOnStartup.value.length);
const db = useNuxtApp().$connect();
await db.getSession().then((session: any) => {
  console.log('> App -> getSession:', session);
  // eslint-disable-next-line prefer-promise-reject-errors
  if (!session.ok) { return Promise.reject({ name: 'session', status: -1 }); }
  if (!session.info.authenticated) {
    resetProfile();
  } else if (!isUserExists.value) {
    return db.getUser(session.userCtx.name)
      .then(setupProfile);
  }
}).catch((e: any) => errorsOnStartup.value.push(e))
  .finally(() => isAppReady.value = hasNoErrors.value);
console.log(`> App -> isNavigationAllowed = ${isPagesNavigationAllowed.value}`);
</script>
