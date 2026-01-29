import { create } from 'zustand';

interface SearchStore {
  searchQuery: string;
  selectedGenre: number | null;
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genreId: number | null) => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  searchQuery: '',
  selectedGenre: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedGenre: (genreId) => set({ selectedGenre: genreId }),
}));
