"use client";
import { UserProvider } from "../context/userContext";
export default function GamesLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <div className="min-h-screen text-white">
                {children} 
            </div>
        </UserProvider>
    );
}
