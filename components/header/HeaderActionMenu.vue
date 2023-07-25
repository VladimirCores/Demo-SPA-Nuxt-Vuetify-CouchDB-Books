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
          { text: 'Logout', icon: 'mdi-exit-to-app', onClick: onLogoutClick },
        ]"
        :key="i"
        :value="item"
        color="primary"
      >
        <template #prepend>
          <v-icon :icon="item.icon" />
        </template>

        <v-list-item-title @click="item.onClick">
          {{ item.text }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup lang="ts">
const emits = defineEmits(['logout']);
const onLogoutClick = () => emits('logout');
</script>

<style scoped>

</style>
