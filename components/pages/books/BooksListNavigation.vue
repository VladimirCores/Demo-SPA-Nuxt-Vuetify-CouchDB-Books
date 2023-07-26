<template>
  <v-btn-group
    density="compact"
    rounded
    variant="flat"
    color="primary"
  >
    <v-btn :disabled="canPrev" @click="$emit('prev')">
      Prev
    </v-btn>
    <v-btn :disabled="canNext" @click="$emit('next')">
      Next
    </v-btn>
  </v-btn-group>
</template>
<script setup lang="ts">
defineEmits(['next', 'prev']);
defineProps<{ canNext: boolean, canPrev: boolean }>();
</script>
