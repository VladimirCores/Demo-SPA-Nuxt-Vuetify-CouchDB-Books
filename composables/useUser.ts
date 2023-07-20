import IUser from '~/interfaces/IUser';

const LOCAL_KEY_USER = 'profile';

export default function():IUser {
  const profile: any = useState('profile', () => JSON.parse(localStorage.getItem(LOCAL_KEY_USER) || '""', (json) => {
    return Object.keys(json).length > 0 ? json : null;
  }));
  watch(profile, (value) => {
    localStorage.setItem(LOCAL_KEY_USER, JSON.stringify(value));
  });
  return ({
    get isExist() { return computed(() => profile.value != null); },
    get profile() { return profile; },
  });
}
