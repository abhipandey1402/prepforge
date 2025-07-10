export interface EditingState {
    username: boolean;
    fullName: boolean;
    email: boolean;
}

export interface ShowPasswordsState {
    current: boolean;
    new: boolean;
    confirm: boolean;
}

export interface FormData {
    username: string;
    fullName: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface Notification {
    id: number;
    message: string;
    type: 'info' | 'success' | 'error';
}

export interface NotificationToastProps {
    notification: Notification;
}

export interface EditableFieldProps {
    field: keyof Pick<FormData, 'username' | 'fullName' | 'email'>;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    type?: string;
    shouldEdit: boolean;
    value: string;
    isEditing: boolean;
    onEdit: () => void;
    onSave: () => void;
    onCancel: () => void;
    onChange: (value: string) => void;
    isDarkMode: boolean;
}

export interface User {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    role: string;
    completedSessions: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    refreshToken?: string;
    leetcodeSessionToken: string;
    leetcodeSubmissions?: string[];
    avatarUrl?: string;
}