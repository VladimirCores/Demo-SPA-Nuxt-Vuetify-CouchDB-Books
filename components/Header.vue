<template>
  <v-app-bar
    elevation="0"
    :border="true"
  >
    <v-app-bar-title>
      <div class="flex-row">
        <v-icon icon="mdi-chart-box-outline" color="grey" />
        <span class="pl-2">GEOM - ЦИФРОВОЙ ГТМ</span>
      </div>
    </v-app-bar-title>
    <HeaderNavigation v-if="isUserExists" />
    <v-spacer />
    <v-btn v-if="!isUserExists" variant="outlined">
      Логин
    </v-btn>
    <HeaderUserProfile v-else />
  </v-app-bar>
</template>

<script setup lang="ts">
const { isExists: isUserExists } = useUser();
</script>

<style scoped>

</style>
