<template>
  <div class="flex-col pa-4 justify-space-between h-100">
    <div class="d-flex w-100 justify-start align-center">
      <div class="d-flex align-center">
        <v-icon icon="mdi-book-open-outline" />
        <b class="ml-2">{{ booksSkip }} - {{ booksAmount }}</b>
      </div>
      <v-btn-group
        class="pl-8"
        density="compact"
        rounded
        variant="flat"
        color="primary"
      >
        <v-btn :disabled="booksSkip === 0" @click="currentPageIndex--">
          Prev
        </v-btn>
        <v-btn :disabled="currentPageIndex === booksPages" @click="currentPageIndex++">
          Next
        </v-btn>
      </v-btn-group>
    </div>
    <div v-if="booksAmount > 0" class="d-flex flex-row h-100 pb-16 justify-start align-center">
      <v-list class="flex-col w-50">
        <v-list-item
          v-for="(book, i) in books"
          :key="book"
          :disabled="book === selectedBook"
          @click="onBookItemClick(book)"
        >
          {{ booksSkip + i + 1 }}. <b>{{ book.doc.title }}</b> <small>by {{ book.doc.author }}</small>
        </v-list-item>
      </v-list>
      <v-card ref="domBookWiki" class="flex-col h-100 w-50">
        <iframe
          v-if="selectedBook"
          :src="selectedBook.doc.link"
          width="100%"
          height="100%"
          frameborder="0"
          scrolling="yes"
        />
      </v-card>
    </div>

    <UploadBooks
      v-else
      class="d-flex flex-row py-2"
      @upload="onUploadBooks"
    />
  </div>
</template>
<script setup lang="ts">
import Databases from '~/constants/Databases';
import UploadBooks from '~/components/pages/books/UploadBooks.vue';

const router = useRouter();

const currentPageIndex = useState<number>('booksPage', () => {
  const pageIndexFromRoute = parseInt(router.currentRoute.value.query.page?.toString() || '1') - 1;
  return pageIndexFromRoute < 0 ? 0 : pageIndexFromRoute;
});

const selectedBook = ref(null);
const itemsPerPage = ref(10);
const isBooksLoading = ref(true);
const domBookWiki = ref(null);

const booksAmount = useState<number>('booksAmount');
const booksSkip = computed(() => currentPageIndex.value * itemsPerPage.value);
const booksPages = computed(() => Math.floor((booksAmount.value - 1) / itemsPerPage.value));

const dbBooks = useNuxtApp().$connect(Databases.BOOKS);

const loadBooks = () => {
  isBooksLoading.value = true;
  return dbBooks.info()
    .then((result: any) => booksAmount.value = result.doc_count)
    .then(() => dbBooks.allDocs({ limit: itemsPerPage.value, skip: booksSkip.value, include_docs: true }))
    .then((result: any) => books.value = result.rows)
    .then(() => router.replace({ ...router.currentRoute, query: { page: currentPageIndex.value + 1 } }))
    .finally(() => isBooksLoading.value = false);
};

const books = useState('books', () => loadBooks());
const onUploadBooks = async(value: any[]) => {
  console.log('> BooksPage -> onUploadBooks');
  await dbBooks.bulkDocs(value).then(loadBooks);
};
const onBookItemClick = (book: any) => {
  console.log('> BooksPage -> onBookItemClick', book.doc.link);
  selectedBook.value = book;
  // $fetch(book.doc.link, {
  //   query: {
  //     origin: '*',
  //   },
  // }).then(console.log);
};
watch(currentPageIndex, loadBooks);

</script>
<style scoped>
</style>
