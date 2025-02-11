'use client';
import { useUser } from "../context/userContext";

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default function Page() {

  const { user } = useUser()
  return (
    <div className="flex flex-col max-w-5xl mx-auto px-8">
      <p className="text-white text-3xl md:text-5xl tracking-wider">{user ? user.name : "No user data available"}</p>
    </div>
  );
}



//a corriger