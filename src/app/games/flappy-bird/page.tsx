'use client'

import { useUser } from '@/app/context/userContext';
import BestScoreComponent from '@/app/games/flappy-bird/Components/BestScore';
import FlappyBirdGame from '@/app/games/flappy-bird/Components/flappyBird';
import { useEffect, useState } from 'react';
import ScoreHistoryComponent from './Components/ScoreHistory';

export default function page() {
    
    const { user } = useUser();
    const [finalScore, setFinalScore] = useState(0);

    useEffect(() => {
        if (finalScore === 0) return;
        // update the score in the database
        const handleScoreUpadate = async () => {

            try {
                const res = await fetch("/api/games/flappy-bird/score",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            id: user?.id,
                            score: finalScore,
                        })
                    });

                if (!res.ok) {
                    console.error('Failed to update score');
                }

                const data = await res.json();

                if (data.success) {
                    console.log('Score updated successfully : ', data.newScore);
                }

            } catch (error) {
                console.error('Error updating score:', error);
            }
        }

        handleScoreUpadate();

        console.log("function executed successfully");
    }, [finalScore]);




    return (
        <div className=' w-[98%] mx-auto border border-white md:gap-x-2 lg:gap-x-4 grid grid-cols-1 md:grid-cols-5'>
            <div className='hidden  border border-neutral-500 lg:h-[90vh]'>
                <BestScoreComponent />
            </div>

            <div className='flex items-start border border-neutral-500 w-full col-span-1 md:col-span-3 lg:col-span-3 pt-3 '>
                <FlappyBirdGame setFinalScore={setFinalScore} />
            </div>
            <div className='hidden md:block md:col-span-2 lg:col-span-2 border border-neutral-500 lg:h-[90vh] h-[90vh]'>
                <ScoreHistoryComponent newScore={finalScore} />
            </div>
        </div>

    )
}


// update prisma code --> done
// handle getting the score  --lyouma
// handle fetch the score  --lyouma
// if the score is smallest of the minimum score fetched don't refetch -- hard but to implement