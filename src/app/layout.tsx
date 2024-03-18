"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { UrqlProvider } from "@urql/next";
import { client, ssr } from "@/lib/urql";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UrqlProvider client={client} ssr={ssr}>
          <Header />
          {children}
        </UrqlProvider>
      </body>
    </html>
  );
}
