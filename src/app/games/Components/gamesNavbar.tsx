import { motion, MotionValue } from "framer-motion";
import { Bird, Gamepad2, Worm, X } from "lucide-react";
import { useEffect, useState } from "react";

interface GamesNavbarProps {
    className?: string;
    scrollLength?: MotionValue<number>;

}

export default function GamesNavbar({ className, scrollLength }: GamesNavbarProps) {
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
            className={`w-full px-6 pb-3  fixed top-0 transition-all duration-500 ${isSticky
                ? "translate-y-0 bg-gradient-to-r from-purple-950/95 via-indigo-900/95 to-blue-900/95 backdrop-blur-md shadow-lg z-50"
                : "translate-y-[-100%]"
                } ${className}`}
        >
            <div className="relative w-full flex flex-col gap-y-8 justify-center items-center">

                <motion.div className="absolute top-0 inset-x-0 mx-auto w-[95%] h-[10px] rounded-full bg-gradient-to-r from-pink-500 to-fuchsia-500"
                    style={{
                        scaleX: scrollLength,
                        transformOrigin: "left"
                    }} />
                <div className="max-w-6xl h-[35px] mx-auto flex flex-row mt-4 justify-between items-center gap-x-4 md:gap-x-12 lg:gap-x-24">
                    {[
                        { path: "All", label: "All Games", icon: <Gamepad2 size={30} className="ml-4" /> },
                        { path: "flappy-bird", label: "Flappy Bird", icon: <Bird size={30} className="ml-4" /> },
                        { path: "snake-game", label: "Snake Game", icon: <Worm size={30} className="ml-4" /> },
                        { path: "tic-tac-toe", label: "Tic-Tac-Toe", icon: <X size={30} className="ml-4" /> },
                    ].map((item) => (
                        <a
                            key={item.path}
                            href={`/games#${item.path}`}
                            className={`${item.path === "tic-tac-toe" && 'pointer-events-none'} relative nav-link text-white text-lg font-semibold transition-all duration-300 hover:text-pink-400 py-2 px-3 overflow-hidden group ${activeLink === item.path ? "text-pink-500" : ""
                                }`}
                        >
                            <div className={`relative flex items-center justify-center gap-x-2 ${item.path === 'tic-tac-toe' && 'opacity-50'}`}>
                                <span className={`z-10`}>{item.label}</span>
                                {item.icon}
                            </div>

                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
                            <span className="absolute inset-0 bg-gray-800/30 scale-0 group-hover:scale-100 rounded-lg -z-10 transition-transform duration-300"></span>
                        </a>
                    ))}</div>
            </div>
        </nav>
    );
}