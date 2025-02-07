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
        link: "games/flappy-bird",
        description: "Volez et évitez les obstacles ! Aidez Flappy Bird à passer entre les tuyaux sans tomber ou toucher les bords.$Testez vos réflexes et obtenez le meilleur score dans ce jeu addictif et amusant !",
        image: "/games/flappy-bird.jpg"
    },
    {
        name: "Snake Game 🐍",
        link: "games/snake",
        description: "Devenez le plus grand serpent ! Mangez des fruits pour grandir, mais attention à ne pas toucher votre queue.$Affrontez-vous en mode classique ou défi et battez votre propre record !",
        image: "/games/snake-game.jpg"
    },
    {
        name: "Tic-Tac-Toe ❌⭕",
        link: "games/tic-tac-toe",
        description: "Jouez au célèbre jeu de stratégie ! Alignez trois symboles identiques avant votre adversaire et gagnez la partie.$Affrontez l’ordinateur ou un ami et montrez votre intelligence tactique !",
        image: "/games/tic-tac-toe.png"
    }
];

export interface serviceProps {
    name: string;
    description: string;
    image: string;
    link: string;
}