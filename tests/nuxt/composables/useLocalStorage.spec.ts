import { describe, expect, it, beforeEach } from 'vitest';
import LocalKeys from '~/constants/LocalKeys';

const mockData = { name: 'Mock' };

beforeEach(() => {
  console.log('beforeEach -> clearNuxtState');
  useLocalStorage().store(LocalKeys.PROFILE, null);
  clearNuxtState();
});

describe('Test composable - useLocalStorage', () => {
  it('retrieve when not stored', () => {
    expect(useLocalStorage().retrieve(LocalKeys.PROFILE)).toBeNull();
  });
  it('store then retrieve', () => {
    useLocalStorage().store(LocalKeys.PROFILE, mockData);
    expect(useLocalStorage().retrieve(LocalKeys.PROFILE)).toBeDefined();
    expect((useLocalStorage().retrieve(LocalKeys.PROFILE) as any).name).toEqual(mockData.name);
  });
});
