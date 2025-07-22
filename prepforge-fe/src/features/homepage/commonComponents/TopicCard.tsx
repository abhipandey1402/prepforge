
import React from "react";
import { TopicReport } from "../homepage.types";

interface TopicCardProps {
    report: TopicReport;
    isActive: boolean;
    onClick: () => void;
}

const TopicCard: React.FC<TopicCardProps> = ({ report, isActive, onClick }) => {
    const progress = (report.completed / report.total) * 100;

    return (
        <div
            onClick={onClick}
            className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${isActive ? "bg-blue-50 border-blue-300" : "bg-slate-100 border-gray-200"
                }`}
        >
            <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-800">{report.topic}</h3>
                <span className="text-sm text-blue-600">
                    {report.completed}/{report.total}
                </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                />
            </div>
            <div className="flex justify-between mt-2 text-xs font-semibold">
                <div className="text-green-700">Strength: {report.strength}</div>
                <div className="text-red-700">Focus on: {report.weakness}</div>
            </div>
        </div>
    );
};

export default TopicCard;
