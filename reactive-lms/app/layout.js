import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Reactive Learning Management System",
  description: "A place where learning becomes easy.",
};

const poppins = Inter({subsets: ['latin'], variable: "--font-poppins"});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(`${geistSans.variable} ${geistMono.variable} antialiased, poppins.className`)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
