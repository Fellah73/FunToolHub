'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import DashboardPreview from './DashboardPreview';

export default function HeroSection() {
  return (
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
              Where <span className="text-pink-700">Fun</span> Meets <span className="text-violet-800">Productivity</span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-violet-200 max-w-lg">
              Discover a platform that combines entertaining mini-games with useful daily tools, all in one beautiful interface.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
               href='/profile'
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.09 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-pink-800 to-purple-800 hover:from-pink-900 hover:to-violet-900 hover:scale-125 transition-all duration-300 ease-in-out px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2"
              >
                Get Started <ChevronRight className="h-5 w-5" />
              </motion.a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-violet-800 hover:bg-violet-700 hover:scale-150 transition-all duration-300 ease-in-out border border-violet-600 px-8 py-3 rounded-lg font-medium tracking-wider"
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
            <DashboardPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}