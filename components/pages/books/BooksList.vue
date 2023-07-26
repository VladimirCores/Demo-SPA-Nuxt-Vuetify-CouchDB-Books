<template>
  <v-list class="flex-col w-50">
    <v-list-item
      v-for="(book, i) in books"
      :key="book"
      :color="book.id === selectedBook?.id ? 'primary' : 'black'"
      :disabled="book.id === selectedBook?.id || isLoading"
      @click="$emit('selected', book)"
    >
      {{ startIndex + i }}. <b>{{ book.doc.title }}</b> <small>by {{ book.doc.author }}</small>
    </v-list-item>
  </v-list>
</template>
<script setup lang="ts">
import type { Ref } from 'vue';
defineProps<{ books: any[], selectedBook: any, isLoading: boolean, startIndex: Ref<number> }>();
defineEmits(['selected']);
</script>
