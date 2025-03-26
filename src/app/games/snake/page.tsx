'use client'
import { useUser } from '@/app/context/userContext';
import RotatePhonePrompt from '@/components/rotatePhone';
import SnakeGame from './Components/snakeGame';
import CustomizationHub from './Components/cutomizationPannel';
import { useEffect, useState } from 'react';
import { BACKGROUND_GRADIENTS, FOOD_OPTIONS, SNAKE_COLORS } from '@/data/providedServices';

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

    useEffect(() => {
        console.log(customization)
    }, [customization])

    if (!user) return null
    return (
        <div className='w-full min-h-screen grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2 px-2'>
            {/* left leaderborad */}
            <div className='hidden lg:block lg:col-span-2 border border-white rounded-xl'>
                <div className='size-full flex items-center justify-center'>
                    <p className='text-white text-2xl font-semibold'> Leaderboard pannel</p>
                </div>
            </div>
            <RotatePhonePrompt
                name='Snake Game'
                primaryColor='from-[#0f0c29] via-[#302b63] to-[#24243e]'
                secondaryColor='bg-cyan-500'
                fontColor='text-cyan-500'
                borderColor='border-cyan-500' />

            {/* snake game */}
            <div className='hidden sm:block sm:col-span-1 md:col-span-3 lg:col-span-4 bg-gray-800 rounded-t-2xl'>
                <SnakeGame
                    isGameStarted={isGameStarted}
                    setIsGameStarted={setIsGameStarted}
                    isGameOver={isGameOver}
                    setIsGameOver={setIsGameOver}
                    customization={customization}
                />
            </div>
            {/* right leaderboard */}
            <div className='hidden md:block md:col-span-1 lg:col-span-2 rounded-xl'>
                <div className='felx justify-center size-full'>
                    <CustomizationHub setCustomization={setCustomization}
                        customization={customization}
                        isGameOver={isGameOver}
                        isGameStarted={isGameStarted} />
                </div>

            </div>
        </div>
    )
}
