// app/components/home/PrayerTimesSection.tsx
'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Bell, Calendar, MapPin } from 'lucide-react';
import Link from 'next/link';
import { FaPray } from 'react-icons/fa';

const features = [
    {
        icon: <Bell className="w-5 h-5 text-sky-400" />,
        text: "Customizable prayer time notifications"
    },
    {
        icon: <MapPin className="w-5 h-5 text-sky-400" />,
        text: "Accurate prayer times based on your location"
    },
    {
        icon: <Calendar className="w-5 h-5 text-sky-400" />,
        text: "Islamic calendar with important dates"
    },
];

export default function PrayerTimesSection() {
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className='md:order-2'
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <FaPray className="h-8 w-8 text-sky-500" />
                            <h2 className="text-3xl font-bold">
                                <span className="text-sky-600">Prayer Times</span>
                            </h2>
                        </div>

                        <p className="text-violet-200 mb-8">
                            Stay connected with your faith through our accurate prayer time calculator. Never miss a prayer with customizable notifications and a beautiful interface that helps you maintain your spiritual routine.
                        </p>

                        <div className="space-y-4 mb-8">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    viewport={{ once: true }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="p-2 rounded-full bg-sky-900/70">
                                        {feature.icon}
                                    </div>
                                    <p className="text-violet-100">{feature.text}</p>
                                </motion.div>
                            ))}
                        </div>



                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <a href="/services/prayer" className="inline-flex items-center bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 px-6 rounded-lg transition-colors">
                                View Prayer Times <ArrowRight className="ml-2 w-5 h-5" />
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Video/Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="md:order-1 relative rounded-xl overflow-hidden aspect-video bg-black/50 border border-sky-700/30"
                    >
                        {/* Replace with actual video component */}
                        <video src="services/prayer.mp4" className='inset-0 size-full' autoPlay loop muted />
                        <div className="absolute inset-0 bg-gradient-to-t from-sky-900/80 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 text-white">
                            <span className="bg-sky-600 text-xs font-medium py-1 px-2 rounded">PRAYER TIMES</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}