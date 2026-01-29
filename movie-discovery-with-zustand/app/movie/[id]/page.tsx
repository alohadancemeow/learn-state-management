'use client';

import { use, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useMovieDetails } from '@/hooks/useMovieDetails';
import { getImageUrl } from '@/lib/tmdb';
import { useFavoriteStore } from '@/store/useFavoriteStore';

export default function MoviePage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params using React.use()
  const { id } = use(params);
  
  const { data: movie, isLoading, error } = useMovieDetails(id);
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  
  // We need to handle hydration for the favorite button to match server/client
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center text-red-500 p-8">
        Error loading movie details.
      </div>
    );
  }

  const favorite = isClient ? isFavorite(movie.id) : false;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Backdrop */}
      <div className="relative w-full h-[40vh] md:h-[60vh]">
        <Image
          src={getImageUrl(movie.backdrop_path, 'original')}
          alt={movie.title}
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 to-transparent" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10 pb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Poster */}
          <div className="flex-shrink-0 mx-auto md:mx-0">
            <div className="relative w-64 h-96 rounded-xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-800">
              <Image
                src={getImageUrl(movie.poster_path)}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 pt-8 md:pt-32">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h1>
            <p className="text-xl italic text-gray-600 dark:text-gray-400 mb-6">{movie.tagline}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-sm font-medium"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-6 mb-8">
              <div className="flex items-center">
                <span className="text-yellow-500 text-2xl mr-2">★</span>
                <span className="text-xl font-bold">{movie.vote_average.toFixed(1)}</span>
                <span className="text-gray-500 ml-1">/ 10</span>
              </div>
              <div>
                <span className="text-gray-500">Runtime: </span>
                <span className="font-medium">{movie.runtime} min</span>
              </div>
              <div>
                <span className="text-gray-500">Status: </span>
                <span className="font-medium">{movie.status}</span>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Overview</h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                {movie.overview}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => toggleFavorite(movie)}
                className={`px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2 ${
                  favorite
                    ? 'bg-red-500 text-white hover:bg-red-600'
                    : 'bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={favorite ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                  />
                </svg>
                {favorite ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
              
              <Link
                href="/"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
