'use client'
import { useUser } from '@/app/context/userContext';
import RotatePhonePrompt from '@/components/rotatePhone';
import SnakeGame from './Components/snakeGame';


export default function page() {
    const { user } = useUser();
    if (!user) return null
    return (
        <div className='w-full min-h-screen grid grid-cols-1 md:grid-cols-4 lg:grid-cols-8 gap-2'>
            {/* left leaderborad */}
            <div className='hidden lg:block lg:col-span-2 border border-white rounded-xl'>
                <div className='size-full flex items-center justify-center'>
                    <p className='text-white text-2xl font-semibold'>Left Leaderboard</p>
                </div>
            </div>
            <RotatePhonePrompt />

            {/* snake game */}
            <div className='hidden sm:block sm:col-span-1 md:col-span-3 lg:col-span-4 border-gray-500 bg-gray-800 border rounded-t-2xl'>
                <SnakeGame />
            </div>
            {/* right leaderboard */}
            <div className='hidden md:block md:col-span-1 lg:col-span-2 border border-white rounded-xl'>
                <div className='size-full flex items-center justify-center'>
                    <p className='text-white text-2xl font-semibold'> right Leaderboard</p>
                </div>
            </div>
        </div>
    )
}
