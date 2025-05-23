'use client'

import { floatingProfileElements } from '@/data/featureData';
import { motion } from 'framer-motion';
import TestimonialForm from './components/addTestement';
import ProfileCardComponent from './components/profileCard';

export default function Page() {
  return (
      <div className="relative min-h-screen overflow-hidden">
        {/* Éléments flottants animés */}
        {floatingProfileElements.map((elem, index) => (
          <motion.div
            key={index}
            className="absolute text-3xl opacity-30 select-none pointer-events-none"
            style={{ left: elem.initialX, top: elem.initialY }}
            animate={{
              y: ["0%", "30%", "-30%", "15%", "0%"],
              x: ["0%", "17%", "-17%", "3%", "0%"],
              rotate: [0, 10, -10, 5, 0],
            }}
            transition={{
              duration: elem.duration,
              delay: elem.delay,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            {elem.icon}
          </motion.div>
        ))}

        {/* Orbes lumineux */}
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-violet-800/80 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-1/3 -right-10 z-20 w-96 h-96 rounded-full bg-fuchsia-800 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.15, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />
        {/* Title for the page dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-[90%] mx-auto max-w-4xl mt-16"
        >
          <div className="bg-gradient-to-br from-violet-950/30 to-indigo-950/30 p-8 rounded-lg shadow-lg shadow-violet-900/20 border border-violet-800/20 backdrop-blur-sm text-center">
            <motion.h3
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200"
            >
              Welcome to Your Profile Dashboard
            </motion.h3>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-violet-200 max-w-2xl mx-auto"
            >
              Manage your account, track your progress, and share your experience with our community.
              Your feedback helps us create better tools and experiences for everyone.
            </motion.p>
          </div>
        </motion.div>

        {/* Contenu principal */}
        <div className="container relative z-10 mx-auto px-4 min-h-screen flex flex-col justify-start py-8 items-center">
          {/* Layout en deux colonnes sur desktop, empilé sur mobile */}
          <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">

            {/* Colonne gauche - Profile Card (plus compacte) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="w-full lg:col-span-3"
            >
              <ProfileCardComponent />
            </motion.div>

            {/* Colonne droite - Testimonial Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="w-full lg:col-span-2 lg:sticky lg:top-8"
            >
              <TestimonialForm />
            </motion.div>
          </div>
        </div>
      </div>
  );
}