'use client'
import { useUser } from '@/app/context/userContext';
import RotatePhonePrompt from '@/components/rotatePhone';
import { BACKGROUND_GRADIENTS, FOOD_OPTIONS, SNAKE_COLORS } from '@/data/providedServices';
import { AnimatePresence, motion } from 'framer-motion';
import { Focus, Minimize2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import CustomizationHub from './Components/cutomizationPannel';
import SnakeGame from './Components/snakeGame';
import SnakeMasterboard from './Components/snakeMasterborad';

export interface CustomizationValues {
    snakeColor: string,
    foodObject: string
    backgroundColor: string
}

export default function page() {
    const { user } = useUser();

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
    const [focusMode, setFocusMode] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);

    const [customization, setCustomization] = useState<CustomizationValues>(
        {
            snakeColor: SNAKE_COLORS[0].value,
            foodObject: FOOD_OPTIONS[0].icon,
            backgroundColor: BACKGROUND_GRADIENTS[0].value
        }
    )

    const [score, setScore] = useState<number>(0)

    useEffect(() => {
        if (!user) return
        if (!isGameOver || !isGameStarted) return
        if (score == 0) return

        const saveScore = async () => {
            const response = await fetch("/api/games/snake/score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user?.id,
                    score: score,
                }),
            });
            const data = await response.json();
        }
        saveScore()

    }, [isGameOver]);

    const toggleFocusMode = () => {
        setFocusMode(!focusMode);
    };

    if (!user) return null

    return (
        <div className='relative w-full min-h-screen overflow-hidden'>
            {/* Focus Mode Toggle - Advanced Floating Control */}
            <motion.div
                className="fixed top-16 left-2/3 z-50 hidden lg:block"
                initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
                <motion.button
                    onClick={toggleFocusMode}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    {/* Main button container */}
                    <div className={`
                        relative flex items-center gap-3 px-6 py-3 rounded-2xl
                        bg-gradient-to-r ${focusMode
                            ? 'from-fuchsia-600 via-fuchsia-800 to-pink-900'
                            : 'from-purple-950/50 via-blue-800 to-purple-950/50'}
                        border-2 ${focusMode ? 'border-emerald-300/40' : 'border-purple-300/40'}
                        shadow-2xl hover:shadow-3xl
                        backdrop-blur-md transition-all duration-500
                    `}>
                        {/* Icon with rotation animation */}
                        <motion.div
                            animate={{
                                rotate: focusMode ? 360 : 0,
                                scale: focusMode ? 1.2 : 1
                            }}
                            transition={{
                                rotate: { duration: 0.6, ease: "easeInOut" },
                                scale: { duration: 0.3 }
                            }}
                            className="relative z-10"
                        >
                            {focusMode ? (
                                <Minimize2 className="w-6 h-6 text-white drop-shadow-lg" />
                            ) : (
                                <Focus className="w-6 h-6 text-white drop-shadow-lg" />
                            )}
                        </motion.div>

                        {/* Text with slide animation */}
                        <AnimatePresence mode="wait">
                            <motion.span
                                key={focusMode ? "exit" : "enter"}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 font-bold text-white text-sm tracking-wide drop-shadow-lg"
                            >
                                {focusMode ? "Normal Mode" : "Focus Mode"}
                            </motion.span>
                        </AnimatePresence>

                        {/* Pulsing indicator */}
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.6, 1, 0.6]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className={`w-3 h-3 rounded-full bg-white relative z-10`}
                        />
                    </div>
                </motion.button>
            </motion.div>

            {/* Focus Mode Overlay Effects */}
            <AnimatePresence>
                {focusMode && (
                    <>
                        {/* Ambient lighting effect */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20 pointer-events-none z-20"
                        />
                    </>
                )}
            </AnimatePresence>

            {/* Main Game Grid */}
            <motion.div
                className='w-full min-h-screen grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 px-2'
                animate={{
                    scale: focusMode ? 0.98 : 1,
                    filter: focusMode ? "contrast(1.1) saturate(1.2)" : "none"
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <RotatePhonePrompt
                    name='Snake Game'
                    primaryColor='from-[#0f0c29] via-[#302b63] to-[#24243e]'
                    secondaryColor='bg-cyan-500'
                    fontColor='text-cyan-500'
                    borderColor='border-cyan-500' />

                {/* Left leaderboard with advanced animations */}
                <motion.div
                    className='hidden lg:block lg:col-span-2 rounded-2xl'
                    animate={{
                        x: focusMode ? -400 : 0,
                        opacity: focusMode ? 0 : 1,
                        scale: focusMode ? 0.7 : 1,
                        rotateY: focusMode ? -45 : 0,
                        filter: focusMode ? "blur(4px)" : "blur(0px)"
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        opacity: { duration: 0.6 },
                        filter: { duration: 0.8 }
                    }}
                >
                    <motion.div
                        initial={{ translateX: -200, scale: 0.7 }}
                        animate={{ translateX: 0, scale: 1 }}
                        transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                    >
                        <SnakeMasterboard
                            score={score}
                            isGameStarted={isGameStarted}
                            isGameOver={isGameOver}
                        />
                    </motion.div>
                </motion.div>

                {/* Snake game with focus enhancement */}
                <motion.div
                    className='hidden sm:block sm:col-span-1 md:col-span-4 lg:col-span-4 rounded-t-2xl pt-4'
                >
                    <motion.div
                        initial={{ translateY: -400 }}
                        animate={{ translateY: 0 }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeInOut" }}
                    >
                        <SnakeGame
                            score={score}
                            setScore={setScore}
                            isGameStarted={isGameStarted}
                            setIsGameStarted={setIsGameStarted}
                            isGameOver={isGameOver}
                            setIsGameOver={setIsGameOver}
                            customization={customization}
                        />
                    </motion.div>
                </motion.div>

                {/* Right customization panel with slide-out animation */}
                <motion.div
                    className='hidden lg:block lg:col-span-2 rounded-xl'
                    animate={{
                        x: focusMode ? 400 : 0,
                        opacity: focusMode ? 0 : 1,
                        scale: focusMode ? 0.7 : 1,
                        rotateY: focusMode ? 45 : 0,
                        filter: focusMode ? "blur(4px)" : "blur(0px)"
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        opacity: { duration: 0.6 },
                        filter: { duration: 0.8 }
                    }}
                >
                    <div className='flex justify-center size-full'>
                        <motion.div
                            initial={{ translateX: 200, scale: 0.7 }}
                            animate={{ translateX: 0, scale: 1 }}
                            transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                        >
                            <CustomizationHub
                                setCustomization={setCustomization}
                                customization={customization}
                                isGameOver={isGameOver}
                                isGameStarted={isGameStarted}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}