// components/SnakeMasterboard.tsx
import { useUser } from '@/app/context/userContext';
import { ScoreItem } from '@/components/scroreComponent';
import { CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { motion } from 'framer-motion';
import { Earth, Moon, Ruler, SunMoon, Trophy } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { GiSnake } from 'react-icons/gi';
import { set } from 'zod';

interface Player {
    id: string;
    score: number;
    date: string;
    image: string;
    name: string;
}

interface SnakeMasterboardProps {
    score: number;
    isGameOver: boolean;
    isGameStarted: boolean
}

interface SnakeMasterboardState {
    personalBest: number;
    players: Player[];

}

const SnakeMasterboard = ({ score, isGameOver, isGameStarted }: SnakeMasterboardProps) => {
    const [boardScores, setBoardScores] = useState<SnakeMasterboardState | null>({
        personalBest: score,
        players: [],
    });
    const [loading, setLoading] = useState<boolean>(true);
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const { user } = useUser();
    const firstFetch = useRef<boolean>(false);

    useEffect(() => {

        if (!user) return;

        if (firstFetch.current && !isGameOver) return;

        if (!isGameOver) firstFetch.current = true;


        const fetchScores = async () => {

            try {
                const gloablaLeaderboard = await fetch("/api/games/snake/score/leaderboard?limit=5", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                const data = await gloablaLeaderboard.json();
                if (!gloablaLeaderboard.ok || !data.success) {
                    console.error("Error fetching leaderboard data:", data.message);
                    return;
                }

                setBoardScores((pervState) => ({
                    ...pervState!,
                    players: data.globalBestScores,
                }));

                console.log("Leaderboard data fetched successfully:", data.globalBestScores);
            } catch (error) {
                console.error("Error fetching leaderboard data:", error);
            }
        }

        setTimeout(() => {
            fetchScores();
            setLoading(false);

        }, 2000);
    }, [user, isGameOver]);

    useEffect(() => {
         
        if (score === 0) return;

        setTimeout(() => { 
            
            console.log("wating for the leaderboard to update before Updating personal best score..."); 

            // check if the user is in the leaderboard so avoid another fetch
            const userIn = boardScores?.players.find((player) => player.id === user?.id);
            if (userIn) {
                setBoardScores((prevState) => ({
                    ...prevState!,
                    personalBest: userIn.score!,
                }));

                console.log("Personal best score was in the leaderboard");
                // not in global leaderBorad so fetch
            }else{
                console.log("Personal best score was not in the leaderboard so we must fetch it");
                const fetchPersonalBest = async () => {
                    try {
                        const bestPersoScore = await fetch(`/api/games/snake/score/best?playerId=${user?.id}&limit=1`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            }
                        });
        
                        const data = await bestPersoScore.json();
                        if (!bestPersoScore.ok || !data.success) {
                            console.error("Error fetching personal best:", data.message);
                            return;
                        }
        
                        setBoardScores((prevState) => ({
                            ...prevState!,
                            personalBest: data.bestScores[0].value,
                        }));
        
                        console.log("Personal best fetched successfully:", data.bestScores[0].value);
        
                    }
                    catch (error) {
                        console.error("Error fetching personal best:", error);
                    }
                }


                fetchPersonalBest();
            }
        },10000)

    }, [boardScores?.players]);


    return (
        <div className={`${darkMode ? 'bg-violet-950' : 'bg-fuchsia-900'} rounded-2xl text-white min-h-screen py-6 font-sans select-none`}>
            <div className="relative max-w-4xl mx-auto flex flex-col gap-y-8 px-4">

                <h1 className="flex items-center text-2xl font-bold text-center text-fuchsia-400 ">
                    Snake Masterboard <GiSnake className="inline-block text-fuchsia-400 animate-pulse" />
                    <Switch onClick={() => setDarkMode(!darkMode)} checked={darkMode} className='ml-2' />
                    {
                        darkMode ? <Moon className='ml-2 size-8 text-fuchsia-600 inline-block' /> : <SunMoon className='ml-2 text-violet-500 size-8 inline-block text-center' />
                    }
                </h1>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="size-20 border-t-4 border-fuchsia-500 border-solid rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <>
                        {/* Meilleur score personnel */}
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className=" rounded-lg py-2 w-full grid grid-cols-2 gap-x-1 text-fuchsia-400"
                        >
                            <div className='col-span-1 flex flex-col gap-y-2 border-r-4 border-fuchsia-500'>
                                <h2 className="text-center text-xl font-semibold">Best Score <Trophy className="inline-block text-fuchsia-400 size-8" /></h2>
                                <div className="flex items-center justify-center">
                                    <motion.span
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                                        className="text-4xl text-center tracking-wide font-bold text-gray-200"
                                    >
                                        {boardScores?.personalBest}
                                    </motion.span>
                                </div>
                            </div>
                            <div className='col-span-1 flex flex-col gap-y-2'>
                                <h2 className="text-right text-xl font-semibold">Max Length <Ruler className="inline-block text-fuchsia-400 size-8" /></h2>
                                <div className="flex items-center justify-center">
                                    <motion.span
                                        initial={{ scale: 0.8 }}
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, times: [0, 0.5, 1] }}
                                        className="text-4xl text-center tracking-wide font-bold text-fuchsia-200"
                                    >
                                        {boardScores?.personalBest! * 2}
                                    </motion.span>
                                </div>
                            </div>

                        </motion.div>

                        {/* Classement mondial */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex-col flex gap-y-4 border-x-4 border-x-fuchsia-400 border-y-2 border-y-fuchsia-500 rounded-xl p-3"
                        >
                            <div className="flex items-center justify-start gap-x-4">

                                <CardTitle className="text-3xl font-semibold tracking-wider text-fuchsia-200">
                                    Global Leaderboard
                                </CardTitle>
                                <Earth className="size-10 text-fuchsia-300 animate-pulse" />
                            </div>
                            <div className='w-[95%] mx-auto h-[1px] bg-fuchsia-400' />
                            <div className="flex flex-col gap-y-4 py-4 px-3  overflow-y-auto max-h-72 overflow-x-hidden rounded-lg">
                                {
                                    boardScores?.players.map((player, index) => (
                                        <ScoreItem key={index} index={index + 1} score={player} />
                                    ))
                                }
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </div>
    );
};

export default SnakeMasterboard;