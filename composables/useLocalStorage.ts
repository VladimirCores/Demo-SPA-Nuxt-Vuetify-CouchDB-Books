import ILocalStorage from '~/interfaces/ILocalStorage';

export default function():ILocalStorage {
  return {
    retrieve(key:string):any {
      console.log('> useLocalStorage -> retrieve:', key);
      try { return JSON.parse(localStorage.getItem(key) || ''); } catch (e) { return null; }
    },
    store(key:string, value:any):void {
      localStorage.setItem(key, JSON.stringify(value));
    },
  };
}
