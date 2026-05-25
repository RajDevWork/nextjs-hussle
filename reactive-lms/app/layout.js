import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";

import {ConnectToDB} from '@/service/mongo'
import { getCourses } from "@/queries/courses";


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

export default async function RootLayout({ children }) {

  await ConnectToDB() // established db connection
  const courses = await getCourses()
  console.log(courses)


  console.log(courses[0]?.instructor?.socialMedia);
  console.log(courses[1]?.testimonials);

  return (
    <html
      lang="en"
      className={cn(`${geistSans.variable} ${geistMono.variable} antialiased, poppins.className`)}
    >
      <body className="min-h-full flex flex-col">{children}
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
