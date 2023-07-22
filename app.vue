<template>
  <v-app>
    <NuxtLayout>
      <NuxtPage v-if="isPagesNavigationAllowed" />
      <MessageOnlyLoginUsers v-else />
    </NuxtLayout>
    <Breadcrumbs />
  </v-app>
</template>
<script setup lang="ts">
import MessageOnlyLoginUsers from '~/components/messages/MessageOnlyLoginUsers.vue';

const { isPagesNavigationAllowed } = useNavigator();
console.log(`> App -> isNavigationAllowed = ${isPagesNavigationAllowed.value}`);
</script>
