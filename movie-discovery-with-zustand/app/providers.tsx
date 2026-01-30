'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, useEffect } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { ConfigProvider, theme as antdTheme } from 'antd';

/**
 * Global provider wrapper for the application.
 * 
 * Sets up:
 * - React Query Client for data fetching and caching.
 * - Ant Design ConfigProvider for theming (light/dark mode).
 * - Global theme synchronization (adds 'dark' class to html element).
 * - Hydration management to prevent theme flickering on initial load.
 */
export default function Providers({ children }: { children: React.ReactNode }) {
  // Initialize QueryClient with default options (1 minute stale time)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: 1,
      },
    },
  }));

  const { theme } = useUIStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch by only rendering themed components after mount
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    // Sync theme with document class for Tailwind dark mode support
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <QueryClientProvider client={queryClient}>
      {mounted ? (
        <ConfigProvider
          theme={{
            // cssVar: { prefix: 'ant', key: 'movie-discovery' },
            algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
            token: {
              colorPrimary: '#3b82f6', // Matching the blue-500 from Tailwind
            }
          }}
        >
          {children}
        </ConfigProvider>
      ) : (
        <>{children}</>
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
