const INDEX = { path: '/', title: 'Главная' };
const LOGIN = { path: '/login', title: 'Логин' };
const DASHBOARD = { path: '/', title: 'Дашборд' };
const LIBRARY = { path: '/library', title: 'Справочники' };
const REPORTS = { path: '/reports', title: 'Отчеты' };
const MAP = { path: '/map', title: 'Карта' };

const ALL = [INDEX, LOGIN, DASHBOARD, LIBRARY, REPORTS, MAP];

export const ALLOWED_PATH_FOR_UNAUTHENTICATED = [INDEX.path, LOGIN.path];
export const NOT_ALLOWED_PATH_FOR_AUTHENTICATED = [LOGIN.path];

export function getRouteTitleByPath(path: String) {
  return ALL.find(r => r.path === path)?.title;
}
export default {
  INDEX,
  LOGIN,
  DASHBOARD,
  LIBRARY,
  REPORTS,
  MAP,
};
