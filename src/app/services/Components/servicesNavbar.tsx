import { motion, MotionValue } from "framer-motion";
import { ListTodo, Wrench } from "lucide-react";
import { useEffect, useState } from "react";
import { FaPray } from "react-icons/fa";

interface servicesNavbarProps {
    className?: string;
    scrollLength?: MotionValue<number>;
}

export default function ServicesNavbar({ className, scrollLength }: servicesNavbarProps) {
    const [isSticky, setIsSticky] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    useEffect(() => {

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
            className={`w-full pb-3 fixed -left-4 top-0 transition-all duration-500 ${isSticky
                ? "translate-y-0 bg-gradient-to-r from-blue-950/95 via-blue-900/95 to-blue-800/95 backdrop-blur-md shadow-lg z-50"
                : "translate-y-[-100%]"
                } ${className}`}
        >
            <div className="relative w-full flex flex-col gap-y-8 justify-center items-center">

                <motion.div className="absolute top-0 inset-x-0 mx-auto w-[95%] h-[10px] rounded-full bg-gradient-to-r from-sky-500 to-blue-600"
                    style={{
                        scaleX: scrollLength,
                        transformOrigin: "left"
                    }} />
                <div className="max-w-6xl h-[35px] mx-auto flex flex-row mt-4 justify-between items-center gap-x-4 lg:gap-x-24">
                    {[
                        { path: "All", label: "All Services", icon: <Wrench size={30} /> },
                        { path: "prayer", label: "Prayer times", icon: <FaPray size={30} /> },
                        { path: "todo", label: "To do list", icon: <ListTodo size={30} /> },
                    ].map((item) => (
                        <a
                            key={item.path}
                            href={`/services#${item.path}`}
                            className={`${item.path === 'todo' && 'pointer-events-none'} relative nav-link text-white text-lg font-semibold transition-all duration-300 hover:text-sky-400 py-2 px-3 overflow-hidden group ${activeLink === item.path ? "text-emerald-500" : ""
                                }`}
                        >
                            <div className={`relative flex items-center justify-center gap-x-4 ${item.path === 'todo' && 'opacity-50'}`}>
                                <span className="relative z-10">{item.label}</span>
                                {item.icon}
                            </div>

                            <span className="absolute bottom-0 left-0 w-0 h-1 bg-sky-400 group-hover:w-full transition-all duration-300"></span>
                            <span className="absolute inset-0 bg-gray-800/30 scale-0 group-hover:scale-100 rounded-lg -z-10 transition-transform duration-300"></span>
                        </a>
                    ))}</div>
            </div>
        </nav>
    );
}