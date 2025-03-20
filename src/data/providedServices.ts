export const services = [
    {
        name: "Temps de Prière 🕌",
        link: "services/prayer-times",
        description: "Consultez facilement les horaires de prière en temps réel, adaptés à votre localisation et au calendrier islamique. $Restez toujours informé des heures de prière et recevez des notifications pour ne jamais les manquer.",
        image: "/services/prayer-times.jpeg"
    },
    {
        name: "To-Do List ✅",
        link: "services/todo-list",
        description: "Organisez votre journée avec une to-do list intuitive. Ajoutez, modifiez et cochez vos tâches en un clic. $Boostez votre productivité et ne laissez plus rien au hasard grâce à une gestion efficace de vos tâches.",
        image: "/services/to-do-list.jpg"
    }
];


export const games = [
    {
        name: "Flappy Bird 🐦",   
        video:"games/flappyBird.mp4",
        link: "games/flappy-bird",
        description: "Fly and avoid obstacles!Help Flappy Bird to pass between the pipes without falling or touching the edges. $ Test your reflexes and get the best score in this addictive and fun game !",
        image: "/games/flappyBird.jpg"
    },
    {
        name: "Snake Game 🐍",
        link: "games/snake",
        description: "Become the largest serpent!Eat fruit to grow, but be careful not to touch your tail. $ Face in classic or challenge mode and break your own record!",
        image: "/games/snakeGame.jpg",
        video :"games/snakeGame.mp4"
    },
    {
        name: "Tic-Tac-Toe ❌⭕",
        link: "games/tic-tac-toe",
        description: "Play the famous strategy game!Align three identical symbols before your opponent and win the game. $Face a computer show your tactical intelligence!",
        image: "/games/ticTacToe.webp",
        video:"games/ticTacToe.mp4"
    }
];

export interface serviceProps {
    name: string;
    description: string;
    image: string;
    link: string;
}