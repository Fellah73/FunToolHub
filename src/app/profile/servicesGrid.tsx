'use client';

import { ThreeDCardDemo } from "@/components/services";
import { services } from "@/data/providedServices";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useUser } from "../context/userContext";

export default function ServicesGrid() {

    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const { currentUserId } = useUser()
    return (
        <div className="w-[90%] md:w-[85%] mx-auto px-6 flex flex-col gap-y-4 sm:gap-y-8">
            <div className="flex flex-row w-full items-center justify-center">
                <h2 className="text-white text-xl sm:text-2xl lg:text-4xl font-semibold mb-4 py-2 border-b-2 border-pink-800 pb-1 inline-block">Our services</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
                {services.map((service, index) => (
                    <Link
                        href={service?.link}
                        key={service?.link}
                        className="relative group  block p-2 h-full w-full"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <AnimatePresence>
                            {hoveredIndex === index && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-gray-700  dark:bg-slate-800/[0.8] block rounded-3xl"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                        opacity: 1,
                                        transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                            )}
                        </AnimatePresence>
                        <ThreeDCardDemo key={index}
                            title={service.name}
                            description={service.description}
                            link={`${service.link}?userId=${currentUserId}`}
                            image={service.image}
                            type="game"
                            borderGlow={true} />

                    </Link>
                ))}
            </div>
        </div>
    );
}
