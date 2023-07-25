import PouchDB from 'pouchdb';
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
  const options = {
    skip_setup: true,
  };
  return {
    name: 'pouchdb',
    parallel: true,
    provide: {
      connect: (db = '', isLocal = false): any => {
        if (databases.has(db)) {
          return databases.get(db);
        } else {
          const path = isLocal ? db : `${url}:${port}/${db}`;
          const instance = new PouchDB(path, options);
          // console.log('connect> instance:', instance);
          return (databases.set(db, instance), instance);
        }
      },
    },
  };
},
);
