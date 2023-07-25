<template>
  <v-tabs
    centered
    color="grey-darken-2"
  >
    <v-tab
      v-for="link in [
        Routes.DASHBOARD,
        pathToCurrentPage,
        Routes.REPORTS,
        Routes.MAP,
      ]"
      :key="link"
      :to="link.path"
      variant="text"
      color="primary"
    >
      {{ link.title }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
import Routes from '~/constants/Routes';
const currentPageIndex = useState<number>('booksPage');
const pathToCurrentPage = computed(() => ({
  ...Routes.BOOKS,
  path: `${Routes.BOOKS.path}?page=${currentPageIndex.value ? currentPageIndex.value + 1 : '1'}`,
}));
</script>

<style scoped>

</style>
