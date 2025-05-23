'use client';
import { motion, useInView } from 'framer-motion';
import { AlertTriangle, Award, ChevronUp, RefreshCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';


interface HighScore {
    id?: number;
    rank?: number;
    name: string;
    score: number;
    date: string;
    image: string;
}

export default function SnakeGameSection() {
    const tableRef = useRef(null);
    const isTableInView = useInView(tableRef, { once: true });
    const [highScores, setHighScores] = useState<HighScore[]>([]);
    const [hasBeenViewed, setHasBeenViewed] = useState(false);

    const instructions = [
        {
            icon: <ChevronUp className="size-12 text-fuchsia-400" />,
            title: "Controls",
            description: "Use arrow keys or swipe to move the snake in different directions."
        },
        {
            icon: <Award className="size-12 text-pink-500" />,
            title: "Scoring",
            description: "Gain points by eating food. Special food grants bonus points."
        },
        {
            icon: <RefreshCw className="size-12 text-pink-700" />,
            title: "Game Progression",
            description: "As your snake grows, the speed increases for an added challenge."
        },
        {
            icon: <AlertTriangle className="size-12 text-red-500" />,
            title: "Game Over",
            description: "Colliding with the wall or yourself ends the game. Try to set a new high score!"
        }
    ];

    useEffect(() => {
        if (isTableInView && !hasBeenViewed) {
            setHasBeenViewed(true);
        }
    }, [isTableInView, hasBeenViewed]);

    useEffect(() => {
        if (!isTableInView) return;
        const fetchFlappyScore = async () => {
            try {
                const response = await fetch("/api/games/snake/score/leaderboard?limit=5", {
                    method: 'GET',
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    console.warn(data.message);
                    return;
                }
                setHighScores(data.globalBestScores);
          
            } catch (error) {
                console.error('Error fetching global score:', error);
            }
        };

        fetchFlappyScore();
    }, [isTableInView]);

    return (
        <motion.section
            className="py-16 text-white overflow-hidden"
            ref={tableRef}
        >
            <div className="mx-auto mt-10 px-10">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Snake <span className="text-purple-600">Game Challenge</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    <motion.div
                        className="mx-4 lg:mx-0 lg:col-span-2 bg-gradient-to-bl from-violet-900 via-purple-900 to-fuchsia-900 backdrop-blur-md rounded-xl p-6 border-t-4 border-fuchsia-400"
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={hasBeenViewed ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.5, delay: 0.3 }}
                        viewport={{ once: true, amount: 0.3 }}

                    >
                        <h3 className="text-2xl font-bold text-center mb-6 text-fuchsia-400 flex items-center justify-center gap-2">
                            <Award className="size-8" /> High Scores
                        </h3>
                        <motion.div
                            className="space-y-4"
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-4 text-lg text-fuchsia-300 border-b border-fuchsia-400 pb-2">
                                <div>Rank</div>
                                <div>Player</div>
                                <div className="text-center">Name</div>
                                <div className="text-center">Score</div>
                            </div>

                            {
                                highScores.map((score, index) => (
                                    <motion.div
                                        key={index}
                                        className={`grid grid-cols-4  items-center ${index >= 3 ? "text-gray-100" : index == 0 ? "text-amber-400" : index == 1 ? "text-slate-300" : "text-yellow-600"}`}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="font-bold">#{index + 1}</div>
                                        <img src={score.image} alt={score.name} className="size-20 rounded-full object-cover border-2 border-gray-500" />
                                        <div className='text-center'>{score.name}</div>
                                        <div className="text-center font-mono">{score.score}</div>
                                    </motion.div>
                                ))}
                        </motion.div>
                        <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                            <a
                                href={`/games/snake`}
                                className="inline-block bg-gradient-to-r from-fuchsia-700 to-fuchsia-400 px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Play Now
                            </a>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8 p-4 sm:p-6"
                        initial={{ opacity: 0, translateX: 200 }}
                        animate={hasBeenViewed ? { opacity: 1, translateX: 0 } : {}}
                        transition={{ staggerChildren: 0.1, duration: 1.5, delay: 0.4 }}
                        viewport={{ once: true, amount: 0.3 }}

                    >
                        {instructions.map((instruction, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-violet-950 to-violet-900  backdrop-blur-md p-6 rounded-xl border-l-4 border-fuchsia-500 hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300"
                            >
                                <div className="flex flex-col items-start gap-4">
                                    <div className="p-3">
                                        {instruction.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-fuchsia-500">{instruction.title}</h3>
                                    <p className="text-fuchsia-400">{instruction.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}
