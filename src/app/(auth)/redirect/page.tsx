'use client'
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
export default function page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const message = searchParams.get('message');
  const fetch = useRef<boolean | null>(false);
  const extractedUserId = (userId: string) => {
    return userId?.substring(1, userId?.length - 1)
  }
  useEffect(() => {
    console.log('message', message)
    if (fetch.current) return
    if (message) {
      localStorage.setItem('connectionStatus', 'd')
      window.location.href = (`/`)
    }
    const connectionStatus = localStorage.getItem('connectionStatus')
    if (connectionStatus?.startsWith('c') && connectionStatus.endsWith('c')) {
      const userId = extractedUserId(connectionStatus)
      window.location.href = (`/dashboard?id=${userId}`)
    }
    fetch.current = true
  }, [])


  return (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2 text-rose-700'>
        <Loader2 className='animate-spin  size-8' />
        <h3 className='font-semibold text-xl '>Logging you in ...</h3>
        <p>You will be redirected shortly</p>
      </div>
    </div>
  )
}
