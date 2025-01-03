import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/app/context/AuthContext";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouApp",
  description: "Bertemu orang melalui Takdir untuk kerja, bermain & kencan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <NextThemesProvider attribute="class">
            <AuthProvider>{children}</AuthProvider>
          </NextThemesProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
