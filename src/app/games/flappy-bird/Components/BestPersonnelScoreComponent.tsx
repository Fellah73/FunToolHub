'use client';
import { useUser } from '@/app/context/userContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Crown, Medal, Sparkles, Star, Trophy } from 'lucide-react';
import React, { useEffect, useState } from 'react';

interface PersonalScoresProps {
    setNewRecord: React.Dispatch<React.SetStateAction<boolean>>;
    newScore: number
}

interface ScoreRanking {
    value: number;
    playedAt: string;
}
export default function BestPersonnelScoreComponent({ newScore, setNewRecord }: PersonalScoresProps) {

    const [bestScores, setBestScores] = useState<ScoreRanking[]>([]);
    const [limit, setLimit] = useState(15);

    const { user } = useUser();

    const sortScoresRanking = (scores: ScoreRanking) => {
        setBestScores((prevScores) => {
            const updatedScores = [...prevScores, scores].sort((a, b) => b.value - a.value);
            return updatedScores.slice(0, limit); // Garde uniquement les top scores
        });

        console.log(`${scores.value} was added successfully`)
    };

    useEffect(() => {
        if (!user) return;

        console.log("Fetching best scores...");

        const fetchBestScores = async () => {
            try {
                const res = await fetch(`/api/games/flappy-bird/score/best?playerId=${user.id}&limit=${limit}`);
                const data = await res.json();
                if (!res.ok) {
                    console.warn(data.message);
                    return;
                }
                if (!data.success) {
                    console.warn(data.message);
                    return;
                }
                if (res.ok && data.success) setBestScores(data.bestScores);
            } catch (error) {
                console.error('Error fetching best scores:', error);
            }
        };


        fetchBestScores();

    }, [user]);


    useEffect(() => {
        // bestScores not yet fetched
        if (bestScores.length === 0) return

        // score null don't update    
        if (newScore === 0) return;

        // score smallest than the last score don't update the best score rank
        if (newScore < bestScores[bestScores.length - 1]?.value) return;

        // score exist in the best scores
        if (bestScores.some((score) => score.value === newScore)){
            console.log("newScore already exist in the best scores");
           
            // update la date dans le best scores
            const updatedBestScores = bestScores.map((score) => {
                if (score.value === newScore) {
                    return { ...score, playedAt: new Date().toISOString().split("T")[0] };
                }
                return score;
            });
            setBestScores(updatedBestScores);
            console.log("score updated :", bestScores.find((score) => score.value === newScore)?.playedAt);
            return
        }

        // score bigger than the best score so it's a new record
        if (newScore > bestScores[0]?.value) setNewRecord(true);

        // so the best scores must be sorted

        console.log("newScore will enter in the ranked scores", newScore);

        const newBestScore = { value: newScore, playedAt: new Date().toISOString().split("T")[0] };

        sortScoresRanking(newBestScore);

    }, [newScore]);

    useEffect(() => {
        if (bestScores.length === 0) return;

        console.log("bestScores (après mise à jour) :", bestScores);
    }, [bestScores]);


    return (
        <Card className="w-full h-[600px] max-w-md bg-gradient-to-br from-indigo-950 via-purple-950 to-fuchsia-950 border-2 border-pink-500/50 shadow-xl shadow-pink-500/20">
            <CardHeader className="border-b border-pink-500/20 pb-4">
                <div className="flex items-center justify-center gap-2">
                    <Sparkles className="w-7 h-7 text-yellow-400" />
                    <CardTitle className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
                        Personal Best Scores
                    </CardTitle>
                </div>
            </CardHeader>

            <CardContent className="px-2 py-4 w-[100%] border-black border-4">
                {/* Conteneur avec scroll */}
                <div className="flex flex-col p-2 gap-y-4 max-h-[400px] overflow-y-auto">
                    { bestScores.map((score, index) => (
                        <ScoreItem key={index} score={score} index={index + 1} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// 📌 Composant ScoreItem réutilisable
const ScoreItem = ({ score, index }: { score: ScoreRanking, index: number }) => {



    const getScoreIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-6 h-6 text-yellow-400" />;
            case 2: return <Trophy className="w-6 h-6 text-gray-400" />;
            case 3: return <Medal className="w-6 h-6 text-amber-700" />;
            default: return <Star className="w-6 h-6 text-purple-400" />;
        }
    };

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-gradient-to-r from-yellow-500 to-amber-500';
            case 2: return 'bg-gradient-to-r from-gray-400 to-gray-500';
            case 3: return 'bg-gradient-to-r from-amber-700 to-amber-800';
            default: return 'bg-gradient-to-r from-purple-600 to-purple-700';
        }
    };

    if (!score) return null;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
        >
            {/* Effet de glow sur hover */}
            <div className={`absolute -inset-0.5 opacity-50 group-hover:opacity-100 transition duration-300 ${getRankColor(index)} rounded-lg blur-sm`} />

            {/* Contenu du score */}
            <div className="relative flex items-center justify-between p-4 bg-black/50 rounded-lg border border-pink-500/20 hover:border-pink-500/50 transition-colors duration-300">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-8">
                        {getScoreIcon(index)}
                    </div>
                    <span className="text-2xl font-bold text-white">{score.value!}</span>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-400">{score.playedAt!}</span>
                    <span className={`text-xs ${index === 1 ? 'text-yellow-400' : index === 2 ? 'text-gray-400' : index === 3 ? 'text-amber-700' : 'text-purple-400'}`}>
                        Rank #{index}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};
