'use client'

import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { TypewriterEffect } from '@/components/ui/typewriter-effect';
import LoginForm from './LoginForm';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function page() {
    const fetch = useRef<boolean | null>(false)
    const router = useRouter()
    useEffect(() => {
        if (fetch.current) return
        const connectionStaus = localStorage.getItem('connectionStatus')
        if ((connectionStaus?.startsWith('c') && connectionStaus.endsWith('c'))) {
            const extractedUserId = (userId: string) => {
                return userId?.substring(1, userId?.length - 1)
            }
            const userId = extractedUserId(connectionStaus)
            router.push(`/profile?id=${userId}`)
        }
        fetch.current = true
    }, [])
    const title = [
        {
            text: 'Do ',
            className: 'text-rose-950'
        },
        {
            text: 'you ',
            className: 'text-rose-900'


        },
        {
            text: 'have ',
            className: 'text-rose-800'

        }, {
            text: 'an ',
            className: 'text-rose-700'
        },
        {
            text: 'account ',
            className: 'text-rose-600'
        },
        {
            text: 'log ',
            className: 'text-rose-500'
        },
        {
            text: 'in ',
            className: 'text-rose-600'
        },
        {
            text: 'and ',
            className: 'text-rose-700'
        },
        {
            text: 'enjoy ',
            className: 'text-rose-800'
        },
        {
            text: 'surfing ',
            className: 'text-rose-900'
        },
        {
            text: 'in',
            className: 'text-rose-950'
        },
        {
            text: 'my',
            className: 'text-rose-950'
        },
        {
            text: 'website',
            className: 'text-rose-950'
        }
    ]
    const image = [
        {
            src: '/loginImage.webp',
            title: 'Web dev'
        },
        {
            src: '/loginImage2.webp',
            title: 'Web dev'
        }
    ]
    return (
        <BackgroundGradientAnimation
            className='w-full flex flex-col items-center justify-center px-24 md:px-32 py-16 md:py-20 gap-y-2 sm:gap-y-6 '
            gradientBackgroundStart={'rgb(27, 43, 166)'}
            gradientBackgroundEnd='rgb(55, 32, 105)'
            firstColor='58, 20, 184'
            secondColor='29, 9, 71'
            thirdColor='29, 9, 71'
            fourthColor='29, 9, 71'
            fifthColor='58, 20, 184'>

            <div className='w-full flex justify-center px-3 md:px-5'>
                <TypewriterEffect words={title} />
            </div>
            <div className='grid grid-cols-1 lg:grid-cols-3 mx-auto gap-x-2 lg:gap-x-4 w-full-white'>
                <div className='hidden lg:block lg:col-span-2'>
                    <img src="/Login.jpg" alt="image" className='size-full object-cover border-2 border-primary rounded-xl hover:opacity-90 select-none' />
                </div>
                <div className='col-span-2 lg:col-span-1 w-full flex justify-center items-center px-3 md:px-5 '>
                    <LoginForm  className='dark:text-white'/>
                </div>
            </div>

        </BackgroundGradientAnimation>

    )

}
