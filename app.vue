<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage v-if="canRenderPages" />
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
import Routes from '~/constants/Routes';

const { currentRoute } = useRouter();
const { isExists: isUserExists } = useUser();

const canRenderPages = computed(() => isUserExists.value || currentRoute.value.path === Routes.LOGIN.path);
console.log(`> App -> $user.isExist = ${isUserExists.value}`);
</script>
