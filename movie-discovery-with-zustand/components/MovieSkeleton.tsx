export default function MovieSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-[2/3] w-full bg-gray-300 dark:bg-gray-700" />
      <div className="p-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
        <div className="flex justify-between items-center">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/4" />
        </div>
      </div>
    </div>
  );
}
