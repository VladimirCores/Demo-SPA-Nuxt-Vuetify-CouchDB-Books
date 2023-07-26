<template>
  <v-sheet
    elevation="0"
  >
    <iframe
      v-if="selectedBook"
      :src="selectedBook.doc.link"
      width="100%"
      height="100%"
      frameborder="0"
      scrolling="yes"
    />
  </v-sheet>
</template>
<script setup lang="ts">
defineProps<{selectedBook: any}>();
</script>
