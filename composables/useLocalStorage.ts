import ILocalStorage from '~/interfaces/ILocalStorage';

export function useLocalStorage():ILocalStorage {
  return {
    retrieve(key:string):any {
      console.log('> useLocalStorage -> retrieve:', key, localStorage.getItem(key));
      try { return JSON.parse(localStorage.getItem(key) || ''); } catch (e) { return null; }
    },
    store(key:string, value:any):void {
      if (!value) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(value));
      }
    },
  };
}
