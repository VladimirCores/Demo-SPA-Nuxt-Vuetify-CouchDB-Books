<template>
  <div class="d-flex justify-center align-center" style="min-height: 90vh;">
    <LogonSuccess v-if="isUserExists" />
    <LoginForm
      v-else
      :is-loading="isLoading"
      :errors="errors"
      @login="onLogin"
    />
  </div>
</template>
<script setup lang="ts">
import Databases from '~/constants/Databases';
import LoginForm from '~/components/pages/login/LoginForm.vue';
import LogonSuccess from '~/components/pages/login/LoginSuccess.vue';

const { isExists: isUserExists, setupProfile } = useUser();

const errors = ref<string | null>(null);
const isLoading = ref<boolean>(false);

const onLogin = (credentials: any) => {
  const { $connect } = useNuxtApp();
  console.log('> LoginPage -> onLogin:', credentials);
  const db = $connect(Databases.SETTINGS);
  isLoading.value = true;
  db.logIn(credentials.username, credentials.password)
    .then((response: any) => {
      console.log('> LoginPage -> onLogin: response =', response);
      return db.getSession();
    })
    .then((session: any) => {
      const { userCtx: user, info } = session;
      console.log('> LoginPage -> onLogin: session =', session);
      // db.authenticate(credentials, user);
      if (info.authenticated) {
        return db.getUser(user.name)
          .then(setupProfile);
      }
    })
    .catch((error: any) => {
      console.log('> LoginPage -> onLogin: err =', error);
      if (error?.status === 0) {
        errors.value = 'unavailable';
      } else if (['unauthorized', 'forbidden'].includes(error.name)) {
        // name or password incorrect
        errors.value = 'unauthorized';
      } else if (error.name === 'not_found') {
        db.logOut().then(() => {
          errors.value = 'not_found';
        });
      } else {
        // cosmic rays, a meteor, etc.
      }
    }).finally(() => {
      isLoading.value = false;
    });
};
</script>
<style scoped>
</style>
