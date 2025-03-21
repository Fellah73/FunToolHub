"use client";

import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
      {/* 🌈 Dégradé animé */}
      <div className="absolute w-full h-full bg-gradient-to-r from-purple-700 via-pink-600 to-fuchsia-500 animate-gradientBlur" />

      {/* ✨ Particules flottantes */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white/20 rounded-full filter blur-md"
          style={{
            width: `${Math.random() * 10 + 10}px`,
            height: `${Math.random() * 10 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: ["0%", "-50%", "0%"],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
