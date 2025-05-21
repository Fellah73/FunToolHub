// app/components/home/DashboardPreview.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Gamepad2 } from 'lucide-react';
import { toolFeatures, gameFeatures } from '../../data/featureData';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('games');

  return (
    <div className="relative w-full max-w-md">
      <div className="relative z-10 bg-gradient-to-tr from-violet-950/50 to-fuchsia-950/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-violet-700/50">
        <div className="px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="flex space-x-1">
                <div className="h-3 w-3 rounded-full bg-fuchsia-800" />
                <div className="h-3 w-3 rounded-full bg-violet-800" />
                <div className="h-3 w-3 rounded-full bg-purple-900" />
              </div>
              <span className="text-violet-200 text-sm">FunToolHub Dashboard</span>
            </div>
            <span className="text-violet-300 text-xs">v1.0</span>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setActiveTab('games')}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${activeTab === 'games' ? 'bg-violet-900 text-white' : 'text-violet-300 hover:bg-violet-500/50'}`}
            >
              <Gamepad2 className="h-4 w-4" />
              <span>Games</span>
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${activeTab === 'tools' ? 'bg-violet-900 text-white' : 'text-violet-300 hover:bg-violet-500/50'}`}
            >
              <Wrench className="h-4 w-4" />
              <span>Tools</span>
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'tools' ? (
                <div className="grid grid-cols-2 gap-3">
                  {toolFeatures.slice(0, 4).map((tool, index) => (
                    <motion.div
                      key={`tool-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-violet-950/50 backdrop-blur p-3 rounded-lg border border-violet-800/50 hover:border-violet-600/50 cursor-pointer group transition-all"
                      whileHover={{ scale: 1.02 }}
                      onClick={() => window.location.href = tool.link}
                    >
                      <div className="flex flex-col items-center p-2 text-center">
                        <div className="text-indigo-400 mb-2 group-hover:text-indigo-300 transition-colors">
                          {tool.icon}
                        </div>
                        <h3 className="text-sm font-medium mb-1">{tool.title}</h3>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  {gameFeatures.slice(0, 4).map((game, index) => (
                    <motion.a
                      key={`game-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-violet-950/50 backdrop-blur p-3 rounded-lg border border-violet-800/50 hover:border-pink-600/50 cursor-pointer group transition-all"
                      whileHover={{ scale: 1.02 }}
                      href={game.link}
                    >
                      <div className="flex flex-col items-center p-2 text-center">
                        <div className="text-pink-400 mb-2 group-hover:text-pink-300 transition-colors">
                          {game.icon}
                        </div>
                        <h3 className="text-sm font-medium mb-1">{game.title}</h3>
                      </div>
                    </motion.a>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 pt-4 border-t border-violet-700/30">
            <div className="flex justify-between items-center">
              <span className="text-violet-300 text-sm">Most recent: Prayer Times</span>
              <span className="bg-violet-700/50 text-violet-200 text-sm py-1 px-4 rounded-full">New Features!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -z-10 top-6 left-6 right-6 bottom-0 bg-gradient-to-br from-pink-600/20 to-indigo-600/20 blur-xl rounded-2xl"></div>
    </div>
  );
}