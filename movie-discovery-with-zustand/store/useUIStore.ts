import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface UIStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

/**
 * Zustand store for managing UI-related state.
 * 
 * Currently handles theme preference (light/dark mode).
 * Persists the theme preference to local storage.
 */
export const useUIStore = create<UIStore>()(
  persist(
    (set) => ({
      theme: 'light',

      /**
       * Toggles the current theme.
       * If current is 'light', switches to 'dark', and vice versa.
       */
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),

      /**
       * Sets the theme to a specific value.
       * @param {Theme} theme - The theme to set ('light' or 'dark').
       */
      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'ui-theme',
    }
  )
);
