import React, { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { useUpdateAvatar } from "../hooks/useUpdateAvatar";

interface ProfilePhotoProps {
    avatarUrl: string | any;
    onAvatarChange?: (url: string) => void; // optional callback
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({
    avatarUrl,
    onAvatarChange,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [previewUrl, setPreviewUrl] = useState(avatarUrl);
    const { updateAvatar, loading } = useUpdateAvatar();

    const handlePhotoUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        try {
            const tempPreview = URL.createObjectURL(file);
            setPreviewUrl(tempPreview); // Optimistic preview

            const uploadedUrl = await updateAvatar(file);
            setPreviewUrl(uploadedUrl);
            onAvatarChange?.(uploadedUrl); // Callback if needed
        } catch (err) {
            // Toast/error UI can be handled here
            console.error(err);
        }
    };

    return (
        <div className="relative">
            <img
                src={previewUrl}
                alt="Profile"
                className={`w-24 h-24 rounded-full object-cover border-2 ${loading ? "border-gray-300 animate-pulse" : "border-orange-500"
                    }`}
            />
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-colors"
                disabled={loading}
            >
                <Camera className="w-4 h-4 text-white" />
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
            />
        </div>
    );
};

export default ProfilePhoto;
