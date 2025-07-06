import React from 'react';

const LoadingSpinner: React.FC = () => (
    <div className="min-h-screen bg-transparent text-white p-6 flex items-center justify-center">
        <div className="flex items-center gap-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            <span className="text-lg">Loading...</span>
        </div>
    </div>
);

export default LoadingSpinner;