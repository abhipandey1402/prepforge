import React from 'react';
import { ExternalLink, Calendar } from 'lucide-react';
import { formatDate } from '../utils/settings.utils';

interface LeetCodeSectionProps {
    isLeetcodeExpired: boolean;
    leetcodeRefreshedAt: Date | null;
    onLeetcodeAuth: () => void;
}

const LeetCodeSection: React.FC<LeetCodeSectionProps> = ({
    isLeetcodeExpired,
    leetcodeRefreshedAt,
    onLeetcodeAuth
}) => (
    <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <ExternalLink className="w-6 h-6 text-orange-500" />
            LeetCode Integration
        </h2>

        <div className="bg-gray-700 p-4 rounded-lg mb-4">
            <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">Authorization Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${isLeetcodeExpired ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
                    }`}>
                    {isLeetcodeExpired ? 'Expired' : 'Active'}
                </span>
            </div>
            {leetcodeRefreshedAt && (
                <div className="flex items-center gap-2 mt-2">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-gray-300">
                        Last Refreshed at: {formatDate(leetcodeRefreshedAt.toString())}
                    </span>
                </div>
            )}
        </div>

        <button
            onClick={onLeetcodeAuth}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded transition-colors flex items-center gap-2"
        >
            <ExternalLink className="w-4 h-4" />
            {isLeetcodeExpired ? 'Reauthorize LeetCode' : 'Manage LeetCode Authorization'}
        </button>
    </div>
);

export default LeetCodeSection;