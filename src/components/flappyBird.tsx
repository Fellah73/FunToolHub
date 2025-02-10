'use client'
import { useEffect, useRef, useState } from 'react';
import { FaPause, FaPlay } from "react-icons/fa";
import { GiClick } from "react-icons/gi";

interface BirdConfig {
    x: number;
    y: number;
    width: number;
    height: number;
    velocity: number;
    gravity: number;
    jumpStrength: number;
}

interface Pipe {
    x: number;
    height: number;
    passed: boolean;
}

interface PipeConfig {
    width: number;
    gap: number;
    speed: number;
    spawnInterval: number;
}

export default function FlappyBirdGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [gameOver, setGameOver] = useState<boolean>(false);
    const [score, setScore] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const [lastFrameImage, setLastFrameImage] = useState<ImageData | null>(null);

    // Configuration de l'oiseau
    const birdConfig: BirdConfig = {
        x: 50,
        y: 200,
        width: 70,
        height: 60,
        velocity: 0,
        gravity: 0.2,
        jumpStrength: -4,
    };

    const [bird, setBird] = useState<BirdConfig>({ ...birdConfig });
    const [pipes, setPipes] = useState<Pipe[]>([]);

    // Configuration des obstacles
    const pipeConfig: PipeConfig = {
        width: 70,
        gap: 200, // ✅ Ajusté pour laisser de la place
        speed: 3,
        spawnInterval: 1500,
    };

    const pipeSpacing = 275; // ✅ Espace horizontal entre les tuyaux


    // 🔥 Fonction pour dessiner l'oiseau (Jaune)
    const drawBird = (ctx: CanvasRenderingContext2D, bird: BirdConfig): void => {
        ctx.save();
        ctx.translate(bird.x, bird.y);

        const rotation = Math.min(Math.max(bird.velocity * 0.05, -0.5), 0.5);
        ctx.rotate(rotation);

        // Corps
        ctx.fillStyle = '#8c220a';
        ctx.beginPath();
        ctx.ellipse(0, 0, bird.width / 2, bird.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();

        // Aile
        ctx.fillStyle = '#a6290d';
        ctx.beginPath();
        ctx.ellipse(-5, 0, bird.width / 4, bird.height / 3, Math.PI / 4, 0, Math.PI * 2);
        ctx.fill();

        // Bec
        ctx.fillStyle = '#ff9900';
        ctx.beginPath();
        ctx.moveTo(bird.width / 2 - 5, -10);
        ctx.lineTo(bird.width / 2 + 12, 0);
        ctx.lineTo(bird.width / 2 - 5, 10);
        ctx.fill();

        // Œil
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(bird.width / 4, -5, 5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    };


    // 🔥 Fonction pour générer un obstacle (haut + bas)
    const createPipe = (canvasWidth: number, canvasHeight: number, lastPipeX: number): Pipe => {
        const minHeight = 80; // ✅ Empêcher un tuyau trop petit
        const maxHeight = canvasHeight - pipeConfig.gap - minHeight;
        const topPipeHeight = Math.floor(Math.random() * (maxHeight - minHeight) + minHeight);

        return {
            x: lastPipeX + pipeSpacing, // ✅ Chaque tuyau est espacé de `pipeSpacing`
            height: topPipeHeight,
            passed: false
        };
    };



    // 🔥 Fonction pour gérer le saut
    const handleJump = (): void => {
        if (!gameStarted) {
            setGameStarted(true);
        }
        if (!gameOver) {
            setBird(prev => ({ ...prev, velocity: birdConfig.jumpStrength }));
        } else {
            resetGame();
        }
    };

    // handle pause
    const togglePause = () => {
        setIsPaused(prev => !prev);
    };


    // 🔥 Réinitialiser le jeu
    const resetGame = (): void => {
        setBird({ ...birdConfig });
        setPipes([]);
        setScore(0);
        setGameOver(false);
        setGameStarted(false);
    };

    // 🔥 Gestion du jeu (mise à jour du canvas)
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        let animationFrameId: number;

        const render = (timestamp: number): void => {
            if (isPaused) {

                if (lastFrameImage) {
                    ctx.putImageData(lastFrameImage, 0, 0); // ✅ Restaurer l'image du dernier frame
                    console.log("image restored");
                }
                return
            }

            if (gameOver) {
                if (lastFrameImage) {
                    ctx.putImageData(lastFrameImage, 0, 0); // ✅ Restaurer l'image du dernier frame

                }
                return
            }


            // pas encore commence ou fini le jeu
            if (!gameStarted) {

                return;
            }

            // pendant le jeu
            ctx.fillStyle = '#491280';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            setBird(prev => ({
                ...prev,
                y: Math.max(0 + bird.height / 2, Math.min(canvas.height - bird.height / 2, prev.y + prev.velocity)), // ✅ Empêche l'oiseau de sortir du cadre
                velocity: prev.velocity + prev.gravity,
            }));

            let lastPipeSpawn = 0;
            if (timestamp - lastPipeSpawn > pipeConfig.spawnInterval) {
                const lastPipeX = pipes.length > 0 ? pipes[pipes.length - 1].x : canvas.width;
                setPipes(prev => [...prev, createPipe(canvas.width, canvas.height, lastPipeX)]);
                lastPipeSpawn = timestamp;
            }


            setPipes(prev =>
                prev
                    .filter(pipe => pipe.x + pipeConfig.width > 0)
                    .map(pipe => {
                        if (!pipe.passed && pipe.x + pipeConfig.width < bird.x) {
                            // ✅ Augmente de 1 SEULEMENT
                            setScore(prev => prev + 1);
                            return { ...pipe, passed: true };
                        }
                        return { ...pipe, x: pipe.x - pipeConfig.speed };
                    })
            );

            drawBird(ctx, bird);

            // display the pipes
            pipes.forEach(pipe => {
                ctx.fillStyle = '#69072f'; // 🔴 Couleur des tuyaux

                // ✅ Dessiner le tuyau du haut
                ctx.fillRect(pipe.x, 0, pipeConfig.width, pipe.height);

                // ✅ Dessiner le tuyau du bas
                ctx.fillRect(pipe.x, pipe.height + pipeConfig.gap, pipeConfig.width, canvas.height - pipe.height - pipeConfig.gap);

                // 🔹 Ajout du petit rectangle à la fin du tuyau du haut
                ctx.fillStyle = '#4a0521'; // 🔴 Couleur légèrement plus foncée pour l'effet visuel
                ctx.fillRect(pipe.x - 2, pipe.height - 5, pipeConfig.width + 4, 9); // ✅ Petit rectangle en bas du tuyau du haut

                // 🔹 Ajout du petit rectangle au sommet du tuyau du bas
                ctx.fillRect(pipe.x - 2, pipe.height + pipeConfig.gap, pipeConfig.width + 4, 5); // ✅ Petit rectangle en haut du tuyau du bas
            });


            ctx.fillStyle = 'white';
            ctx.font = '28px Arial';
            ctx.fillText(`Score: ${score / 2}`, 10, 30);

            if (checkCollision()) {
                setGameOver(true);
                //     resetGame();
                return;
            }

            if (!isPaused) {
                setLastFrameImage(ctx.getImageData(0, 0, canvas.width, canvas.height));
            }

            // pause


            animationFrameId = requestAnimationFrame(render);
        };

        const checkCollision = (): boolean => {
            // if (bird.y + bird.height >= canvas.height) return true;

            return pipes.some(pipe => {
                return (
                    bird.x < pipe.x + pipeConfig.width &&
                    bird.x + bird.width > pipe.x &&
                    (bird.y < pipe.height || bird.y + bird.height > pipe.height + pipeConfig.gap)
                );
            });
        };

        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'z' || event.key === 'Z') {
                handleJump();
            }
        };

        animationFrameId = requestAnimationFrame(render);
        canvas.addEventListener('click', handleJump);
        canvas.addEventListener("keydown", handleKeyPress);


        return () => {

            canvas.removeEventListener('click', handleJump);
            canvas.removeEventListener('keydown', handleKeyPress);

            cancelAnimationFrame(animationFrameId);
        };
    }, [gameStarted, gameOver, bird, pipes, isPaused]);


    return (
        <div className="relative w-[80%] md:w-[70%] lg:w-[60%] h-[50vh] md:h-[80vh] mx-auto shadow-2xl shadow-pink-800">
            <canvas ref={canvasRef} className="w-full h-full rounded-lg" />
            {gameStarted &&
                (<button
                    onClick={togglePause}
                    className="absolute top-4 right-4 p-4"
                >
                    {
                        isPaused ? <FaPlay className='text-white text-xl md:text-3xl lg:text-4xl' />
                            : <FaPause className='text-white text-xl md:text-3xl lg:text-4xl' />
                    }
                </button>)
            }
            {
                !gameStarted && (
                    <div
                        onClick={handleJump}
                        className="absolute inset-0 bg-violet-500 bg-opacity-20  flex items-center justify-center rounded-lg">
                        <div className='flex flex-col gap-y-4 md:gap-y-8 lg:gap-y-12 justify-center items-center'>
                            <p className="text-white text-xl md:text-3xl lg:text-4xl font-bold">start playing </p>
                            <p className="flex flex-row text-white text-xl md:text-3xl lg:text-4xl font-bold">
                                By <span className="mx-2"></span>
                                <GiClick className="text-white text-3xl md:text-4xl lg:text-5xl" />
                                <span className="mx-2"></span>
                                on the screen
                            </p>

                        </div>
                    </div>
                )
            }
            {isPaused && (
                <div className="absolute inset-x-0 top-20 bottom-1 bg-gray-900 bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
                    <p className="text-white text-3xl font-bold">PAUSED</p>
                </div>
            )}
            {gameOver && (
                <div className="absolute inset-0 flex flex-col gap-y-4 items-center justify-center bg-black/60">
                    <p className="text-white text-xl md:text-3xl font-bold">Game Over</p>
                    <button onClick={resetGame} className='px-4 py-2 bg-pink-800 text-white border-gray-800 border-2 rounded-md text-lg md:text-xl lg:text-2xl font-semibold'> Restart</button>
                </div>
            )}
        </div>
    );
}


// pause solved
// pause ui handling -->  done
// score s'incremente par 2 --> done avec 7achwa /2 dans l'affichage
//  bird quand il touche le sol le jeu ne stop pas --> done
// restart ui handling  --> done
// begin ui handling --> done 
// chwiya ui ta3 canvas --> done 
// adding difficulties
