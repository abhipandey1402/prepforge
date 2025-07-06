// ChallengeForm.tsx

import { Button } from "@/components/ui/button";

const ChallengeForm: React.FC = () => {
    return (
        <form className="space-y-6">
            {/* Challenge Type */}
            <div>
                <label className="block text-gray-700 font-medium mb-2">Challenge Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Create individual radio buttons for challenge types */}
                    {["Problem Count", "Specific Problem", "Time Spent"].map((type, index) => (
                        <div key={index} className="relative">
                            <input type="radio" id={type} name="challengeType" className="peer sr-only" />
                            <label
                                htmlFor={type}
                                className="flex flex-col p-4 bg-white border rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:bg-gray-50"
                            >
                                <span className="text-sm font-medium text-gray-900">{type}</span>
                                <span className="text-xs text-gray-500">Description here</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bet Amount & Other Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Inputs for problem count, difficulty, and topic */}
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Challenge Details</label>
                    <div className="space-y-4">
                        <input className="w-full p-2 border border-gray-300 rounded-md" placeholder="Amount" />
                    </div>
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Bet Settings</label>
                    <div className="space-y-4">
                        <input type="email" placeholder="friend@example.com" className="w-full p-2 border border-gray-300 rounded-md" />
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={() => { }} >Create Challenge</Button>
            </div>
        </form>
    );
};

export default ChallengeForm;
