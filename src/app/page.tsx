'use client'
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import {
  Gamepad2,
  Wrench,
  ChevronRight,
  Calendar,
  Calculator,
  Clock,
  List,
  Puzzle,
  Joystick,
  Rocket
} from 'lucide-react';

// Feature data for tools and games
const toolFeatures = [
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Calendar Planner",
    description: "Stay organized with our intuitive calendar tool"
  },
  {
    icon: <Calculator className="h-6 w-6" />,
    title: "Smart Calculator",
    description: "Solve any calculation with our advanced calculator"
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Tracker",
    description: "Track your time efficiently on any task"
  },
  {
    icon: <List className="h-6 w-6" />,
    title: "Todo Manager",
    description: "Never forget a task with our todo management system"
  },
];

const gameFeatures = [
  {
    icon: <Puzzle className="h-6 w-6" />,
    title: "Brain Teasers",
    description: "Challenge your mind with fun puzzles"
  },
  {
    icon: <Joystick className="h-6 w-6" />,
    title: "Arcade Games",
    description: "Enjoy classic arcade games reimagined"
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Space Adventure",
    description: "Explore the universe in our space simulator"
  },
  {
    icon: <Gamepad2 className="h-6 w-6" />,
    title: "Quick Challenges",
    description: "Complete quick games during your breaks"
  },
];

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('tools');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen text-white">
      <Head>
        <title>FunToolHub - Mini-Games & Daily Tools</title>
        <meta name="description" content="FunToolHub: Your all-in-one platform for mini-games and productivity tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>



      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1 }}
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-pink-500 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-indigo-500 blur-3xl"
          />
        </div>

        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="flex flex-col md:flex-row items-center">
            <motion.div
              className="md:w-1/2 mb-12 md:mb-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Where <span className="text-pink-400">Fun</span> Meets <span className="text-indigo-400">Productivity</span>
              </h1>
              <p className="text-lg md:text-xl mb-8 text-violet-200 max-w-lg">
                Discover a platform that combines entertaining mini-games with useful daily tools, all in one beautiful interface.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 px-8 py-3 rounded-full font-medium flex items-center justify-center gap-2"
                >
                  Get Started <ChevronRight className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-violet-800 hover:bg-violet-700 border border-violet-600 px-8 py-3 rounded-full font-medium"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="md:w-1/2 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="relative w-full max-w-md">
                <div className="relative z-10 bg-violet-800/80 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden border border-violet-700/50">
                  <div className="px-6 py-6">
                    <div className="flex justify-between items-center mb-6">
                      <div className="flex items-center gap-3">
                        <div className="flex space-x-1">
                          <div className="h-3 w-3 rounded-full bg-red-400" />
                          <div className="h-3 w-3 rounded-full bg-yellow-400" />
                          <div className="h-3 w-3 rounded-full bg-green-400" />
                        </div>
                        <span className="text-violet-200 text-sm">FunToolHub Dashboard</span>
                      </div>
                      <span className="text-violet-300 text-xs">v1.0</span>
                    </div>

                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={() => setActiveTab('tools')}
                        className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${activeTab === 'tools' ? 'bg-violet-700 text-white' : 'text-violet-300 hover:bg-violet-700/50'}`}
                      >
                        <Wrench className="h-4 w-4" />
                        <span>Tools</span>
                      </button>
                      <button
                        onClick={() => setActiveTab('games')}
                        className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${activeTab === 'games' ? 'bg-violet-700 text-white' : 'text-violet-300 hover:bg-violet-700/50'}`}
                      >
                        <Gamepad2 className="h-4 w-4" />
                        <span>Games</span>
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
                              <motion.div
                                key={`game-${index}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-violet-950/50 backdrop-blur p-3 rounded-lg border border-violet-800/50 hover:border-pink-600/50 cursor-pointer group transition-all"
                                whileHover={{ scale: 1.02 }}
                              >
                                <div className="flex flex-col items-center p-2 text-center">
                                  <div className="text-pink-400 mb-2 group-hover:text-pink-300 transition-colors">
                                    {game.icon}
                                  </div>
                                  <h3 className="text-sm font-medium mb-1">{game.title}</h3>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-6 pt-4 border-t border-violet-700/30">
                      <div className="flex justify-between items-center">
                        <span className="text-violet-300 text-xs">Most recent: Calendar Tool</span>
                        <span className="bg-violet-700/50 text-violet-200 text-xs py-1 px-2 rounded-full">New Features!</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -z-10 top-6 left-6 right-6 bottom-0 bg-gradient-to-br from-pink-600/20 to-indigo-600/20 blur-xl rounded-2xl"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-violet-950/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Worlds In One Platform</h2>
            <p className="text-violet-200 max-w-2xl mx-auto">
              FunToolHub combines the best of both worlds - productivity tools to help you stay organized and fun mini-games to help you relax.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Tools Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-violet-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-violet-800/50"
              id="tools"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-800 rounded-lg">
                  <Wrench className="h-6 w-6 text-indigo-300" />
                </div>
                <h3 className="text-2xl font-bold">Daily Tools</h3>
              </div>

              <div className="space-y-6">
                {toolFeatures.map((feature, index) => (
                  <motion.div
                    key={`tool-feature-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex gap-4 group"
                  >
                    <div className="p-2 rounded-lg bg-violet-800/50 text-indigo-300 group-hover:text-indigo-200 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">{feature.title}</h4>
                      <p className="text-violet-200">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Explore All Tools <ChevronRight className="h-4 w-4" />
              </motion.button>
            </motion.div>

            {/* Games Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-violet-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-violet-800/50"
              id="games"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-violet-800 rounded-lg">
                  <Gamepad2 className="h-6 w-6 text-pink-300" />
                </div>
                <h3 className="text-2xl font-bold">Fun Mini-Games</h3>
              </div>

              <div className="space-y-6">
                {gameFeatures.map((feature, index) => (
                  <motion.div
                    key={`game-feature-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    className="flex gap-4 group"
                  >
                    <div className="p-2 rounded-lg bg-violet-800/50 text-pink-300 group-hover:text-pink-200 transition-colors">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">{feature.title}</h4>
                      <p className="text-violet-200">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
              >
                Discover Games <ChevronRight className="h-4 w-4" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials / Stats */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          >
            <div className="bg-violet-800/30 backdrop-blur-sm rounded-xl p-6 border border-violet-700/30">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">25+</h4>
              <p className="text-violet-300">Productivity Tools</p>
            </div>
            <div className="bg-violet-800/30 backdrop-blur-sm rounded-xl p-6 border border-violet-700/30">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">40+</h4>
              <p className="text-violet-300">Mini-Games</p>
            </div>
            <div className="bg-violet-800/30 backdrop-blur-sm rounded-xl p-6 border border-violet-700/30">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">100K+</h4>
              <p className="text-violet-300">Active Users</p>
            </div>
            <div className="bg-violet-800/30 backdrop-blur-sm rounded-xl p-6 border border-violet-700/30">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">4.8</h4>
              <p className="text-violet-300">User Rating</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto bg-violet-800/30 backdrop-blur-md rounded-2xl overflow-hidden border border-violet-700/50"
          >
            <div className="p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Boost Productivity & Have Fun?</h2>
                <p className="text-violet-200 max-w-2xl mx-auto">
                  Join thousands of users who have transformed their daily routines with FunToolHub's unique combination of work and play.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-500 to-indigo-600 hover:from-pink-600 hover:to-indigo-700 px-10 py-4 rounded-full font-medium flex items-center justify-center gap-2 text-lg"
                >
                  Get Started Free <ChevronRight className="h-5 w-5" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-violet-700 hover:bg-violet-600 border border-violet-600 px-10 py-4 rounded-full font-medium text-lg"
                >
                  View Pricing
                </motion.button>
              </div>

              <div className="mt-8 text-center text-violet-300 text-sm">
                No credit card required for free plan. Cancel anytime.
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}