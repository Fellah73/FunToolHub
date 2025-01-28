'use client'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
export default function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const fetch = useRef<boolean | null>(false);
    const [userId, setUserId] = useState<string | null>('f1ds2dsff');
    useEffect(() => {
        if (fetch.current) return
        const connectionStatus = localStorage.getItem('connectionStatus')
        connectionStatus?.startsWith('c') && connectionStatus.endsWith('c') ? setIsLoggedIn(true) : setIsLoggedIn(false)
        const extractedUserId = (userId: string) => {
            return userId?.substring(1, userId?.length - 1)
        }
        const userId = extractedUserId(connectionStatus!)
        setUserId(userId)

        fetch.current = true
    }, [])



    return (
        <nav className="sticky top-0 z-50 backdrop-blur-2xl w-full h-16 inset-x-0 my-2">
            <MaxWidthWrapper className="flex items-center justify-between py-3 my-2 px-4 w-[90%] mx-auto border-primary border-b-2 rounded-xl bg-blue-950 text-white">
                <Link href={'/'}>
                    <p className="text-xl md:text-2xl text-white tracking-tighter">Moh dev</p>
                </Link>
                <div className="flex justify-between gap-2">
                    {
                        !isLoggedIn ? (
                            <>

                                <Link href="/register" className='font-semibold text-sm text-white bg-blue-950 rounded-xl border border-primary hover:bg-white hover:text-black py-2 px-6 sm:flex sm:items-center sm:justify-center hidden' >
                                    Sign Up
                                </Link>
                                <Link href='/login' className="font-semibold text-sm text-white bg-blue-950 rounded-xl border border-primary hover:bg-white hover:text-black py-2 px-6 flex items-center justify-center">
                                    Login
                                </Link>

                            </>
                        ) : (
                            <>
                                <Link href='/logout' className="font-semibold text-sm text-white bg-blue-950 rounded-xl border border-primary hover:bg-white hover:text-black py-2 px-6 flex items-center justify-center">
                                    Logout
                                </Link>
                                <Link href={`/dashboard?id=${userId}`} className="font-semibold text-sm text-white bg-blue-950 rounded-xl border border-primary hover:bg-white hover:text-black py-2 px-6 flex items-center justify-center">
                                    Profil
                                </Link>

                            </>
                        )
                    }
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}
{/* from Navbar to context */ }