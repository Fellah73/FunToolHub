import decryptId from '@/lib/auth';
import { User } from '@prisma/client';
import ProfileCardComponent from './profileCard';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const { id: encryptedId } = await searchParams;
  const id = encryptedId ? decryptId(encryptedId) : null;
  let user: User | null = null;

  if (id) {
    try {
      const res = await fetch(`http://localhost:3000/api/user?id=${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        next: { tags: ['user-profile'] },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Failed to fetch user');
      }
      user = data?.user || null;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  if (!id) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-3xl md:text-5xl tracking-wider">No ID provided</p>
      </div>
    );
  }
  return (
    <>
     <ProfileCardComponent user={user!} />
    </>
  );
}