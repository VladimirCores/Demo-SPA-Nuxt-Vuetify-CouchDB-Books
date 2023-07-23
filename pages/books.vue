<template>
  <div v-if="isPageReady" class="flex-col pa-4 justify-space-between h-100">
    <div class="d-flex w-50 justify-space-between align-center">
      <div class="d-flex align-center">
        <v-icon icon="mdi-book-open-outline" />
        <b class="ml-2">{{ booksSkip }} - {{ booksAmount }}</b>
        <v-progress-circular
          v-if="isBooksLoading"
          indeterminate
          color="primary"
          size="16"
          width="1"
          class="ml-4"
        />
      </div>
      <v-btn-group
        density="compact"
        rounded
        variant="flat"
        color="primary"
      >
        <v-btn :disabled="booksSkip === 0 || isBooksLoading" @click="currentPageIndex--">
          Prev
        </v-btn>
        <v-btn :disabled="currentPageIndex === booksPages || isBooksLoading" @click="currentPageIndex++">
          Next
        </v-btn>
      </v-btn-group>
    </div>
    <div v-if="booksAmount > 0" class="d-flex flex-row h-100 pb-16 justify-start align-center">
      <v-list class="flex-col w-50">
        <v-list-item
          v-for="(book, i) in books"
          :key="book"
          :disabled="book.id === selectedBook?.id"
          @click="onBookItemClick(book)"
        >
          {{ booksSkip + i + 1 }}. <b>{{ book.doc.title }}</b> <small>by {{ book.doc.author }}</small>
        </v-list-item>
      </v-list>
      <v-sheet
        ref="domBookWiki"
        class="flex-col h-100 w-50 mt-4"
        style="border-left: 1px solid #eee"
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
    </div>
    <UploadBooks
      v-else
      class="d-flex flex-row py-2"
      @upload="onUploadBooks"
    />
  </div>
  <v-progress-circular
    v-else
    indeterminate
    color="primary"
    size="40"
    width="1"
    class="d-flex mx-auto h-100 align-center justify-center"
  />
</template>
<script setup lang="ts">
import Databases from '~/constants/Databases';
import UploadBooks from '~/components/pages/books/UploadBooks.vue';

const router = useRouter();

const selectedBook = ref(null);
const itemsPerPage = ref(10);
const isPageReady = ref(false);
const isBooksLoading = ref(true);
const domBookWiki = ref(null);

const booksAmount = useState<number>('booksAmount');
const currentPageIndex = useState<number>('booksPage', () => {
  const pageIndexFromRoute = parseInt(router.currentRoute.value.query.page?.toString() || '1') - 1;
  return pageIndexFromRoute < 0 ? 0 : pageIndexFromRoute;
});

const booksSkip = computed(() => currentPageIndex.value * itemsPerPage.value);
const booksPages = computed(() => Math.floor((booksAmount.value - 1) / itemsPerPage.value));

const db = useNuxtApp().$connect(Databases.BOOKS);

const loadBooks = () => {
  isBooksLoading.value = true;
  return db.info()
    .then((result: any) => {
      booksAmount.value = result.doc_count;
      if (currentPageIndex.value > booksPages.value) {
        currentPageIndex.value = booksPages.value;
      }
    })
    .then(() => db.allDocs({ limit: itemsPerPage.value, skip: booksSkip.value, include_docs: true }))
    .then((result: any) => books.value = result.rows)
    .then(() => router.replace({ ...router.currentRoute, query: { page: currentPageIndex.value + 1 } }))
    .finally(() => {
      isBooksLoading.value = false;
      if (!isPageReady.value) { isPageReady.value = true; }
    });
};

const books = useState('books', () => loadBooks());
const onUploadBooks = async(value: any[]) => {
  console.log('> BooksPage -> onUploadBooks');
  await db.bulkDocs(value).then(loadBooks);
};
const onBookItemClick = (book: any) => {
  console.log('> BooksPage -> onBookItemClick', book.doc.link);
  selectedBook.value = book;
};
const stopWatchPageIndex = watch(currentPageIndex, loadBooks);
onMounted(() => {
  isBooksLoading.value = !books.value;
  isPageReady.value = !!books.value;
});
onUnmounted(() => stopWatchPageIndex());
</script>
<style scoped>
</style>
