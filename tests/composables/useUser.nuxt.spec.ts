import { describe, expect, it, beforeEach } from 'vitest';
import { mockNuxtImport } from 'nuxt-vitest/utils';
import LocalKeys from '~/constants/LocalKeys';
import ILocalStorage from '~/interfaces/ILocalStorage';
import useLocalStorageMock from '~/tests/composables/useLocalStorageMock';

const mockProfile = { name: 'Mock' };

interface IMockLocalStorage {
  ():ILocalStorage
}

mockNuxtImport<typeof useLocalStorage>('useLocalStorage', ():IMockLocalStorage => {
  return () => useLocalStorageMock();
});

beforeEach(() => {
});

it('Test - useLocalStorage mock', () => {
  expect(useLocalStorage().retrieve(LocalKeys.PROFILE)).toBeNull();
  useLocalStorage().store(LocalKeys.PROFILE, mockProfile);
  expect(useLocalStorage().retrieve(LocalKeys.PROFILE)).toBeDefined();
  console.log('profile -> ', useLocalStorage().retrieve(LocalKeys.PROFILE));
});

describe('Test composable - useUser', () => {
  // console.log('Test composable - useUser');
  it('isExists - false', () => {
    useLocalStorage().store(LocalKeys.PROFILE, null);
    const { isExists } = useUser();
    console.log('isExists.value', isExists.value);
    expect(isExists.value).toBeFalsy();
  });

  it('isExists - true from local storage', () => {
    useLocalStorage().store(LocalKeys.PROFILE, mockProfile);
    const { isExists } = useUser();
    console.log('isExists.value =', isExists.value);
    expect(isExists.value).toBeTruthy();
  });
});
