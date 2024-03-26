import { openDB } from 'idb';

const initDB = async () => {
  return openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        const store = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        
      }
    },
  });
};

// Function to store content in IndexedDB
export const putDb = async (content) => {
  const db = await initDB();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  await store.put({ content });
  await tx.done;
};

// Function to retrieve content from IndexedDB
export const getDb = async () => {
  const db = await initDB();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  return store.getAll();
};
