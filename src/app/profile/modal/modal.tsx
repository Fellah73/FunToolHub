"use client";
import { useUser } from "@/app/context/userContext";
import ImageUploadModal from "@/components/dropImage";
import { useToast } from "@/components/ui/use-toast";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { User } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Edit, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { z } from 'zod';
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger
} from "../../../components/ui/animated-modal";

const updateSchema = z.object({
    name: z.string()
        .min(3, { message: 'At least 3 characters' })
        .max(20, { message: 'Max 20 characters' })
        .regex(/[A-Z]/, { message: 'At least one uppercase letter' })
        .nullable()
        .optional(),

    bio: z.string()
        .max(150, { message: 'Max 150 characters' })
        .nullable()
        .optional(),

    backgroundImage: z.string()
        .nullable()
        .optional(),

    profileImage: z.string()
        .nullable()
        .optional(),

    currentPassword: z.preprocess(
        (val) => val === "" ? undefined : val,
        z.string()
            .min(8, { message: 'At least 8 characters' })
    ),

    newPassword: z.preprocess(
        (val) => val === "" ? undefined : val,
        z.string()
            .min(8, { message: 'At least 8 characters long' })
            .regex(/[A-Z]/, { message: 'At least one uppercase letter' })
            .regex(/[0-9]/, { message: 'At least one number' })
            .regex(/[^A-Za-z0-9]/, { message: 'At least one special character' })
            .optional()
    ),

    confirmPassword: z.preprocess(
        (val) => val === "" ? undefined : val,
        z.string()
            .optional()
    )
})
    .refine((data) => {
        if (data.newPassword && !data.confirmPassword) {
            return false;
        }
        return true;
    }, {
        message: "Confirm password is required when new password is provided",
        path: ["confirmPassword"]
    })
    .refine((data) => {
        if (data.newPassword && data.confirmPassword && data.newPassword !== data.confirmPassword) {
            return false;
        }
        return true;
    }, {
        message: "Passwords don't match",
        path: ["confirmPassword"]
    });


type FormData = z.infer<typeof updateSchema>

interface showPasswordInputs {
    currentPassword: boolean,
    newPassword: boolean,
    confirmPassword: boolean
}

interface selectedImage {
    profileImage: File | null,
    backgroundImage: File | null
}

interface progressBars {
    profile: number,
    background: number
}


interface ModalComponentProps {
    user: User | null;
    setUser: (user: User) => void;
}

export default function ModalComponent({ user, setUser }: ModalComponentProps) {

    const { revalidateUser } = useUser()
    const [isOpen, setIsOpen] = useState(true);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageModalType, setImageModalType] = useState<'profile' | 'background'>('profile');
    const [selectedImage, setSelectedImage] = useState<selectedImage>({
        profileImage: null,
        backgroundImage: null
    });
    const [previewUrls, setPreviewUrls] = useState({
        profile: user?.profileImage || "/updateModal.webp",
        background: user?.backgroundImage || "/profile/defaultBackground.jpg"
    });

    const [progressBars, setProgressBars] = useState<progressBars>({
        profile: 0,
        background: 0
    });

    const [formData, setFormData] = useState<FormData>({
        name: user?.name || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profileImage: user?.profileImage || null,
        backgroundImage: user?.backgroundImage || null,
        bio: user?.bio || null

    });

    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<showPasswordInputs>({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    //reset the form data after closing the modal
    useEffect(() => {
        if (!isOpen) {
            document.body.style.overflow = "auto";
            resetFormData();
            resetPasswordEyes();
            setErrors({ ...{} });
        }
    }, [isOpen]);

    //update the preview urls
    useEffect(() => {
        if (formData.profileImage) {
            setPreviewUrls(prev => ({
                ...prev,
                profile: formData.profileImage as string
            }));
        }
        if (formData.backgroundImage) {
            setPreviewUrls(prev => ({
                ...prev,
                background: formData.backgroundImage as string
            }));
        }
    }, [formData.profileImage, formData.backgroundImage]);


    //update the progress bars for both of profile and background image
    useEffect(() => {
        if (progressBars.profile !== 0 && progressBars.background !== 0) {
            console.log('Progress bars:', progressBars)
        }
    }, [progressBars.profile, progressBars.background]);

    const { toast } = useToast();

    const { edgestore } = useEdgeStore();
    const handleImageUpload = (type: 'profile' | 'background') => {
        setImageModalType(type);
        setIsImageModalOpen(true);
    };

    const resetPasswordEyes = () => {
        setShowPassword({
            currentPassword: false,
            newPassword: false,
            confirmPassword: false
        });
    }
    const resetFormData = () => {
        setFormData(prev => ({
            ...prev,
            name: user?.name || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            profileImage: user?.profileImage || null,
            backgroundImage: user?.backgroundImage || null,
            bio: user?.bio || null
        }))

        setErrors({ ...{} });
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        {/* update the form data*/ }
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        {/*  clear all the errors if there are en error in this input*/ }
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    }

    const handleUploadImageToCloud = async (file: File, type: 'profile' | 'background') => {
        if (file) {
            try {
                const res = await edgestore.myPublicImage.upload({
                    file,
                    input: { type: "post" },
                    onProgressChange(progress) {
                        setTimeout(() => {
                            setProgressBars(prev => ({
                                ...prev,
                                [type]: progress
                            }));
                        }, 200);
                    },
                    options: {
                        replaceTargetUrl: type == 'profile' ? user?.profileImage : user?.backgroundImage
                    }
                });

                if (res) {

                    setTimeout(() => {
                        setProgressBars(prev => ({
                            ...prev,
                            [type]: 0
                        }));
                    }, 200);


                    setPreviewUrls((prev) => ({
                        ...prev,
                        [type]: res.url,
                    }));

                    return res.url;
                }
            } catch (error) {
                console.error(`Error uploading ${type} image:`, error);
                throw error;
            }
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        try {
            const validatedData = updateSchema.parse(formData);

            // Check current password
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: user?.email,
                    password: formData.currentPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                setErrors(prev => ({
                    ...prev,
                    currentPassword: [data.message]
                }));

                toast({
                    title: 'Wrong access data',
                    description: data.message,
                    variant: 'customize',
                });
                throw new Error(data.message);
            }

            // Handle image uploads and get URLs
            let profileImageUrl = formData.profileImage;
            let backgroundImageUrl = formData.backgroundImage;

            if (selectedImage.profileImage && formData.profileImage !== user?.profileImage) {
                profileImageUrl = await handleUploadImageToCloud(selectedImage.profileImage, 'profile');
            }

            if (selectedImage.backgroundImage && formData.backgroundImage !== user?.backgroundImage) {
                backgroundImageUrl = await handleUploadImageToCloud(selectedImage.backgroundImage, 'background');
            }

            // Make update request with final URLs
            const updateRes = await fetch('/api/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: user?.id,
                    email: user?.email,
                    name: formData.name,
                    password: formData.newPassword ? validatedData.newPassword : validatedData.currentPassword,
                    bio: formData.bio ? validatedData.bio : user?.bio,
                    backgroundImage: backgroundImageUrl,
                    profileImage: profileImageUrl
                }),
            });

            setFormData(prev => ({
                ...prev,
                profileImage: profileImageUrl,
                backgroundImage: backgroundImageUrl
            }))

            const updateData = await updateRes.json();

            // adding the response handling and toasts
            if (!updateRes.ok) {
                throw new Error(updateData.message);
            }

            if (!updateData.ok) {
                toast({
                    title: 'Error updating profile',
                    description: updateData.message + ` please ${validatedData.name} try again`,
                    variant: 'customize',
                })
            }

            //success toast
            toast({
                title: 'Profile updated successfully',
                description: updateData.message,
                variant: 'success',
            });

            // Close the modal
            setIsOpen(false);

            // Update the user context
            await revalidateUser()

        } catch (err) {
            if (err instanceof z.ZodError) {
                const formattedErrors: Record<string, string[]> = {};
                err.errors.forEach((error) => {
                    const field = error.path[0];
                    if (field) {
                        if (formattedErrors[field.toString()]) {
                            formattedErrors[field.toString()].push(error.message);
                        } else {
                            formattedErrors[field.toString()] = [error.message];
                        }
                    }
                });
                setErrors(formattedErrors);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="select-none z-20">
            <Modal>
                <ModalTrigger className="bg-purple-900/30 text-violet-300 flex justify-center group/modal-btn px-4 py-2 rounded-lg border border-indigo-600 hover:bg-indigo-800 transition-colors">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Update profile
                    </span>
                    <div onClick={() => setIsOpen(true)} className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-violet-300 z-20">
                        <Edit size={18} />
                    </div>
                </ModalTrigger>
                {isOpen && (
                    <form onSubmit={handleSubmit}>
                        <ModalBody className="border-2 border-indigo-800 rounded-xl">
                            <ScrollArea className="relative flex-1 overflow-auto custom-scroll-area">
                                <ModalContent className="bg-gradient-to-br from-violet-950 to-indigo-950">
                                    {/* Header Section with Background and Profile Image */}
                                    <div className="relative h-32 w-full rounded-xl bg-gray-600 non-pointer-events select-none">
                                        <img src={previewUrls.background} alt="Cover" className="w-full h-full object-cover rounded-t-xl" />
                                        <div className="absolute -bottom-4 lg:-bottom-8 left-8 transform">
                                            <div className="relative size-24 lg:size-24 bg-indigo-950 rounded-full border-2 border-indigo-600">
                                                <img
                                                    src={previewUrls.profile!}
                                                    alt="user"
                                                    className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-10 md:mt-12 px-8 gap-y-3 lg:gap-y-4">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">{user?.name}</h1>
                                                <p className="text-indigo-300 border-b-2 border-indigo-800 pb-1 inline-block">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Form Section */}
                                    <div className="flex flex-col gap-y-4 mt-2 lg:mt-4 mx-4 text-sm md:text-base lg:text-lg">
                                        {/* Name Field */}
                                        <div className="flex flex-col gap-y-3 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-indigo-200 text-base lg:text-lg">Update Name</label>
                                            <input type="text"
                                                disabled={isLoading}
                                                placeholder={user?.name || 'Enter your new name'}
                                                onChange={handleInputChange}
                                                name="name"
                                                value={formData.name || ''}
                                                className={cn("bg-indigo-900/40 text-white px-3 py-2 rounded-md border border-indigo-600 w-[75%] sm:w-[50%] focus:border-fuchsia-400 focus:outline-none",
                                                    errors.name && errors.name.length > 0 && 'border-2 border-red-400 rounded-md'
                                                )} />
                                        </div>
                                        {/* Name errors */}
                                        <div className="w-[95%] mx-auto flex items-start justify-end">
                                            <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6 items-center justify-end">
                                                {
                                                    errors.name && errors.name.map((error, index) => (
                                                        <p key={index} className="font-semibold text-red-400 text-sm md:text-base lg:text-lg">{error}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="w-[95%] mx-auto h-0.5 bg-indigo-800/50" />

                                        {/* Bio Field */}
                                        <div className="flex flex-col gap-y-3 md:gap-y-4 lg:gap-y-6">
                                            <div className="flex justify-center md:justify-start items-center">
                                                <label className="text-indigo-200 text-base lg:text-lg">Update Bio</label>
                                            </div>
                                            <textarea
                                                placeholder={user?.bio || 'Tell us about yourself'}
                                                onChange={handleInputChange}
                                                name="bio"
                                                value={formData?.bio || ''}
                                                disabled={isLoading}
                                                className={cn("bg-indigo-900/40 text-white px-3 py-2 rounded-md border border-indigo-600 w-[80%] sm:w-[70%] focus:border-fuchsia-400 focus:outline-none resize-none",
                                                    errors.bio && errors.bio.length > 0 && 'border-2 border-red-400 rounded-md'
                                                )} />
                                        </div>
                                        {/* Bio errors */}
                                        <div className="w-[95%] mx-auto flex items-start justify-end">
                                            <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6 items-center justify-end">
                                                {
                                                    errors.bio && errors.bio.map((error, index) => (
                                                        <p key={index} className="font-semibold text-red-400 text-sm md:text-base lg:text-lg">{error}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="w-[95%] mx-auto h-0.5 bg-indigo-800/50" />

                                        {/* Current Password Field */}
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-indigo-200 text-base lg:text-lg">Current Password</label>
                                            <div className="relative w-[75%] sm:w-[50%]">
                                                <input
                                                    disabled={isLoading}
                                                    type={showPassword.currentPassword ? "text" : "password"}
                                                    onChange={handleInputChange}
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    placeholder="Enter current password"
                                                    className={cn("bg-indigo-900/40 text-white px-3 py-2 rounded-md border border-indigo-600 w-full focus:border-fuchsia-400 focus:outline-none",
                                                        errors.currentPassword && errors.currentPassword.length > 0 && 'border-2 border-red-400 rounded-md'
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, currentPassword: !prev.currentPassword }))}
                                                    className="absolute inset-y-0 right-1 flex items-center text-indigo-400 hover:text-fuchsia-400 input-password-without-eye"
                                                >
                                                    {!showPassword?.currentPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                                </button>
                                            </div>
                                        </div>
                                        {/* Current password errors */}
                                        <div className="w-[95%] mx-auto flex items-start justify-end">
                                            <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6 items-center justify-end">
                                                {
                                                    errors.currentPassword && errors.currentPassword.map((error, index) => (
                                                        <p key={index} className="font-semibold text-red-400 text-sm md:text-base lg:text-lg">{error}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="w-[95%] mx-auto h-0.5 bg-indigo-800/50" />

                                        {/* New Password Field */}
                                        <div className="flex flex-col gap-y-3 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-indigo-200 text-base lg:text-lg">New Password</label>
                                            <div className="relative w-[75%] sm:w-[50%]">
                                                <input
                                                    disabled={isLoading}
                                                    type={showPassword.newPassword ? "text" : "password"}
                                                    onChange={handleInputChange}
                                                    name="newPassword"
                                                    value={formData.newPassword || ''}
                                                    placeholder="Enter new password"
                                                    className={cn("bg-indigo-900/40 text-white px-3 py-2 rounded-md border border-indigo-600 w-full focus:border-fuchsia-400 focus:outline-none",
                                                        errors.newPassword && errors.newPassword.length > 0 && 'border-2 border-red-400 rounded-md'
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, newPassword: !prev.newPassword }))}
                                                    className="absolute inset-y-0 right-1 flex items-center text-indigo-400 hover:text-fuchsia-400 input-password-without-eye"
                                                >
                                                    {!showPassword?.newPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                                </button>
                                            </div>
                                        </div>
                                        {/* New password errors */}
                                        <div className="w-[95%] mx-auto flex items-start justify-end">
                                            <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6 items-center justify-end">
                                                {
                                                    errors.newPassword && errors.newPassword.map((error, index) => (
                                                        <p key={index} className="font-semibold text-red-400 text-sm md:text-base lg:text-lg">{error}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="w-[95%] mx-auto h-0.5 bg-indigo-800/50" />

                                        {/* Confirm Password Field */}
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-indigo-200 text-base lg:text-lg">Confirm Password</label>
                                            <div className="relative w-[75%] sm:w-[50%]">
                                                <input
                                                    disabled={isLoading}
                                                    type={showPassword.confirmPassword ? "text" : "password"}
                                                    onChange={handleInputChange}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword || ''}
                                                    placeholder="Confirm new password"
                                                    className={cn("bg-indigo-900/40 text-white px-3 py-2 rounded-md border border-indigo-600 w-full focus:border-fuchsia-400 focus:outline-none",
                                                        errors.confirmPassword && errors.confirmPassword.length > 0 && 'border-2 border-red-400 rounded-md'
                                                    )}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                                    className="absolute inset-y-0 right-1 flex items-center text-indigo-400 hover:text-fuchsia-400 input-password-without-eye"
                                                >
                                                    {!showPassword?.confirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                                </button>
                                            </div>
                                        </div>
                                        {/* Confirm password errors */}
                                        <div className="w-[95%] mx-auto flex items-start justify-end">
                                            <div className="flex flex-col gap-y-2 md:gap-y-4 lg:gap-y-6 items-center justify-end">
                                                {
                                                    errors.confirmPassword && errors.confirmPassword.map((error, index) => (
                                                        <p key={index} className="font-semibold text-red-400 text-sm md:text-base lg:text-lg">{error}</p>
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="w-[95%] mx-auto h-0.5 bg-indigo-800/50" />

                                        {/* Profile Image Section */}
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4">
                                            <label className="text-indigo-200 text-base lg:text-lg">Profile Picture</label>
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex items-center justify-between gap-x-6 sm:gap-x-2">
                                                    <img
                                                        src={previewUrls.profile}
                                                        alt="profile"
                                                        className="size-24 lg:size-28 text-white text-sm font-semibold rounded-full border-2 border-indigo-600"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImageUpload('profile')}
                                                        className="bg-indigo-800 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-md border border-indigo-600 transition-colors"
                                                    >
                                                        Change Picture
                                                    </button>
                                                </div>
                                                {progressBars.profile > 0 && (
                                                    <div className="h-[6px] w-[95%] mx-auto border border-indigo-600 rounded-sm overflow-hidden">
                                                        <div className="h-full bg-fuchsia-400 transition-all ease-out"
                                                            style={{ width: `${progressBars.profile}%` }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Background Image Section */}
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4">
                                            <label className="text-indigo-200 text-base lg:text-lg">Background Picture</label>
                                            <div className="flex flex-col gap-y-2">
                                                <div className="flex items-center justify-between gap-x-6 sm:gap-x-2">
                                                    <img
                                                        src={previewUrls.background}
                                                        alt="background"
                                                        className="size-24 lg:size-28 text-white text-sm font-semibold rounded-md border-2 border-indigo-600 object-cover"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => handleImageUpload('background')}
                                                        className="bg-indigo-800 hover:bg-indigo-700 text-white text-sm font-semibold px-4 py-2 rounded-md border border-indigo-600 transition-colors"
                                                    >
                                                        Change Picture
                                                    </button>
                                                </div>
                                                {progressBars.background > 0 && (
                                                    <div className="h-[6px] w-[95%] mx-auto border border-indigo-600 rounded-sm overflow-hidden">
                                                        <div className="h-full bg-fuchsia-400 transition-all ease-out"
                                                            style={{ width: `${progressBars.background}%` }}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </ModalContent>
                            </ScrollArea>
                            <ModalFooter reset={() => { resetFormData() }}
                                className="gap-4 bg-gradient-to-br from-violet-950 to-indigo-950 border-t border-indigo-600">
                                {
                                    isLoading ? (
                                        <button
                                            type="button"
                                            disabled={isLoading}
                                            className="flex items-center justify-between bg-indigo-900 text-blue-300 text-sm px-4 py-2 rounded-md ring-1 ring-blue-300 w-32">
                                            <Loader2 className='animate-spin  size-6' />
                                            <p className="text-sm font-semibold">{" "}is Uploading</p>
                                        </button>
                                    ) : (<button
                                        type="submit"
                                        className="bg-indigo-900 text-blue-300 text-sm px-4 py-2 ring-1 ring-blue-300 rounded-md w-32"
                                    >
                                        Save Changes
                                    </button>)
                                }
                            </ModalFooter>
                        </ModalBody>
                    </form>
                )}
            </Modal>
            {/* Image Upload Modal */}
            {isImageModalOpen && (
                <ImageUploadModal
                    isOpen={isImageModalOpen}
                    onClose={() => setIsImageModalOpen(false)}
                    type={imageModalType}
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    formData={formData}
                    setFormData={setFormData}
                />
            )
            }
        </div>
    );
}


//  the width of the modal --> done
// the nullability of the new password field  --> done
//update error handling (logic and UI)
// logic handling --> done
// UI handling -->  done
// gather data --> done
// cloud storage --> done
// solve problem : previewUrl state hook duplication   --> done (that's not a problem cause we had to save the upladed image in dropImage component thne dislay it in the modal component)
// solve problem : progress bar for the background image --> done
// solve problem : submmited form when entering password before updating the image --> done
// create /upload endpoint --> done
// request and response handling  // problem in passing the file to the endpoint the passed file is empty  --> done
// update the input fields UI mzal (eyes should to be resonsive) -> done
// solve problem : progress bar not updating animation time mzal --> done
// update the toast ui --> done
// continue handling the errors --> done
//  a little animation (for buttons)  --> done
// replace a file in the cloud storage --> done
// setUser problem  probleme de typage (solved by returning the user from the backend) --> done


