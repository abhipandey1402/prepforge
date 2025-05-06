import { FC } from 'react';
import TransactionItem from '../commonComponents/TransactionItem';
import CreditsBalanceCard from '../commonComponents/CreditsBalanceCard';
import { Award, Coins, Download, Target } from 'lucide-react';

const Wallet: FC = () => {
    const addCredits = () => {
        console.log('Add Credits');
    };

    const withdrawCredits = () => {
        console.log('Withdraw');
    };

    return (
        <div className="bg-blue-950 py-16">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-3 flex items-center justify-center gap-3">
                    Your Wallet
                    <span className="bg-yellow-400 text-neutral-900 text-xs font-semibold px-3 py-1 rounded-full shadow-sm ring-1 ring-yellow-500">
                        Upcoming
                    </span>
                </h2>
                <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                    Manage your PrepCoins for challenge bets and rewards
                </p>

                <div className="max-w-4xl mx-auto bg-slate-100 rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="bg-gray-100 p-4 border-b border-gray-200">
                        <div className="flex items-center">
                            <Coins className="h-5 w-5 text-orange-600 mr-2" />
                            <span className="font-medium text-gray-800">PrepCoins Balance</span>
                        </div>
                    </div>

                    <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <CreditsBalanceCard
                                balance={20}
                                currency="20.00 INR"
                                addCreditsAction={addCredits}
                                withdrawAction={withdrawCredits}
                            />

                            <div className="md:w-2/3">
                                <h3 className="font-medium text-gray-800 mb-3">Transaction History</h3>
                                <div className="space-y-3">
                                    <TransactionItem
                                        icon={<Download className="h-5 w-5 text-green-600" />}
                                        title="Credit Purchase"
                                        date="Apr 28, 2025 • 10:42 AM"
                                        amount="+100 PrepCoins"
                                        amountColor="text-green-600"
                                        iconBgColor="bg-green-100"
                                    />
                                    <TransactionItem
                                        icon={<Target className="h-5 w-5 text-red-600" />}
                                        title="Challenge Loss"
                                        date="Apr 25, 2025 • 9:15 PM"
                                        amount="-50 PrepCoins"
                                        amountColor="text-red-600"
                                        iconBgColor="bg-red-100"
                                    />
                                    <TransactionItem
                                        icon={<Award className="h-5 w-5 text-green-600" />}
                                        title="Challenge Win"
                                        date="Apr 23, 2025 • 11:30 AM"
                                        amount="+95 PrepCoins"
                                        amountColor="text-green-600"
                                        iconBgColor="bg-green-100"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wallet;
