import { describe, expect, it, beforeEach } from 'vitest';

const mockProfile = { name: 'Mock' };

beforeEach(() => {
  // console.log('beforeEach -> clearNuxtState');
  useUser().resetProfile();
  clearNuxtState();
});

describe('Test composable - useUser', () => {
  it('isExists - false, profile does not setup', () => {
    const { isExists } = useUser();
    expect(isExists.value).toBeFalsy();
  });

  it('isExists - true, after profile setup', () => {
    const { isExists, setupProfile, profile } = useUser();
    expect(isExists.value).toBeFalsy();
    setupProfile(mockProfile);
    expect(isExists.value).toBeTruthy();
    expect(profile.value).toEqual(mockProfile);
  });

  it('Throw error when trying to set null profile', () => {
    const { isExists, setupProfile } = useUser();
    expect(isExists.value).toBeFalsy();
    expect(() => setupProfile(null)).toThrowError(/profile/);
  });

  it('Reset profile', () => {
    const { isExists, setupProfile, resetProfile } = useUser();
    expect(isExists.value).toBeFalsy();
    setupProfile(mockProfile);
    expect(isExists.value).toBeTruthy();
    resetProfile();
    expect(isExists.value).toBeFalsy();
  });
});
