"use client";
import { User } from "@prisma/client";
import { GrUpdate } from "react-icons/gr";
import { useState } from "react";
import {
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalTrigger,
} from "../../../components/ui/animated-modal";

export default function ModalComponent({ user }: { user: User }) {
    const [open, setOpen] = useState(false);
    return (
        <div >
            <Modal>
                <ModalTrigger className="bg-pink-800 dark:bg-gray-700 dark:text-neutral-400 text-white flex justify-center group/modal-btn">
                    <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
                        Update your profile
                    </span>
                    <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
                        <GrUpdate />
                    </div>
                </ModalTrigger>
                <ModalBody className="border-2 border-pink-800">
                    <ModalContent className="bg-gray-800 dark:bg-neutral-900">
                        <h4 className="text-lg md:text-2xl text-neutral-400 dark:text-neutral-100 font-bold text-center mb-8">
                            update your profile Now {user?.name.toLocaleLowerCase()}
                        </h4>

                    </ModalContent>
                    <ModalFooter className="gap-4 bg-gradient-to-b from-gray-800 to-pink-800">
                        <button className="px-2 py-1 bg-pink-800 text-white border-gray-800 border-2 rounded-md text-sm w-28"
                        onClick={() => setOpen(false)}>
                            Cancel
                        </button>
                        <button className="bg-gray-800 text-white  text-sm px-2 py-1 rounded-md border-2 border-pink-800 w-28">
                            Confirm
                        </button>
                    </ModalFooter>
                </ModalBody>
            </Modal>
        </div>
    );
}

