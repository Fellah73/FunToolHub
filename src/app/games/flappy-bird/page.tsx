'use client'

import { useUser } from '@/app/context/userContext';
import FlappyBirdGame from '@/app/games/flappy-bird/Components/flappyBird';
import { useEffect, useState } from 'react';
import Confetti from 'react-dom-confetti';
import BestPersonnelScoreComponent from './Components/BestPersonnelScoreComponent';
import ScoreHistoryComponent from './Components/ScoreHistory';
export default function page() {

    const { user } = useUser();
    const [finalScore, setFinalScore] = useState(0);
    const [newRecord, setNewRecord] = useState(false);
    const [animateConfetti, setAnimateConfetti] = useState(false);

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


    useEffect(() => {
        if (newRecord) {
            setAnimateConfetti(true);
        }
    }, [newRecord]);

    useEffect(() => {
        if (animateConfetti) {
            setTimeout(() => {
                setAnimateConfetti(false);
                setNewRecord(false);
            }, 5000);
        }
    }, [animateConfetti]);

    return (
        <>
            {/* ✅ Animation en dehors du grid */}
            <div className='fixed inset-0 flex items-center justify-center pointer-events-none z-50'>
                <Confetti active={animateConfetti}
                    config={{
                        angle: 300,
                        spread: 500,
                        startVelocity: 35,
                        elementCount: 600,
                        decay: 0.9,
                        width: "30px",
                        height: "25px",
                        colors: ["#a81bb5", "#470e66", "#6c1d7a", "#6a0fbf", "#6a0fbf", "#e356ce"],
                        duration: 12000
                    }} />
            </div>

            {/* ✅ La grille principale */}
            <div className='relative w-[98%] mx-auto border border-white md:gap-x-2 lg:gap-x-4 grid grid-cols-1 md:grid-cols-5'>
                <div className='hidden border border-neutral-500 lg:h-[90vh] lg:block lg:col-span-1'>
                    <BestPersonnelScoreComponent newScore={finalScore} setNewRecord={setNewRecord} />
                </div>
                <div className='flex items-start border border-neutral-500 w-full col-span-1 md:col-span-3 pt-3 '>
                    <FlappyBirdGame setFinalScore={setFinalScore} />
                </div>
                <div className='hidden md:block md:col-span-2 lg:col-span-1 border border-neutral-500 lg:h-[90vh] h-[90vh]'>
                    <ScoreHistoryComponent newScore={finalScore} />
                </div>
            </div>
        </>

    )
}


// update prisma code --> done
// handle getting the score  -- done
// handle fetch the score  -- done
// if the score is smallest of the minimum score fetched don't refetch -- done