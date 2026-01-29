import { useEffect, useState } from 'react';
import { useSearchStore } from '@/store/useSearchStore';

export default function SearchBar() {
  const { searchQuery, setSearchQuery } = useSearchStore();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [localQuery, setSearchQuery]);

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150 ease-in-out sm:text-sm"
          placeholder="Search movies..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
        />
      </div>
    </div>
  );
}
