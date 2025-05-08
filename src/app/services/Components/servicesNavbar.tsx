'use client'
import { MotionValue, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface servicesNavbarProps {
    className?: string;
    userId?: string;
    scrollLength?: MotionValue<number>;
}

export default function ServicesNavbar({ className, userId, scrollLength }: servicesNavbarProps) {
    const [isSticky, setIsSticky] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {
        // Set active link based on current path
        const currentPath = window.location.pathname;
        setActiveLink(currentPath);

        const handleScroll = () => {
            setIsSticky(window.scrollY > 100);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`w-full px-6 pb-3 fixed top-0 transition-all duration-500 ${isSticky
                ? "translate-y-0 bg-gradient-to-r from-emerald-900/95 via-teal-800/95 to-sky-900/95 backdrop-blur-md shadow-lg z-50"
                : "translate-y-[-100%]"
                } ${className}`}
        >
            <div className="relative w-full flex flex-col gap-y-8 justify-center items-center">

                <motion.div className="absolute top-0 inset-x-0 mx-auto w-[95%] h-[10px] rounded-full bg-gradient-to-r from-emerald-500 to-sky-500" 
                style={{ 
                    scaleX: scrollLength,
                    transformOrigin: "left"
                 }} />
                <div className="max-w-6xl h-[35px] mx-auto flex flex-row mt-4 justify-between items-center gap-x-4 lg:gap-x-24">
                    {[
                        { path: "servicesContainer", label: "All Services" },
                        { path: "prayer", label: "Prayer times" },
                        { path: "todo", label: "To do list" },
                    ].map((item) => (
                        <a
                            key={item.path}
                            href={`/services?id=${userId}#${item.path}`}
                            className={`relative nav-link text-white text-lg font-semibold transition-all duration-300 hover:text-sky-400 py-2 px-3 overflow-hidden group ${activeLink === item.path ? "text-emerald-500" : ""
                                }`}
                        >
                            <span className="relative z-10">{item.label}</span>
                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-emerald-500 group-hover:w-full transition-all duration-300"></span>
                            <span className="absolute inset-0 bg-gray-800/30 scale-0 group-hover:scale-100 rounded-lg -z-10 transition-transform duration-300"></span>
                        </a>
                    ))}</div>
            </div>
        </nav>
    );
}