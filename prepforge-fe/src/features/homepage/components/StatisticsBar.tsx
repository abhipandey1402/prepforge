import React from 'react'
import StatBox from '../commonComponents/StatBox';

const stats = [
    { value: '15,000+', label: 'LeetCode Problems' },
    { value: '8,500+', label: 'Active Users' },
    { value: '95%', label: 'Completion Rate' },
    { value: '90%', label: 'Interview Success' },
];


const StatisticsBar: React.FC = () => {
    return (
        <div className="bg-orange-600 py-8 text-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {stats.map((stat, index) => (
                        <StatBox key={index} value={stat.value} label={stat.label} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default StatisticsBar