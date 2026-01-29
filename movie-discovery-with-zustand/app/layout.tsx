import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Discovery App",
  description: "Find your favorite movies with Next.js, Zustand, and React Query",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300`}
      >
        <Providers>
          <header className="bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-teal-400">
                MovieDiscovery
              </Link>
              <div className="flex items-center gap-4">
                <Link href="/" className="hover:text-blue-500 transition-colors">Home</Link>
                <ThemeToggle />
              </div>
            </div>
          </header>
          {children}
        </Providers>
      </body>
    </html>
  );
}
