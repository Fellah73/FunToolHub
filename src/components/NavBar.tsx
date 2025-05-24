'use client'
import { User } from "@prisma/client";
import { Gamepad2, Lock, LogOut, UserRound, Wrench } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdComputer } from "react-icons/md";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {

        if (user) return;
        const checkAuth = async () => {
            try {
                const res = await fetch(`/api/me`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const data = await res.json();


                if (!res.ok || !data.success) {
                    setIsLoggedIn(false);
                    return;
                } else {
                    setIsLoggedIn(true);
                    setUser(data.user);
                }

            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
        checkAuth();
    }, [user, isLoggedIn]);

    const handleLogout = async () => {
        try {
            const res = await fetch(`/api/logout`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (!res.ok || !data.success) throw new Error(data.message);
            setIsLoggedIn(false);
            setUser(null);
            window.location.href = "/";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-opacity-30 bg-gradient-to-r from-violet-950 via-transparent to-transparent shadow-lg shadow-fuchsia-900/50">
            <MaxWidthWrapper className="flex items-center justify-between gap-x-4 py-3 px-4 w-[95%] mx-auto text-white">
                {/* Logo and Name */}
                <Link href={'/'} className="flex items-center gap-2">
                    <MdComputer className="text-3xl text-fuchsia-600 mr-8" size={40} />
                    <p className="text-xl md:text-2xl tracking-wide font-bold text-fuchsia-500">FunTool Hub</p>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex justify-between items-center gap-x-8">
                    {!isLoggedIn ? (
                        <>
                            <a href="/auth">
                                <Wrench size={40} className="text-fuchsia-600 hover:scale-125 cursor-pointer  transition-all duration-200" />
                            </a>
                            <a href="/auth">
                                <Gamepad2 size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                            <a href="/auth">
                                <Lock size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />

                            </a>
                        </>
                    ) : (
                        <>
                            <a href={`/profile`}>
                                <UserRound size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                            <a href={`/games`}>
                                <Gamepad2 size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                            <a href={`/services`}>
                                <Wrench size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                            <button onClick={handleLogout}>
                                <LogOut size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </button>
                        </>
                    )}
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}