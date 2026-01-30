import { create } from 'zustand';

interface SearchStore {
  /** The current search query string */
  searchQuery: string;
  /** The currently selected genre ID, or null if none selected */
  selectedGenre: number | null;
  /** Updates the search query */
  setSearchQuery: (query: string) => void;
  /** Updates the selected genre */
  setSelectedGenre: (genreId: number | null) => void;
}

/**
 * Zustand store for managing global search and filter state.
 * 
 * Keeps track of the user's current search query and selected genre filter.
 * This state is shared across components like the SearchBar, GenreFilter, and MovieList.
 */
export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  selectedGenre: null,
  
  /**
   * Sets the current search query.
   * @param {string} query - The new search text.
   */
  setSearchQuery: (query: string) => set({ searchQuery: query }),

  /**
   * Sets the currently selected genre.
   * @param {number | null} genreId - The ID of the genre to select, or null to clear.
   */
  setSelectedGenre: (genreId: number | null) => set({ selectedGenre: genreId }),
}));
