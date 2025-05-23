'use client';
import React, { useEffect, useState } from 'react';
import { useUser } from '@/app/context/userContext';
import { motion, AnimatePresence } from 'framer-motion';
import FlappyBirdGame from '@/app/games/flappy-bird/Components/flappyBird';
import Confetti from 'react-dom-confetti';
import BestPersonnelScoreComponent from './Components/BestPersonnelScoreComponent';
import ScoreHistoryComponent from './Components/ScoreHistory';
import BestGlobalScoreComponent from './Components/BestGlobalScoreComponent';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { MoveHorizontal, Trophy, Users, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import RotatePhonePrompt from '@/components/rotatePhone';

const Page = () => {
    const { user } = useUser();
    const [finalScore, setFinalScore] = useState(0);
    const [newRecord, setNewRecord] = useState(false);
    const [animateConfetti, setAnimateConfetti] = useState(false);
    const [showGlobalComponent, setShowGlobalComponent] = useState(true);
    const [showLeaderboard, setShowLeaderboard] = useState(false);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Gestion du score
    useEffect(() => {
        if (finalScore <= 0) return;
        const handleScoreUpdate = async () => {
            try {
                const res = await fetch("/api/games/flappy-bird/score", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: user?.id, score: finalScore })
                });

                if (!res.ok) throw new Error('Failed to update score');
                const data = await res.json();
                
            } catch (error) {
                console.error('Error updating score:', error);
            }
        };
        handleScoreUpdate();
    }, [finalScore, user]);

    // Gestion des animations de confetti
    useEffect(() => {
        if (newRecord) setAnimateConfetti(true);
    }, [newRecord]);

    useEffect(() => {
        if (animateConfetti) {
            setTimeout(() => {
                setAnimateConfetti(false);
                setNewRecord(false);
            }, 5000);
        }
    }, [animateConfetti]);
    

    const handleToggleAnimation = () => {
        setAnimationStarted(!animationStarted);
    };

    return (
        <div className="min-h-screen p-4">
            {/* Rotate Phone Prompt - Will only show on small screens */}
            <RotatePhonePrompt
                name='Flappy Bird'
                primaryColor='from-indigo-900/50 via-purple-900/50 to-fuchsia-900/50'
                secondaryColor='bg-pink-500/20'
                fontColor='text-pink-500'
                borderColor='border-pink-500/70' />

            {/* Confetti Animation */}
            <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
                <Confetti
                    active={animateConfetti}
                    config={{
                        angle: 300,
                        spread: 500,
                        startVelocity: 35,
                        elementCount: 600,
                        decay: 0.9,
                        width: "30px",
                        height: "25px",
                        colors: ["#a81bb5", "#470e66", "#6c1d7a", "#6a0fbf", "#6a0fbf", "#e356ce"],
                        duration: 12000
                    }}
                />
            </div>

            {/* Animation Toggle Button - Positioned at top center */}
            <motion.div 
                className="fixed top-[50x] left-3/4 transform -translate-x-1/2 z-40 hidden lg:block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <motion.button
                    onClick={handleToggleAnimation}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className={cn(
                        "relative group flex items-center justify-center gap-2 px-6 py-3 rounded-full",
                        "bg-gradient-to-r from-purple-950 via-violet-900 to-purple-950 hover:from-purple-900 hover:via-violet-800 hover:to-purple-900",
                        "border border-pink-400/30 hover:border-pink-400/60",
                        "transition-all duration-300 ease-in-out",
                        "backdrop-blur-sm"
                    )}
                    whileHover={{ 
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(236, 72, 153, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {/* Background glow effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-purple-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Button content */}
                    <motion.div
                        animate={{ 
                            rotate: animationStarted ? 180 : 0,
                            x: animationStarted ? 3 : -3
                        }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="relative z-10"
                    >
                        {animationStarted ? (
                            <Eye className="w-5 h-5 text-white" />
                        ) : (
                            <EyeOff className="w-5 h-5 text-white" />
                        )}
                    </motion.div>
                    
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={animationStarted ? "show" : "hide"}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10 text-white font-medium text-sm"
                        >
                            {animationStarted ? "Show the panels" : "Hide the panels"}
                        </motion.span>
                    </AnimatePresence>

                    {/* Animated arrows */}
                    <div className="relative z-10 flex items-center">
                        <motion.div
                            animate={{ 
                                x: animationStarted ? [-2, 2, -2] : [2, -2, 2],
                                opacity: [0.5, 1, 0.5]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut" 
                            }}
                        >
                            {animationStarted ? (
                                <ChevronRight className="w-4 h-4 text-white/80" />
                            ) : (
                                <ChevronLeft className="w-4 h-4 text-white/80" />
                            )}
                        </motion.div>
                        <motion.div
                            animate={{ 
                                x: animationStarted ? [-4, 4, -4] : [4, -4, 4],
                                opacity: [0.3, 0.8, 0.3]
                            }}
                            transition={{ 
                                duration: 1.5, 
                                repeat: Infinity, 
                                ease: "easeInOut",
                                delay: 0.2
                            }}
                        >
                            {animationStarted ? (
                                <ChevronRight className="w-4 h-4 text-white/60" />
                            ) : (
                                <ChevronLeft className="w-4 h-4 text-white/60" />
                            )}
                        </motion.div>
                    </div>

                    {/* Hover tooltip */}
                    <AnimatePresence>
                        {isHovered && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                            >
                                <div className="bg-gray-900/90 backdrop-blur-sm text-white text-xs px-3 py-2 rounded-lg border border-pink-400/20">
                                    {animationStarted ? "Restore the normal view" : "Focus mode on the game"}
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/90 rotate-45 border-l border-t border-pink-400/20" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </motion.div>

            {/* Status indicator */}
            <motion.div 
                className="fixed top-20 left-1/2 transform -translate-x-1/2 z-30 hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: animationStarted ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="bg-purple-900/80 backdrop-blur-sm border border-pink-400/30 rounded-full px-4 py-2">
                    <span className="text-pink-300 text-sm font-medium">Focus mode activated</span>
                </div>
            </motion.div>

            {/* Main Grid */}
            <div className="relative w-full mx-auto flex flex-col gap-y-4 sm:gap-y-6 sm:grid sm:grid-cols-5 gap-x-4 pt-16 lg:pt-8">
                {/* Left Panel */}
                <motion.div
                    className="hidden xl:order-1 xl:block xl:col-span-1 bg-gradient-to-br from-purple-950 via-fuchsia-950 to-purple-950 border-pink-500 rounded-xl shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                        opacity: animationStarted ? 0 : 1, 
                        x: animationStarted ? -600 : 0,
                        scale: animationStarted ? 0.8 : 1
                    }}
                    transition={{ 
                        duration: 0.8, 
                        delay: animationStarted ? 0 : 0.5,
                        ease: "easeInOut"
                    }}
                >
                    <div className="flex flex-col space-y-2">
                        {/* Switch Container */}
                        <div className="flex items-center justify-between px-2 py-3 bg-gradient-to-br from-purple-950 via-fuchsia-950 to-purple-950 border-pink-500 rounded-lg">
                            <div className='flex justify-between items-center w-full'>
                                <div className="flex items-center space-x-2">
                                    <motion.div
                                        animate={{ scale: showGlobalComponent ? 0.8 : 1 }}
                                        className="text-blue-400"
                                    >
                                        <Trophy size={24} />
                                    </motion.div>
                                    <span className={cn("text-sm font-medium transition-colors", {
                                        "text-blue-400 text-lg": !showGlobalComponent,
                                        "text-neutral-400": showGlobalComponent
                                    })}>Personnel</span>
                                </div>
                                <Switch
                                    checked={showGlobalComponent}
                                    onCheckedChange={setShowGlobalComponent}
                                    className={cn("transition-all m-2 duration-300 data-[state=checked]:bg-pink-500 data-[state=unchecked]:bg-blue-400")}
                                />
                                <div className="flex items-center space-x-2">
                                    <span className={cn("text-sm font-medium transition-colors", {
                                        "text-pink-400 text-lg": showGlobalComponent,
                                        "text-gray-400": !showGlobalComponent
                                    })}>Global</span>
                                    <motion.div
                                        animate={{ scale: showGlobalComponent ? 1 : 0.8 }}
                                        className="text-pink-400"
                                    >
                                        <Users size={24} />
                                    </motion.div>
                                </div>
                            </div>
                        </div>

                        {/* Score Components */}
                        <AnimatePresence mode="popLayout">
                            <motion.div
                                key="personnel"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={cn('', {
                                    'hidden': showGlobalComponent
                                })}
                            >
                                <BestPersonnelScoreComponent newScore={finalScore} setNewRecord={setNewRecord} />
                            </motion.div>
                            <motion.div
                                key="global"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                                className={cn('', {
                                    'hidden': !showGlobalComponent
                                })}
                            >
                                <BestGlobalScoreComponent finalScore={finalScore} />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* Game Container */}
                <motion.div
                    className="hidden sm:block sm:order-1 sm:col-span-3 lg:relative rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0,
                        scale: animationStarted ? 1.05 : 1
                    }}
                    transition={{ 
                        duration: 0.5, 
                        delay: 0.2,
                        scale: { duration: 0.8, ease: "easeInOut" }
                    }}
                >
                    <FlappyBirdGame setFinalScore={setFinalScore} />
                </motion.div>

                {/* Score History */}
                <motion.div
                    className="hidden sm:order-2 sm:block sm:col-span-2 xl:col-span-1 bg-gray-800 rounded-xl py-2 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ 
                        opacity: animationStarted ? 0 : 1, 
                        x: animationStarted ? 600 : 0,
                        scale: animationStarted ? 0.8 : 1
                    }}
                    transition={{ 
                        duration: 0.8, 
                        delay: animationStarted ? 0 : 0.5,
                        ease: "easeInOut"
                    }}
                >
                    <ScoreHistoryComponent newScore={finalScore} />
                </motion.div>
            </div>
        </div>
    );
};

export default Page;