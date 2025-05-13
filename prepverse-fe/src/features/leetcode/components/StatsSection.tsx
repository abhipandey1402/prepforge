import { Check, PieChart, Calendar, Award } from 'lucide-react';
import StatsCard from './StatsCard';

export const StatsSection = ({ stats, isDarkMode }: any) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatsCard
            title="Problems Solved"
            value={stats?.totalSolved || 0}
            icon={<Check size={24} />}
            detail={`${stats?.easySolved || 0} Easy, ${stats?.mediumSolved || 0} Medium, ${stats?.hardSolved || 0} Hard`}
            isDarkMode={isDarkMode}
        />
        <StatsCard
            title="Acceptance Rate"
            value={`${stats?.acceptanceRate || 0}%`}
            icon={<PieChart size={24} />}
            detail="Last 30 days"
            isDarkMode={isDarkMode}
        />
        <StatsCard
            title="Current Streak"
            value={stats?.streak || 0}
            icon={<Calendar size={24} />}
            detail="days"
            isDarkMode={isDarkMode}
        />
        <StatsCard
            title="Global Ranking"
            value={`#${stats?.ranking || 0}`}
            icon={<Award size={24} />}
            detail="Top 5%"
            isDarkMode={isDarkMode}
        />
    </div>
);