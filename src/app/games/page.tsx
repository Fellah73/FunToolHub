"use client";

import { useState, useEffect, act } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { games } from "@/data/providedServices";
import { useUser } from "../context/userContext";
import CircularBestScore from "@/components/ui/circulareBestScore";

export default function Page() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { user } = useUser();
  const [rightImage, setRightImage] = useState<string | null>(games[0].image);

  useEffect(() => {
    setRightImage(games[activeIndex].image);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % games.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + games.length) % games.length);
  };

  return (
    <div className="min-h-screen bg-gray-900 grid grid-cols-1 lg:grid-cols-6 mx-2">
      {/* 🌟 Conteneur principal */}
      <div className="relative w-full flex items-center justify-center py-12 lg:col-span-4">
        {/* 🔹 Bouton précédent */}
        <button
          onClick={prevSlide}
          className="absolute left-3 z-30 text-fuchsia-400 text-3xl bg-purple-900 hover:bg-purple-700 hover:shadow-2xl hover:shadow-pink-600 py-4 px-6 rounded-full shadow-md transition"
        >
          ❮
        </button>

        {/* 🌟 Slider */}
        <div className="relative flex w-[90%] h-[80%] overflow-hidden items-center justify-center">
          <AnimatePresence>
            {games.map((card, index) => {
              const isActive = index === activeIndex;
              const isPrev = index === (activeIndex - 1 + games.length) % games.length;
              const isNext = index === (activeIndex + 1) % games.length;

              return (
                <motion.div
                  key={card.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: isActive ? 1 : 0.6,
                    scale: isActive ? 1.1 : 0.85,
                    x: isActive ? 0 : isPrev ? "-110%" : "110%",
                    zIndex: isActive ? 20 : 10,
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className={`absolute flex flex-col items-center justify-center rounded-xl shadow-2xl transition-all duration-500 overflow-hidden
                  ${isActive ? "w-[80%] h-[100%] shadow-pink-600" : "w-[70%] h-[90%] shadow-gray-700/50"}`}
                >
                  {card.video ? (
                    <video
                      src={card.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-2xl shadow-lg"
                    />
                  ) : (
                    <img
                      src={card.image}
                      alt={card.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* 📌 Informations sous la vidéo */}
        <div className="w-full absolute bottom-28 z-20 p-4 text-center  rounded-b-2xl text-white">
          {/* 🏷️ Titre */}
          <h3 className=" font-bold text-3xl">{games[activeIndex].name}</h3>
        </div>

        <CircularBestScore score={Math.floor(Math.random() * 200)} maxScore={200} />




        {/* 🔹 Bouton suivant */}
        <button
          onClick={nextSlide}
          className="absolute right-3 z-30 text-fuchsia-400 text-3xl bg-purple-900 hover:bg-purple-700 hover:shadow-2xl hover:shadow-pink-600 py-4 px-6 rounded-full shadow-md transition"
        >
          ❯
        </button>

        {/* 🌟 Button de navigation */}
        <a href={`${games[activeIndex].link}?id=${user?.id}`} className="absolute bottom-32 left-32 z-30">
          <motion.button
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 border border-fuchsia-500  text-xl text-white font-bold tracking-wider rounded-3xl"
            whileHover={{ scale: 1.2, boxShadow: "0px 0px 10px rgba(255, 0, 255, 0.7)" }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Try it
          </motion.button>
        </a>
      </div>

      <div className="hidden lg:block lg:col-span-2 rounded-2xl shadow-2xl shadow-pink-600 my-24 overflow-hidden relative h-[500px] select-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={rightImage}
            src={rightImage!}
            className="absolute w-full h-full object-cover rounded-lg"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </AnimatePresence>
        {
          games[activeIndex].name.endsWith("🐍") && (
            <>
              {/*title*/}
              <p className="z-10 absolute top-3 left-3 w-[40%] flex items-center justify-center text-3xl text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-pink-500">
                {games[activeIndex].name.split("🐍")[0]}
              </p>
              <p className="z-10 absolute bottom-2 left-20 w-[70%] flex items-center justify-center text-xl text-fuchsia-300">
                {games[activeIndex].description.split(".")[0]}
              </p>
            </>)
        }

        {

          games[activeIndex].name.endsWith("🐦") && (
            <>
              <p className="z-10 absolute top-3 left-3 w-[40%] flex items-center justify-center text-white text-4xl">
                {games[activeIndex].name.split("🐦")[0]}
              </p>
              <p className="z-10 absolute bottom-5 left-3 w-[40%] flex items-center justify-center text-white text-xl">
                {games[activeIndex].description.split(".")[0]}
              </p>
            </>)
        }
        {

          games[activeIndex].name.endsWith("❌⭕") && (

            <>
              {/* title */}
              <p className="z-10 absolute top-3 left-3 w-[40%] flex items-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-500 text-5xl">
                {games[activeIndex].name}
              </p>
              <p className="z-10 absolute bottom-3 left-3 w-[40%] flex items-center justify-center text-cyan-200 text-xl">
                {games[activeIndex].description.split("$")[1]}
              </p>
              <p className="z-10 absolute bottom-2 -right-4 w-[40%] flex items-center justify-center text-pink-300 text-xl">
                {games[activeIndex].description.split("!")[0]}
              </p>

            </>
          )
        }

      </div>
    </div>
  );
}
