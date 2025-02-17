'use client';
import RotatePhonePrompt from "@/components/rotatePhone";
import { useState } from "react";
import { useUser } from "../context/userContext";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
} 

export default function Page() {

  const { user } = useUser()
  const [showConfetti, setShowConfetti] = useState(false);



  return (
   
      <RotatePhonePrompt />
      

  );
}



//a corriger