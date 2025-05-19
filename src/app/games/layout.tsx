"use client";

import { useSearchParams } from "next/navigation";
import { UserProvider } from "../context/userContext";
import decryptId from "@/lib/auth";

export default function GamesLayout({ children }: { children: React.ReactNode }) {
    const searchParams = useSearchParams();
    const encryptedUserId = searchParams.get("id");
    const id = encryptedUserId ? decryptId(encryptedUserId) : null;// ✅ Récupérer l'id depuis l'URL
    if(!id) return (
        <div className="w-full h-screen flex items-center justify-center">
            <p className="text-white text-3xl md:text-5xl tracking-wider">No ID provided</p>
        </div>
    )
    if(id){
        console.log("the user id in the gamesLayout ", id);
    }

    return (
        <UserProvider userId={id!}> {/* ✅ Passer `id` au UserProvider */}
            <div className="min-h-screen  text-white">
                {children} {/* ✅ Toutes les sous-pages sont enveloppées */}
            </div>
        </UserProvider>
    );
}
