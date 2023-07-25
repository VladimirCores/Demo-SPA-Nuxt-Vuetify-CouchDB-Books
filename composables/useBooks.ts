import IBooks from 'interfaces/IBooks';
import Databases from '~/constants/Databases';

const STATE_BOOKS = 'books';
const STATE_BOOKS_AMOUNT = 'booksAmount';
const STATE_BOOK_SELECTED = 'bookSelected';
export function useBooks():IBooks {
  const selected = useState<any>(STATE_BOOK_SELECTED);
  const books = useState<any[]>(STATE_BOOKS);
  const amount = useState<number>(STATE_BOOKS_AMOUNT);

  const has = computed<boolean>(() => amount.value > 0);

  const db = useNuxtApp().$connect(Databases.BOOKS);

  const isLoading = ref<boolean>(!books.value);
  const load = (limit: number, skip: number) => {
    isLoading.value = true;
    return db.info()
      .then((result: any) => { amount.value = result.doc_count; })
      .then(() => db.allDocs({ limit, skip, include_docs: true }))
      .then((result: any) => useState(STATE_BOOKS).value = result.rows)
      .finally(() => {
        isLoading.value = false;
      });
  };

  const upload = async(value: any[]) => {
    await db.bulkDocs(value);
  };

  return ({
    books,
    amount,
    selected,
    has,
    load,
    upload,
    isLoading,
  });
}
