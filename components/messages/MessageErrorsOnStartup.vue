<template>
  <div class="text-center">
    <h4 class="text-red">
      Errors on startup:
    </h4>
    <v-list>
      <v-list-item v-for="e in errors" :key="e">
        {{ e }}
      </v-list-item>
    </v-list>
  </div>
</template>
<script setup lang="ts">
defineProps<{errors: any[]}>();
</script>
<style scoped>

</style>
