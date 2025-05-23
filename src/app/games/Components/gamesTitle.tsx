import { motion } from "framer-motion";
import { FaGamepad, FaTrophy, FaBolt } from "react-icons/fa"; // 🎮 Icons

export default function GamesTitle() {
  return (
    <div className="relative flex flex-col items-center justify-center w-full text-center mt-4 select-none">
      {/* 🌟 Animated Title */}
      <motion.h1
        className="text-4xl md:text-6xl font-extrabold text-white relative flex items-center gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.span
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.1, 1.2, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaGamepad className="hidden md:block text-pink-500 text-4xl md:text-5xl" />
        </motion.span>
        Explore & Play Our
        <span className="bg-gradient-to-r from-pink-500 to-fuchsia-500 text-transparent bg-clip-text">
          Best Games
        </span>
        <motion.span
          initial={{ y: 0 }}
          animate={{ y: [0, -4, -8, -4, 0, 4, 8, 4, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          <FaTrophy className="hidden md:block text-yellow-400 text-4xl md:text-5xl" />
        </motion.span>
      </motion.h1>

      {/* 🔥 Glowing Underline */}
      <motion.div
        className="w-36 h-1 bg-pink-500 rounded-full mt-2"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* 🎮 Subtitle with Animated Icon */}
      <motion.p
        className="text-lg md:text-xl text-gray-200 mt-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        Challenge yourself and beat the high scores!
        <motion.span
          initial={{ rotate: 0 }}
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <FaBolt className="text-yellow-500 text-2xl" />
        </motion.span>
      </motion.p>
    </div>
  );
}
