
export interface TopicReport {
    topic: string;
    completed: number;
    total: number;
    strength: string;
    weakness: string;
}

export interface RecommendedProblem {
    name: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    reason: string;
}

export interface AIInsights {
    topic: string;
    completedProblems: number;
    totalProblems: number;
    timeComplexityAvg: string;
    spaceComplexityAvg: string;
    strengths: string[];
    weaknesses: string[];
    recommendedProblems: RecommendedProblem[];
}
