import React from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import StatisticsBar from './components/StatisticsBar'
import Features from './components/Features'
import ProblemExplorer from './components/ProblemExplorer'
import AIReports from './components/AiReports'
import DailyChallengeBetting from './components/DailyChallengeBetting'
import Wallet from './components/Wallet'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'

const topicReports = [
    { topic: "Arrays & Hashing", completed: 8, total: 10, strength: "Time efficiency", weakness: "Space optimization" },
    { topic: "Two Pointers", completed: 5, total: 7, strength: "Implementation", weakness: "Edge cases" },
    { topic: "Sliding Window", completed: 3, total: 6, strength: "Pattern recognition", weakness: "Variable window sizing" },
    { topic: "Stack", completed: 6, total: 8, strength: "LIFO implementation", weakness: "Monotonic stack patterns" },
    { topic: "Binary Search", completed: 4, total: 9, strength: "Basic implementation", weakness: "Rotated array variations" }
];

const aiInsights = {
    topic: "Arrays & Hashing",
    completedProblems: 8,
    totalProblems: 10,
    timeComplexityAvg: "O(n)",
    spaceComplexityAvg: "O(n)",
    strengths: ["Hash table usage", "Array traversal efficiency", "Edge case handling"],
    weaknesses: ["Space optimization", "Two-pass vs one-pass solutions", "Multi-pointer techniques"],
    recommendedProblems: [
        { name: "Group Anagrams", difficulty: "Medium" as "Medium", reason: "Practice hash table optimizations" },
        { name: "Encode and Decode Strings", difficulty: "Medium"  as "Medium", reason: "Improve encoding techniques" },
        { name: "Longest Consecutive Sequence", difficulty: "Medium"  as "Medium", reason: "Challenge space complexity" }
    ]
};


const Homepage: React.FC = () => {
    return (
        <div>
            <Header/>
            <HeroSection/>
            <StatisticsBar/>
            <Features/>
            <ProblemExplorer/>
            <AIReports topicReports={topicReports} aiInsights={aiInsights}/>
            <DailyChallengeBetting/>
            <Wallet/>
            <Testimonials/>
            <CTA/>
            <Footer/>
        </div>
    )
}

export default Homepage