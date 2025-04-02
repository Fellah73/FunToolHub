// app/game/SnakeGame.tsx
"use client";

import { useUser } from "@/app/context/userContext";
import { FOOD_OPTIONS } from "@/data/providedServices";
import { AnimatePresence, motion } from "framer-motion";
import { Gamepad2, Pause, RefreshCw, Trophy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { IoFlame, IoGameController, IoSpeedometerOutline } from "react-icons/io5";


const GRID_SIZE = 12; // Taille de la grille (20x20)

interface Direction {
    x: number;
    y: number;
}

interface Coordinates {
    x: number;
    y: number;
}


interface CustomPreferences {
    snakeColor: string;
    foodObject: string;
    backgroundColor: string;
}

interface GameStates {
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
    isGameStarted: boolean;
    setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
    isGameOver: boolean;
    setIsGameOver: React.Dispatch<React.SetStateAction<boolean>>;
}

// Fusionner les deux interfaces pour le composant
interface SnakeGameProps extends GameStates {
    customization: CustomPreferences;
}

export default function SnakeGame({
    customization,
    isGameStarted, setIsGameStarted,
    isGameOver, setIsGameOver, score, setScore
}: SnakeGameProps) {
    // init cooridintes of the snake
    const [snake, setSnake] = useState<Coordinates[]>([
        { x: GRID_SIZE / 2, y: GRID_SIZE / 2 },
        { x: GRID_SIZE / 2 - 1, y: GRID_SIZE / 2 },
    ]);

    // init direction of the snake to right
    const [direction, setDirection] = useState<Direction>(
        { x: 1, y: 0 },
    );


    // generate a food in a roandolom position in the grid
    const generateFood = () => {
        // Genrate a random position out of the snake
        let x = Math.floor(Math.random() * GRID_SIZE);
        let y = Math.floor(Math.random() * GRID_SIZE);
        while (snake.some(segment => segment.x === x && segment.y === y)) {
            x = Math.floor(Math.random() * GRID_SIZE);
            y = Math.floor(Math.random() * GRID_SIZE);
        }
        return { x, y };
    }

    // init coordinates of the food
    const [food, setFood] = useState<Coordinates>(generateFood);

    // init game state
    const [isPaused, setIsPaused] = useState(false);

    //games speed
    const [speed, setSpeed] = useState<number>(150);

    const { user } = useUser()
    const startGame = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        setSnake([{ x: 1, y: GRID_SIZE / 2 }, { x: 0, y: GRID_SIZE / 2 },]);
        setDirection({ x: 1, y: 0 });
        setScore(0);
        setSpeed(150);
    };

    // Réinitialiser le jeu
    const restartGame = () => {
        setSnake([{ x: 1, y: GRID_SIZE / 2 }, { x: 0, y: GRID_SIZE / 2 }]);
        setDirection({ x: 1, y: 0 });
        setFood(generateFood());
        setIsGameOver(false);
        setScore(0);
        setSpeed(150);
    };

    const togglePause = () => {
        if (!isGameStarted || isGameOver) return;
        setIsPaused(!isPaused);
    };




    // get Snake function
    const getSnakeCaseColor = (snakeCaseIndex: number, snakeLength: number) => {
        const partitions = [snakeLength / 3, snakeLength / 3 * 2];
        const style = " animate-pulse shadow-[0_0_15px_#a855f7] ";
        if (snakeCaseIndex < partitions[0]) {
            return style + customization.snakeColor.split(' ')[0];
        } else if (snakeCaseIndex < partitions[1] && snakeCaseIndex >= partitions[0]) {
            return style + customization.snakeColor.split(' ')[1];
        } else {
            return style + customization.snakeColor.split(' ')[2];
        }

    }

    // mouvment handler


    // Mécanisme du jeu (déplacement du serpent)
    useEffect(() => {
        if (isGameOver || !isGameStarted || isPaused) return;

        const moveSnake = () => {
            setSnake((prevSnake) => {
                const newHead = {
                    x: prevSnake[0].x + direction.x,
                    y: prevSnake[0].y + direction.y,
                };


                // Si le serpent traverse un bord, il réapparaît de l'autre côté
                newHead.x = (newHead.x + GRID_SIZE) % GRID_SIZE;
                newHead.y = (newHead.y + GRID_SIZE) % GRID_SIZE;

                // Vérifier la collision avec lui-même
                if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
                    setIsGameOver(true);
                    return prevSnake;
                }


                // check if the snake eats the food

                // add a new head to the snake
                let newSnake = [newHead, ...prevSnake];

                //if he eats the food we generate a new one , add score and leave the new head of the snake
                if (newHead.x === food.x && newHead.y === food.y) {
                    setFood(generateFood);
                    if (snake.length % 10 == 0) {
                        setScore(score + 4);
                        setSpeed(prev => prev - 0.05 * prev);
                    } else {
                        setScore(score + 1);
                    }
                    // he didn't eat the food we remove the added head
                } else {
                    newSnake.pop();
                }

                return newSnake;
            });
        };

        const gameLoop = setInterval(moveSnake, speed); // Vitesse du jeu
        return () => clearInterval(gameLoop);
    }, [direction, food, isGameOver, isGameStarted, isPaused, snake.length, speed]);



    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        switch (event.key) {
            case "ArrowUp":
                // only if it is moving horizontally
                if (direction.y === 0) setDirection({ x: 0, y: -1 });
                break;
            case "ArrowDown":
                if (direction.y === 0) setDirection({ x: 0, y: 1 });
                break;
            case "ArrowLeft":
                if (direction.x === 0) setDirection({ x: -1, y: 0 });
                break;
            case "ArrowRight":
                if (direction.x === 0) setDirection({ x: 1, y: 0 });
                break;
            case "Escape":
                togglePause();
        }
    }, [direction, togglePause]);

    // Écouter les touches du clavier
    useEffect(() => {
        if (isGameOver || !isGameStarted) return
        const handleKeyPress = (event: KeyboardEvent) => {
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"].includes(event.key)) {
                event.preventDefault(); // Bloque le scrolling
                handleKeyDown(event); // Change la direction du serpent
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyDown, isPaused]);


 

    return (
        <div className="relative size-full flex flex-col items-center p-1 bg-[#0f0c29]">
            <motion.div
                className="w-[75%] flex flex-row justify-between mb-2 mx-auto"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex items-center gap-2">
                    <Gamepad2 className="size-12 text-fuchsia-400 mr-4" />
                    <h2 className="text-4xl font-bold text-white">Snake Game</h2>
                </div>

                <div className="flex flex-row items-center gap-x-2">
                    <motion.div
                        initial={{ scale: 1 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "loop" }}
                    >
                        <IoSpeedometerOutline className={`size-12  ${snake.length % 10 == 1 ? "text-yellow-600 scale-110" : "text-yellow-400"}`} />

                    </motion.div>
                    {snake.length % 10 === 1 && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: [1, 1.2, 1] }}
                            exit={{ scale: 0 }}
                            transition={{ duration: 4, delay: 0.6, repeat: Infinity, repeatType: "loop" }}
                            className="flex justify-center items-center"
                        >
                            <IoFlame className="size-12 text-red-600" />
                        </motion.div>
                    )}

                </div>

                <div className="flex items-center gap-4 mr-8">

                    <div className="flex items-center gap-x-4">
                        <Trophy className="size-8 text-white" />
                        <span className={`text-5xl font-semibold ${snake.length % 10 == 1 ? "text-yellow-400 scale-110" : "text-fuchsia-400"} `}>{score}</span>
                    </div>
                </div>
            </motion.div>

            <div className={`relative grid grid-cols-12 bg-gradient-to-br ${customization.backgroundColor} rounded-xl p-1`}>


                <button className="absolute top-4 right-4 z-50 p-3 bg-transparent backdrop:blur-sm text-white rounded-lg shadow-lg hover:border-4 hover:border-white/50">
                    {isPaused ? <FaPlay size={30} onClick={togglePause} /> : <Pause size={30} onClick={togglePause} />}
                </button>

                {Array.from({ length: GRID_SIZE }).map((_, row) =>
                    Array.from({ length: GRID_SIZE }).map((_, col) => {
                        const isSnake = snake.some(segment => segment.x === col && segment.y === row);
                        const isHead = snake.length > 0 && snake[0].x === col && snake[0].y === row; // Première case = tête
                        const isTail = snake.length > 1 && snake[snake.length - 1].x === col && snake[snake.length - 1].y === row; // Dernière case = queue
                        const isFood = food.x === col && food.y === row;

                        return (
                            <div
                                key={`${row}-${col}`}
                                className={`size-12  
                                    ${isSnake ? getSnakeCaseColor(snake.findIndex(segment => segment.x === col && segment.y === row), snake.length) : ""}
                                    ${isHead ? `rounded-${direction.x === 1 ? "r" : direction.x === -1 ? "l" : direction.y === 1 ? "b" : "t"}-full` : ""}
                                    ${isHead ? "flex text-pink-500" : ""}
                                    ${isHead && direction.x !== 0 ? `justify-${direction.x === 1 ? "end" : "start"} items-center` : ""}
                                    ${isHead && direction.y !== 0 ? `justify-center items-${direction.y === 1 ? "end" : "start"}` : ""}                                                                     
                                    ${isFood ? "size-12 flex justify-center items-center" : ""}
                                    `}
                            >
                                {isHead && (
                                    <div className={`size-full relative flex justify-center items-center ${direction.y === 0 ? "flex-col gap-y-2" : "flex-row gap-x-2"}`}>
                                        <div className=" size-3 bg-pink-600 rounded-full "></div>
                                        <div className=" size-3 bg-pink-600 rounded-full "></div>
                                        {/* langue du serpent */}
                                        <div className={`absolute flex items-center bg-red-600 shadow-[0_0_10px_#ef4444] ${direction.x == 0 && direction.y == -1 ? "right-[40%] bottom-3/4 z-10 px-[10%] py-3 rounded-t-full"
                                            : direction.x == 0 && direction.y == 1 ? "right-[40%] top-3/4 z-10 px-[10%] py-3 rounded-b-full"
                                                : direction.x == 1 && direction.y == 0 ? "left-3/4 top-[40%] z-10 px-3 py-[10%] rounded-l-full" : "right-3/4 top-[40%] z-10 px-3 py-[10%] rounded-r-full"} `} />
                                    </div>
                                )}

                                {isFood &&
                                    (customization.foodObject == FOOD_OPTIONS[0].name ? (
                                        <p className={`${snake.length % 10 == 0 ? "scale-150" : ""} text-6xl animate-pulse`}>
                                            🍎
                                        </p>
                                    ) : customization.foodObject == FOOD_OPTIONS[1].name ? (
                                        <p className={`${snake.length % 10 == 0 ? "scale-150" : ""} text-6xl animate-pulse`}>
                                            ⭐
                                        </p>
                                    ) : (

                                        <p className={`${snake.length % 10 == 0 ? "scale-150" : ""} text-6xl animate-pulse`}>
                                            💎
                                        </p>

                                    ))}
                            </div>
                        );
                    })
                )}
            </div>
            <AnimatePresence>
                {isPaused && (
                    <motion.div
                        className="absolute  inset-0 flex size-full items-center justify-center bg-black/50 backdrop-blur-sm z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-r from-[#0f0c29] to-fuchsia-800 py-8 px-4 rounded-xl shadow-2xl text-center w-[60%] "
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <h2 className="text-2xl md:text-3xl tracking-wide font-bold mb-4 text-white">Game Paused</h2>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                animate={{ scale: [1, 1.10, 1] }}
                                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                                className="px-8 py-3 bg-fuchsia-600 text-white text-xl font-bold rounded-lg shadow-lg shadow-fuchsia-900/50"
                                onClick={togglePause}
                            >
                                Resume
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {!isGameStarted && !isGameOver && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10 size-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-[#0f0c29] to-fuchsia-800 p-8 rounded-xl shadow-2xl text-center w-[90%] md:w-[60%]"
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.8, ease: "easeInOut" }}
                        >
                            <motion.h2
                                className="text-2xl md:text-4xl font-bold mb-6 text-gradient bg-clip-text text-gray-300"
                                animate={{ y: [0, -5, 0, 5, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <IoGameController className="inline-block mr-4 text-gray-400 size-14" />
                                Play now
                            </motion.h2>
                            <p className="text-gray-300 mb-6 text-lg">Use arrow keys to navigate the snake. Eat food to grow longer and earn points!</p>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="px-8 py-3 bg-gradient-to-r from-fuchsia-600 to-purple-600 text-lg text-white font-bold rounded-full shadow-lg shadow-purple-700"
                            >
                                Start Game
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}

                {isGameOver && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm z-10 size-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div
                            className="bg-gradient-to-br  from-[#302b63] to-[#6621b4] py-8 px-4 rounded-xl shadow-2xl text-center w-[60%] "
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            transition={{ type: "spring" }}
                        >
                            <motion.h2
                                className="text-xl md:text-4xl font-bold mb-2 text-neutral-200"
                                animate={{ scale: [1, 1.25, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                Game Over
                            </motion.h2>

                            <div className="my-6 flex flex-col gap-2">
                                <div className="flex justify-between items-center p-2 bg-gray-700/50 rounded-lg">
                                    <span className={`text-gray-300 text-lg md:text-2xl`}>Score</span>
                                    <span className="text-xl font-bold text-white">{score}</span>
                                </div>
                            </div>

                            <motion.button
                                animate={{ scale: [1, 1.25, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={restartGame}
                                className="px-8 py-3 bg-gradient-to-r from-indigo-700 to-purple-500 text-white font-bold rounded-full shadow-lg flex items-center justify-center gap-2 mx-auto"
                            >
                                <RefreshCw size={18} />
                                Play Again
                            </motion.button>
                        </motion.div>
                    </motion.div>

                )}
            </AnimatePresence>

        </div>
    );
}
