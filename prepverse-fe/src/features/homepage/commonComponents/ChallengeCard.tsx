// ChallengeCard.tsx
type Challenge = {
    id: string;
    title: string;
    difficulty: string;
    partner: string;
    betAmount: string;
    status: "Active" | "Completed" | "Failed";
};

type ChallengeCardProps = {
    challenge: Challenge;
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
    const statusStyles = {
        Active: "bg-blue-200 text-blue-800",
        Completed: "bg-green-100 text-green-800",
        Failed: "bg-red-100 text-red-800",
    };

    return (
        <div className={`p-4 rounded-lg border ${statusStyles[challenge.status]}`}>
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex items-center">
                        <span className="font-medium text-gray-800">{challenge.title}</span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${challenge.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : challenge.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                            {challenge.difficulty}
                        </span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                        With {challenge.partner} · {challenge.betAmount} credits
                    </div>
                </div>
                <div>
                    <span className={`text-xs ${statusStyles[challenge.status]} px-2 py-1 rounded-full`}>
                        {challenge.status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ChallengeCard;
