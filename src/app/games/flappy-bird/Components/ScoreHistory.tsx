import { useUser } from '@/app/context/userContext';
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Trophy, Medal, TrendingUp, TrendingDown, Crown, Award } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

interface Score {
    score: number;
    playedAt: string;
}

interface ScoreRanking {
    first: number;
    second: number;
}

export default function ScoreHistoryComponent({ newScore }: { newScore: number }) {
    const [scoreHistory, setScoreHistory] = useState<Score[]>([]);
    const [moyenne, setMoyenne] = useState(0);
    const [bestScore, setBestScore] = useState<ScoreRanking>({ first: 0, second: 0 });

    const { user } = useUser();
    const { toast } = useToast();

    useEffect(() => {
        if (!user) return;

        const fetchScoreHistory = async () => {
            try {
                const res = await fetch(`/api/games/flappy-bird/score/daily?playerId=${user.id}`);

                const data = await res.json();

                if (!res.ok) {
                    toast({
                        title: 'Error',
                        description: data.message,
                        variant: 'form',
                    })

                    console.warn(data.message);
                    return;
                }
                if (!data.success) {
                    toast({
                        title: 'Error',
                        description: data.message,
                        variant: 'form',
                    })
                    console.warn(data.message);
                    return;
                }

                if (res.ok && data.success) setScoreHistory(data.scores);
            } catch (error) {
                console.error("Error fetching score history:", error);

            }
        };

        fetchScoreHistory();
    }, [user]);

    useEffect(() => {
        if (scoreHistory.length > 0) {
            const moyenne = scoreHistory.reduce((total, score) => total + score.score, 0) / scoreHistory.length;
            setMoyenne(moyenne);

            const best = Math.max(...scoreHistory.map(s => s.score));
            const secondBest = Math.max(...scoreHistory.filter(s => s.score !== best).map(s => s.score));
            setBestScore({ first: best, second: secondBest });
        }
    }, [scoreHistory]);

    useEffect(() => {
        if (newScore > 0) {
            setScoreHistory(prev => [{ score: newScore, playedAt: new Date().toISOString().split("T")[1].split(".")[0].split(":").slice(0, 2).join(":") }, ...prev]);
        }
    }, [newScore]);

    return (
        <Card className="w-full h-[600px] max-w-2xl bg-gradient-to-tl from-purple-950 via-fuchsia-950 to-purple-950 border-pink-500 border-2 shadow-xl shadow-pink-800">
            <CardHeader className="border-b border-pink-500/30">
                <div className="flex flex-col items-center gap-2">
                    <CardTitle className="text-2xl font-bold text-white flex items-center gap-2">
                        <Crown className="w-6 h-6 text-yellow-500" />
                        {user?.name}
                    </CardTitle>
                    <p className="text-neutral-400">Your Daily Score History</p>
                </div>
            </CardHeader>

            <CardContent className="py-4 px-3">
                {/* Stats Section */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-purple-950/50 rounded-lg border border-pink-500/20">
                    <StatCard icon={Trophy} color="text-yellow-500" label="Best" value={bestScore.first} />
                    <StatCard icon={Medal} color="text-zinc-400" label="Second" value={bestScore.second} />
                    <StatCard icon={Award} color="text-blue-500" label="Average" value={moyenne.toFixed(1)} />
                </div>

                {/* Score List with Scroll */}
                <div className="max-h-[360px] overflow-y-auto">
                    {scoreHistory.map((score, index) => (
                        <ScoreItem key={index} score={score} bestScore={bestScore} moyenne={moyenne} />
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

// Component for individual score item
const ScoreItem = ({ score, bestScore, moyenne }: { score: Score, bestScore: ScoreRanking, moyenne: number }) => {
    let Icon = TrendingDown;
    let color = "text-red-500";

    if (score.score === bestScore.first) {
        Icon = Trophy;
        color = "text-yellow-500";
    } else if (score.score === bestScore.second) {
        Icon = Medal;
        color = "text-zinc-400";
    } else if (score.score >= moyenne) {
        Icon = TrendingUp;
        color = "text-green-500";
    }

    return (
        <>
            <div className="group hover:bg-purple-900/30 p-3 rounded-lg transition-all duration-200 border border-transparent hover:border-pink-500/20 flex flex-col items-center justify-between">
                {/* ✅ Contenu principal */}
                <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${color}`} />
                        <span className={`text-xl font-semibold ${color}`}>{score.score}</span>
                    </div>
                    <p className="text-zinc-400 text-sm">{score.playedAt}</p>
                </div>

                {/* ✅ Barre d'animation bien positionnée */}
                <div className="w-full h-0.5 bg-gradient-to-r from-zinc-800 via-red-500 to-zinc-800 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </div>


        </>
    );
};

// Component for statistics card
const StatCard = ({ icon: Icon, color, label, value }: { icon: any, color: string, label: string, value: any }) => {
    return (
        <div className="flex flex-col items-center">
            <div className={`flex items-center gap-x-1 ${color}`}>
                <Icon className="w-5 h-5" />
                <span className="text-sm">{label}</span>
            </div>
            <span className="text-2xl font-bold text-white">{value}</span>
        </div>
    );
};


// pase the final score -- done
// create the /api/games/flappy-bird/score/daily route  --> done
// handle returning only numbers from the backend route /api/games/flappy-bird/score/daily --> done
// fetch the score --> done
// handle fectching it --> done
// handle Ui --> done
// handle scrollBar --> done
// handle some responsive stuff --> kesh 3am
