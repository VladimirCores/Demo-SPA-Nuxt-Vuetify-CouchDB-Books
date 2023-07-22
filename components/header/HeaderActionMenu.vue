<template>
  <v-menu>
    <template #activator="{ props }">
      <v-btn
        icon="mdi-dots-vertical"
        v-bind="props"
        color="neutral"
      />
    </template>
    <v-list density="compact" :lines="false">
      <v-list-item
        v-for="(item, i) in [
          { text: 'Выйти', icon: 'mdi-exit-to-app' },
        ]"
        :key="i"
        :value="item"
        color="primary"
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title>
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
</script>

<style scoped>

</style>
