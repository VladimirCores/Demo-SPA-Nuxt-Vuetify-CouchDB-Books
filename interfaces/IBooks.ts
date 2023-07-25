import type { Ref, ComputedRef } from 'vue';

interface IBooks {
  readonly books: Ref<any[]>;
  readonly selected: Ref<any>;
  readonly amount: Ref<number>;
  readonly isLoading: Ref<boolean>;

  readonly has: ComputedRef<boolean>;
  readonly load: (limit: number, skip: number) => Promise<void>;
  readonly upload: (value: any[]) => Promise<void>;
}

export default IBooks;
