import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ArrowRight, CheckCircle, Clock, DollarSign, Info, Target } from "lucide-react";
import { useState } from "react";
import ChallengeTypeOption from "../commonComponents/ChallengeTypeOption";
import SelectField from "../commonComponents/SelectField";
import { Input } from "@/components/ui/input";
import ChallengeStatusBadge from "../commonComponents/ChallengeStatusBadge";

const dailyChallenges = [
    { id: 1, title: "Complete 3 Easy Array Problems", difficulty: "Easy", status: "Active", betAmount: 50, partner: "Alex Chen" },
    { id: 2, title: "Solve 2 Medium DP Problems", difficulty: "Medium", status: "Completed", betAmount: 100, partner: "Maya Patel" },
    { id: 3, title: "Complete any Hard Graph Problem", difficulty: "Hard", status: "Failed", betAmount: 150, partner: "Jordan Lee" }
];

const DailyChallengeBetting: React.FC = () => {
    const [hasBet, setHasBet] = useState(false);

    return (
        <section className="bg-blue-950 py-16" id="daily-bet">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-3 flex items-center justify-center gap-3">
                    Challenge Betting
                    <span className="bg-yellow-400 text-neutral-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ring-1 ring-yellow-500">
                        Upcoming
                    </span>
                </h2>
                <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                    Stay motivated with our unique challenge betting system. Set goals with friends and put your credits on the line!
                </p>

                <Card className="overflow-hidden">
                    <CardHeader className="flex justify-between items-center bg-gray-100 border-b">
                        <div className="flex items-center">
                            <Target className="h-5 w-5 text-orange-600 mr-2" />
                            <span className="font-medium text-gray-800">Challenge Betting</span>
                        </div>
                        {!hasBet ? (
                            <Button onClick={() => setHasBet(true)} className="bg-orange-600 hover:bg-orange-700">
                                Create New Challenge <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">Challenge Created</span>
                                <CheckCircle className="h-5 w-5 text-green-500" />
                            </div>
                        )}
                    </CardHeader>

                    <CardContent className="p-6">
                        {!hasBet ? (
                            <div>
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                                    <div className="flex items-center text-blue-800 mb-2">
                                        <Info className="h-5 w-5 mr-2" />
                                        <span className="font-medium">How Challenge Betting Works</span>
                                    </div>
                                    <ol className="list-decimal ml-5 text-sm text-gray-700 space-y-1">
                                        <li>Create a challenge with a friend by selecting a goal and betting amount</li>
                                        <li>Both users must complete the challenge within the timeframe (usually 24 hours)</li>
                                        <li>If both succeed, no credits are deducted</li>
                                        <li>If both fail, a small percentage (10%) is deducted from each</li>
                                        <li>If one succeeds and one fails, the successful user receives the bet amount (minus 5% platform fee)</li>
                                    </ol>
                                </div>

                                <form className="space-y-6">
                                    <div>
                                        <Label className="block text-gray-700 font-medium mb-2">Challenge Type</Label>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <ChallengeTypeOption id="problem-count" title="Problem Count" subtitle="Complete X problems in Y time" />
                                            <ChallengeTypeOption id="specific-problem" title="Specific Problem" subtitle="Complete a specific problem" />
                                            <ChallengeTypeOption id="time-spent" title="Time Spent" subtitle="Study for X hours" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-4">
                                            <Label className="block text-gray-700 font-medium mb-2">Challenge Details</Label>
                                            <SelectField label="Problem Count" options={["3 problems", "5 problems", "10 problems"]} />
                                            <SelectField label="Difficulty" options={["Any", "Easy Only", "Medium Only", "Hard Only", "Easy & Medium"]} />
                                            <SelectField label="Topic" options={["Any Topic", "Arrays & Hashing", "Two Pointers", "Sliding Window", "Stack", "Binary Search", "Dynamic Programming"]} />
                                        </div>
                                        <div className="space-y-4">
                                            <Label className="block text-gray-700 font-medium mb-2">Bet Settings</Label>
                                            <div>
                                                <Label className="block text-sm text-gray-600 mb-1">Friend's Email</Label>
                                                <Input type="email" placeholder="friend@example.com" />
                                            </div>
                                            <div>
                                                <Label className="block text-sm text-gray-600 mb-1">Bet Amount (Credits)</Label>
                                                <div className="relative">
                                                    <Input type="number" placeholder="50" className="pl-8" />
                                                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">You have 200 credits available</p>
                                            </div>
                                            <SelectField label="Duration" options={["24 hours", "48 hours", "72 hours", "1 week"]} />
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button type="button" onClick={() => setHasBet(true)} className="bg-orange-600 hover:bg-orange-700">
                                            Create Challenge
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-6 bg-orange-50 border border-orange-200 p-4 rounded-lg">
                                    <div className="flex items-center text-orange-800 mb-2">
                                        <Clock className="h-5 w-5 mr-2" />
                                        <span className="font-medium">Challenge Active!</span>
                                    </div>
                                    <p className="text-sm text-gray-700">
                                        Your challenge has been sent to your friend. Once they accept, the challenge will begin!
                                    </p>
                                </div>

                                <h3 className="font-medium text-gray-800 mb-3">Your Active Challenges</h3>
                                <div className="space-y-4">
                                    {dailyChallenges.map((challenge) => (
                                        <div
                                            key={challenge.id}
                                            className={`p-4 rounded-lg border ${challenge.status === "Active" ? "bg-white border-blue-200" :
                                                challenge.status === "Completed" ? "bg-green-50 border-green-200" :
                                                    "bg-red-50 border-red-200"
                                                }`}
                                        >
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <div className="flex items-center">
                                                        <Target className="h-5 w-5 mr-2 text-orange-600" />
                                                        <span className="font-medium text-gray-800">{challenge.title}</span>
                                                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${challenge.difficulty === "Easy" ? "bg-green-100 text-green-800" :
                                                            challenge.difficulty === "Medium" ? "bg-yellow-100 text-yellow-800" :
                                                                "bg-red-100 text-red-800"
                                                            }`}>
                                                            {challenge.difficulty}
                                                        </span>
                                                    </div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        With {challenge.partner} · {challenge.betAmount} credits
                                                    </div>
                                                </div>
                                                <ChallengeStatusBadge status={challenge.status} />
                                            </div>
                                            {challenge.status === "Active" && (
                                                <div className="mt-3 flex items-center space-x-2">
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700">Mark Complete</Button>
                                                    <Button variant="outline" size="sm">View Details</Button>
                                                </div>
                                            )}
                                            {challenge.status === "Completed" && (
                                                <div className="mt-3 text-sm text-green-700">
                                                    You both completed the challenge! No credits were deducted.
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}

export default DailyChallengeBetting