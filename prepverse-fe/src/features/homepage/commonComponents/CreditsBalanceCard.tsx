
type CreditsBalanceCardProps = {
    balance: number;
    currency: string;
    addCreditsAction: () => void;
    withdrawAction: () => void;
};

const CreditsBalanceCard: React.FC<CreditsBalanceCardProps> = ({
    balance,
    currency,
    addCreditsAction,
    withdrawAction,
}) => {
    return (
        <div className="md:w-1/3">
            <div className="bg-gradient-to-r from-blue-900 to-blue-950 text-white p-6 rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm opacity-80">Available PrepCoins</div>
                    <div className="text-xs bg-orange-600 px-2 py-1 rounded-full">Credits</div>
                </div>
                <div className="text-3xl font-bold mb-1">{balance} PrepCoins</div>
                <div className="text-sm opacity-80">≈ {currency}</div>
                <div className="mt-6 flex flex-col space-y-2">
                    <button
                        onClick={addCreditsAction}
                        className="w-full px-4 py-2 bg-orange-600 text-white font-medium rounded-lg shadow hover:bg-orange-700 transition-colors flex items-center justify-center"
                    >
                        Add PrepCoins Credits
                    </button>
                    <button
                        onClick={withdrawAction}
                        className="w-full px-4 py-2 border border-white/30 text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
                    >
                        Withdraw
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreditsBalanceCard;
