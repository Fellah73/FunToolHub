'use client'
import decryptId from '@/lib/auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React, { useState, useEffect, useRef } from 'react'


export default function page() {
    const searchParams = useSearchParams()
    const [id, setId] = useState<string>('')
    const fetch = useRef<boolean | null>(false)
    useEffect(() => {
        if (fetch.current) return

        const id = decryptId(searchParams.get('id')!)
        setId(id)
        console.log('id', id)
        fetch.current = true
    }, [])

    return (
        <div className='w-full h-screen flex items-center justify-center text-white text-3xl md:text-4xl'>
            <div className='w-[90%] mx-auto flex flex-col items-center gap-y-8'>
                <p className='text-white text-3xl md:text-5xl tracking-wider'>Welcome {id}</p>
                <Link href={`/dashboard/todoList?id=${id}`}>To Do List</Link>
            </div>

        </div>
    )
}
