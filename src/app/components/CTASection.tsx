'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MonitorSmartphone, Wrench } from 'lucide-react';
import Link from 'next/link';
import { IoGameControllerOutline } from "react-icons/io5";

const stats = [
    {
        icon: <Wrench className="size-10 text-purple-300" />,
        value: "2",
        label: "All tools",
        color: "text-purple-300"
    },
    {
        icon: <IoGameControllerOutline className="size-10 text-fuchsia-400" />,
        value: "3",
        label: "All Games",
        color: "text-fuchsia-400"
    },
    {
        icon: <MonitorSmartphone className="size-10 text-sky-400" />,
        value : "2",
        label: "Fully responsive platform",
        color: "text-sky-400"
    },
];

export default function CTASection() {
    return (
        <section className="relative py-32 overflow-hidden">

            {/* Decorative Circles */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 -z-10"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 -z-10"></div>

            <div className="container mx-auto px-4">
                <div className="max-w-5xl mx-auto">
                    {/* Main CTA Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-tr from-violet-900/50 to-fuchsia-950/50 rounded-2xl p-8 md:p-12 border border-violet-700/30 shadow-xl backdrop-blur-sm"
                    >
                        <div className="text-center mb-10">
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-3xl md:text-4xl font-bold mb-4"
                            >
                                Join <span className="text-transparent tracking-wide bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-400">FunToolHub</span> Today
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                                className="text-violet-200 text-lg max-w-2xl mx-auto"
                            >
                                Unlock all features and enjoy seamless access to both productivity tools and fun games
                            </motion.p>
                        </div>

                        {/* Stats Row */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            {stats.map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                    viewport={{ once: true }}
                                    className="bg-violet-900/40 border border-violet-700/30 rounded-xl p-6 text-center"
                                >
                                    <div className="flex justify-center items-center mb-3">
                                        {stat.icon}
                                    </div>
                                    <h3 className={`text-2xl md:text-3xl font-bold  ${stat.color} mb-1`}>{stat.value }</h3>
                                    <p className={` tracking-wide ${stat.color}`}>{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            viewport={{ once: true }}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 sm:flex-initial"
                            >
                                <Link href="/profile" className="w-full sm:w-auto inline-flex items-center justify-center bg-purple-900 hover:bg-transparent hover:border hover:border-white text-white font-medium py-3 px-8 rounded-lg transition-all  duration-300">
                                    Get Started <ArrowRight className="ml-2 w-5 h-5" />
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 sm:flex-initial"
                            >
                                <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="w-full sm:w-auto inline-flex items-center justify-center border border-violet-400 text-violet-300 hover:bg-violet-300 hover:text-violet-950 hover:font-extrabold font-medium py-3 px-8 rounded-lg transition-colors duration-300">
                                    Take a Tour
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}