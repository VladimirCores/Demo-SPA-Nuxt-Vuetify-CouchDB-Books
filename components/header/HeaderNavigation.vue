<template>
  <v-tabs
    centered
    color="grey-darken-2"
  >
    <v-tab
      v-for="link in [
        Routes.DASHBOARD,
        Routes.LIBRARY,
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
</script>

<style scoped>

</style>
