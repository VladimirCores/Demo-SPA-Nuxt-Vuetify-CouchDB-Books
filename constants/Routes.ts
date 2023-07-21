const INDEX = { path: '/', title: 'Главная' };
const LOGIN = { path: '/login', title: 'Логин' };
const ALL = [INDEX, LOGIN];
export function getRouteTitleByPath(path: String) {
  return ALL.find(r => r.path === path)?.title;
}
export default {
  INDEX,
  LOGIN,
};
