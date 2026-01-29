import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

/**
 * Creates a "noop" (no-operation) storage for server-side environments.
 * 
 * Since 'localStorage' is not available on the server (SSR), this dummy storage
 * implementation prevents errors during the build or server-side rendering process.
 * All methods return resolved promises with null or default values.
 */
const createNoopStorage = () => {
  return {
    getItem(_key: string) {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: string) {
      return Promise.resolve();
    },
  };
};

/**
 * The storage engine for redux-persist.
 * 
 * It uses 'createWebStorage("local")' (localStorage) on the client side,
 * and falls back to 'createNoopStorage' on the server side (SSR) to ensure compatibility with Next.js.
 */
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

export default storage;
