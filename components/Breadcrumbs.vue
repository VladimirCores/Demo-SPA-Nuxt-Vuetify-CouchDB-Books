<template>
  <v-footer :app="true">
    <v-breadcrumbs
      :items="[
        {
          title: 'Главная',
          disabled: !canNavigateToIndexPage,
          to: '/',
        },
        ...navigatedRoutes
      ]"
    >
      <template #prepend>
        <v-icon size="small" icon="mdi-chart-box-outline" />
      </template>
      <template #title="{ item }">
        <NuxtLink :to="item.to" style="text-decoration: none; color: inherit;">
          {{ item.title }}
        </NuxtLink>
      </template>
    </v-breadcrumbs>
  </v-footer>
</template>

<script setup lang="ts">
import Routes, { getRouteTitleByPath } from '~/constants/Routes';
const { currentRoute } = useRouter();
const canNavigateToIndexPage = computed(() => currentRoute.value.path !== Routes.INDEX.path);
const navigatedRoutes = computed(() => canNavigateToIndexPage.value
  ? [
      {
        title: getRouteTitleByPath(currentRoute.value.path),
        disabled: true,
        to: currentRoute.value.path,
      },
    ]
  : []);
</script>

<style scoped>

</style>
