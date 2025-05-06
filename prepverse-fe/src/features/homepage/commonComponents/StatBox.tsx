// components/StatBox.tsx
type StatBoxProps = {
    value: string;
    label: string;
};

const StatBox: React.FC<StatBoxProps> = ({ value, label }) => {
    return (
        <div className="text-center">
            <div className="text-3xl font-bold mb-1">{value}</div>
            <div className="text-blue-100">{label}</div>
        </div>
    );
}

export default StatBox