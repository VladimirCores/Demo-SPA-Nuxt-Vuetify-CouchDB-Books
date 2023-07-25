<template>
  <div v-if="isPageReady" class="flex-col pa-4 justify-space-between h-100">
    <div class="d-flex w-50 justify-space-between align-center">
      <div class="d-flex align-center">
        <v-icon icon="mdi-book-open-outline" />
        <b class="ml-2">
          <span v-if="booksAmount > 0">{{ booksSkip }} - {{ booksSkip + ITEMS_PER_PAGE }} ({{ booksAmount }})</span>
          <span v-else>У вас нет загруженных книжек</span>
        </b>
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
        v-if="hasBooks"
        density="compact"
        rounded
        variant="flat"
        color="primary"
      >
        <v-btn :disabled="booksSkip === 0 || isBooksLoading" @click="booksPage--">
          Prev
        </v-btn>
        <v-btn :disabled="booksPage === booksPages || isBooksLoading" @click="booksPage++">
          Next
        </v-btn>
      </v-btn-group>
    </div>
    <div v-if="hasBooks" class="d-flex flex-row h-100 pb-16 justify-start align-center">
      <v-list class="flex-col w-50">
        <v-list-item
          v-for="(book, i) in books"
          :key="book"
          :color="book.id === selectedBook?.id ? 'primary' : 'black'"
          :disabled="book.id === selectedBook?.id || isBooksLoading"
          @click="onBookItemClick(book)"
        >
          {{ pageStartIndex + i }}. <b>{{ book.doc.title }}</b> <small>by {{ book.doc.author }}</small>
        </v-list-item>
      </v-list>
      <v-sheet
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
      :is-uploading="isBooksUploading"
      class="d-flex flex-row py-2 align-center h-100"
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
import UploadBooks from '~/components/pages/books/UploadBooks.vue';

const router = useRouter();

const ITEMS_PER_PAGE = 10;

const isPageReady = ref(false);
const isBooksUploading = ref(false);
const pageStartIndex = ref(1);

const {
  books,
  amount: booksAmount,
  selected: selectedBook,
  load,
  upload,
  has: hasBooks,
  isLoading: isBooksLoading,
} = useBooks();

const booksPage = useState<number>('booksPage', () => {
  const { query } = router.currentRoute.value;
  const pageFromQuery = query.page?.toString() || '1';
  const pageIndexFromRoute = parseInt(pageFromQuery);
  return pageIndexFromRoute <= 0 ? 0 : pageIndexFromRoute - 1;
});

const booksPages = computed(() => ITEMS_PER_PAGE > 0 ? Math.floor((booksAmount.value - 1) / ITEMS_PER_PAGE) : 0);
const booksSkip = computed(() => booksPage.value * ITEMS_PER_PAGE);

const updateRouteQueryPageIndex = () => {
  const query = booksPages.value >= 0 && hasBooks.value ? { page: booksPage.value + 1 } : {};
  router.replace({ ...router.currentRoute, query });
};
const updatePageStartIndex = () => {
  pageStartIndex.value = booksSkip.value + 1;
};
const loadBooks = async() => {
  await load(ITEMS_PER_PAGE, booksSkip.value)
    .then(updateRouteQueryPageIndex)
    .then(updatePageStartIndex);
};

const onUploadBooks = async(value: any[]) => {
  console.log('> BooksPage -> onUploadBooks', value);
  isBooksUploading.value = true;
  await upload(value).then(loadBooks).then(updateRouteQueryPageIndex);
  isBooksUploading.value = false;
};
const onBookItemClick = (book: any) => {
  console.log('> BooksPage -> onBookItemClick', book.doc.link);
  selectedBook.value = book;
};

const stopWatchPageIndex = watch(booksPage, loadBooks);

onMounted(() => {
  const makeReady = () => Promise
    .resolve(isPageReady.value = true)
    .then(updateRouteQueryPageIndex)
    .then(updatePageStartIndex);
  if (!books.value) {
    loadBooks().then(makeReady);
  } else { makeReady(); }
});
onUnmounted(() => stopWatchPageIndex());
</script>
<style scoped>
</style>
