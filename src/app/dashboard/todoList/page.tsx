'use client'
import decryptId from '@/lib/auth'
import { User } from '@prisma/client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export default function page() {


    const searchParams = useSearchParams()

    const ref = useRef<boolean>(false)
    const [user, setUser] = useState<null | User>(null)
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        if (ref.current) return
        const id = decryptId(searchParams.get('id')!)
        const getData = async () => {
            if (!id) {
                setError('No ID provided')
                return
            }

            try {
                setIsLoading(true)
                const res = await fetch(`/api/user?id=${id}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                })

                const data = await res.json()

                if (!res.ok) {
                    throw new Error(data.message || 'Failed to fetch user')
                }

                console.log('data :', data)

                if(data.message != 'User fetched successfully'){
                    throw new Error(data.message || 'Failed to fetch user')
                }
        
                setUser(data.user)


            } catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred')
                console.error(err)
            } finally {
                setIsLoading(false)
                ref.current = true
            }
        }

        getData()
        ref.current = true
    }, [])

    return (
        <div>
            {isLoading && <p className='text-white '>Loading...</p>}
            {error && <p className='text-white'>Error: {error}</p>}
            <p className='text-white'>{user?.name}</p>
        </div>
    )
}