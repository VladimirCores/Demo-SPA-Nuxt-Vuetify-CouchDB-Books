<template>
  <div class="d-flex justify-center align-center" style="min-height: 80vh;">
    <v-sheet width="300">
      <v-form fast-fail @submit.prevent>
        <v-text-field
          v-model="userName"
          variant="outlined"
          label="Имя пользователя"
          :rules="userNameRules"
        />
        <v-text-field
          v-model="userPassword"
          variant="outlined"
          label="Пароль"
          :rules="userPasswordRules"
          class="mt-2"
        />
        <v-btn
          type="submit"
          block
          flat
          class="mt-4"
        >
          Отправить
        </v-btn>
      </v-form>
    </v-sheet>
  </div>
</template>
<script setup lang="ts">
const userName = ref('');
const userNameRules = [
  (value: string) => {
    if (value?.length > 3) { return true; }
    return 'Количество символов меньше 4';
  },
];
const userPassword = ref('');
const userPasswordRules = [
  (value: string) => {
    if (!/[^0-9]/.test(value) && value?.length > 2) { return true; }
    return 'Пароль меньше 2 чисел';
  },
];
</script>
<style scoped>
</style>
