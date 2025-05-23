'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Star, Trophy, Clock } from 'lucide-react';
import Link from 'next/link';

const features = [
  { 
    icon: <Star className="w-5 h-5 text-fuchsia-400" />, 
    text: "Customizable difficulty levels for all skill levels" 
  },
  { 
    icon: <Trophy className="w-5 h-5 text-fuchsia-400" />, 
    text: "Global leaderboard to compete with friends" 
  },
  { 
    icon: <Clock className="w-5 h-5 text-fuchsia-400" />, 
    text: "Quick games perfect for short breaks" 
  },
];

export default function FlappyBirdSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Video/Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden aspect-video  border border-indigo-700/30"
          >
            <video src="/games/flappyBird.mp4" className='inset-0 size-full' autoPlay loop muted />
            <div className="absolute inset-0 bg-gradient-to-t from-fuchsia-500/20 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4 text-white">
              <span className="bg-fuchsia-800 text-xs font-medium py-1 px-2 rounded">FLAPPY BIRD</span>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-fuchsia-500">Flappy Bird</span> - Test Your Reflexes
            </h2>
            
            <p className="text-violet-200 mb-8">
              Our reimagined Flappy Bird game brings the classic challenge to a new level. Navigate through obstacles with precise timing and compete for the highest score with friends or other players worldwide.
            </p>
            
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="p-2 rounded-full bg-fuchsia-900/70">
                    {feature.icon}
                  </div>
                  <p className="text-violet-100">{feature.text}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="games/flappy-bird" className="inline-flex items-center bg-fuchsia-800/50 hover:bg-fuchsia-800 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                Play Now <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}