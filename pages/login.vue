<template>
  <div class="d-flex justify-center align-center" style="min-height: 90vh;">
    <LoginForm @login="onLogin" />
  </div>
</template>
<script setup lang="ts">
import Databases from '~/constants/Databases';

const user = useUser();
const erorrs = ref([]);

const onLogin = (credentials: any) => {
  const { $connect } = useNuxtApp();
  console.log('> LoginPage -> onLogin:', credentials);
  const db = $connect(Databases.SETTINGS);

  db.logIn(credentials.username, credentials.password)
    .then((response: any) => {
      console.log('> LoginPage -> onLogin: response =', response);
      return db.getSession();
    })
    .then(({ userCtx: profile }: any) => {
      console.log('> LoginPage -> onLogin: userCtx =', profile);
      user.setupProfile(profile);
    })
    .catch((error: any) => {
      // console.log('> LoginPage -> onLogin: err =', error);
      // // previousAttempts.push(credentials);
      // if (error) {
      //   if (error.name === 'unauthorized' || error.name === 'forbidden') {
      //   // name or password incorrect
      //     errorMessageName.value = 'Возможно имя неверное!';
      //     errorMessagePassword.value = 'Или пароль первальный!';
      //   } else {
      //   // cosmic rays, a meteor, etc.
      //   }
      // }
    });
};
</script>
<style scoped>
</style>
