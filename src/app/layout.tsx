import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {ThemeProvider} from "@/components/themeProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Occulta",
  description: "Occulta is a web application that allows you to hide data or files within an AI generated image" +
      "or your own custom image using advanced steganography.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} h-screen overflow-hidden`}>
      <ThemeProvider>
          <div className="h-screen flex flex-col">
              <Header/>
              <main className="flex-1 overflow-auto">{children}</main>
              <Footer />
          </div>
      </ThemeProvider>
      </body>
      </html>
  );
}
