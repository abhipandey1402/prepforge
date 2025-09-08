export interface Topic {
    name: string;
    slug: string;
    questionCount: number;
}

export interface InsightData {
    topic: string;
    progress: { current: number; total: number };
    avgTimeComplexity: string;
    avgSpaceComplexity: string;
    strengths: string[];
    areasToImprove: string[];
    strength: string;
    focusOn: string;
    recommendedProblems: {
        title: string;
        difficulty: string;
        description: string;
    }[];
}