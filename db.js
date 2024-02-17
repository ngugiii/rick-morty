const dbName = 'rickAndMortyDB';
const dbVersion = 1;
let db;

export const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open(dbName, dbVersion);

    request.onerror = (event) => {
      console.error('IndexedDB error:', event.target.error);
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      db = event.target.result;
      resolve();
    };

    request.onupgradeneeded = (event) => {
      db = event.target.result;
      db.createObjectStore('notes', { keyPath: 'characterId' });
    };
  });
};

export const addNote = (characterId, note) => {
  const transaction = db.transaction('notes', 'readwrite');
  const store = transaction.objectStore('notes');
  store.add({ characterId, note });
};

export const getNote = (characterId) => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('notes', 'readonly');
    const store = transaction.objectStore('notes');
    const request = store.get(characterId);

    request.onerror = (event) => {
      reject(event.target.error);
    };

    request.onsuccess = (event) => {
      resolve(event.target.result);
    };
  });
};
