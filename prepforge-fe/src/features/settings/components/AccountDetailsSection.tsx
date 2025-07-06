import React from 'react';
import { Shield } from 'lucide-react';
import { User } from '../types/settings.types';
import { formatDate } from '../utils/settings.utils';

interface AccountDetailsSectionProps {
    userData: User;
}

const AccountDetailsSection: React.FC<AccountDetailsSectionProps> = ({ userData }) => (
    <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-500" />
            Account Details
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
            <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">User ID</p>
                <p className="text-white font-mono text-sm break-all">{userData._id}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Completed Sessions</p>
                <p className="text-white text-lg font-semibold">{userData.completedSessions}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Account Created</p>
                <p className="text-white">{formatDate(userData.createdAt)}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-lg">
                <p className="text-sm text-gray-300 mb-1">Last Updated</p>
                <p className="text-white">{formatDate(userData.updatedAt)}</p>
            </div>
        </div>
    </div>
);

export default AccountDetailsSection;