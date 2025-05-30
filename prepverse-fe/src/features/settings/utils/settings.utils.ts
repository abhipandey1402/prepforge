import { Notification } from '../types/settings.types';

export const formatDate = (dateStr: string | undefined): string => {
    if (!dateStr) return '';

    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
        return 'Password must be at least 8 characters long!';
    }
    return null;
};

export const validatePasswordMatch = (password: string, confirmPassword: string): string | null => {
    if (password !== confirmPassword) {
        return 'New passwords do not match!';
    }
    return null;
};

export const createNotification = (message: string, type: Notification['type'] = 'info'): Notification => ({
    id: Date.now(),
    message,
    type
});

export const getNotificationStyles = (type: Notification['type']): string => {
    const baseClasses = 'fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white flex items-center gap-2';

    switch (type) {
        case 'success':
            return `${baseClasses} bg-green-600`;
        case 'error':
            return `${baseClasses} bg-red-600`;
        default:
            return `${baseClasses} bg-blue-600`;
    }
};