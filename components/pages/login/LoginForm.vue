<template>
  <v-sheet width="300">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="userName"
        variant="outlined"
        :disabled="isLoading"
        clearable
        :error-messages="errorMessageName"
        label="Username"
        :rules="[required, userNameRules]"
      />

      <v-text-field
        v-model="userPassword"
        variant="outlined"
        label="Password"
        :disabled="isLoading"
        clearable
        :error-messages="errorMessagePassword"
        :type="canShowPassword ? 'text' : 'password'"
        :append-inner-icon="canShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[required, userPasswordRules]"
        class="mt-4 mb-0"
        @click:append-inner="canShowPassword = !canShowPassword"
      />
      <v-btn
        type="submit"
        block
        variant="tonal"
        size="large"
        class="mt-4"
        :loading="isLoading"
        @click="onLogin"
      >
        Send
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
const props = defineProps<{errors?: string, isLoading?: boolean}>();
const emits = defineEmits(['login']);

const canShowPassword = ref<boolean>(false);

const errorMessageName = computed<string>(() => props.errors ? 'Probably name is incorrect' : '');
const errorMessagePassword = computed<string>(() => props.errors ? 'Or password incorrect too' : '');

// const previousAttempts = [];

const userName = ref('geom');
const userNameRules =
  (value: string) => {
    if (value?.length > 3) { return true; }
    return 'Length is less than 4';
  };

const userPassword = ref('987');
const userPasswordRules =
  (value: string) => {
    if (!/[^0-9]/.test(value) && value?.length > 2) { return true; }
    return 'Password is less then 2';
  };

const onLogin = () => emits('login', { username: userName.value, password: userPassword.value });
</script>

<style scoped>

</style>
