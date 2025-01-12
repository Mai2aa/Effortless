import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Image from "next/image";
import useAuthRedirect from '@/app/useAuthRedirect'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "E-formless Website",
  description: "An AI Form Builder Website",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en" data-theme="light">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Header/>
      <Toaster/>
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
