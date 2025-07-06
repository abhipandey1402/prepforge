
interface InsightStatBoxProps {
    title: string;
    value: string | number;
    label?: string;
}

const InsightStatBox: React.FC<InsightStatBoxProps> = ({ title, value, label }) => (
    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex-1">
        <div className="text-sm text-gray-500 mb-1">{title}</div>
        <div className="flex items-end">
            <span className="text-2xl font-bold text-blue-600 mr-1">{value}</span>
            {label && <span className="text-gray-500 text-sm">{label}</span>}
        </div>
    </div>
);

export default InsightStatBox;
