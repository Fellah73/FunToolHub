export const services = [
  {
    name: "Prayer time 🕌",
    link: "services/prayer",
    video: "services/prayer.mp4",
    description:
      "Easily consult prayer times in real time, adapted to your location and the Islamic calendar. $Restez toujours informé des heures de prière et recevez des notifications pour ne jamais les manquer.",
    image: "/services/prayer.jpg",
  },
  {
    name: "To-Do List ✅",
    link: "services/todo-list",
    video: "services/to-do-list.mp4",
    description:
      "Organize your day with an intuitive to-do list.Add, change and check your tasks with one click.$Boostez votre productivité et ne laissez plus rien au hasard grâce à une gestion efficace de vos tâches.",
    image: "/services/to-do-list.jpg",
  },
];

export const games = [
  {
    name: "Flappy Bird 🐦",
    video: "games/flappyBird.mp4",
    link: "games/flappy-bird",
    description:
      "Fly and avoid obstacles!Help Flappy Bird to pass between the pipes without falling or touching the edges. $ Test your reflexes and get the best score in this addictive and fun game !",
    image: "/games/flappyBird.jpg",
  },
  {
    name: "Snake Game 🐍",
    link: "games/snake",
    description:
      "Become the largest serpent!Eat fruit to grow, but be careful not to touch your tail. $ Face in classic or challenge mode and break your own record!",
    image: "/games/snakeGame.jpg",
    video: "games/snakeGame.mp4",
  },
  {
    name: "Tic-Tac-Toe ❌⭕",
    link: "games/tic-tac-toe",
    description:
      "Play the famous strategy game!Align three identical symbols before your opponent and win the game. $Face a computer show your tactical intelligence!",
    image: "/games/ticTacToe.webp",
    video: "games/ticTacToe.mp4",
  },
];

export const FOOD_OPTIONS = [
  { name: "Apple", icon: "🍎" },
  { name: "Star", icon: "⭐" },
  { name: "Gem", icon: "💎" },
];

// Background gradients
export const BACKGROUND_GRADIENTS = [
  { name: "Space 🚀", value: "from-[#0f0c29] via-[#302b63] to-[#24243e]" },
  { name: "Cosmos 🌑", value: "from-gray-900 via-blue-800 to-gray-900" },
  { name: "Night Sky 🌃", value: "from-gray-800 via-purple-900 to-gray-800" },
  { name: "Ocean 🌊", value: "from-indigo-900 via-blue-600 to-indigo-800" },
];

// Color palettes for snake
export const SNAKE_COLORS = [
  {
    name: "Neon Blue",
    value: "bg-indigo-500 bg-purple-600 bg-blue-500",
  },
  {
    name: "Dark Blue",
    value: "bg-blue-800 bg-blue-900 bg-blue-950",
  },
  {
    name: "Silver Gray",
    value: "bg-gray-600 bg-gray-700 bg-gray-800",
  },
  {
    name: "Purple Gradient",
    value: "bg-purple-700 bg-purple-800 bg-purple-900",
  },
];

export const SNAKE_BACKGROUND = [
  {
    value:'bg-purple-600',
  },
  {
    value:"bg-blue-900",
  },
  {
    value:'bg-gray-700'
  },
  {
    value:'bg-purple-800'
  }
]

export interface serviceProps {
  name: string;
  description: string;
  image: string;
  link: string;
}
