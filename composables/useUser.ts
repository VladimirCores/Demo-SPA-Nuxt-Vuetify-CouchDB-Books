import IUser from '~/interfaces/IUser';
import LocalKeys from '~/constants/LocalKeys';

export function useUser():IUser {
  const profile: any = useState('profile', () => useLocalStorage().retrieve(LocalKeys.PROFILE));
  return ({
    get isExists() { return computed(() => !!profile.value); },
    get profile() { return profile; },
    setupProfile: (value: any) => {
      if (!value) { throw new Error('profile can not be setup with null'); }
      useLocalStorage().store(LocalKeys.PROFILE, JSON.stringify(value));
      profile.value = value;
    },
    resetProfile: () => {
      useLocalStorage().store(LocalKeys.PROFILE, null);
      profile.value = null;
    },
  });
}
