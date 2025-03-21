import { useEffect, useState } from "react";

interface GamesNavbarProps {
    className?: string;
    userId?: string
}

export default function GamesNavbar({ className, userId }: GamesNavbarProps) {
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
            className={`w-full px-6 py-3 fixed top-0 transition-all duration-500 ${isSticky
                    ? "translate-y-0 bg-gradient-to-r from-purple-900/95 via-indigo-800/95 to-blue-900/95 backdrop-blur-md shadow-lg z-50"
                    : "translate-y-[-100%]"
                } ${className}`}
        >
            <div className="max-w-6xl h-[50px] mx-auto flex flex-row justify-center items-center gap-x-4 md:gap-x-12 lg:gap-x-24">
                {[
                    { path: "gamesContainer", label: "All Games" },
                    { path: "flappy-bird", label: "Flappy Bird" },
                    { path: "snake-game", label: "Snake Game" },
                    { path: "tic-tac-toe", label: "Tic-Tac-Toe" }
                ].map((item) => (
                    <a
                        key={item.path}
                        href={`/games?id=${userId}#${item.path}`}
                        className={`relative nav-link text-white text-lg font-semibold transition-all duration-300 hover:text-pink-400 py-2 px-3 overflow-hidden group ${activeLink === item.path ? "text-pink-500" : ""
                            }`}
                    >
                        <span className="relative z-10">{item.label}</span>
                        <span className="absolute bottom-0 left-0 w-0 h-1 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
                        <span className="absolute inset-0 bg-gray-800/30 scale-0 group-hover:scale-100 rounded-lg -z-10 transition-transform duration-300"></span>
                    </a>
                ))}
            </div>
        </nav>
    );
}