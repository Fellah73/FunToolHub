'use client'
import { useUser } from '@/app/context/userContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Earth, Medal, Trophy, Crown, User } from 'lucide-react'

interface GlobalBestScoreProps {
  id: string
  score: number
  date: string
  image: string
  name: string
}

export default function BestGlobalScoreComponent({ finalScore }: { finalScore: number }) {
  const [globalBestScore, setGlobalBestScore] = useState<GlobalBestScoreProps[] | null>(null)
  const [limit, setLimit] = useState<number>(15)
  const { user } = useUser()

  useEffect(() => {
    if (!user) return

    if(finalScore < 0) return

    const fetchGlobalBestScore = async () => {
      try {
        const res = await fetch(`/api/games/flappy-bird/score/leaderboard?limit=${limit}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        })

        const data = await res.json()
        if (!res.ok || !data.success) {
          console.warn(data.message)
          return
        }
        setGlobalBestScore(data.globalBestScores)
      } catch (error) {
        console.error('Error fetching best scores:', error)
      }
    }

    // attendre l'ajout du score dans la database puis re-fetch
    if (finalScore > 0) {
      setTimeout(() => {
        fetchGlobalBestScore()
      }, 5000)
      console.log('fetch with delay')
      return
    }

    if (finalScore === 0) {
      fetchGlobalBestScore()
      console.log('fetch without delay')
    }


  }, [user, finalScore])

  useEffect(() => {

    if (!globalBestScore) return

    console.log('the leaderboard is updated', globalBestScore!.map((score) => score.score))
  }, [globalBestScore])

  return (
    <Card className="w-full h-[560px] max-w-md bg-gradient-to-br from-rose-950 via-pink-950 to-fuchsia-950 border-2 border-pink-500/50 shadow-xl shadow-pink-500/20">
      <CardHeader className="border-b border-pink-500/20 pb-4">
        <div className="flex items-center justify-center gap-2">
          <Earth className="w-7 h-7 text-pink-400 animate-pulse" />
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-500 text-transparent bg-clip-text">
            Global Leaderboard
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="px-2 py-4 w-full">
        <div className="flex flex-col p-2 gap-y-4 max-h-[400px] overflow-y-auto">
          {globalBestScore?.map((score, index) => (
            <GlobalScoreItem key={score.id} score={score} index={index + 1} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export const GlobalScoreItem = ({ score, index }: { score: GlobalBestScoreProps, index: number }) => {
  const getScoreIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-6 h-6 text-yellow-400" />
      case 2: return <Trophy className="w-6 h-6 text-gray-400" />
      case 3: return <Medal className="w-6 h-6 text-amber-700" />
      default: return null
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-500 to-amber-500'
      case 2: return 'bg-gradient-to-r from-gray-400 to-gray-500'
      case 3: return 'bg-gradient-to-r from-amber-700 to-amber-800'
      default: return 'bg-gradient-to-r from-pink-600 to-pink-700'
    }
  }

  const getBackgroundOpacity = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-yellow-500/10'
      case 2: return 'bg-gray-500/10'
      case 3: return 'bg-amber-700/10'
      default: return 'bg-pink-500/5'
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
      <div className={`relative flex items-center p-3 ${getBackgroundOpacity(index)} rounded-lg border border-pink-500/20 hover:border-pink-500/50 transition-all duration-300`}>
        {/* Rank and Icon */}
        <div className="flex items-center gap-2 min-w-[60px]">
          <span className="text-lg font-bold text-pink-400">#{index}</span>
          {getScoreIcon(index)}
        </div>

        {/* User Avatar */}
        <div className="relative group-hover:scale-110 transition-transform duration-300">
          {score.image ? (
            <img
              src={score.image}
              alt={score.name}
              className="w-10 h-10 rounded-full border-2 border-pink-500/30 group-hover:border-pink-500 transition-colors duration-300"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-pink-950 border-2 border-pink-500/30 group-hover:border-pink-500 transition-colors duration-300 flex items-center justify-center">
              <User className="w-6 h-6 text-pink-500/70" />
            </div>
          )}
        </div>

        {/* User Info and Score */}
        <div className="flex flex-1 items-center justify-between ml-3">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white truncate max-w-[120px] md:max-w-[150px]">
              {score.name}
            </span>
            <span className="text-xs text-gray-400">{new Date(score.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center">
            <motion.span
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className={`text-xl font-bold ${index === 1 ? 'text-yellow-400' :
                index === 2 ? 'text-gray-400' :
                  index === 3 ? 'text-amber-700' :
                    'text-pink-400'
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




