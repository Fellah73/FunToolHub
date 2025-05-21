// app/data/featureData.tsx
import {
  Bird,
  List,
  Worm,
  X
} from 'lucide-react';
import { FaPray } from "react-icons/fa";


export type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link :string;
};

export const toolFeatures: Feature[] = [

  {
    icon: <FaPray className="h-6 w-6" />,
    title: "Prayer Times",
    description: "Never miss a prayer again with smart prayer tracking$ Accurate daily timings, beautiful visuals for each salat, and a peaceful interface to keep your connection with faith always glowing in style",
    link : "services/prayer",
  },
  {
    icon: <List className="h-6 w-6" />,
    title: "Todo List Management",
    description: "Stay focused and organized every day with your personal task board$ Easily add, track, and complete tasks in a clean interface designed for productivity lovers. Dark theme and glowing design included.",
    link : "services/todo",
  },
];

export const gameFeatures: Feature[] = [
  {
    icon: <Worm className="h-6 w-6" />,
    title: "Snake Game",
    description: "The classic snake reimagined with glowing vibes and customization$ Play endlessly with progressive speed, animations, and save your personal records. Track your evolution, challenge the world, and master the grid",
    link : "games/snake",
  },
  {
    icon: <Bird className="h-6 w-6" />,
    title: "Flappy Bird",
    description: "Tap to fly and dodge your way through neon chaos$ A fun challenge with real-time physics, leaderboard ranking, and smooth animations. Relive the retro thrill with a futuristic twist",
    link : "games/flappy-bird",
  },
  {
    icon: <X className="h-6 w-6" />,
    title: "Tic Tac Toe Game",
    description: "Outplay your friends in this glowing twist on a classic$ Play with style, from beginner to pro. Bright animations, smart logic, and dark-mode beauty for a casual but addictive experience",
    link : "games/tic-tac-toe",
  },
];