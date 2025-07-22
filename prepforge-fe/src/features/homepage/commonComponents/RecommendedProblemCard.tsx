import { RecommendedProblem } from "../homepage.types";

interface RecommendedProblemCardProps {
    problem: RecommendedProblem;
}

const difficultyColors = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Hard: "bg-red-100 text-red-800",
};

const RecommendedProblemCard: React.FC<RecommendedProblemCardProps> = ({ problem }) => (
    <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
        <div>
            <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-2">{problem.name}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColors[problem.difficulty]}`}>
                    {problem.difficulty}
                </span>
            </div>
            <div className="text-xs text-gray-700 mt-1">{problem.reason}</div>
        </div>
    </div>
);

export default RecommendedProblemCard;
