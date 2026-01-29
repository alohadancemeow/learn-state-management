import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { persistReducer, persistStore } from 'redux-persist';
import storage from './storage';

// Slices
import authReducer from './slices/authSlice';
import cartReducer from './slices/cartSlice';
import uiReducer from './slices/uiSlice';

// APIs
import { productsApi } from './api/productsApi';
import { usersApi } from './api/usersApi';
import { authApi } from './api/authApi';

/**
 * Combines all reducers into a single root reducer.
 * 
 * This includes slices for authentication, cart, and UI state, as well as API reducers for data fetching.
 */

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  ui: uiReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});


/**
 * Configuration for Redux Persist.
 * 
 * Specifies the storage mechanism, key, and slices to persist.
 */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'ui'], // Persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configures the Redux store with the persisted reducer and middleware.
 * 
 * It includes slices for authentication, cart, and UI state, as well as API middleware for data fetching.
 * 
 * @returns Configured Redux store instance
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE', 'persist/REGISTER'],
      },
    }).concat(productsApi.middleware, usersApi.middleware, authApi.middleware),
});

/**
 * Sets up listeners for the Redux store to handle async actions.
 * 
 * This is required for features like refetching on focus or window re-visit.
 * 
 * @param dispatch - The dispatch function from the Redux store
 */
setupListeners(store.dispatch);

/**
 * Creates a persistor instance for the Redux store to handle persistence.
 * 
 * This is used to save the state to storage and rehydrate it on app startup.
 * 
 * @returns Persistor instance for the Redux store
 */
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
