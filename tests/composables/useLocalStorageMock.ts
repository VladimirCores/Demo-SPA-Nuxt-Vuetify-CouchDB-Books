import { vi } from 'vitest';
import ILocalStorage from '~/interfaces/ILocalStorage';
const mockStorage = new Map();

const useLocalStorageMock = vi.fn(():ILocalStorage => {
  return {
    retrieve: (key:string): any => {
      const result = mockStorage.get(key);
      console.log('> useLocalStorageMock -> retrieve:', key, result);
      return result;
    },
    store: (key:string, value: any) => {
      console.log('> useLocalStorageMock -> store:', key, value);
      if (!value) { mockStorage.delete(key); }
      mockStorage.set(key, value);
    },
  };
});
export default useLocalStorageMock;
