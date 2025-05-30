import React, { useRef } from 'react';
import { Camera } from 'lucide-react';

interface ProfilePhotoProps {
    avatarUrl: string | any;
    onPhotoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfilePhoto: React.FC<ProfilePhotoProps> = ({ avatarUrl, onPhotoUpload }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="relative">
            <img
                src={avatarUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-orange-500"
            />
            <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute -bottom-2 -right-2 bg-orange-500 hover:bg-orange-600 p-2 rounded-full transition-colors"
            >
                <Camera className="w-4 h-4 text-white" />
            </button>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={onPhotoUpload}
                className="hidden"
            />
        </div>
    );
};

export default ProfilePhoto;