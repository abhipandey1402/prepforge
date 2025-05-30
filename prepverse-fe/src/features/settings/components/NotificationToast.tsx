import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { NotificationToastProps } from '../types/settings.types';
import { getNotificationStyles } from '../utils/settings.utils';

const NotificationToast: React.FC<NotificationToastProps> = ({ notification }) => {
    const getIcon = () => {
        switch (notification.type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
            case 'info':
            default:
                return <AlertCircle className="w-5 h-5" />;
        }
    };

    return (
        <div className={getNotificationStyles(notification.type)}>
            {getIcon()}
            <span>{notification.message}</span>
        </div>
    );
};

export default NotificationToast;