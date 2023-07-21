import IUser from '~/interfaces/IUser';
import LocalKeys from '~/constants/LocalKeys';

export default function():IUser {
  const profile: any = useState('profile', () => useLocalStorage().retrieve(LocalKeys.PROFILE));
  return ({
    get isExists() { return computed(() => profile.value != null); },
    get profile() { return profile; },
    setupProfile: (value) => {
      localStorage.setItem(LocalKeys.PROFILE, JSON.stringify(value));
      profile.value = value;
    },
  });
}
