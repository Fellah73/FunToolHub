'use client'

import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { z } from 'zod'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'

const registerSchema = z.object({

    email: z.string().email("Invalid email address")
        .endsWith("@gmail.com", 'only gmail accounts are allowed'),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })

        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' },)
        .regex(/[0-9]/, { message: 'Password must contain at least one number' },)
        .regex(/[[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' },)
})

type FormData = z.infer<typeof registerSchema>
export default function LoginForm({
    className
}: {
    className: string,
}
) {

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)


    {/* to display the erros of each inout by himself*/ }
    const [errors, setErrors] = useState<Record<string, string>>({})
    {/* pour interagire avec les différentes inputs*/ }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        {/* clear all the errors*/ }
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    const router = useRouter()
    const { toast } = useToast()



    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setIsLoading(true)
        try {

            const validatedData = registerSchema.parse(formData)
            toast({
                title: 'thank you for loginig',
                description: 'data gathred succesfully',
                variant: 'customize',
            })


            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                }),
            })


            const data = await res.json()
            if (!res.ok) {
                throw new Error(data.message)
            }

            if (!data.success) {
                toast({
                    title: 'user already exists',
                    description: data.message,
                    variant: 'customize'
                })

            } else {
                toast({
                    title: 'login in succesfully',
                    description: data.message
                })

                localStorage.setItem('connectionStatus',  `c${data.userWithouPass.id}c`)

                window.location.href = (`/redirect`)
            }



        } catch (err) {
            {/* si l'errrur viend de z => pour format des donneé pass au formulaire */ }
            if (err instanceof z.ZodError) {
                // Créez un objet pour stocker les messages d'erreur par champ
                const formattedErrors: Record<string, string> = {};

                err.errors.forEach((error) => {
                    const field = error.path[0]; // Le nom du champ (ex: 'name')
                    {/* cas ou un champ a plus d'une erreur par exemple le password ne conteint pas 8 char et pas de Maj et pas de Number */ }
                    if (field) {
                        // Si ce champ a déjà une erreur, on concatène les messages
                        if (formattedErrors[field.toString()]) {
                            formattedErrors[field.toString()] += `, ${error.message}`;
                        } else {
                            // Sinon on crée une nouvelle entrée
                            formattedErrors[field.toString()] = error.message;
                        }
                    }
                });
                setErrors(formattedErrors)
                console.log(err)
            }
            else {

                toast({
                    title: 'error from the server',
                    description: err instanceof Error ? err.message : 'Something went wrong',
                    variant: 'destructive'
                })
                console.log(err)

            }

        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className={cn('w-[350px] md:w-[400px] py-4 px-3 z-30 rounded-sm border-primary border-2 shadow-lg bg-gradient-to-br from-blue-950 to-sky-700 shadow-primary/50', className)}>
            <CardHeader>
                <CardTitle className='text-primary text-xl md:text-2xl'>Login</CardTitle>
                <CardDescription className='text-white text-base md:text-lg'>Login your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form className='flex flex-col text-white gap-y-4 px-5'
                    onSubmit={handleRegister}>


                    <div className='felx flex-col gap-y-3 md:gap-y-5'>
                        <input type="text" placeholder='Enter your gmail' name='email' value={formData.email} onChange={handleInputChange} disabled={isLoading}
                            className={cn('w-full px-4 py-2 rounded-md border border-primary shadow-sm shadow-primary/50 bg-blue-950',
                                errors.email && 'border-red-700 border'
                            )} />
                        {errors.email && (<p className='mx-5 text-base md:text-lg bg-gradient-to-l from-fuchsia-950 to-rose-600 bg-clip-text text-transparent'> {errors.email} </p>)}
                    </div>
                    <div className='felx flex-col gap-y-3 md:gap-y-5'>
                        <input type="text" placeholder='Enter your password' name='password' value={formData.password} onChange={handleInputChange} disabled={isLoading}
                            className={cn('w-full px-4 py-2 rounded-md border border-primary shadow-sm shadow-primary/50 bg-blue-950',
                                errors.password && 'border-red-700 border'
                            )} />
                        {errors.password && (<p className='mx-5 text-base md:text-lg bg-gradient-to-l from-fuchsia-950 to-rose-600 bg-clip-text text-transparent'> {errors.password} </p>)}
                    </div>


                    <Button variant='default' type='submit' className='w-full flex items-center gap-x-5 text-lg'>
                        login <FaArrowRight size={20} className='ml-2 text-secondary' /> </Button>
                </form>
            </CardContent>
            <CardFooter className='flex justify-center gap-x-3'>
                <p className='text-white'>Don't have an account ? Sign in</p>
                <Link href={'/login'} className='border border-primary bg-blue-900 text-white text-base px-3 py-2 rounded-lg'> register</Link>
            </CardFooter>
        </Card>
    )
}

{/* i need other test and the JWT config*/ }