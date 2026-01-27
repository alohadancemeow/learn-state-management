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
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'en' | 'th'>) => {
      state.language = action.payload;
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },
  },
});

export const { toggleTheme, setTheme, setLanguage, toggleCollapsed, setCollapsed } = uiSlice.actions;
export default uiSlice.reducer;
