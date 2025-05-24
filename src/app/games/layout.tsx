import { UserProvider } from "../context/userContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Games | FunToolHub",
    description: "Play classic games like Flappy Bird, Snake, and Tic Tac Toe. Compete on leaderboards and track your performance.",
    keywords: ["games", "fun", "play", "challenge", "Tic Tac Toe", "Snake", "Flappy Bird"],
};
export default function GamesLayout({ children }: { children: React.ReactNode }) {


    return (
        <UserProvider>
            <div className="min-h-screen  text-white">
                {children}
            </div>
        </UserProvider>
    );
}
