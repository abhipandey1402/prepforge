// commonComponents/ProblemCard.tsx
import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

type ProblemCardProps = {
    id: number;
    name: string;
    difficulty: string;
    topic: string;
    completed: boolean;
    lastAttempted: string;
};

const ProblemCard: React.FC<ProblemCardProps> = ({ id, name, difficulty, topic, completed, lastAttempted }) => {
    const difficultyColor =
        difficulty === 'Easy'
            ? 'bg-green-100 text-green-800'
            : difficulty === 'Medium'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800';

    return (
        <div className="bg-slate-100 p-4 rounded-lg border border-gray-200 flex items-center justify-between hover:shadow-md transition-all">
            <div>
                <div className="flex items-center">
                    {completed ? (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                        <AlertCircle className="h-5 w-5 text-orange-500 mr-2" />
                    )}
                    <span className="font-medium text-gray-800">{name}</span>
                    <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${difficultyColor}`}>{difficulty}</span>
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">{topic}</span>
                </div>
                <div className="text-xs text-gray-600 mt-1">Last attempted: {lastAttempted}</div>
            </div>
            <div className="flex space-x-2">
                <button className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    View Solution
                </button>
                <button className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors" onClick={() => console.log(id)}>
                    Practice
                </button>
            </div>
        </div>
    );
};

export default ProblemCard;
