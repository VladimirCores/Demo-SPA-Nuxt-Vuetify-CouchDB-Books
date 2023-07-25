<template>
  <v-layout class="rounded rounded-md">
    <Header :errors="appErrors" />
    <v-main>
      <slot />
    </v-main>
  </v-layout>
</template>
<script setup lang="ts">
defineProps<{ appErrors: string[]}>();
</script>
<style scoped>

</style>
