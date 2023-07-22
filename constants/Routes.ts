const INDEX = { path: '/', title: 'Главная' };
const LOGIN = { path: '/login', title: 'Логин' };
const ALL = [INDEX, LOGIN];

export const ALLOWED_PATH_FOR_UNAUTHENTICATED = [INDEX.path, LOGIN.path];
export const NOT_ALLOWED_PATH_FOR_AUTHENTICATED = [LOGIN.path];

export function getRouteTitleByPath(path: String) {
  return ALL.find(r => r.path === path)?.title;
}
export default {
  INDEX,
  LOGIN,
};
