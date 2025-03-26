'use client';
import { motion, useInView } from 'framer-motion';
import { Award, Heart, MousePointer2, RefreshCw } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

interface HighScore {
    id?: number;
    rank?: number;
    name: string;
    score: number;
    date: string;
    image: string;
}

export default function FlappyBirdSection({ userId }: { userId: string | undefined }) {
    const [highScores, setHighScores] = useState<HighScore[]>([]);
    const tableRef = useRef(null);
    const isTableInView = useInView(tableRef, { once: true });

    const instructions = [
        {
            icon: <MousePointer2 className="w-10 h-10 text-pink-400" />,
            title: "Jump Controls",
            description: "Click to make the bird fly upward. Release to let it fall."
        },
        {
            icon: <Award className="w-10 h-10 text-fuchsia-600" />,
            title: "Scoring",
            description: "Earn 1 point for each pipe you successfully navigate through."
        },
        {
            icon: <RefreshCw className="w-10 h-10 text-purple-600" />,
            title: "Game Loop",
            description: "The game gets progressively faster and more challenging as your score increases."
        },
        {
            icon: <Heart className="w-10 h-10 text-red-400" />,
            title: "Game Over",
            description: "Hitting any pipe or the ground will end your game. Try to beat your high score!"
        }
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    const scoreContainer = {
        hidden: { opacity: 0, x: 50 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: 0.3
            }
        }
    };

    const scoreItem = {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0 }
    };


    useEffect(() => {
        if (!isTableInView) return;
        const fetchFlappyScore = async () => {
            try {
                const response = await fetch("/api/games/flappy-bird/score/leaderboard?limit=5", {
                    method: 'GET',
                });
                const data = await response.json();
                if (!response.ok || !data.success) {
                    console.warn(data.message);
                    return;
                }
                setHighScores(data.globalBestScores);
                console.log("data fetched succesfully");
            } catch (error) {
                console.error('Error fetching global score:', error);
            }
        };

        fetchFlappyScore();
    }, [isTableInView]);


    useEffect(() => {
        console.log('table in view : ', isTableInView);
    }, [isTableInView]);

    return (
        <motion.section
            className="py-16 text-white overflow-hidden"
            ref={tableRef}>
            <div className=" mx-auto mt-10 px-8">
                <motion.h2
                    className="text-4xl font-bold text-center mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Flappy Bird <span className="text-pink-400">Challenge</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    {/* Instructions - 4 columns */}
                    <motion.div
                        className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6 sm:gap-12"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}

                    >
                        {instructions.map((instruction, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 backdrop-blur-md p-6 rounded-xl border-l-4 border-purple-700 hover:shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
                                variants={item}
                            >
                                <div className="flex flex-col items-start gap-4">
                                    <div className="p-3">
                                        {instruction.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-fuchsia-200">{instruction.title}</h3>
                                    <p className="text-gray-300">{instruction.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* High Scores - 2 columns */}
                    <motion.div
                        className="mx-4 lg:mx-0 lg:col-span-2 bg-gradient-to-br from-fuchsia-950 to-fuchsia-900 backdrop-blur-md rounded-xl p-6 border-t-4 border-fuchsia-500"
                        variants={scoreContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-2xl font-bold text-center mb-6 text-fuchsia-400 flex items-center justify-center gap-2">
                            <Award className="w-6 h-6" /> High Scores
                        </h3>

                        <motion.div
                            className="space-y-4"
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-4 text-lg text-gray-300 border-b border-gray-700 pb-2">
                                <div>Rank</div>
                                <div>Player</div>
                                <div className="text-center">Name</div>
                                <div className="text-center">Score</div>
                            </div>

                            {
                                highScores.map((score, index) => (
                                    <motion.div
                                        key={index}
                                        className={`grid grid-cols-4  items-center ${index >= 3 ? "text-gray-100" : index == 0 ? "text-yellow-500" : index == 1 ? "text-slate-400" : "text-amber-600"}`}
                                        variants={scoreItem}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="font-bold">#{index + 1}</div>
                                        <img src={score.image} alt={score.name} className="size-20 rounded-full object-cover border-2 border-gray-500" />
                                        <div className='text-center'>{score.name}</div>
                                        <div className="text-center font-mono">{score.score}</div>
                                    </motion.div>
                                ))}
                        </motion.div>

                        <motion.div
                            className="mt-8 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <a
                                href={`/games/flappy-bird?id=${userId}`}
                                className="inline-block bg-gradient-to-r from-fuchsia-700 to-fuchsia-500 px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                Play Now
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}