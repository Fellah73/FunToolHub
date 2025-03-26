'use client';
import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

interface rotatePhonePrompts {
  name?: string;
  primaryColor?: string;
  secondaryColor?: string;
  fontColor?: string;
  borderColor?: string;
}

const RotatePhonePrompt = ({ name, primaryColor, secondaryColor, fontColor, borderColor }: rotatePhonePrompts) => {
  const [animate, setAnimate] = useState(false);

  // Animation cycle effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);

      // Reset animation after 1.5 seconds
      setTimeout(() => {
        setAnimate(false);
      }, 1500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className={`sm:hidden fixed inset-x-0 bottom-0 top-20 z-50  bg-gradient-to-br ${primaryColor} flex flex-col items-center justify-center p-6 overflow-hidden`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <div className={`absolute top-0 left-0 w-32 h-32 rounded-full ${secondaryColor} transform -translate-x-16 -translate-y-16`} />
      <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full ${secondaryColor} transform translate-x-20 translate-y-20`} />

      {/* Message and icon */}
      <motion.div
        className="mb-8 text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className={`text-2xl font-bold ${fontColor} mb-3`}>
          Rotate Your Device
        </h2>
        <p className="text-lg text-pink-100">
          {name} works best in landscape mode
        </p>
      </motion.div>

      {/* Phone container with rotation animation */}
      <div
        className={`relative mb-10 transition-all duration-1000 ease-in-out transform ${animate ? 'rotate-90' : 'rotate-0'
          }`}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`w-24 h-40 border-4 ${borderColor} rounded-xl relative overflow-hidden`}
        >
          {/* Phone screen */}
          <div className={`absolute inset-1 bg-gradient-to-br ${primaryColor} rounded-lg`} />

          {/* Mini game visual */}
          <div className="absolute inset-4 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-yellow-400 animate-bounce" />
          </div>

          {/* Notch */}
          <div className={`absolute top-1 left-1/2 transform -translate-x-1/2 w-10 h-2 ${secondaryColor} rounded-full`} />

          {/* Home indicator */}
          <div className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 w-10 h-1 ${secondaryColor} rounded-full`} />
        </motion.div>
      </div>

      <motion.div
        className="flex items-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <RotateCcw
          className={`mr-3 ${fontColor} ${animate ? 'animate-spin' : ''}`}
          size={20}
        />
        <span className="text-lg text-pink-200 font-medium">
          Rotate for the best experience
        </span>
      </motion.div>
    </motion.div>
  );
};

export default RotatePhonePrompt;