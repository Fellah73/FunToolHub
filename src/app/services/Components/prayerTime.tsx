import { motion } from 'framer-motion';
import { Clock, Earth, Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FaPray } from 'react-icons/fa';
import { LuCloudMoon } from "react-icons/lu";
import { PiClockAfternoonBold } from "react-icons/pi";
import { TbSunset2 } from "react-icons/tb";


interface PrayerTimes {
    Fajr: string;
    Sunrise: string;
    Dhuhr: string;
    Asr: string;
    Sunset: string;
    Maghrib: string;
    Isha: string;
    Imsak: string;
    Midnight: string;
    Firstthird: string;
    Lastthird: string;
}

export default function PrayerTimeSection() {
    const prayerInfo = [
        {
            icon: <Sun className="w-10 h-10 text-blue-300" />,
            title: "Fajr & Sunrise",
            description: "Start your day with morning prayers and track precise sunrise times for your location."
        },
        {
            icon: <Clock className="w-10 h-10 text-sky-200" />,
            title: "Daily Prayers",
            description: "Get accurate prayer times for Dhuhr, Asr and Maghrib based on your geographic location."
        },
        {
            icon: <Moon className="w-10 h-10 text-blue-100" />,
            title: "Isha & Night",
            description: "Evening prayer times and night period calculations to complete your daily worship."
        },
        {
            icon: <Earth className="w-10 h-10 text-sky-200" />,
            title: "Location Choice",
            description: "Manually select your location or allows manual settings for precise prayer times."
        }
    ];

    
    const [prayerTime, setPrayerTime] = useState<PrayerTimes | null>(null);
    const getTime = (prayer: keyof PrayerTimes) => {
        if (!prayerTime) return "00:00 AM";
        let time = prayerTime[prayer] || "00:00 AM";
  
        const [hours, minutes] = time.split(":").map((Number));
        const realMinute = time.split(":")[1];
        if (hours > 12) {
            time = `${hours - 12}:${realMinute} PM`;
        } else if (hours === 0) {
            time = `12:${realMinute} AM`;
        } else {
            time = `${hours}:${realMinute} AM`;
        }
        return time;
    };

   
    const prayers = [
        {
            name: "Fajr",
            time: getTime("Fajr"),
            icon: <TbSunset2 className="size-12 text-white" />,
        },
        {
            name: "Dhuhr",
            time: getTime("Dhuhr"),
            icon: <PiClockAfternoonBold className="size-12 text-white" />,
        },
        {
            name: "Asr",
            time: getTime("Asr"),
            icon: <Moon className="w-10 h-10 text-white" />,
        },
        {
            name: "Maghrib",
            time: getTime("Maghrib"),
            icon: <LuCloudMoon className="w-10 h-10 text-white" />,
        },
        {
            name: "Isha",
            time: getTime("Isha"),
            icon: <Moon className="size-12 text-white" />,
        },
    ];

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    const scoreContainer = {
        hidden: { opacity: 0, x: 50 },
        show: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.5,
                delay: 0.3
            }
        }
    };

    const scoreItem = {
        hidden: { opacity: 0, x: 20 },
        show: { opacity: 1, x: 0 }
    };

    useEffect(() => {
        
        const getTimes = async () => {
            try {
                const date = new Date();
                const day = date.getDate().toString().padStart(2, '0');
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const year = date.getFullYear();
                const response = await fetch(`https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=Algiers&country=Algeria&method=2&day=${day}&month=${month}&year=${year}`, {
                    method: 'GET',
                });
                const data = await response.json();
                if (response.status !== 200 || data.status !== "OK") {
                    console.warn(data.status);
                    return;
                }
                setPrayerTime(data.data.timings);

            } catch (error) {
                console.error('Error fetching prayer times:', error);
            }
        };
        getTimes();
    }, []);

    return (
        <motion.section
            className="py-4 text-white overflow-hidden"
            id="salat"
        >
            <div className="mx-auto px-8">
                <motion.h2
                    className="text-4xl font-bold text-center tracking-wider mb-2"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Mawaqit <span className="text-blue-600 tracking-wider">Salat</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                    {/* Prayer Information - 4 columns */}
                    <motion.div
                        className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6 sm:gap-12"
                        variants={container}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {prayerInfo.map((info, index) => (
                            <motion.div
                                key={index}
                                className="bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 backdrop-blur-md p-6 rounded-xl border-l-4 border-blue-800 hover:shadow-lg hover:shadow-blue-700/80 transition-all duration-300"
                                variants={item}
                            >
                                <div className="flex flex-col items-start gap-4">
                                    <div className="p-3">
                                        {info.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-sky-200">{info.title}</h3>
                                    <p className="text-slate-300">{info.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                    {/* High Scores - 2 columns */}
                    <motion.div
                        className="mx-4 lg:mx-0 lg:col-span-2 bg-gradient-to-br from-indigo-950 via-blue-900 to-sky-900 hover:shadow-md hover:shadow-blue-500/80  backdrop-blur-md rounded-xl p-6"
                        variants={scoreContainer}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h3 className="text-2xl font-bold text-center  mb-6 text-white flex items-center justify-center gap-2">
                            <FaPray className="size-8 mr-4" /> Prayer Times
                        </h3>

                        <motion.div
                            className="space-y-4"
                            variants={container}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true }}
                        >
                            <div className="grid grid-cols-3 text-xl text-gray-200 border-b-[1px] border-white pb-2">
                                <div className='tracking-wider'>Prayer</div>
                                <div className='text-center tracking-wider'>name</div>
                                <div className="text-center tracking-wider">time</div>
                            </div>

                            {
                                prayers.map((prayer, index) => (
                                    <motion.div
                                        key={index}
                                        className={`grid grid-cols-3 items-center text-white p-4`}
                                        variants={scoreItem}
                                        transition={{ delay: 0.1 * index }}
                                    >
                                        <div className="font-bold">{prayer.icon}</div>
                                        <div className='text-center text-xl'>{prayer.name}</div>
                                        <div className="text-right font-mono text-xl">{prayer.time}</div>
                                    </motion.div>
                                ))}
                        </motion.div>

                        <motion.div
                            className="mt-2 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            <a
                                href={`services/prayer`}
                                className="inline-block bg-gradient-to-r from-blue-950 to-blue-800 border border-white px-6 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
                            >
                                View All Prayer Times
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
}