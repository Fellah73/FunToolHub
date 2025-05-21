'use client'

import { floatingElements } from '@/data/featureData';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm';

export default function Page() {
    const fetch = useRef<boolean | null>(false);
    const router = useRouter();
    const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');

    useEffect(() => {
        if (fetch.current) return;
        const connectionStatus = localStorage.getItem('connectionStatus');
        if ((connectionStatus?.startsWith('c') && connectionStatus.endsWith('c'))) {
            const extractedUserId = (userId: string) => {
                return userId?.substring(1, userId?.length - 1);
            }
            const userId = extractedUserId(connectionStatus);
            router.push(`/profile?id=${userId}`);
        }
        fetch.current = true;
    }, []);

    // Animation variants for page transition
    const pageVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: { duration: 0.5 }
        },
        exit: { 
            opacity: 0,
            transition: { duration: 0.3 }
        }
    };

    // Animation variants for form switching
    const formContainerVariants = {
        login: { 
            rotateY: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
        register: { 
            rotateY: -180,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    return (
        <div className="relative min-h-screen">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
                    backgroundSize: '50px 50px'
                }}></div>
            </div>

            {/* Floating animated elements */}
            {floatingElements.map((elem, index) => (
                <motion.div
                    key={index}
                    className="absolute text-3xl opacity-30 select-none pointer-events-none"
                    style={{ left: elem.initialX, top: elem.initialY }}
                    animate={{
                        y: ["0%", "30%", "-30%", "15%", "0%"],
                        x: ["0%", "17%", "-17%", "3%", "0%"],
                        rotate: [0, 10, -10, 5, 0],
                    }}
                    transition={{
                        duration: elem.duration,
                        delay: elem.delay,
                        repeat: Infinity,
                        repeatType: "mirror",
                    }}
                >
                    {elem.icon}
                </motion.div>
            ))}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent to-purple-950/80"></div>

            {/* Luminous orbs */}
            <motion.div
                className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-fuchsia-700/20 blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.2, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <motion.div
                className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-indigo-700/20 blur-3xl"
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.3, 0.15, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
            />

            {/* Main content */}
            <motion.div 
                className="container relative z-10 mx-auto px-4 h-[850px] flex flex-col justify-start items-center"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={pageVariants}
            >
                {/* Title and description */}
                <div className="text-center mb-8 relative">
                    <motion.h1
                        className="text-4xl md:text-5xl font-bold mt-6 mb-3 bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-pink-300 to-indigo-400"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.7 }}
                    >
                        FunTool Hub
                    </motion.h1>

                    <motion.div
                        className="flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                    >
                        <div className="h-px w-12 bg-gradient-to-r from-transparent to-indigo-400"></div>
                        <Sparkles size={16} className="text-indigo-400" />
                        <div className="h-px w-12 bg-gradient-to-l from-transparent to-indigo-400"></div>
                    </motion.div>

                    <motion.p
                        className="text-violet-200 max-w-md mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        The best place to entertain you and remain productive at the same time
                    </motion.p>
                </div>

                {/* Tabs for switching between login and register */}
                <motion.div 
                    className="relative w-full max-w-md flex justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="bg-indigo-900/30 backdrop-blur-sm p-1 rounded-lg flex items-center">
                        <button
                            onClick={() => setActiveForm('login')}
                            className={`relative px-6 py-2 rounded-md transition-all duration-300 ${
                                activeForm === 'login' 
                                    ? 'text-white font-medium' 
                                    : 'text-indigo-300 hover:text-white'
                            }`}
                        >
                            {activeForm === 'login' && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-700 to-indigo-700 rounded-md -z-10"
                                    layoutId="activeTab"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                            Sign In
                        </button>
                        <button
                            onClick={() => setActiveForm('register')}
                            className={`relative px-6 py-2 rounded-md transition-all duration-300 ${
                                activeForm === 'register' 
                                    ? 'text-white font-medium' 
                                    : 'text-indigo-300 hover:text-white'
                            }`}
                        >
                            {activeForm === 'register' && (
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-fuchsia-700 to-indigo-700 rounded-md -z-10"
                                    layoutId="activeTab"
                                    transition={{ duration: 0.3 }}
                                />
                            )}
                            Register
                        </button>
                    </div>
                </motion.div>

                {/* Form container with 3D flip effect */}
                <div className="w-full max-w-md perspective-1000 my-6">
                    <motion.div
                        className="w-full relative preserve-3d"
                        animate={activeForm}
                        variants={formContainerVariants}
                    >
                        {/* Login form - front side */}
                        <div className={`w-full absolute backface-hidden ${activeForm === 'register' ? 'invisible' : ''}`}>
                            <LoginForm className="dark:text-white" onRegisterClick={() => setActiveForm('register')} />
                        </div>
                        
                        {/* Register form - back side (flipped) */}
                        <div 
                            style={{ transform: 'rotateY(180deg)' }}
                            className={`w-full absolute backface-hidden  ${activeForm === 'login' ? 'invisible' : ''}`}
                        >
                            <RegisterForm className="dark:text-white" onLoginClick={() => setActiveForm('login')} />
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    )
}