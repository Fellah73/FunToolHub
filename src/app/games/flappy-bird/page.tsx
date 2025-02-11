'use client'

import FlappyBirdGame from '@/app/games/flappy-bird/Components/flappyBird'
import BestScoreComponent from '@/app/games/flappy-bird/Components/BestScore'
import ScoreHistoryComponent from './Components/ScoreHistory'
import { useState, useEffect } from 'react';
import { useUser } from '@/app/context/userContext';

export default async function page() {

    const [finalScore, setFinalScore] = useState(0);

    useEffect(() => {
        if (finalScore !== 0) {
            console.log('finalScore', finalScore)
        }
    }, [finalScore]);

    const { user } = useUser();

    // update the score in the database
    const handleScoreUpadate = async () => {

        try {
            const res = await fetch(`/api/update?id=${user?.id}&score=${finalScore}`, { method: "PATCH" });

            if (!res.ok) {
                console.error('Failed to update score');
            }

            const data = await res.json();

            if(data.success){
                console.log('Score updated successfully');
            }

        } catch (error) {
            console.error('Error updating score:', error);
        }

    }

    return (
        <div className='min-h-screen w-full  border border-white grid grid-cols-1 lg:grid-cols-5'>
            <div className='hidden lg:block lg:col-span-1 lg:border lg:border-white'>
                <BestScoreComponent />
            </div>

            <div className='flex items-start col-span-1 lg:col-span-3 lg:border lg:border-white px-2 pt-3 '>
                <FlappyBirdGame setFinalScore={setFinalScore} />
            </div>
            <div className='hidden lg:block lg:col-span-1 lg:border lg:border-white'>
                <ScoreHistoryComponent />

            </div>


        </div>

    )
}


// update prisma code --> done
// handle getting the score  --lyouma
