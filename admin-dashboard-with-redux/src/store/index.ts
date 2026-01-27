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

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  ui: uiReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'ui'], // Persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/PURGE', 'persist/REGISTER'],
      },
    }).concat(productsApi.middleware, usersApi.middleware, authApi.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
