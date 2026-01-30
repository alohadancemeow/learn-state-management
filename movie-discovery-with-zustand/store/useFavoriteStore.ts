import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';
import { Movie } from '@/types/tmdb';

interface FavoriteStore {
  /** The list of movies marked as favorites */
  favorites: Movie[];
  /** Adds a movie to the favorites list */
  addFavorite: (movie: Movie) => void;
  /** Removes a movie from the favorites list by its ID */
  removeFavorite: (movieId: number) => void;
  /** Checks if a movie is currently in the favorites list */
  isFavorite: (movieId: number) => boolean;
  /** Toggles the favorite status of a movie (adds if missing, removes if present) */
  toggleFavorite: (movie: Movie) => void;
}

/**
 * Zustand store creator for managing favorite movies.
 * Separated from the hook creation to allow for easier testing and composition.
 */
export const createFavoriteStore: StateCreator<FavoriteStore> = (set, get) => ({
  favorites: [],

  /**
   * Adds a movie to the favorites array.
   * @param {Movie} movie - The movie object to add.
   */
  addFavorite: (movie: Movie) =>
    set((state) => ({ favorites: [...state.favorites, movie] })),

  /**
   * Removes a movie from the favorites array by ID.
   * @param {number} movieId - The ID of the movie to remove.
   */
  removeFavorite: (movieId: number) =>
    set((state) => ({
      favorites: state.favorites.filter((m) => m.id !== movieId),
    })),

  /**
   * Checks if a movie is in the favorites list.
   * @param {number} movieId - The ID of the movie to check.
   * @returns {boolean} True if the movie is a favorite, false otherwise.
   */
  isFavorite: (movieId: number) =>
    get().favorites.some((m) => m.id === movieId),

  /**
   * Toggles the favorite status of a movie.
   * If the movie is already a favorite, it is removed.
   * If it is not, it is added.
   * @param {Movie} movie - The movie to toggle.
   */
  toggleFavorite: (movie: Movie) => {
    const { isFavorite, addFavorite, removeFavorite } = get();
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  },
});

/**
 * Zustand hook for consuming the favorite store.
 * 
 * Persists data to local storage using the 'favorite-storage' key.
 */
export const useFavoriteStore = create<FavoriteStore>()(
  persist(
    createFavoriteStore,
    {
      name: 'favorite-storage',
    }
  )
);