import { describe, expect, it, beforeEach, vi } from 'vitest';
import { mockNuxtImport } from 'nuxt-vitest/utils';
import LocalKeys from '~/constants/LocalKeys';
import ILocalStorage from '~/interfaces/ILocalStorage';

const mockProfile = { name: 'Mock' };

interface IMockLocalStorage {
  ():ILocalStorage
}

const mockStorage = new Map();

const mockUseLocalStorage = vi.fn(():ILocalStorage => {
  return {
    retrieve: (key:string): any => {
      const result = mockStorage.get(key);
      // console.log('mock> useLocalStorage -> retrieve:', key, result);
      return result;
    },
    store: (key:string, value: any) => {
      // console.log('mock> useLocalStorage -> store:', key, value);
      if (!value) {
        mockStorage.delete(key);
      } else {
        mockStorage.set(key, value);
      }
    },
  };
});

mockNuxtImport<typeof useLocalStorage>('useLocalStorage', ():IMockLocalStorage => {
  // console.log('> mockNuxtImport -> useLocalStorage');
  return () => mockUseLocalStorage();
});

beforeEach(() => {
  console.log('beforeEach -> clearNuxtState');
  useLocalStorage().store(LocalKeys.PROFILE, null);
});

describe('Test mock composable - mockUseLocalStorage', () => {
  it('retrieve when not stored, then store and try again', () => {
    expect(useLocalStorage().retrieve(LocalKeys.PROFILE)).toBeUndefined();
    useLocalStorage().store(LocalKeys.PROFILE, mockProfile);
    expect(useLocalStorage().retrieve(LocalKeys.PROFILE)).toBeDefined();
    expect((useLocalStorage().retrieve(LocalKeys.PROFILE) as any).name).toEqual(mockProfile.name);
    console.log('profile -> ', useLocalStorage().retrieve(LocalKeys.PROFILE));
  });
});
