# Movie Discovery App

A modern movie discovery application built with **Next.js 16 (App Router)**, **Zustand**, and **React Query**. This project demonstrates clean architecture, separation of concerns between server and client state, and a polished user interface.

## 🚀 Tech Stack

-   **Framework:** [Next.js 16](https://nextjs.org/) (App Router, TypeScript)
-   **State Management (Global/UI):** [Zustand](https://zustand-demo.pmnd.rs/)
-   **Server State (API/Caching):** [TanStack Query](https://tanstack.com/query/latest)
-   **Styling:** Tailwind CSS
-   **API:** [TMDB API](https://www.themoviedb.org/)

## 🏗 Architecture Decisions

### State Management Strategy
The application strictly separates state types to ensure scalability and maintainability:

1.  **Server State (React Query):**
    *   Used for all API data fetching (Trending movies, Search results, Movie details, Genres).
    *   Handles caching, loading states, error states, and re-fetching.
    *   Example: `useTrendingMovies`, `useMovieDetails`.

2.  **Client State (Zustand):**
    *   Used for purely client-side data and UI preferences.
    *   **Favorites:** Persisted to local storage using Zustand's `persist` middleware.
    *   **UI State:** Theme (Light/Dark mode) and Search Input state.
    *   Example: `useFavoriteStore`, `useUIStore`.

### Key Features
-   **Trending Movies:** Fetches weekly trending movies from TMDB.
-   **Search Functionality:** Real-time search with debounced input.
-   **Genre Filtering:** Dynamic filtering of movies by genre.
-   **Movie Details:** Dedicated page with deep linking for movie information.
-   **Favorites System:** Persisted list of favorite movies.
-   **Dark Mode:** Global theme toggling with persistence.
-   **Responsive Design:** Fully responsive grid and layout.

## 🛠 Getting Started

1.  **Clone the repository**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    *   Create a `.env.local` file in the root.
    *   Add your TMDB API Key:
        ```
        NEXT_PUBLIC_TMDB_API_KEY=your_api_key_here
        ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 📂 Project Structure

```
app/            # Next.js App Router pages and layouts
components/     # Reusable UI components
hooks/          # Custom React Query hooks
lib/            # API client and utility functions
store/          # Zustand stores
types/          # TypeScript definitions
```
