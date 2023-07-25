<template>
  <div class="text-center">
    <h4 class="text-h4">
      You have been successfully logged in!
    </h4>
    <v-btn
      flat
      variant="text"
      :to="Routes.INDEX"
    >
      Go to main page
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import Routes from '~/constants/Routes';
</script>

<style scoped>

</style>
