// sections/FeaturesSection.tsx
import React from 'react';
import FeatureCard from '../commonComponents/FeatureCard';
import { Search, Brain, Users } from 'lucide-react';

const features = [
    {
        title: 'Problem Tracking & Filtering',
        description: 'Sync with LeetCode to fetch and organize all your solutions. Filter by difficulty, topics, completion status, and recommended problems.',
        icon: Search,
        iconColorClass: 'text-blue-500',
        isUpcoming: false,
    },
    {
        title: 'AI Topic Analysis',
        description: 'Get personalized AI reports based on your submissions. Identify strengths, weaknesses, and targeted recommendations for each topic.',
        icon: Brain,
        iconColorClass: 'text-pink-500',
        isUpcoming: true,
    },
    {
        title: 'Challenge Betting',
        description: 'Stay motivated with daily challenge bets. Set goals with friends, bet credits, and earn rewards for consistent practice and improvement.',
        icon: Users,
        iconColorClass: 'text-green-500',
        isUpcoming: true,
    },
];

const Features: React.FC = () => {
    return (
        <div className="bg-blue-950 py-16" id="features">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-3">Key Features</h2>
                <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                    Everything you need to master LeetCode and ace your technical interviews.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard
                            key={index}
                            title={feature.title}
                            description={feature.description}
                            icon={feature.icon}
                            iconColorClass={feature.iconColorClass}
                            isUpcoming={feature.isUpcoming}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
