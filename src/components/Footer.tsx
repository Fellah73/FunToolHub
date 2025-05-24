'use client'
import { Code, Gamepad2, Github, House, Wrench } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { MdComputer } from "react-icons/md";

const Footer: React.FC = () => {
    return (
        <footer className="relative w-full p-8 backdrop-blur-md bg-opacity-30 bg-gradient-to-r from-violet-950 via-transparent to-transparent shadow-2xl shadow-fuchsia-900/50">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Logo et Description */}
                    <div className="mb-6 lg:mb-0">
                        <Link href="/" className="rounded-full p-4 text-fuchsia-500 flex items-center gap-x-6 font-bold tracking-wide text-xl mb-4 ">
                            <div className='rounded-full p-2 flex items-center justify-center bg-fuchsia-400 text-violet-950'>
                                <MdComputer size={30} className="text-3xl rounded-full" />
                            </div>
                            FunToolHub
                        </Link>
                        <p className="text-fuchsia-400 text-lg">
                            A playful and helpful space with games and daily tools — all in one.
                        </p>
                    </div>

                    {/* Liens Rapides */}
                    <div>
                        <h6 className="font-semibold mb-4 text-xl text-fuchsia-500">Quick Links</h6>
                        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">

                            <House className="text-fuchsia-500 cursor-pointer" size={40} onClick={() => window.location.href = "/"} />
                            <Gamepad2 className="text-fuchsia-500 cursor-pointer" size={40} onClick={() => window.location.href = "/games"} />
                            <Wrench className="text-fuchsia-500 cursor-pointer" size={40} onClick={() => window.location.href = "/services"} />

                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <div className='mb-4 flex items-start gap-x-8'>
                            <h6 className="font-semibold text-xl text-fuchsia-500">Contact</h6>
                        </div>
                        <div className='flex flex-col gap-y-8'>
                            <a className='flex items-center flex-row gap-x-8'>
                                <Github size={30} className='text-fuchsia-500 cursor-pointer' />
                                <p className="text-fuchsia-500 text-xl tracking-widest">Fellah73</p>
                            </a>
                        </div>
                    </div>


                </div>

                {/* Copyright */}
                <div
                    className="mt-8 border-t w-full flex flex-row justify-between border-fuchsia-600 text-center text-gray-300 text-sm"

                >
                    <div className='flex justify-start items-center gap-x-6 mb-4 p-8'>
                        <Code size={40} className='text-fuchsia-500 cursor-pointer' />
                        <p className="text-fuchsia-400 text-xl">Fellah Mohamed</p>
                    </div>
                    <div className='text-center text-fuchsia-500 p-8 text-base tracking-wide'>
                        &copy; {new Date().getFullYear()} FunToolHub. All rights reserved.
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;