import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const recursive = Recursive({ subsets: ["latin"] });

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "FunToolHub | Play, Plan, and Pray",
  description: "FunToolHub offers exciting games like Flappy Bird and Snake, and helpful tools like prayer times and to-do list. Login to track your progress and customize your experience.",
  keywords: ["fun games", "Flappy Bird", "Snake game", "to-do list", "prayer times", "Muslim tools", "leaderboard", "profile", "Islamic daily planner", "gamified productivity"],
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${recursive.className} antialiased`}
      >
        <NavBar />
        <main className="flex flex-col grainy-light min-h-[calc(100vh-3.5rem-1px)]">
          <div className="flex flex-1 flex-col h-full">
            {children}
          </div>
          <Footer />
        </main>
        <Toaster />
      </body>
    </html>
  );
}