import React from 'react';
import { LogOut } from 'lucide-react';

interface ActionsSectionProps {
    onLogout: () => void;
}

const ActionsSection: React.FC<ActionsSectionProps> = ({ onLogout }) => (
    <div className="bg-gray-800 rounded-lg p-6">
        <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded transition-colors flex items-center gap-2"
        >
            <LogOut className="w-5 h-5" />
            Logout
        </button>
    </div>
);

export default ActionsSection;