import Link from 'next/link';
import decryptId from '@/lib/auth';
import { User } from '@prisma/client';
import { date } from 'zod';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  // Decrypt the `id` query parameter

  const { id : encryptedId} = await searchParams
  const id = encryptedId ? decryptId(encryptedId) : null;

  let user: User | null = null;

  if (id) {
    try {
      const res = await fetch(`http://localhost:3000/api/user?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch user')
      }
      user = data?.user || null
     
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  if (!id) {
    return (
      <div className='w-full h-screen flex items-center justify-center text-white text-3xl md:text-4xl'>
        <p className='text-white text-3xl md:text-5xl tracking-wider'>No ID provided</p>
      </div>

    )
  }


  return (
    <div className='w-full h-screen flex items-center justify-center text-white text-3xl md:text-4xl'>
      <div className='w-[90%] mx-auto flex flex-col items-center gap-y-8'>
        <p className='text-white text-3xl md:text-5xl tracking-wider'>Welcome {user?.name}</p>
      </div>
    </div>
  );
}

