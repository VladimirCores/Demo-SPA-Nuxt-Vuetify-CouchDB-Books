import Routes from '~/constants/Routes';

export default function() {
  const { isExists: isUserExists } = useUser();
  const { currentRoute } = useRouter();
  return ({
    get isPagesNavigationAllowed() {
      return computed(() => {
        const whenAuth = isUserExists.value;
        const whenNotAuthOnLoginPage = !isUserExists.value && Routes.LOGIN.path === currentRoute.value.path;
        return whenAuth || whenNotAuthOnLoginPage;
      });
    },
  });
}
