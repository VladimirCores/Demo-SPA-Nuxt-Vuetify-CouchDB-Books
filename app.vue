<template>
  <NuxtLayout>
    <NuxtPage v-if="isUserExists" />
    <div
      v-else
      class="d-flex justify-center align-center"
      style="min-height: 100vh;"
    >
      <span class="text-primary text-h4">
        Только для авторизованных пользователей
      </span>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const { isExists: isUserExists } = useUser();
console.log(`> App -> $user.isExist = ${isUserExists.value}`);
</script>
