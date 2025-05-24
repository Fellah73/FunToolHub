
import { EdgeStoreProvider } from "@/lib/edgestore";
import { UserProvider } from "../context/userContext";
import type { Metadata } from "next";

// app/profile/page.tsx
export const metadata: Metadata = {
    title: "Your Profile | FunToolHub",
    description: "View and manage your profile, track your scores and customize your experience on FunToolHub.",
    keywords: ["profile", "user settings", "FunToolHub", "gamified profile", "user account", "customize"],
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {

    return (
        <UserProvider>
            <div className="min-h-screen">
                <EdgeStoreProvider>
                    {children}
                </EdgeStoreProvider>
            </div>
        </UserProvider>
    );
}
