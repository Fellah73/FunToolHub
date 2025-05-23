"use client";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { UserProvider } from "../context/userContext";

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
