
interface InsightListProps {
    title: string;
    items: string[];
    icon: React.ReactNode;
    colorClass: string;
}

const InsightList: React.FC<InsightListProps> = ({ title, items, icon, colorClass }) => (
    <div>
        <h4 className={`font-medium text-gray-800 mb-2 flex items-center`}>
            {icon}
            {title}
        </h4>
        <ul className="space-y-2">
            {items.map((item, i) => (
                <li key={i} className="flex items-center text-sm">
                    <span className={`h-1.5 w-1.5 ${colorClass} rounded-full mr-2`} />
                    {item}
                </li>
            ))}
        </ul>
    </div>
);

export default InsightList;
