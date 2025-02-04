import decryptId from '@/lib/auth';
import { UserProvider } from '../context/userContext';
import ProfileCardComponent from './profileCard';

interface PageProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function Page({ searchParams }: PageProps) {
  const { id: encryptedId } = await searchParams;
  const id = encryptedId ? decryptId(encryptedId) : null;

  if (!id) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-3xl md:text-5xl tracking-wider">No ID provided</p>
      </div>
    );
  }
  return (
    <UserProvider userId={id}>
      <>
        <ProfileCardComponent />
      </>
    </UserProvider>
  );
}

// delete the fetch and don't pass the user