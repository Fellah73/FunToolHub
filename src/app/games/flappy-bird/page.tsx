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
import { Trophy, Users } from 'lucide-react';
import RotatePhonePrompt from '@/components/rotatePhone';

const Page = () => {
    const { user } = useUser();
    const [finalScore, setFinalScore] = useState(0);
    const [newRecord, setNewRecord] = useState(false);
    const [animateConfetti, setAnimateConfetti] = useState(false);
    const [showGlobalComponent, setShowGlobalComponent] = useState(true);
    const [showLeaderboard, setShowLeaderboard] = useState(false);

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
                if (data.success) {
                    console.log('Score updated successfully:', data.newScore);
                }
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

    useEffect(() => {
        console.log(showGlobalComponent ? "global" : "personnel");
    }, [showGlobalComponent]);

    return (
        <div className="min-h-screen p-4">
            {/* Rotate Phone Prompt - Will only show on small screens */}
            <RotatePhonePrompt/>
    
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
    
            {/* Main Grid */}
            <div className="relative w-full mx-auto flex flex-col gap-y-4 sm:gap-y-6 sm:grid sm:grid-cols-5 gap-x-4">
                {/* Left Panel */}
                <motion.div
                    className="hidden xl:order-1 xl:block xl:col-span-1 bg-gradient-to-br from-purple-950 via-fuchsia-950 to-purple-950 border-pink-500 rounded-xl shadow-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
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
                    className="hidden sm:block sm:order-1 sm:col-span-3 bg-gray-800 rounded-xl shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <FlappyBirdGame setFinalScore={setFinalScore} />
                </motion.div>
    
                {/* Score History */}
                <motion.div
                    className="hidden sm:order-2 sm:block sm:col-span-2 xl:col-span-1 bg-gray-800 rounded-xl py-2 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <ScoreHistoryComponent newScore={finalScore} />
                </motion.div>
            </div>
        </div>
    );
};

export default Page;


// update prisma code --> done
// handle getting the score  -- done
// handle fetch the score  -- done
// if the score is smallest of the minimum score fetched don't refetch -- done
// handle the page UI  -- 9rib
// the game cannot be played in mobile  -- to be handled later