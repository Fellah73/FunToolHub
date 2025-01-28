"use client";
import { User } from "@prisma/client";
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
    return (

        isOpen &&
        <div className="select-none">

            <Modal >
                <ModalTrigger className="bg-pink-800 dark:bg-gray-700 dark:text-neutral-400 text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Update your profile
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        <GrUpdate />
                    </div>
                </ModalTrigger>
                <div className="">
                    <ModalBody className="border-2 border-pink-800 ">
                        <ModalContent className="bg-gradient-to-br from-gray-800 to-gray-900 dark:bg-neutral-900">
                            <div className="relative h-32 w-full rounded-xl bg-gray-600 non-pointer-events select-none">
                                {/* Photo ronde (avatar) */}
                                <div className="absolute -bottom-4 lg:-bottom-8 left-8 transform">
                                    <div className="relative size-24 lg:size-24  bg-gray-700 rounded-full border-2 border-pink-800">
                                        <img
                                            src="/user.jpg"
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
                            <div className="flex flex-col gap-y-4 mt-2 lg:mt-4 mx-4">
                                <div className="flex justify-between gap-x-4 md:gap-x-8 lg:gap-x-12">
                                    <label className="text-white text-base  lg:text-lg">Name</label>
                                    <input type="text" placeholder="Enter your name" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-44" />
                                </div>
                                <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                <div className="flex justify-between gap-x-4 md:gap-x-8 lg:gap-x-12">
                                    <label className="text-white text-base  lg:text-lg">current password</label>
                                    <input type="password" placeholder="current password" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-44" />
                                </div>
                                <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                <div className="flex justify-between gap-x-4 md:gap-x-8 lg:gap-x-12">
                                    <label className="text-white text-base lg:text-lg">new password</label>
                                    <input type="password" placeholder="new password" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-44" />
                                </div>
                                <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                                <div className="flex justify-between gap-x-4 md:gap-x-8 lg:gap-x-12">
                                    <label className="text-white text-base lg:text-lg">confirm password</label>
                                    <input type="password" placeholder="confirm password" className="bg-gray-800 text-white text-sm px-3 py-2 rounded-md border-2 border-pink-800 w-44" />
                                </div>
                                <div className="w-[95%] mx-auto h-0.5 bg-pink-800" />
                            </div>
                        </ModalContent>
                        <ModalFooter className="gap-4 bg-gradient-to-b from-gray-800 to-pink-800">
                            <button className="bg-gray-800 text-white  text-sm px-2 py-1 rounded-md border-2 border-pink-800 w-32">
                                Save Changes
                            </button>
                        </ModalFooter>
                    </ModalBody>
                </div>
            </Modal>
        </div>
    );
}

