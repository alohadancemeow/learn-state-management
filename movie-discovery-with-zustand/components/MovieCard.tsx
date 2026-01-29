import Link from 'next/link';
import Image from 'next/image';
import { Movie } from '@/types/tmdb';
import { getImageUrl } from '@/lib/tmdb';
import { useFavoriteStore } from '@/store/useFavoriteStore';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteStore();
  const favorite = isFavorite(movie.id);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 relative group">
      <Link href={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] w-full">
          <Image
            src={getImageUrl(movie.poster_path)}
            alt={movie.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      
      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(movie);
        }}
        className={`absolute top-2 right-2 p-2 rounded-full shadow-md transition-colors ${
          favorite ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-600 hover:bg-white'
        }`}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
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
      </button>

      <div className="p-4">
        <Link href={`/movie/${movie.id}`}>
          <h3 className="font-bold text-lg mb-1 truncate hover:text-blue-500 transition-colors">
            {movie.title}
          </h3>
        </Link>
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <span>{new Date(movie.release_date).getFullYear()}</span>
          <span className="flex items-center text-yellow-500">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}
