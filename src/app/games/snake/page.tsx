'use client'
import { useUser } from '@/app/context/userContext';
import RotatePhonePrompt from '@/components/rotatePhone';
import SnakeGame from './Components/snakeGame';
import CustomizationHub from './Components/cutomizationPannel';
import { useEffect, useState } from 'react';
import { BACKGROUND_GRADIENTS, FOOD_OPTIONS, SNAKE_COLORS } from '@/data/providedServices';
import SnakeMasterboard from './Components/snakeMasterborad';
import { motion } from 'framer-motion';
export interface CustomizationValues {
    snakeColor: string,
    foodObject: string
    backgroundColor: string
}
export default function page() {
    const { user } = useUser();

    const [isGameOver, setIsGameOver] = useState<boolean>(false);
    const [isGameStarted, setIsGameStarted] = useState<boolean>(false);

    const [customization, setCustomization] = useState<CustomizationValues>(
        {
            snakeColor: SNAKE_COLORS[0].value,
            foodObject: FOOD_OPTIONS[0].icon,
            backgroundColor: BACKGROUND_GRADIENTS[0].value
        }
    )

    const [score, setScore] = useState<number>(0)


    useEffect(() => {
        if (!user) return
        if (!isGameOver || !isGameStarted) return
        if (score == 0) return

        const saveScore = async () => {
            const response = await fetch("/api/games/snake/score", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id: user?.id,
                    score: score,
                }),
            });
            const data = await response.json();

            if (data.success) {
                console.log("Score saved successfully!", data.newScore);

            }
            else {
                console.log("Error saving score:", data.error);
            }
        }
        saveScore()

    }, [isGameOver]);

    if (!user) return null

    return (
        <div className='w-full min-h-screen grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 px-2'>

            <RotatePhonePrompt
                name='Snake Game'
                primaryColor='from-[#0f0c29] via-[#302b63] to-[#24243e]'
                secondaryColor='bg-cyan-500'
                fontColor='text-cyan-500'
                borderColor='border-cyan-500' />

            {/* left leaderborad */}
            <div className='hidden lg:block lg:col-span-2 rounded-2xl'>
                <motion.div
                    initial={{ translateX: -200, scale: 0.7 }}
                    animate={{ translateX: 0, scale: 1 }}
                    transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                >
                    <SnakeMasterboard
                        score={score}
                        isGameStarted={isGameStarted}
                        isGameOver={isGameOver} />
                </motion.div>
            </div>


            {/* snake game */}
            <div className='hidden sm:block sm:col-span-1 md:col-span-4 lg:col-span-4 bg-gray-800 rounded-t-2xl'>
                <motion.div
                    initial={{ translateY: -400 }}
                    animate={{ translateY: 0 }}
                    transition={{ duration: 3, delay: 0.7, ease: "easeInOut" }}
                >
                    <SnakeGame
                        score={score}
                        setScore={setScore}
                        isGameStarted={isGameStarted}
                        setIsGameStarted={setIsGameStarted}
                        isGameOver={isGameOver}
                        setIsGameOver={setIsGameOver}
                        customization={customization}
                    />
                </motion.div>
            </div>
            {/* right leaderboard */}
            <div className='hidden lg:block lg:col-span-2 rounded-xl'>
                <div className='felx justify-center size-full'>
                    <motion.div
                        initial={{ translateX: 200, scale: 0.7 }}
                        animate={{ translateX: 0, scale: 1 }}
                        transition={{ duration: 3, delay: 0.5, ease: "easeInOut" }}
                    >
                        <CustomizationHub setCustomization={setCustomization}
                            customization={customization}
                            isGameOver={isGameOver}
                            isGameStarted={isGameStarted} />
                    </motion.div>
                </div>

            </div>
        </div>
    )
}
