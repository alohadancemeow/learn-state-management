import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './index';

// Use throughout your app instead of plain `useDispatch` and `useSelector`

/**
 * A typed version of the `useDispatch` hook.
 * 
 * Use this hook to dispatch actions in components. It ensures that the dispatch
 * function is correctly typed with the application's `AppDispatch` type.
 * 
 * @returns The typed dispatch function
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * A typed version of the `useSelector` hook.
 * 
 * Use this hook to select data from the Redux store. It ensures that the state
 * argument is correctly typed with the application's `RootState` type.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
