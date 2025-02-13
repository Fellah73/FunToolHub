'use client';
import Confetti from "react-dom-confetti";
import { useUser } from "../context/userContext";
import { useEffect, useState } from "react";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Page() {

  const { user } = useUser()
  const [showConfetti, setShowConfetti] = useState(false);



  return (
    <div className="relative min-h-screen flex items-center justify-center max-w-5xl mx-auto px-8">
      <div className=" select-none pointer-events-none">
        <Confetti active={showConfetti}
          config={{
            angle: 300,
            spread: 500,
            startVelocity: 35,
            elementCount: 600,
            decay: 0.9,
            width: "30px",
            height: "25px",
            colors: ["#a81bb5", "#470e66", "#6c1d7a", "#6a0fbf", "#6a0fbf","#e356ce"],
            duration: 12000
          }} />


      </div>
      <button onClick={() => setShowConfetti(!showConfetti)}>click</button>
      <p className="text-white text-3xl md:text-5xl tracking-wider">{user ? user.name : "No user data available"}</p>

    </div>
  );
}



//a corriger