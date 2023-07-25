const INDEX = { path: '/', title: 'Main' };
const LOGIN = { path: '/login', title: 'Login' };
const DASHBOARD = { path: '/', title: 'Dashboard' };
const BOOKS = { path: '/books', title: 'Books' };
const REPORTS = { path: '/reports', title: 'Reports' };
const MAP = { path: '/map', title: 'Map' };

const ALL = [INDEX, LOGIN, DASHBOARD, BOOKS, REPORTS, MAP];

export const ALLOWED_PATH_FOR_UNAUTHENTICATED = [INDEX.path, LOGIN.path];
export const NOT_ALLOWED_PATH_FOR_AUTHENTICATED = [LOGIN.path];

export function getRouteTitleByPath(path: String) {
  return ALL.find(r => r.path === path)?.title;
}
export default {
  INDEX,
  LOGIN,
  DASHBOARD,
  BOOKS,
  REPORTS,
  MAP,
};
