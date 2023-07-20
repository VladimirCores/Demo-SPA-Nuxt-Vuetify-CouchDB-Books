<template>
  <NuxtLayout>
    <NuxtPage v-if="isUserExists" />
    <div
      v-else
      class="d-flex justify-center align-center"
      style="min-height: 100vh;"
    >
      <span class="text-blue text-2xl">
        Только для авторизованных пользователей
      </span>
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const { isExist: isUserExists } = useUser();
console.log(`> App -> $user.isExist = ${isUserExists.value}`);
</script>
