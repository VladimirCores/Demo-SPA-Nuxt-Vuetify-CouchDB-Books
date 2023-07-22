import { ALLOWED_PATH_FOR_UNAUTHENTICATED, NOT_ALLOWED_PATH_FOR_AUTHENTICATED } from '~/constants/Routes';

export default defineNuxtRouteMiddleware((to, _) => {
  const user = useUser();
  const isUserExists = user.isExists.value;
  console.log('> RouteMiddleware: isUserExists =', isUserExists);
  if ((!isUserExists && !ALLOWED_PATH_FOR_UNAUTHENTICATED.includes(to.path)) ||
    (isUserExists && NOT_ALLOWED_PATH_FOR_AUTHENTICATED.includes(to.path))) {
    return abortNavigation();
  }
});
