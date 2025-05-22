'use client'
import { services } from "@/data/providedServices"
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useUser } from '../context/userContext'
import ServicesNavbar from './Components/servicesNavbar'
import ServicesTitle from './Components/servicesTitle'
import PrayerTimeSection from "./Components/prayerTime"
import { FaPray } from "react-icons/fa";
import { FcTodoList } from "react-icons/fc";
import { LoaderCircle } from "lucide-react"

export default function page() {

  const { scrollYProgress } = useScroll();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const { user } = useUser();
  const [rightImage, setRightImage] = useState<string | null>(services[0].image);
  const [displayedIndex, setDisplayedIndex] = useState<number>(0);
  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % services.length);
    setTimeout(() => {
      setDisplayedIndex((prev) => (prev + 1) % services.length);
    }, 500)
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + services.length) % services.length);
    setTimeout(() => {
      setDisplayedIndex((prev) => (prev - 1 + services.length) % services.length);
    }, 500)
  };

  useEffect(() => {
    setRightImage(services[activeIndex].image);
  }, [activeIndex]);


  const scaleX = useSpring(scrollYProgress)
  return (
    <div className='sroll-smooth w-full p-8 bg-emerald-900/50'>
      <ServicesNavbar userId={user ? user.id : ""} scrollLength={scaleX!} />
      <ServicesTitle />
      <div
        id="servicesContainer"
        className="min-h-screen grid grid-cols-1 lg:grid-cols-6 mx-2">
        {/* 🌟 Conteneur principal */}
        <div className="relative w-full flex items-center justify-center py-4 lg:col-span-4">
          {/* 🔹 Bouton précédent */}
          <button
            onClick={prevSlide}
            className="absolute left-3 z-30 text-sky-900 font-bold text-3xl bg-emerald-400 hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-600 hover:text-emerald-200 py-4 px-6 rounded-full shadow-md transition"
          >
            ❮
          </button>

          {/* 🌟 Slider */}
          <div className="relative flex w-[90%] h-[80%] overflow-hidden items-center justify-center">
            <AnimatePresence>
              {services.map((card, index) => {
                const isActive = index === activeIndex;
                const isPrev = index === (activeIndex - 1 + services.length) % services.length;
                const isNext = index === (activeIndex + 1) % services.length;

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
                  ${isActive ? `w-[80%] h-[100%] ${services[displayedIndex].name.endsWith('🕌') ? "shadow-emerald-400" : "shadow-cyan-300"}` : "w-[70%] h-[90%] shadow-gray-700/50"}`}
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

          <div className="w-full flex flex-col items-center gap-y-4 mb-10 md:flex-row md:justify-between md:px-28 md:mb-4 absolute bottom-20 z-20">



            {/* 📌 Titre du jeu */}
            <h3 className="font-bold text-3xl text-emerald-200 text-center">
              {services[displayedIndex].name.endsWith('🕌') ?
                <span className="text-3xl text-emerald-200 flex items-center gap-x-2">{services[displayedIndex].name.split("🕌")[0]} <FaPray className="text-4xl text-emerald-200" /></span>
                : <span className="text-3xl text-cyan-400 flex items-center gap-x-2">{services[displayedIndex].name.split("✅")[0]} <FcTodoList className="text-4xl text-cyan-400" /></span>

              }
            </h3>

            {/* 🚀 Bouton Try it */}
            <a
              className={`${!services[displayedIndex].name.endsWith('🕌') && "pointer-events-none"}`}
              href={`${services[displayedIndex].link}`}>
              <motion.button
                className="px-6 py-3 bg-gradient-to-r from-sky-900 to-cyan-700 text-xl text-emerald-200  font-bold tracking-widest rounded-3xl"
                whileHover={{ scale: 1.2, boxShadow: "0px 0px 10px rgba(255, 0, 255, 0.7)" }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                {services[displayedIndex].name.endsWith('🕌') ? "Try it" : <LoaderCircle size={40} className="animate-spin text-emerald-300" />}
              </motion.button>
            </a>

          </div>



          {/* 🔹 Bouton suivant */}
          <button
            onClick={nextSlide}
            className="absolute right-3 z-30 text-sky-900 font-bold text-3xl bg-emerald-400 hover:bg-sky-600 hover:shadow-2xl hover:shadow-sky-600 hover:text-emerald-200 duration-300 py-4 px-6 rounded-full shadow-md transition"
          >
            ❯
          </button>


        </div>


        {/* 🌟 Image de droite */}
        <div className={`hidden lg:block lg:col-span-2 rounded-2xl shadow-2xl ${services[activeIndex].name.endsWith("🕌") ? "shadow-emerald-400" : "shadow-cyan-300"} my-24 overflow-hidden relative h-[500px] select-none`}>
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
            services[activeIndex].name.endsWith("🕌") && (
              <>
                {/*title*/}
                <p className="z-10 absolute top-3 left-3 w-[40%] flex items-center justify-center text-3xl text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-300">
                  {services[activeIndex].name.split("$")[0]}
                </p>
                <p className="z-10 absolute bottom-2 left-3 w-full px-4 flex items-center justify-center text-lg text-emerald-300">
                  {services[activeIndex].description.split("$")[0]}
                </p>
              </>)
          }

          {

            services[activeIndex].name.endsWith("✅") && (
              <>
                <p className="z-10 absolute top-3 left-3 w-[50%] px-4 flex items-center justify-center text-cyan-600 text-lg">
                  {services[activeIndex].description.split("$")[0]}
                </p>

              </>)
          }


        </div>
      </div>
      <div id="prayer">
        <PrayerTimeSection />
      </div>
    </div>
  )
}
