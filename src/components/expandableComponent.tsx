"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef } from "react";
import { GlowingEffect } from "./ui/glowing-effect";
import Link from "next/link";

interface ExpandableCardProps {
    title: string;
    description: string;
    image: string;
    ctaText?: string;
    ctaLink?: string;
    onClose: () => void; // Fonction pour fermer la carte
}

export default function ExpandableCard({ title, description, image, ctaText, ctaLink, onClose }: ExpandableCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();
    const router = useRouter();
    const playButtonRef = useRef<HTMLAnchorElement | null>(null);


    // 🔥 Fermer la carte avec Escape
    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = "auto";
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [onClose]);

    // 🔥 Fermer en cliquant en dehors


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node) && playButtonRef.current == event.target) {
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);




    return (


        <AnimatePresence >

            <div className="w-full fixed inset-0 grid place-items-center z-50 bg-black/50">
                <motion.div
                    ref={ref}
                    layoutId={`card-${id}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-[80%] max-w-[500px] bg-gray-700 rounded-3xl ring ring-pink-800 shadow-lg p-1.5 overflow-hidden relative"
                >
                    <div className="relative w-full">
                        <GlowingEffect
                            spread={50}
                            glow={true}
                            disabled={false}
                            proximity={50}
                            inactiveZone={0.4}
                            borderWidth={6}
                            movementDuration={2}
                            blur={0}
                            className="rounded-3xl" />

                        <img width={500} height={300} src={image} alt={title} className="w-full rounded-tr-3xl rounded-tl-3xl h-60 object-cover" />
                        <div className="p-6">
                            <h3 className="text-xl font-bold text-white dark:text-gray-200">{title}</h3>
                            <p className="text-neutral-400 mt-2">{description.replace(/\$/g, " ")}</p>
                            <div className="flex justify-end gap-x-2 sm:gap-x-4 lg:gap-x-6 w-full px-2 md:px-4">
                                <button
                                    onClick={onClose}
                                    className="mt-4 px-4 py-2 text-sm rounded-full font-bold bg-red-800 text-neutral-100  hover:bg-red-600 transition"
                                >
                                    Close
                                </button>
                                <Link
                                   onClick={onClose}
                                    ref={playButtonRef}
                                   // onClick={(event) => event.stopPropagation()} //✅ Empêche le clic de fermer `ExpandableComponent`
                                    href={ctaLink! || "games/flappy-bird"}
                                    target="_blank"
                                    className="mt-4 px-4 py-2 text-sm rounded-xl font-bold bg-pink-800 text-white hover:bg-pink-600 transition">
                                    {ctaText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>

    );
}
