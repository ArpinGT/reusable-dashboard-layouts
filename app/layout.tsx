import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const helveticaNeueUltraLight = localFont({
  src: "/assets/fonts/HelveticaNeueUltraLight.ttf",
  variable: "--font-helvetica-neue-ultra-light",
});

export const metadata: Metadata = {
  title: "Resuable Dashboard Layout",
  description: "A collection of reusable, scalable & customizable dashboard layouts for faster UI design.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`
        ${inter.variable}
        ${openSans.variable}
        ${helveticaNeueUltraLight.variable}
        h-full
        antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}