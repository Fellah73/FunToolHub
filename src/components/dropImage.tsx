'use client'
import { X } from "lucide-react";
import { useState } from "react";

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'profile' | 'background';
    selectedImage: {
        profileImage: File | null;
        backgroundImage: File | null;
    }
    setSelectedImage: React.Dispatch<React.SetStateAction<{
        profileImage: File | null;
        backgroundImage: File | null;
    }>>;
    formData: {
        name?: string | null;
        bio?: string | null;
        backgroundImage?: string | null;
        profileImage?: string | null;
        currentPassword: string;
        newPassword?: string | undefined;
        confirmPassword?: string | undefined;
    };
    setFormData: React.Dispatch<React.SetStateAction<{
        name?: string | null;
        bio?: string | null;
        backgroundImage?: string | null;
        profileImage?: string | null;
        currentPassword: string;
        newPassword?: string | undefined;
        confirmPassword?: string | undefined;
    }>>;


}

const ImageUploadModal = ({ isOpen, onClose, type, selectedImage, setSelectedImage, setFormData }: ImageUploadModalProps) => {

    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const validateFile = (file: File): boolean => {
        const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5MB

        if (!validTypes.includes(file.type)) {
            setError('Please upload JPG, PNG, or WebP images only');
            return false;
        }

        if (file.size > maxSize) {
            setError('File size must be less than 5MB');
            return false;
        }

        return true;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && validateFile(file)) {
            setSelectedImage((prev) => {
                return { ...prev, [`${type}Image`]: file };
            });
            setPreviewUrl(URL.createObjectURL(file));
            setError(null);
        }
    };

    const handleSave = async () => {
        if (selectedImage) {
            setFormData((prev) => {
                return { ...prev, [`${type}Image`]: URL.createObjectURL(selectedImage[`${type}Image`]!) };
            });
            onClose();

        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-gradient-to-br from-violet-950 to-indigo-950 border-2 border-blue-300 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white">Upload {type} Image</h2>
                    <button onClick={onClose} className="text-blue-300 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="relative h-64 border-2 border-dashed border-blue-300 rounded-lg mb-4">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-blue-300">
                            <p>Drag and drop or click to select</p>
                            <p className="text-sm">JPG, PNG, or WebP (max 5MB)</p>
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                </div>

                {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 border border-white text-white bg-fuchsia-600 rounded-md hover:bg-fuchsia-700 hover:scale-110 transition-colors duration-300"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={!selectedImage}
                        className="px-4 py-2 text-blue-50 bg-indigo-900 rounded-md hover:bg-indigo-700 transition-all duration-300 hover:scale-110 border border-blue-300 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ImageUploadModal;