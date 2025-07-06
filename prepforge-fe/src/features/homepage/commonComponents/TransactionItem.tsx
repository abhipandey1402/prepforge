
type TransactionItemProps = {
    icon: React.ReactNode;
    title: string;
    date: string;
    amount: string;
    amountColor: string;
    iconBgColor: string;
};

const TransactionItem: React.FC<TransactionItemProps> = ({
    icon,
    title,
    date,
    amount,
    amountColor,
    iconBgColor,
}) => {
    return (
        <div className="bg-white p-3 rounded border border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
                <div
                    className={`h-10 w-10 rounded-full ${iconBgColor} flex items-center justify-center mr-3`}
                >
                    {icon}
                </div>
                <div>
                    <div className="font-medium text-gray-800">{title}</div>
                    <div className="text-xs text-gray-500">{date}</div>
                </div>
            </div>
            <div className={`font-medium ${amountColor}`}>{amount}</div>
        </div>
    );
};

export default TransactionItem;
