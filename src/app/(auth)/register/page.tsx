'use client'
import RegisterFrom from '@/app/(auth)/register/RegisterFrom'
import { SparklesCore } from '@/components/ui/sparkles'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

export default function page() {
    const fetch = useRef<boolean | null>(false)
    const router = useRouter()
    useEffect(() => {
        if (fetch.current) return
        const connectionStaus = localStorage.getItem('connectionStatus')
        if ((connectionStaus?.startsWith('c') && connectionStaus.endsWith('c')) ) {
            const extractedUserId = (userId: string) => {
                return userId?.substring(1, userId?.length - 1)
            }
            const userId = extractedUserId(connectionStaus)
            router.push(`/profile?id=${userId}`)
        }
        fetch.current = true
    }, [])
    return (
        <div className='flex h-auto w-full relative'>
            <img src="/web.jpg" alt="web" className='w-1/2 h-auto object-cover rounded-xl' />
            <div className='w-1/2 h-auto flex  items-center justify-center'>
                <SparklesCore
                    background='bg-blue-950'
                    minSize={2}
                    maxSize={3}
                    particleDensity={1000}
                    className="w-full h-full"
                    particleColor="#5B13AD"
                />
            </div>
            <RegisterFrom calssName='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />


        </div>

    )
}
