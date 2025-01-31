"use client";
import ImageUploadModal from "@/components/dropImage";
import { User } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger
} from "../../../components/ui/animated-modal";
import { set, z } from 'zod';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";



const updateSchema = z.object({
    name: z.string()
        .min(3, { message: 'at least 3 characters' })
        .max(20, { message: 'max 20 characters' })
        .regex(/[A-Z]/, { message: 'contain at least one uppercase letter' })
        .nullable(), // ✅ Permettre que le nom soit null

    bio: z.string()
        .max(150, { message: 'max 150 characters' })
        .nullable(), // ✅ Peut être null

    backgroundImage: z.string().nullable(),
    profileImage: z.string().nullable(),

    currentPassword: z.string()
        .min(8, { message: 'at least 8 caracters' }),
    // ✅ Correction du regex

    newPassword: z.string()
        .min(8, { message: 'at least 8 characters long' })
        .regex(/[A-Z]/, { message: 'contain at least one uppercase letter' })
        .regex(/[0-9]/, { message: 'contain at least one number' })
        .regex(/[^A-Za-z0-9]/, { message: 'contain at least one special character' })
        .nullable(), // ✅ Peut être non rempli

    confirmPassword: z.string().nullable() // ✅ Peut être vide sauf si newPassword est rempli
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

export default function ModalComponent({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageModalType, setImageModalType] = useState<'profile' | 'background'>('profile');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewUrls, setPreviewUrls] = useState({
        profile: user?.profileImage || "/updateModal.webp",
        background: user?.backgroundImage || "/updateModal.webp"
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

    const [errors, setErrors] = useState<Record<string, string>>({});

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<showPasswordInputs>({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
    });

    useEffect(() => {
        console.log('Form data:', formData);
    }, [formData]);

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

    useEffect(() => {
        if (!isOpen) {
            resetFormData();
            resetPasswordEyes();
        }
    }, [isOpen]);

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
        setFormData({
            name: user?.name || '',
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            profileImage: user?.profileImage || null,
            backgroundImage: user?.backgroundImage || null,
            bio: user?.bio || null
        });
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
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);
        // Handle form submission here
        try {
            // request to backend
            const validatedData = updateSchema.parse(formData);

            console.log('Validated data:', validatedData);

        } catch (err) {
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

        }
        finally {
            setIsLoading(false);
        }
        // Close modal after successful submission
        // setIsOpen(false);
    };

    return (

        <div className="select-none">
            <Modal>
                <ModalTrigger className="bg-pink-800 dark:bg-gray-700 dark:text-neutral-400 text-white flex justify-center group/modal-btn">

                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Update your profile
                    </span>
                    <div onClick={() => setIsOpen(true)} className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        <GrUpdate />
                    </div>
                </ModalTrigger>
                {isOpen && (
                    <form onSubmit={handleSubmit}>
                        <ModalBody className="border-2 border-pink-800">

                            <ScrollArea className="relative flex-1 overflow-auto custom-scroll-area">
                                <ModalContent className="bg-gradient-to-br from-gray-800 to-gray-900">
                                    {/* Rest of your existing modal content structure */}
                                    <div className="relative h-32 w-full rounded-xl bg-gray-600 non-pointer-events select-none">
                                        {/* Photo ronde (avatar) */}
                                        <div className="absolute -bottom-4 lg:-bottom-8 left-8 transform">
                                            <div className="relative size-24 lg:size-24  bg-gray-700 rounded-full border-2 border-pink-800">
                                                <img
                                                    src={user?.profileImage}
                                                    alt="user"
                                                    className="w-full h-full object-cover rounded-full pointer-events-none select-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className=" mt-10 md:mt-12 px-8 gap-y-3 lg:gap-y-4">
                                        <div className="flex justify-between items-start mb-4 ">
                                            <div>
                                                <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                                                <p className="text-gray-400 border-b-2 border-pink-800 pb-1 inline-block">
                                                    {user?.email}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Formulaire */}
                                    {/* Name */}
                                    {/* Update the image sections to use the new ImageUploadModal */}
                                    <div className="flex flex-col gap-y-4 mt-2 lg:mt-4 mx-4 text-sm md:text-base lg:text-lg">
                                        {/* Name */}
                                        <div className="flex flex-col gap-y-3 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base  lg:text-lg">update Name</label>
                                            <input type="text"
                                                disabled={isLoading}
                                                placeholder={user?.name || 'fill in your new name'}
                                                onChange={handleInputChange}
                                                name="name"
                                                value={formData.name || ''}
                                                className="bg-gray-800 text-white  px-3 py-2 rounded-md border-2 border-pink-800 w-[50%]" />
                                            {errors.name && <p className="text-white">{errors.name}</p>}
                                        </div>
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        {/* bio */}
                                        <div className="flex flex-col gap-y-3 md:gap-y-4 lg:gap-y-6 ">
                                            <div className="flex justify-center md:justify-start items-center ">
                                                <label className="text-white text-base lg:text-lg">update bio</label>
                                            </div>
                                            <textarea
                                                placeholder={user?.bio || 'fill in your new bio'}
                                                onChange={handleInputChange}
                                                name="bio"
                                                value={formData?.bio || ''}
                                                disabled={isLoading}
                                                className="bg-gray-800 text-white px-3 py-2 rounded-md border-2 border-pink-800 w-[95%]"
                                            />
                                            {errors.bio && <p className="text-white">{errors.bio}</p>}
                                        </div>
                                        {/* Current password */}
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base  lg:text-lg">current password</label>
                                            <div className="relative w-[50%]">
                                                <input
                                                    disabled={isLoading}
                                                    type={showPassword.currentPassword ? "text" : "password"}
                                                    onChange={handleInputChange}
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    placeholder="current password"
                                                    className="bg-gray-800 text-white px-3 py-2 rounded-md border-2 border-pink-800 w-full pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, currentPassword: !prev.currentPassword }))}
                                                    className="absolute inset-y-0 right-3 flex items-center text-pink-600 hover:text-pink-400 input-password-without-eye"
                                                >
                                                    {!showPassword?.currentPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                                </button>
                                                {errors.currentPassword && <p className="text-white text-sm">{errors.currentPassword}</p>}
                                            </div>
                                        </div>
                                        {/* New password */}
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-3 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base lg:text-lg">update password</label>
                                            <div className="relative w-[50%]">
                                                <input
                                                    disabled={isLoading}
                                                    type={showPassword.newPassword ? "text" : "password"}
                                                    onChange={handleInputChange}
                                                    name="newPassword"
                                                    value={formData.newPassword || ''}
                                                    placeholder="update password"
                                                    className="bg-gray-800 text-white px-3 py-2 rounded-md border-2 border-pink-800 w-full pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, newPassword: !prev.newPassword }))}
                                                    className="absolute inset-y-0 right-3 flex items-center text-pink-600 hover:text-pink-400 input-password-without-eye"
                                                >
                                                    {!showPassword?.newPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                                </button>
                                                {errors.newPassword && <p className="text-white text-sm">{errors.newPassword}</p>}
                                            </div>
                                        </div>
                                        {/* Confirm password */}
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base lg:text-lg">confirm password</label>
                                            <div className="relative w-[50%]">
                                                <input
                                                    disabled={isLoading}
                                                    type={showPassword.confirmPassword ? "text" : "password"}
                                                    onChange={handleInputChange}
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword || ''}
                                                    placeholder="Confirm password"
                                                    className="bg-gray-800 text-white px-3 py-2 rounded-md border-2 border-pink-800 w-full pr-10"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword((prev) => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                                                    className="absolute inset-y-0 right-3 flex items-center text-pink-600 hover:text-pink-400 input-password-without-eye"
                                                >
                                                    {!showPassword?.confirmPassword ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
                                                </button>
                                                {errors.confirmPassword && <p className="text-white text-sm">{errors.confirmPassword}</p>}
                                            </div>
                                        </div>
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4">
                                            <label className="text-white text-base lg:text-lg">Update profile picture</label>
                                            <div className="flex items-center justify-between gap-x-6 sm:gap-x-2">
                                                <img
                                                    src={previewUrls.profile}
                                                    alt="profile"
                                                    className="size-24 lg:size-28 text-white text-sm font-semibold rounded-full border-4 border-pink-800"
                                                />
                                                <button
                                                    onClick={() => handleImageUpload('profile')}
                                                    className="bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-4 py-2 rounded-md border-2 border-pink-800"
                                                >
                                                    Change Picture
                                                </button>
                                            </div>
                                        </div>
                                        {/* Background Image Section */}
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4">
                                            <label className="text-white text-base lg:text-lg">Update background picture</label>
                                            <div className="flex items-center justify-between gap-x-6 sm:gap-x-2">
                                                <img
                                                    src={previewUrls.background}
                                                    alt="profile"
                                                    className="size-24 lg:size-28 text-white text-sm font-semibold rounded-full border-4 border-pink-800"
                                                />
                                                <button
                                                    onClick={() => handleImageUpload('background')}
                                                    className="bg-pink-700 hover:bg-pink-800 text-white text-sm font-semibold px-4 py-2 rounded-md border-2 border-pink-800"
                                                >
                                                    Change Picture
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </ModalContent>
                            </ScrollArea>
                            <ModalFooter reset={()=>{resetFormData()}} className="gap-4 bg-gradient-to-b from-gray-800 to-pink-800">
                                <button
                                    type="submit"
                                    className="bg-gray-800 text-white text-sm px-2 py-1 rounded-md border-2 border-pink-800 w-32"
                                >
                                    Save Changes
                                </button>
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
