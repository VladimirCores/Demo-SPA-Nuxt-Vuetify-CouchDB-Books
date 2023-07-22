<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage v-if="isNavigationAllowed" />
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
    <Breadcrumbs />
  </v-app>
</template>
<script setup lang="ts">
const { isNavigationAllowed } = useNavigator();
console.log(`> App -> isNavigationAllowed = ${isNavigationAllowed.value}`);
</script>
