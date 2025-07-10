import React from 'react';
import { User, Mail } from 'lucide-react';
import { User as UserType, FormData, EditingState } from '../types/settings.types';
import EditableField from './EditableField';
import ProfilePhoto from './ProfilePhoto';

interface ProfileSectionProps {
    userData: UserType;
    formData: FormData;
    editing: EditingState;
    onEdit: (field: keyof EditingState) => void;
    onSave: (field: keyof Pick<FormData, 'username' | 'fullName' | 'email'>) => void;
    onCancel: (field: keyof Pick<FormData, 'username' | 'fullName' | 'email'>) => void;
    onFormChange: (field: keyof FormData, value: string) => void;
    isDarkMode: boolean;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({
    userData,
    formData,
    editing,
    onEdit,
    onSave,
    onCancel,
    onFormChange,
    isDarkMode,
}) => (
    <div className={`${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'} rounded-lg p-6 mb-6`}>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-orange-500" />
            Profile
        </h2>

        <div className="flex items-center gap-6 mb-6">
            <ProfilePhoto
                avatarUrl={userData?.avatarUrl}
            />
            <div>
                <h3 className="text-xl font-semibold">{userData.fullName}</h3>
                <p className="">@{userData.username}</p>
                <p className="text-sm">{userData.role}</p>
            </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
            <EditableField
                field="fullName"
                icon={User}
                label="Full Name"
                shouldEdit={true}
                value={formData.fullName}
                isEditing={editing.fullName}
                onEdit={() => onEdit('fullName')}
                onSave={() => onSave('fullName')}
                onCancel={() => onCancel('fullName')}
                onChange={(value: any) => onFormChange('fullName', value)}
                isDarkMode={isDarkMode}
            />
            <EditableField
                field="username"
                icon={User}
                label="Username"
                shouldEdit={true}
                value={formData.username}
                isEditing={editing.username}
                onEdit={() => onEdit('username')}
                onSave={() => onSave('username')}
                onCancel={() => onCancel('username')}
                onChange={(value: any) => onFormChange('username', value)}
                isDarkMode={isDarkMode}
            />
            <div className="md:col-span-2">
                <EditableField
                    field="email"
                    icon={Mail}
                    label="Email"
                    type="email"
                    shouldEdit={false}
                    value={formData.email}
                    isEditing={editing.email}
                    onEdit={() => onEdit('email')}
                    onSave={() => onSave('email')}
                    onCancel={() => onCancel('email')}
                    onChange={(value: any) => onFormChange('email', value)}
                    isDarkMode={isDarkMode}
                />
            </div>
        </div>
    </div>
);

export default ProfileSection;