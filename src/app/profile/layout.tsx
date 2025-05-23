"use client";

import { UserProvider } from "../context/userContext";
import { EdgeStoreProvider } from "@/lib/edgestore";

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
