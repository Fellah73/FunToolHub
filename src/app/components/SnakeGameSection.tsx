// app/components/home/SnakeGameSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Settings } from 'lucide-react';
import Link from 'next/link';

const features = [
  { 
    icon: <Settings className="w-5 h-5 text-purple-400" />, 
    text: "Multiple game modes including classic and time attack" 
  },
  { 
    icon: <Shield className="w-5 h-5 text-purple-400" />, 
    text: "Unique power-ups and special abilities" 
  },
  { 
    icon: <Zap className="w-5 h-5 text-purple-400" />, 
    text: "Challenging obstacles and dynamic gameplay" 
  },
];

export default function SnakeGameSection() {
  return (
    <section className="py-24 bg-violet-950/30">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content Side - For mobile, this appears first, then gets reversed on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-6">
              <span className="text-purple-300">Snake Game</span> - Classic Reimagined
            </h2>
            
            <p className="text-violet-200 mb-8">
              Experience the nostalgic Snake game with modern twists and enhancements. Grow your snake, collect power-ups, and navigate through increasingly challenging levels with stunning visuals and smooth controls.
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
                  <div className="p-2 rounded-full bg-indigo-900/70">
                    {feature.icon}
                  </div>
                  <p className="text-violet-100">{feature.text}</p>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="games/snake" className="inline-flex items-center bg-gradient-to-r from-purple-600 to-indigo-500 hover:bg-purple-500 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                  Try Now <ArrowRight className="ml-2 w-5 h-5" />
                </a>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a href="/games" className="inline-flex items-center border border-white text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-500 hover:text-white hover:border-purple-900 font-medium py-3 px-6 rounded-lg transition-colors">
                  View All Games
                </a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Video/Image Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative rounded-xl overflow-hidden aspect-video bg-black/50 border border-purple-700/30"
          >
            <video src="games/snakeGame.mp4" className='inset-0 size-full' autoPlay loop muted />
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/80 to-transparent"></div>
            <div className="absolute bottom-4 right-4 text-white">
              <span className="bg-indigo-500 text-xs font-medium py-1 px-2 rounded">SNAKE GAME</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}