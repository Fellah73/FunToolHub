'use client'

import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { z } from 'zod'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../../components/ui/card'
import { ArrowRight, User, Mail, Lock, Loader2 } from 'lucide-react'

const registerSchema = z.object({
    name: z.string()
        .min(3, { message: 'Name must be at least 3 characters long' })
        .max(20, { message: 'Name must be at most 20 characters long' })
        .regex(/^[A-Za-z\s]+$/, { message: 'Name must contain only letters and spaces' }) // Modified regex for name
        .regex(/[A-Z]/, { message: 'Name must contain at least one uppercase letter' }),
    email: z.string().email("Invalid email address")
        .endsWith("@gmail.com", 'only gmail accounts are allowed'),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
        .regex(/[0-9]/, { message: 'Password must contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'Password must contain at least one special character' }), // Corrected regex for special characters
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"]
})

type FormData = z.infer<typeof registerSchema>

export default function RegisterForm({
    className,
    onLoginClick
}: {
    className: string,
    onLoginClick?: () => void
}) {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const { toast } = useToast()

    // Animation variants
    const formVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // clear errors when typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setIsLoading(true)

        try {
            // Validate form data
            const validatedData = registerSchema.parse(formData)

            toast({
                title: 'Thank you for registering',
                description: 'Processing your information...',
                variant: 'customize',
            })

            // Fetch logic for registration
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
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
                    title: 'User already exists',
                    description: data.message,
                    variant: 'customize'
                })
            } else {
                toast({
                    title: 'User created successfully',
                    description: data.message,
                    variant: 'success'
                })

                window.location.href = (`/profile`)
            }

        } catch (err) {
            // Handle schema validation errors
            if (err instanceof z.ZodError) {
                const formattedErrors: Record<string, string> = {};

                err.errors.forEach((error) => {
                    const field = error.path[0];
                    if (field) {
                        if (formattedErrors[field.toString()]) {
                            formattedErrors[field.toString()] += `, ${error.message}`;
                        } else {
                            formattedErrors[field.toString()] = error.message;
                        }
                    }
                });

                setErrors(formattedErrors)
            } else {
                toast({
                    title: 'Error from the server',
                    description: err instanceof Error ? err.message : 'Something went wrong',
                    variant: 'destructive'
                })
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div
            initial="hidden"
            animate="visible"
            variants={formVariants}
        >
            <Card className={cn(
                'w-full backdrop-blur-sm border-2 rounded-xl overflow-hidden',
                'shadow-xl shadow-indigo-900/30',
                'bg-gradient-to-br from-indigo-950/90 via-violet-950/90 to-purple-950/90',
                'border-indigo-700/50',
                className
            )}>
                <CardHeader className="space-y-1 pb-2">
                    <motion.div variants={itemVariants}>
                        <CardTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 to-indigo-300">
                            Create Account
                        </CardTitle>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <CardDescription className="text-violet-200">
                        Enter your credentials to access your account
                        </CardDescription>
                    </motion.div>
                </CardHeader>

                <CardContent>
                    <motion.form
                        onSubmit={handleRegister}
                        className="space-y-4"
                        variants={formVariants}
                    >
                        {/* Name input */}
                        <motion.div className="space-y-2" variants={itemVariants}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <User size={18} className="text-indigo-400" />
                                </div>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className={cn(
                                        'w-full py-3 pl-10 pr-3 rounded-lg',
                                        'bg-indigo-900/30 border border-indigo-700/50',
                                        'text-white placeholder:text-indigo-300/50',
                                        'focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 outline-none',
                                        'transition-all duration-200',
                                        errors.name && 'border-rose-500 focus:ring-rose-500/50 focus:border-rose-500/50'
                                    )}
                                />
                            </div>
                            {errors.name && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-rose-400 pl-2"
                                >
                                    {errors.name}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Email input */}
                        <motion.div className="space-y-2" variants={itemVariants}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Mail size={18} className="text-indigo-400" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="your.email@gmail.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className={cn(
                                        'w-full py-3 pl-10 pr-3 rounded-lg',
                                        'bg-indigo-900/30 border border-indigo-700/50',
                                        'text-white placeholder:text-indigo-300/50',
                                        'focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 outline-none',
                                        'transition-all duration-200',
                                        errors.email && 'border-rose-500 focus:ring-rose-500/50 focus:border-rose-500/50'
                                    )}
                                />
                            </div>
                            {errors.email && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-rose-400 pl-2"
                                >
                                    {errors.email}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Password input */}
                        <motion.div className="space-y-2" variants={itemVariants}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock size={18} className="text-indigo-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className={cn(
                                        'w-full py-3 pl-10 pr-12 rounded-lg',
                                        'bg-indigo-900/30 border border-indigo-700/50',
                                        'text-white placeholder:text-indigo-300/50',
                                        'focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 outline-none',
                                        'transition-all duration-200',
                                        errors.password && 'border-rose-500 focus:ring-rose-500/50 focus:border-rose-500/50'
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-400 hover:text-indigo-200"
                                >
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.password && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-rose-400 pl-2"
                                >
                                    {errors.password}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Confirm Password input */}
                        <motion.div className="space-y-2" variants={itemVariants}>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <Lock size={18} className="text-indigo-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    placeholder="Confirm Password"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    disabled={isLoading}
                                    className={cn(
                                        'w-full py-3 pl-10 pr-12 rounded-lg',
                                        'bg-indigo-900/30 border border-indigo-700/50',
                                        'text-white placeholder:text-indigo-300/50',
                                        'focus:ring-2 focus:ring-fuchsia-500/50 focus:border-fuchsia-500/50 outline-none',
                                        'transition-all duration-200',
                                        errors.confirmPassword && 'border-rose-500 focus:ring-rose-500/50 focus:border-rose-500/50'
                                    )}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-400 hover:text-indigo-200"
                                >
                                    {showConfirmPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-sm text-rose-400 pl-2"
                                >
                                    {errors.confirmPassword}
                                </motion.p>
                            )}
                        </motion.div>

                        {/* Submit button */}
                        <motion.div variants={itemVariants}>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    'w-full py-3 rounded-lg flex items-center justify-center gap-2',
                                    'bg-gradient-to-r from-fuchsia-700 to-indigo-700',
                                    'hover:from-fuchsia-600 hover:to-indigo-600',
                                    'text-white font-medium text-lg',
                                    'transition-all duration-300 transform hover:scale-[1.02]',
                                    'focus:ring-2 focus:ring-fuchsia-500/50',
                                    'disabled:opacity-70 disabled:cursor-not-allowed'
                                )}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" />
                                        <span>Registering...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Register</span>
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </Button>
                        </motion.div>
                    </motion.form>
                </CardContent>

                <CardFooter className="flex flex-col gap-4 pt-2">
                    <motion.div
                        variants={itemVariants}
                        className="w-full flex justify-center items-center gap-2"
                    >
                        <span className="h-px w-full bg-gradient-to-r from-transparent via-indigo-700/50 to-transparent"></span>
                        <span className="text-violet-300 text-sm font-medium px-2">OR</span>
                        <span className="h-px w-full bg-gradient-to-r from-transparent via-indigo-700/50 to-transparent"></span>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="w-full flex flex-col sm:flex-row items-center justify-center gap-3"
                    >
                        <p className="text-violet-200">Already have an account?</p>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Button
                                onClick={onLoginClick}
                                className={cn(
                                    'py-2 px-5 rounded-lg',
                                    'bg-indigo-800/50 border border-indigo-600/50',
                                    'text-white font-medium',
                                    'transition-all duration-200 hover:bg-indigo-700/50'
                                )}
                            >
                                Login
                            </Button>
                        </motion.div>
                    </motion.div>
                </CardFooter>
            </Card>
        </motion.div>
    )
}