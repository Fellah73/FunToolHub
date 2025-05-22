"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Quote, Sparkles } from "lucide-react";

type Testimonial = {
  rating: number;
  name: string;
  content: string;
  image: string;
  date: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = true,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  const prettierDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 8000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  return (
    <section className="relative py-20 overflow-hidden bg-violet-950/20">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-fuchsia-700/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-700/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 -z-10"></div>
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.2) 2px, transparent 0)',
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-fuchsia-400"></div>
            <Sparkles size={20} className="text-fuchsia-400" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-fuchsia-400"></div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-400">Community</span> Says
          </h2>
          <p className="text-violet-200 max-w-2xl mx-auto">
            Join Our users who have transformed their experience with FunTool Hub
          </p>
        </motion.div>

        {/* Main testimonial container */}
        <div className="max-w-7xl mx-auto">
          <div className="relative grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

            {/* Image Section */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <div className="relative h-96 w-full max-w-md mx-auto lg:mx-0">
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-r from-fuchsia-600/20 to-indigo-600/20 rounded-3xl blur-xl"></div>

                <AnimatePresence mode="wait">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index * 100}
                      initial={{
                        opacity: 0,
                        scale: 0.8,
                        rotateY: randomRotateY(),
                        z: -100,
                      }}
                      animate={{
                        opacity: isActive(index) ? 1 : 0.6,
                        scale: isActive(index) ? 1 : 0.9,
                        rotateY: isActive(index) ? 0 : randomRotateY(),
                        z: isActive(index) ? 0 : -100,
                        zIndex: isActive(index) ? 50 : testimonials.length + 2 - index,
                        y: isActive(index) ? [0, -20, 0] : 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.8,
                        rotateY: randomRotateY(),
                        z: 100,
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                      className="absolute inset-0 origin-bottom"
                    >
                      <div className="relative h-full w-full overflow-hidden rounded-3xl border border-violet-700/30 bg-gradient-to-br from-violet-900/50 to-fuchsia-950/50 backdrop-blur-sm">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          width={500}
                          height={500}
                          draggable={false}
                          className="h-full w-full object-cover object-center"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/80 via-transparent to-transparent"></div>

                        {/* Name overlay on image */}
                        <div className="absolute bottom-4 left-4 right-4">
                          <h4 className="text-white font-semibold text-lg mb-1">{testimonial.name}</h4>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
              className="flex flex-col justify-center"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-violet-900/40 to-fuchsia-950/40 rounded-2xl p-8 border border-violet-700/30 backdrop-blur-sm shadow-2xl shadow-fuchsia-900/20">
                <motion.div
                  key={active}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  {/* Quote icon */}
                  <div className="mb-6">
                    <Quote className="h-10 w-10 text-fuchsia-400" />
                  </div>

                  {/* Quote text with word-by-word animation */}
                  <motion.blockquote className="text-lg md:text-xl text-gray-100 mb-8 leading-relaxed">
                    {testimonials[active].content.split(" ").map((word, index) => (
                      <motion.span
                        key={`${active}-${index}`}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeOut",
                          delay: 0.02 * index,
                        }}
                        className="inline-block"
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.blockquote>

                  {/* User info */}
                  <div className="flex justify-between items-center px-5">

                    <div className="flex items-center gap-4 mb-8">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          {testimonials[active].name}
                        </h3>
                        <p className="text-fuchsia-300 font-medium">
                          {prettierDate(testimonials[active].date) ?? prettierDate(new Date().toISOString())}
                        </p>
                      </div>
                    </div>
                    {/* Rating stars */}
                    <div className="flex gap-1">
                      {[...Array(testimonials[active].rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.3 }}
                        >
                          <Sparkles className="h-4 w-4 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Navigation buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex gap-3">
                    <motion.button
                      onClick={handlePrev}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex h-12 w-12 items-center justify-center rounded-full bg-violet-800/50 border border-violet-600/50 hover:bg-violet-700/70 hover:border-violet-500 transition-all duration-300"
                    >
                      <IconArrowLeft className="h-5 w-5 text-violet-200 transition-transform duration-300 group-hover:text-white group-hover:-translate-x-1" />
                    </motion.button>

                    <motion.button
                      onClick={handleNext}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="group flex h-12 w-12 items-center justify-center rounded-full bg-fuchsia-800/50 border border-fuchsia-600/50 hover:bg-fuchsia-700/70 hover:border-fuchsia-500 transition-all duration-300"
                    >
                      <IconArrowRight className="h-5 w-5 text-fuchsia-200 transition-transform duration-300 group-hover:text-white group-hover:translate-x-1" />
                    </motion.button>
                  </div>

                  {/* Dots indicator */}
                  <div className="flex gap-2">
                    {testimonials.slice(0, 5).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setActive(index)}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${index === active
                          ? 'bg-fuchsia-400 w-6'
                          : 'bg-violet-600 hover:bg-violet-500'
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};