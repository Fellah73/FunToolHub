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

export const testimonials = [
  {
      content:
          "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-10-01",
  },
  {
      content:
          "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-09-15",
  },
  {
      content:
          "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      image: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-08-20",
  },
  {
      content:
          "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      image: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-07-10",
  },
  {
      content:
          "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-06-05",
  },
  {
      content:
          "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-05-25",
  },
  {
      content:
          "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      image: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-04-15",
  },
  {
      content:
          "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      image: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-03-10",
  },
  {
      content:
          "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      image: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      rating: 5,
      date: "2023-02-05",
  },
];
