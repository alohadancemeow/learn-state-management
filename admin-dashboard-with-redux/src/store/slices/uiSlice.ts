import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  language: 'en' | 'th';
  collapsed: boolean;
}

const initialState: UIState = {
  theme: 'light',
  language: 'en',
  collapsed: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    /**
     * Toggles the UI theme between 'light' and 'dark'.
     * 
     * @param state - Current UI state
     */
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    /**
     * Sets the UI theme to a specific value.
     * 
     * @param state - Current UI state
     * @param action - Payload containing the theme ('light' or 'dark')
     */
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    /**
     * Sets the application language.
     * 
     * @param state - Current UI state
     * @param action - Payload containing the language code ('en' or 'th')
     */
    setLanguage: (state, action: PayloadAction<'en' | 'th'>) => {
      state.language = action.payload;
    },
    /**
     * Toggles the collapsed state of the sidebar/drawer.
     * 
     * @param state - Current UI state
     */
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    /**
     * Sets the collapsed state of the sidebar/drawer to a specific value.
     * 
     * @param state - Current UI state
     * @param action - Payload containing the boolean collapsed state
     */
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setLanguage, toggleCollapsed, setCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
