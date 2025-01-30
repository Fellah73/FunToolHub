"use client";
import ImageUploadModal from "@/components/dropImage";
import { User } from "@prisma/client";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useState } from "react";
import { GrUpdate } from "react-icons/gr";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../../../components/ui/animated-modal";

export default function ModalComponent({ user }: { user: User }) {
    const [isOpen, setIsOpen] = useState(true);
    const [isImageModalOpen, setIsImageModalOpen] = useState(false);
    const [imageModalType, setImageModalType] = useState<'profile' | 'background'>('profile');
    const [formData, setFormData] = useState({
        name: user?.name || '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profileImage: user?.profileImage || '',
        backgroundImage: user?.backgroundImage || ''
    });

    const handleImageUpload = (type: 'profile' | 'background') => {
        setImageModalType(type);
        setIsImageModalOpen(true);
    };

    const handleImageSave = (url: string) => {
        setFormData(prev => ({
            ...prev,
            [imageModalType === 'profile' ? 'profileImage' : 'backgroundImage']: url
        }));
        setIsImageModalOpen(false);
    };

    const handleSubmit = async () => {
        // Handle form submission here
        console.log('Form data:', formData);
        // Close modal after successful submission
        setIsOpen(false);
    };

    return (
        isOpen && (
            <div className="select-none">
                <Modal>
                    <ModalTrigger className="bg-pink-800 dark:bg-gray-700 dark:text-neutral-400 text-white flex justify-center group/modal-btn">
                        <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                            Update your profile
                        </span>
                        <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                            <GrUpdate />
                        </div>
                    </ModalTrigger>
                    <div>
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
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h1 className="text-2xl font-bold text-white">{user?.name}</h1>
                                            <p className="text-gray-400">{user?.email}</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Formulaire */}
                                {/* Name */}
                                    {/* Update the image sections to use the new ImageUploadModal */}
                                    <div className="flex flex-col gap-y-4 mt-2 lg:mt-4 mx-4">
                                        <div className="flex flex-col gap-y-3 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base  lg:text-lg">update Name</label>
                                            <input type="text" placeholder={user?.name} className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-[50%]" />
                                        </div>
                                        {/* Current password */}
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base  lg:text-lg">current password</label>
                                            <input type="password" placeholder="you'd to fill in this case" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-[50%]" />
                                        </div>
                                        {/* New password */}
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-3 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base lg:text-lg">update password</label>
                                            <input type="password" placeholder="update password" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-[50%]" />
                                        </div>
                                        {/* Confirm password */}
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4 md:gap-x-8 lg:gap-x-12">
                                            <label className="text-white text-base lg:text-lg">confirm password</label>
                                            <input type="password" placeholder="confirm password" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-[50%]" />
                                        </div>
                                        <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                        <div className="flex flex-col gap-y-2 items-center justify-center sm:flex-row sm:justify-between sm:gap-x-4">
                                            <label className="text-white text-base lg:text-lg">Update profile picture</label>
                                            <div className="flex items-center justify-between gap-x-6 sm:gap-x-2">
                                                <img
                                                    src={formData.profileImage || "/updateModal.webp"}
                                                    alt="profile"
                                                    className="size-24 lg:size-28 rounded-full border-4 border-pink-800"
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
                                                    src={formData.backgroundImage || "/updateModal.webp"}
                                                    alt="background"
                                                    className="size-24 lg:size-28 rounded-full border-4 border-pink-800"
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
                            <ModalFooter className="gap-4 bg-gradient-to-b from-gray-800 to-pink-800">
                                <button
                                    onClick={handleSubmit}
                                    className="bg-gray-800 text-white text-sm px-2 py-1 rounded-md border-2 border-pink-800 w-32"
                                >
                                    Save Changes
                                </button>
                            </ModalFooter>
                        </ModalBody>
                    </div>
                </Modal>

                {/* Image Upload Modal */}
            {isImageModalOpen && (    
                <ImageUploadModal
                    isOpen={isImageModalOpen}
                    onClose={() => setIsImageModalOpen(false)}
                    onSave={handleImageSave}
                    type={imageModalType}
                />
            )
            }
            </div>
        )
    );
}
