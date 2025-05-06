"use client";

import { useSearchParams } from "next/navigation";
import { UserProvider } from "../context/userContext";
import decryptId from "@/lib/auth";

export default function GamesLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const encryptedUserId = searchParams.get("id");
    const id = encryptedUserId ? decryptId(encryptedUserId) : null;
    if(!id) return (
        <div className="w-full h-screen flex items-center justify-center">
            <p className="text-white text-3xl md:text-5xl tracking-wider">No ID provided</p>
        </div>
    )
    if(id){
        console.log("the user id in the gamesLayout ", id);
    }

    return (
        <UserProvider userId={id!}>
            <div className="min-h-screen bg-gray-900 text-white">
                {children} 
            </div>
        </UserProvider>
    );
}
