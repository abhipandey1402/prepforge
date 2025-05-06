import React from 'react';
import { LucideIcon } from 'lucide-react';

type FeatureCardProps = {
    title: string;
    description: string;
    icon: LucideIcon;
    iconColorClass: string;
    isUpcoming?: boolean;
};

const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    icon: Icon,
    iconColorClass,
    isUpcoming,
}) => {
    return (
        <div className="relative bg-slate-100 p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all">
            {/* Upcoming badge */}
            {isUpcoming && (
                <div className="absolute top-0 right-0">
                    <div className="flex items-center gap-1 px-5 py-3 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800 shadow-sm border border-red-200">
                        <svg
                            className="w-3.5 h-3.5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-1h2v1zm0-2H9V7h2v4z" />
                        </svg>
                        Upcoming
                    </div>
                </div>
            )}

            <div className="h-14 w-14 rounded-full bg-blue-50 flex items-center justify-center mb-6">
                <Icon className={`h-6 w-6 ${iconColorClass}`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{title} </h3>
            <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
    );
};

export default FeatureCard;
