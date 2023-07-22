import Routes from '~/constants/Routes';

export default function() {
  const { isExists: isUserExists } = useUser();
  const { currentRoute } = useRouter();
  return ({
    get isNavigationAllowed() {
      return computed(() => isUserExists.value || currentRoute.value.path === Routes.LOGIN.path);
    },
  });
}
