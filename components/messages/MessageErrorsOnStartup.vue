<template>
  <div class="d-flex justify-center align-center text-center h-100">
    <div class="flex-col">
      <h4 class="flex-row text-red">
        Error retrieving data:
      </h4>
      <v-list class="flex-row">
        <v-list-item v-for="e in errors" :key="e">
          {{ e }}
        </v-list-item>
      </v-list>
      <small class="flex-row text-grey-lighten-1">(probably problem with data provider server)</small>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{errors: any[]}>();
</script>
<style scoped>

</style>
