'use client'
import { Gamepad2, Lock, LockOpen, UserRound, Wrench } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MdComputer } from "react-icons/md";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [userId, setUserId] = useState<string | null>('f1ds2dsff');
    const fetch = useRef<boolean | null>(false);

    useEffect(() => {
        if (fetch.current) return;
        const connectionStatus = localStorage.getItem('connectionStatus');
        connectionStatus?.startsWith('c') && connectionStatus.endsWith('c')
            ? setIsLoggedIn(true)
            : setIsLoggedIn(false);
        const extractedUserId = (userId: string) => {
            return userId?.substring(1, userId?.length - 1);
        };
        const userId = extractedUserId(connectionStatus!);
        setUserId(userId);
        fetch.current = true;
    }, []);

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
                                <Wrench size={40} className="text-fuchsia-600 hover:scale-125 cursor-pointer  transition-all duration-200"/>
                            </a>
                            <a href="/auth">
                                <Gamepad2 size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200"/>
                            </a>
                            <a href="/auth">
                                <Lock size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200"/>

                            </a>
                        </>
                    ) : (
                        <>

                            <a href={`/profile?id=${userId}`}>
                                <UserRound size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                            <a href={`/games?id=${userId}`}>
                                <Gamepad2 size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                            <a href={`/services?id=${userId}`}>
                                <Wrench size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                            <a href="">
                                <LockOpen size={40} className="text-fuchsia-600 hover:scale-125 hover:curosr-pointer transition-all duration-200" />
                            </a>
                        </>
                    )}
                </div>
            </MaxWidthWrapper>
        </nav>
    );
}