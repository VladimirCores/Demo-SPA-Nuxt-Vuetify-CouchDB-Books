<template>
  <v-tabs
    centered
    color="grey-darken-2"
  >
    <v-tab
      v-for="link in [
        'Dashboard',
        'Messages',
        'Profile',
        'Updates',
      ]"
      :key="link"
    >
      {{ link }}
    </v-tab>
  </v-tabs>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
