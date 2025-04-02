import { Crown, Medal, Trophy, User, Worm } from "lucide-react"
import { motion } from "framer-motion"
interface GlobalBestScoreProps {
    id: string;
    score: number;
    date: string;
    image: string;
    name: string;
}

export const ScoreItem = ({ score, index }: { score: GlobalBestScoreProps, index: number }) => {
    const getScoreIcon = (rank: number) => {
        switch (rank) {
            case 1: return <Crown className="w-6 h-6 text-red-600" />
            case 2: return <Trophy className="w-6 h-6 text-rose-400" />
            case 3: return <Medal className="w-6 h-6 text-pink-400" />
            default: return <Worm className="w-6 h-6 text-fuchsia-500" />
        }
    }

    const getRankColor = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-gradient-to-r from-red-700 to-red-500'
            case 2: return 'bg-gradient-to-r from-rose-700 to-rose-600'
            case 3: return 'bg-gradient-to-r from-pink-400 to-pink-300'
            default: return 'bg-gradient-to-r from-fuchsia-400 to-fuchsia-300'
        }
    }

    const getBackgroundOpacity = (rank: number) => {
        switch (rank) {
            case 1: return 'bg-red-500/10'
            case 2: return 'bg-rose-400/10'
            case 3: return 'bg-pink-800/10'
            default: return null
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="relative group"
        >
            {/* Glow effect */}
            <div className={`absolute -inset-0.5 opacity-30 group-hover:opacity-70 transition duration-300 ${getRankColor(index)} rounded-lg blur-sm`} />

            {/* Score content */}
            <div className={`relative flex items-center p-3 ${getBackgroundOpacity(index)} rounded-lg border border-fuchsia-500/20 hover:border-fuchsia-500/50 transition-all duration-300`}>
                {/* Rank and Icon */}
                <div className="flex items-center gap-2 min-w-[60px]">
                    <span className={`text-lg font-bold ${index === 1 ? 'text-red-500' : index === 2 ? 'text-rose-400' : index === 3 ? 'text-pink-400' : 'text-fuchsia-500'}`}>#{index}</span>
                    {getScoreIcon(index)}
                </div>

                {/* User Avatar */}
                <div className="relative group-hover:scale-110 transition-transform duration-300">
                    {score.image ? (
                        <img
                            src={score.image}
                            alt={score.name}
                            className="w-10 h-10 rounded-full border-2 border-fuchsia-500/30 group-hover:border-fuchsia-500 transition-colors duration-300"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-fuchsia-900 border-2 border-fuchsia-500/30 group-hover:border-fuchsia-500 transition-colors duration-300 flex items-center justify-center">
                            <User className="w-6 h-6 text-fuchsia-500/70" />
                        </div>
                    )}
                </div>

                {/* User Info and Score */}
                <div className="flex flex-1 items-center justify-between ml-3">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-white truncate max-w-[120px] md:max-w-[150px]">
                            {score.name}
                        </span>
                        <span className="text-xs text-fuchsia-300">{new Date(score.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                        <motion.span
                            initial={{ scale: 1 }}
                            whileHover={{ scale: 1.1 }}
                            className={`text-xl font-bold ${index === 1 ? 'text-red-600' :
                                index === 2 ? 'text-rose-400' :
                                    index === 3 ? 'text-pink-400' :
                                        'text-fuchsia-500'
                                }`}
                        >
                            {score.score}
                        </motion.span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
