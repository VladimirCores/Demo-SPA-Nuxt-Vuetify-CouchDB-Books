<template>
  <div class="text-center">
    <h4 class="text-h4">
      Вы успено зашли в систему
    </h4>
    <v-btn
      flat
      variant="text"
      :to="Routes.INDEX"
    >
      Перейти на главную
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import Routes from '~/constants/Routes';
</script>

<style scoped>

</style>
