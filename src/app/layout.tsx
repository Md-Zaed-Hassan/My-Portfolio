// FILE: src/app/layout.tsx

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/navbar";
import InteractiveBackground from "@/components/InteractiveBackground";

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Shams's Portfolio",
  description: "Software Engineer & Video Editor Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${roboto.className} pt-20 antialiased`}>
        <InteractiveBackground />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
