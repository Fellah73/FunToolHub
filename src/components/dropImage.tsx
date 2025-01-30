'use client'
import { X } from "lucide-react";
import { useState } from "react";

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (url: string) => void;
    type: 'profile' | 'background';
}

const ImageUploadModal = ({ isOpen, onClose, onSave, type }: ImageUploadModalProps) => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
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
            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError(null);
        }
    };

    const handleSave = async () => {
        if (selectedImage) {
            // Here you would typically upload the image to your server
            // and get back a URL. This is a mock implementation
            const mockUrl = `/uploads/${type}/${Date.now()}-${selectedImage.name}`;
            onSave(mockUrl);
            onClose();
            console.log('Image uploaded:', mockUrl);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md bg-gray-800 border-2 border-pink-800 rounded-lg p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-white">Upload {type} Image</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <div className="relative h-64 border-2 border-dashed border-pink-800 rounded-lg mb-4">
                    {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400">
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
                        className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        disabled={!selectedImage}
                        className="px-4 py-2 text-white bg-pink-700 rounded-md hover:bg-pink-600 disabled:bg-gray-600 disabled:cursor-not-allowed"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ImageUploadModal;