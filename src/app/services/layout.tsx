import type { Metadata } from "next";
import { UserProvider } from "../context/userContext";
// app/services/page.tsx
export const metadata: Metadata = {
    title: "Services | FunToolHub",
    description: "Stay productive with our integrated to-do list and stay connected with prayer time tracking features.",
    keywords : ["to-do list", "prayer times"],
  };
  
export default function GamesLayout({ children }: { children: React.ReactNode }) {
    return (
        <UserProvider>
            <div className="min-h-screen text-white">
                {children} 
            </div>
        </UserProvider>
    );
}
