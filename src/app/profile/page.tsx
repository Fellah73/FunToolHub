'use client'

import { floatingProfileElements } from '@/data/featureData';
import decryptId from '@/lib/auth';
import { motion } from 'framer-motion';
import { UserProvider } from '../context/userContext';
import ProfileCardComponent from './profileCard';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Page({ searchParams }: PageProps) {
  const { id: encryptedId } = searchParams;
  const id = encryptedId ? decryptId(encryptedId) : null;

  if (!id) {
    return (
      <div className="relative min-h-screen overflow-hidden flex items-center justify-center">



        {/* Orbes lumineux */}
        <motion.div
          className="absolute top-1/4 -left-20 w-80 h-80 rounded-full bg-fuchsia-400/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.div
          className="absolute bottom-1/3 -right-20 w-96 h-96 rounded-full bg-indigo-700/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.15, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 2 }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center gap-y-4 bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-white/20 text-center"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <svg className="w-16 h-16 mx-auto mb-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </motion.div>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-white text-3xl md:text-5xl font-bold tracking-wider mb-2"
          >
            Must be register
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-violet-200 text-lg md:text-xl"
          >
            No identifier provided to access the profile
          </motion.p>
          <motion.a
             href='/auth'
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className=" px-6 py-3 bg-gradient-to-r from-fuchsia-700 to-violet-800 text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition duration-300"
          >
            Start here
          </motion.a>
        </motion.div>
      </div>
    );
  }

  return (
    <UserProvider userId={id}>
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

        {/* Contenu principal */}
        <div className="container relative z-10 mx-auto px-4 min-h-screen flex flex-col justify-start py-12 items-center">
          {/* Zone centrale avec profil */}
          <div className="w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
            >
              <ProfileCardComponent />
            </motion.div>
          </div>
        </div>
      </div>
    </UserProvider>
  );
}