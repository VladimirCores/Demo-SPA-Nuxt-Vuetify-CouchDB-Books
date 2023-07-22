const navigator = useNavigator();

export default defineNuxtRouteMiddleware((to, _) => {
  console.log('> RouteMiddleware -> navigator.isNavigationAllowed =', navigator.isNavigationAllowed, to);
  if (!navigator.isNavigationAllowed) {
    return abortNavigation();
  }
  // // In a real app you would probably not redirect every route to `/`
  // // however it is important to check `to.path` before redirecting or you
  // // might get an infinite redirect loop
  // if (to.path !== '/') {
  //   return navigateTo('/');
  // }
});
