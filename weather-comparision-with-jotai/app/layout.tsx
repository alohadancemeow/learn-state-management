import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import JotaiProvider from "@/components/JotaiProvider";
import ThemeProvider from "@/components/ThemeProvider";
import AppLayout from "@/components/AppLayout";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Comparison App",
  description: "Compare weather across multiple cities using Next.js and Jotai",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <JotaiProvider>
            <ThemeProvider>
              <AppLayout>
                {children}
              </AppLayout>
            </ThemeProvider>
          </JotaiProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
