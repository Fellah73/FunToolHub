import {
  Bird,
  Box,
  Braces,
  Cable,
  Code,
  Computer,
  Cpu,
  Gamepad2,
  Image,
  List,
  Trophy,
  User,
  UserRoundPen,
  Worm,
  X
} from 'lucide-react';
import { FaPray } from "react-icons/fa";


export type Feature = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
};

export const toolFeatures: Feature[] = [

  {
    icon: <FaPray className="h-6 w-6" />,
    title: "Prayer Times",
    description: "Never miss a prayer again with smart prayer tracking$ Accurate daily timings, beautiful visuals for each salat, and a peaceful interface to keep your connection with faith always glowing in style",
    link: "services/prayer",
  },
  {
    icon: <List className="h-6 w-6" />,
    title: "Todo List Management",
    description: "Stay focused and organized every day with your personal task board$ Easily add, track, and complete tasks in a clean interface designed for productivity lovers. Dark theme and glowing design included.",
    link: "services/todo",
  },
];

export const gameFeatures: Feature[] = [
  {
    icon: <Worm className="h-6 w-6" />,
    title: "Snake Game",
    description: "The classic snake reimagined with glowing vibes and customization$ Play endlessly with progressive speed, animations, and save your personal records. Track your evolution, challenge the world, and master the grid",
    link: "games/snake",
  },
  {
    icon: <Bird className="h-6 w-6" />,
    title: "Flappy Bird",
    description: "Tap to fly and dodge your way through neon chaos$ A fun challenge with real-time physics, leaderboard ranking, and smooth animations. Relive the retro thrill with a futuristic twist",
    link: "games/flappy-bird",
  },
  {
    icon: <X className="h-6 w-6" />,
    title: "Tic Tac Toe Game",
    description: "Outplay your friends in this glowing twist on a classic$ Play with style, from beginner to pro. Bright animations, smart logic, and dark-mode beauty for a casual but addictive experience",
    link: "games/tic-tac-toe",
  },
];

export const floatingElements = [
  { icon: <Gamepad2 className='text-fuchsia-300' size={40} />, delay: 0, duration: 18, initialX: "10%", initialY: "20%" },
  { icon: <Box className='text-fuchsia-400' size={40} />, delay: 5, duration: 15, initialX: "80%", initialY: "15%" },
  { icon: <Worm className='text-fuchsia-300' size={40} />, delay: 2, duration: 20, initialX: "75%", initialY: "80%" },
  { icon: <Trophy className='text-fuchsia-400' size={40} />, delay: 8, duration: 12, initialX: "25%", initialY: "70%" },
  { icon: <Code className='text-fuchsia-300' size={40} />, delay: 3, duration: 16, initialX: "90%", initialY: "50%" },
  { icon: <Braces className='text-fuchsia-400' size={40} />, delay: 6, duration: 17, initialX: "15%", initialY: "85%" },
];

export const floatingProfileElements = [
  { icon: <UserRoundPen className='text-fuchsia-300' size={40} />, delay: 0, duration: 18, initialX: "12%", initialY: "25%" },
  { icon: <User className='text-fuchsia-400' size={40} />, delay: 5, duration: 15, initialX: "85%", initialY: "10%" },
  { icon: <Image className='text-fuchsia-300' size={40} />, delay: 2, duration: 20, initialX: "84%", initialY: "75%" },
  { icon: <Cpu className='text-fuchsia-400' size={40} />, delay: 8, duration: 12, initialX: "20%", initialY: "65%" },
  { icon: <Computer className='text-fuchsia-300' size={40} />, delay: 3, duration: 16, initialX: "95%", initialY: "45%" },
  { icon: <Cable className='text-fuchsia-400' size={40} />, delay: 6, duration: 17, initialX: "18%", initialY: "80%" },
  { icon: <Gamepad2 className='text-fuchsia-300' size={40} />, delay: 0, duration: 18, initialX: "8%", initialY: "30%" },
  { icon: <Box className='text-fuchsia-400' size={40} />, delay: 5, duration: 15, initialX: "88%", initialY: "12%" },
  { icon: <Worm className='text-fuchsia-300' size={40} />, delay: 2, duration: 20, initialX: "25%", initialY: "85%" },
];