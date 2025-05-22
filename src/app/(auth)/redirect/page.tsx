'use client'

import { motion } from "framer-motion";
import { Loader2, LogIn, Shield } from "lucide-react";
import { useSearchParams } from "next/navigation";
import  {useRouter} from 'next/navigation'
import { useEffect, useRef } from "react";

export default function Page() {

  const searchParams = useSearchParams();
  const router = useRouter();
  const message = searchParams.get('message');
  const fetched = useRef<boolean | null>(false);

  useEffect(() => {

    console.log('message', message)

    if (fetched.current || !message) return

    if (message == 'disconnected') {
        router.push('/');
    } else if (message == 'connected') {
      router.push(`/profile`);
    }

    fetched.current = true
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-violet-950 via-indigo-950 to-purple-950">

      {/* Orbes lumineux d'arrière-plan */}
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
        className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-violet-600/10 blur-2xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.1, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 1 }}
      />

      {/* Éléments flottants décoratifs */}
      <motion.div
        className="absolute top-20 left-20 text-4xl opacity-20 select-none pointer-events-none"
        animate={{
          y: ["0%", "20%", "-20%", "10%", "0%"],
          rotate: [0, 10, -10, 5, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        🔐
      </motion.div>

      <motion.div
        className="absolute bottom-32 right-32 text-3xl opacity-20 select-none pointer-events-none"
        animate={{
          y: ["0%", "-25%", "25%", "-10%", "0%"],
          rotate: [0, -15, 15, -5, 0],
        }}
        transition={{
          duration: 10,
          delay: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        ⚡
      </motion.div>

      <motion.div
        className="absolute top-1/3 right-20 text-2xl opacity-20 select-none pointer-events-none"
        animate={{
          y: ["0%", "30%", "-30%", "15%", "0%"],
          x: ["0%", "10%", "-10%", "5%", "0%"],
        }}
        transition={{
          duration: 14,
          delay: 1,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        🚀
      </motion.div>

      {/* Contenu principal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center gap-y-6 bg-white/10 backdrop-blur-md p-12 rounded-2xl shadow-2xl border border-white/20 text-center max-w-md mx-4"
      >
        {/* Icône d'authentification */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative"
        >
          <motion.div
            className="bg-gradient-to-r from-fuchsia-800/50 to-violet-800/50 p-4 rounded-full mb-2"
            animate={{
              boxShadow: [
                "0 0 20px rgba(168, 85, 247, 0.4)",
                "0 0 40px rgba(168, 85, 247, 0.6)",
                "0 0 20px rgba(168, 85, 247, 0.4)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Shield className="w-12 h-12 text-fuchsia-300" />
          </motion.div>
        </motion.div>

        {/* Spinner animé */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
          className="relative"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="relative"
          >
            <Loader2 className="size-16 text-fuchsia-400" />
          </motion.div>

          {/* Cercle externe tournant dans l'autre sens */}
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-violet-400 rounded-full"
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Titre principal */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="text-white text-3xl md:text-4xl font-bold tracking-wide mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-fuchsia-200 to-violet-200"
        >
          Authenticating
        </motion.h1>

        {/* Sous-titre */}
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-violet-200 text-lg font-medium"
        >
          Securing your session...
        </motion.p>

        {/* Message de redirection */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.5 }}
          className="flex items-center gap-2 text-indigo-300"
        >
          <LogIn className="w-5 h-5" />
          <span>You will be redirected shortly</span>
        </motion.div>

        {/* Barre de progression animée */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.3, duration: 3, ease: "easeInOut" }}
          className="w-full bg-violet-900/30 rounded-full h-2 overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500 rounded-full"
            animate={{
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>

        {/* Points de chargement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex gap-2"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-fuchsia-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Effet de particules flottantes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-fuchsia-400 rounded-full opacity-60"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [-20, -40, -20],
            opacity: [0.6, 0.2, 0.6],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: Math.random() * 2,
            repeat: Infinity,
            repeatType: "mirror",
          }}
        />
      ))}
    </div>
  )
}