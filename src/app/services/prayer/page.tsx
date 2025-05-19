'use client'
import { useUser } from '@/app/context/userContext';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { IoIosTimer } from "react-icons/io";
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

interface PrayerCardInfo {
    name: string;
    time: string;
    icon: JSX.Element;
    image: string;
    description: string;
}

export default function PrayerPage() {
    const { user } = useUser();

    const [prayerTime, setPrayerTime] = useState<PrayerTimes | null>(null);
    const [activeIndex, setActiveIndex] = useState<number>(0);
    const [displayedIndex, setDisplayedIndex] = useState<number>(0);
    const [showFullDescription, setShowFullDescription] = useState<boolean>(false);
    const [nextPrayer, setNextPrayer] = useState<string>("");
    const [today, setToday] = useState<string | undefined>();
    const [timeRemaining, setTimeRemaining] = useState<string>("00:00:00");

    const getTime = (prayer: keyof PrayerTimes) => {
        if (!prayerTime) return "00:00 AM";
        let time = prayerTime[prayer] || "00:00 AM";
        // Convert time to 12-hour format if needed
        const [hours, minutes] = time.split(":").map(Number);
        const realMinute = time.split(":")[1];
        if (hours > 12) {
            time = `${hours - 12}:${realMinute} PM`;
        } else if (hours === 0) {
            time = `12:${realMinute} AM`;
        } else {
            time = `${hours}:${realMinute} ${hours >= 12 ? 'PM' : 'AM'}`;
        }
        return time;
    };

    
    const prayerCards: PrayerCardInfo[] = [
        {
            name: "Fajr",
            time: getTime("Fajr"),
            icon: <TbSunset2 className="size-12 md:size-16 text-orange-300" />,
            image: "/services/prayers/fajr.jpg",
            description:
                "Fajr marks the spiritual beginning of the day. As darkness gives way to light, this prayer invites peace and reflection. It is a moment of solitude and mindfulness, often associated with the serenity of dawn. Performing Fajr reinforces discipline and connects the believer to a higher purpose. It is the first step in aligning one's day with spiritual values, offering clarity and guidance before the world fully awakens.",

        },
        {
            name: "Sunsrise",
            time: getTime("Sunrise"),
            icon: <TbSunset2 className="size-12 md:size-16 text-gray-800" />,
            image: "/services/prayers/sunrise.jpg",
            description: "Sunrise symbolizes a new beginning, radiating hope and energy. Though not a prescribed prayer time, it follows Fajr and precedes Duha. It's a powerful moment to reflect, meditate, or recite personal supplications. The gentle light of sunrise brings a sense of calm, reminding us of nature's rhythm and the mercy of each new day. It is a beautiful pause that inspires gratitude, focus, and renewal after the quietude of early dawn.",

        },
        {
            name: "Dhuhr",
            time: getTime("Dhuhr"),
            icon: <PiClockAfternoonBold className="size-12 md:size-16 text-black" />,
            image: "/services/prayers/dhuhr.jpg",
            description: "Dhuhr is the midday prayer, offering a sacred break from the noise and movement of the day. It reminds us to pause, refocus, and seek spiritual alignment. Performed when the sun passes its zenith, Dhuhr brings calm and mindfulness. It grounds the believer amid daily distractions and renews a sense of purpose. It's a powerful reminder to stay connected to God during even the busiest hours of work and responsibility.",

        },
        {
            name: "Asr",
            time: getTime("Asr"),
            icon: <Sun className="size-12 md:size-16 text-amber-500" />,
            image: "/services/prayers/asr.jpg",
            description: "Asr, the afternoon prayer, provides an opportunity to recenter as the day progresses. As the sun begins to descend, this prayer invites self-reflection, discipline, and a renewed intention. It acts as a bridge between the productivity of the day and the stillness of the evening. Asr teaches consistency, encouraging believers to stay mindful of their Creator throughout life's transitions and changing rhythms.",

        },
        {
            name: "Maghrib",
            time: getTime("Maghrib"),
            icon: <LuCloudMoon className="size-12 md:size-16 text-yellow-100" />,
            image: "/services/prayers/maghrib.jpg",
            description: "Maghrib is performed just after sunset, marking the shift from light to darkness. It is a deeply spiritual moment that offers closure to the day's journey. The brief time frame for Maghrib emphasizes promptness and presence. As twilight settles, the prayer reminds us of life's fleeting nature and the importance of gratitude. It's a peaceful pause to acknowledge blessings before embracing the evening calm.",

        },
        {
            name: "Isha",
            time: getTime("Isha"),
            icon: <Moon className="size-12 md:size-16 text-cyan-300" />,
            image: "/services/prayers/isha.jpg",
            description: "Isha is the final prayer of the day, bringing closure and spiritual renewal. Performed under the night sky, it invites peace, forgiveness, and introspection. Isha offers a quiet moment to let go of the day's worries and connect with divine presence. It fosters spiritual tranquility and prepares the soul for rest. Ending the day with Isha encourages mindfulness and trust in God before sleep.",

        },
    ].sort((a, b) => (a.name === nextPrayer ? -1 : b.name === nextPrayer ? 1 : 0));

    
    useEffect(() => {

        let interval = setInterval(() => {

            setupCountdownTimer();
        }, 1000);

        const t = moment()
        setToday(t.format("MMMM Do YYYY | hh:mm"));

        return () => {
            clearInterval(interval);
        }
    }, [prayerTime]);



    const setupCountdownTimer = () => {
        const momentNow = moment();
        let nextPrayer = null;



        if (momentNow.isAfter(moment(prayerTime?.["Fajr"], 'HH:mm')) && momentNow.isBefore(moment(prayerTime?.["Dhuhr"], 'HH:mm'))) {
            nextPrayer = 'Dhuhr';

        } else if (momentNow.isAfter(moment(prayerTime?.["Dhuhr"], 'HH:mm')) && momentNow.isBefore(moment(prayerTime?.["Asr"], 'HH:mm'))) {
            nextPrayer = 'Asr';

        } else if (momentNow.isAfter(moment(prayerTime?.["Asr"], 'HH:mm')) && momentNow.isBefore(moment(prayerTime?.["Maghrib"], 'HH:mm'))) {
            nextPrayer = 'Maghrib';

        } else if (momentNow.isAfter(moment(prayerTime?.["Maghrib"], 'HH:mm')) && momentNow.isBefore(moment(prayerTime?.["Isha"], 'HH:mm'))) {
            nextPrayer = 'Isha';

        } else {
            nextPrayer = 'Fajr';

        }


        setNextPrayer(nextPrayer);


        const nextPrayerTime = prayerTime ? prayerTime[nextPrayer as keyof PrayerTimes] : null;


        let remainingTime = moment(nextPrayerTime, 'HH:mm').diff(momentNow);
        console.log("remainingTime", remainingTime);

        if (remainingTime < 0) {
            const midNightDiff = moment("23:59:59", "HH:mm:ss").diff(momentNow);
            const fajrtoMidnightDiff = moment(nextPrayerTime, 'HH:mm').diff(moment("00:00:00", "HH:mm:ss"));
            const totalDiff = midNightDiff + fajrtoMidnightDiff;
            remainingTime = totalDiff;

        }

        const remainingTimeDuration = moment.duration(remainingTime);



        setTimeRemaining(`${remainingTimeDuration.hours()}:${remainingTimeDuration.minutes()}:${remainingTimeDuration.seconds()}`);


    }

    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % prayerCards.length);
        setTimeout(() => {
            setDisplayedIndex((prev) => (prev + 1) % prayerCards.length);
        }, 500);
        setShowFullDescription(false);
    };

    useEffect(() => {
        if (!user) return;
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
    }, [user]);




    return (
        <div className="min-h-screen w-full px-2 md:px-4 bg-gradient-to-b from-emerald-950 to-sky-950 text-white overflow-hidden">



            {/* Slider Section */}
            <div>
                <div className="relative w-full flex items-center justify-center">

                    {/* Slider */}
                    <div className="relative flex w-full h-[650px] overflow-hidden items-center justify-center">



                        {nextPrayer && prayerCards.map((card, index) => {
                            const isActive = index === activeIndex;
                            const isPrev = index === (activeIndex - 1 + prayerCards.length) % prayerCards.length;
                            const isNext = index === (activeIndex + 1) % prayerCards.length;

                            return (

                                <>
                                    {isActive && prayerTime && (<motion.div
                                        key={prayerTime[card.name as keyof PrayerTimes]}
                                        initial={{ opacity: 0, y: -30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.2 }}
                                        className="absolute hidden top-4 right-8 z-40 md:flex flex-col items-center gap-y-2"
                                    >
                                        <div className="relative flex items-center justify-between gap-x-4 rounded-xl  shadow-lg px-8 py-4 w-full mb-2 bg-black/40 backdrop-blur-md">
                                            <div className={`absolute inset-0 bg-gradient-to-tr ${card.name == 'Fajr' ? "from-orange-200/40 via-transparent to-violet-600/50" : card.name == 'Sunsrise' ? "from-gray-200/10 via-transparent to-amber-200/80" : card.name == 'Dhuhr' ? "from-sky-500/40 via-transparent to-white/50" : card.name == "Asr" ? "from-orange-200/80 via-transparent to-sky-300/50 " : card.name == 'Maghrib' ? "from-rose-400/50 via-transparent to-fuchsia-500/40" : "from-cyan-400/40 via-transparent to-sky-400/80"} blur-md rounded-xl`}></div>
                                            <h4 className="text-lg lg:text-2xl tracking-wider font-semibold text-emerald-50">Next Prayer</h4>
                                            <span className={`text-2xl lg:text-4xl font-semibold text-white`}>{nextPrayer}</span>
                                        </div>
                                        <div className="flex items-center gap-x-4 py-3 px-4 shadow-2xl rounded-xl bg-black/40 backdrop-blur-md relative">
                                            <div className={`absolute inset-0  blur-md rounded-xl bg-gradient-to-br ${card.name == 'Fajr' ? "from-orange-200/40 via-transparent to-violet-600/50" : card.name == 'Sunsrise' ? "from-gray-200/10 via-transparent to-amber-200/80" : card.name == 'Dhuhr' ? "from-sky-500/40 via-transparent to-white/80" : card.name == 'Asr' ? "from-orange-200/80 via-transparent to-sky-300/50" : card.name == 'Maghrib' ? "from-rose-400/50 via-transparent to-fuchsia-500/40" : "from-cyan-400/40 via-transparent to-sky-400/80"}`}></div>
                                            <IoIosTimer className="text-3xl text-gray-200 z-10" size={60} />
                                            <div className="text-5xl font-mono tracking-wider text-white z-10">{timeRemaining}</div>
                                        </div>
                                    </motion.div>)}

                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{
                                            opacity: isActive ? 1 : 0.6,
                                            scale: isActive ? 1.1 : 0.8,
                                            x: isActive ? 0 : isPrev ? "-110%" : "110%",
                                            zIndex: isActive ? 20 : 10,
                                        }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.4, ease: "easeInOut" }}
                                        className={`absolute flex flex-col p-8 items-center justify-center rounded-xl shadow-2xl transition-all duration-500 overflow-hidden
                                        ${isActive ? "w-[99%] h-[100%]" : "w-[70%] h-[90%] shadow-gray-700/50"}`}
                                    >

                                        <div className="relative w-full h-full">
                                            <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent z-10" />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <img
                                                    src={card.image}
                                                    alt={card.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>




                                            {isActive && (<motion.div
                                                initial={{ y: -20, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                                className='absolute left-4 top-4  md:top-8 md:left-12 flex flex-row items-center gap-x-4 lg:gap-x-8 z-20'
                                            >
                                                <div className="relative">
                                                    {card.icon}
                                                    <div className="absolute inset-0 blur-md opacity-60" style={{
                                                        transform: 'scale(1.2)',
                                                        filter: 'blur(8px)',
                                                        background: isActive ? 'radial-gradient(circle, rgba(16,185,129,0.4) 0%, rgba(0,0,0,0) 70%)' : 'none'
                                                    }}>{card.icon}</div>
                                                </div>
                                                <h3 className={`bg-black/10  z-20  px-4 py-2 rounded-sm text-4xl lg:text-5xl font-bold ${card.name === "Fajr" ? "text-orange-300" : card.name == 'Sunsrise' ? "text-gray-800" : card.name === "Dhuhr" ? "text-black" : card.name === "Asr" ? "text-amber-500" : card.name === "Maghrib" ? "text-yellow-100" : "text-cyan-300"}  drop-shadow-lg`}>{card.name}</h3>
                                            </motion.div>)}



                                            <div className="absolute bottom-0 left-4 z-20 p-6 text-center">


                                                {isActive && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 30 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ duration: 0.8, delay: 0.4 }}
                                                        className="bg-black/20 backdrop-blur-sm p-4 rounded-xl mt-2 max-w-3xl mx-auto border border-emerald-500/20"
                                                    >
                                                        <p className={`text-sm md:text-base text-gray-100 leading-relaxed`}>
                                                            {card.description.length > 150 && !showFullDescription ?
                                                                `${card.description.substring(0, 150)}...` :
                                                                card.description
                                                            }
                                                        </p>
                                                        {card.description.length > 150 && (
                                                            <button
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowFullDescription(!showFullDescription);
                                                                }}
                                                                className={`mt-2  ${card.name === "Fajr" ? "text-fuchsia-400" : card.name == 'Sunsrise' ? "text-orange-200" : card.name == 'Dhuhr' ? "text-blue-200" : card.name == 'Asr' ? "text-amber-200" : card.name == 'Maghrib' ? "text-red-300" : "text-cyan-300"} hover:text-emerald-100 underline transition-colors`}
                                                            >
                                                                {showFullDescription ? "Show less" : "Show more"}
                                                            </button>
                                                        )}
                                                    </motion.div>
                                                )}
                                            </div>
                                            {isActive && (<motion.div
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.8, delay: 0.4 }}
                                                className='hidden absolute bottom-12 right-12 lg:flex flex-row items-center justify-center border border-white rounded-xl bg-black/20 z-20 px-8 py-4 tracking-widest text-2xl font-bold'>
                                                {card.time}
                                            </motion.div>)}
                                        </div>
                                    </motion.div>
                                </>);
                        })}
                    </div>


                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextSlide}
                        className="absolute right-3 z-30 text-white font-bold text-3xl border-2 border-white bg-black/30 duration-300 py-4 px-6 rounded-full transition"
                    >
                        ❯
                    </motion.button>
                </div>
            </div>
        </div>
    );
}