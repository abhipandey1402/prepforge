import React from 'react';
import { Shield } from 'lucide-react';
import { User } from '../types/settings.types';
import { formatDate } from '../utils/settings.utils';

interface AccountDetailsSectionProps {
    userData: User;
    isDarkMode: boolean;
}

const AccountDetailsSection: React.FC<AccountDetailsSectionProps> = ({ userData, isDarkMode }) => (
    <div className={`${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} rounded-lg p-6 mb-6`}>
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Shield className="w-6 h-6 text-orange-500" />
            Account Details
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
            <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-200 text-gray-800'} p-4 rounded-lg`}>
                <p className="text-sm mb-1">User ID</p>
                <p className="font-mono text-sm break-all">{userData._id}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-200 text-gray-800'} p-4 rounded-lg`}>
                <p className="text-sm  mb-1">Completed Sessions</p>
                <p className=" text-lg font-semibold">{userData.completedSessions}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-200 text-gray-800'} p-4 rounded-lg`}>
                <p className="text-sm  mb-1">Account Created</p>
                <p className="">{formatDate(userData.createdAt)}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-slate-200 text-gray-800'} p-4 rounded-lg`}>
                <p className="text-sm  mb-1">Last Updated</p>
                <p className="">{formatDate(userData.updatedAt)}</p>
            </div>
        </div>
    </div>
);

export default AccountDetailsSection;