// sections/ProblemExplorer.tsx
import React, { useState } from 'react';
import { Book, Search } from 'lucide-react';
import ProblemCard from '../commonComponents/ProblemCard';

const mockProblems = [
    {
        id: 1,
        name: 'Two Sum',
        difficulty: 'Easy',
        topic: 'Array',
        completed: true,
        lastAttempted: '2025-05-01',
    },
    {
        id: 2,
        name: 'Longest Substring Without Repeating Characters',
        difficulty: 'Medium',
        topic: 'Sliding Window',
        completed: false,
        lastAttempted: '2025-04-30',
    },
    {
        id: 3,
        name: 'Median of Two Sorted Arrays',
        difficulty: 'Hard',
        topic: 'Binary Search',
        completed: false,
        lastAttempted: '2025-04-28',
    },
];

const ProblemExplorer: React.FC = () => {
    const [activeFilter, setActiveFilter] = useState('all');
    const [difficulty, setDifficulty] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProblems = mockProblems.filter((problem) => {
        const matchFilter =
            activeFilter === 'all' ||
            (activeFilter === 'completed' && problem.completed) ||
            (activeFilter === 'incomplete' && !problem.completed);
        const matchDifficulty = difficulty === 'all' || problem.difficulty === difficulty;
        const matchSearch = problem.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchFilter && matchDifficulty && matchSearch;
    });

    return (
        <div className="bg-white py-16" id="problems">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-neutral-950 mb-3">LeetCode Problem Explorer</h2>
                <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                    Track, filter, and manage your LeetCode problems in one place.
                </p>

                <div className="bg-slate-100 rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center">
                        <div className="flex items-center">
                            <Book className="h-5 w-5 text-gray-700 mr-2" />
                            <span className="font-medium text-gray-800">Problem Explorer</span>
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-1 mr-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button className="p-1.5 bg-blue-600 text-white rounded-md transition-colors">
                                <Search className="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div className="p-4">
                        <div className="flex flex-wrap gap-2 mb-4">
                            {['all', 'completed', 'incomplete'].map((filter) => (
                                <button
                                    key={filter}
                                    className={`px-3 py-1 text-sm font-medium rounded-full ${activeFilter === filter
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                    onClick={() => setActiveFilter(filter)}
                                >
                                    {filter[0].toUpperCase() + filter.slice(1)}
                                </button>
                            ))}
                            <select
                                className="px-3 py-1 text-sm font-medium rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                            >
                                <option value="all">All Difficulties</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="space-y-3">
                            {filteredProblems.map((problem) => (
                                <ProblemCard key={problem.id} {...problem} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProblemExplorer;
