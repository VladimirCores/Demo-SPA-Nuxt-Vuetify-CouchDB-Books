import PouchDB from 'pouchdb-browser';
import PouchFind from 'pouchdb-find';
import PouchAuth from 'pouchdb-authentication';
PouchDB
  .plugin(PouchFind)
  .plugin(PouchAuth);

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const url = config.public.DATA_SOURCE_URL;
  const port = config.public.DATA_SOURCE_PORT;
  const databases = new Map<string, any>();
  return {
    name: 'pouchdb',
    parallel: true,
    provide: {
      connect: (db = '', isLocal = false): any => {
        if (databases.has(db)) { return databases.get(db); } else { return (databases.set(db, new PouchDB(isLocal ? db : `${url}:${port}/${db}`, { skip_setup: true })), databases.get(db)); }
      },
    },
  };
},
);
