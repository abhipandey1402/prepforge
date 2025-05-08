import { Coins, Monitor } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const Navigate = useNavigate();

    const handleNavigateToAuth = () => {
        Navigate("/auth");
    }

    return (
        <nav className="bg-blue-950 shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <Monitor className="h-6 w-6 text-orange-600" />
                        <span className="font-bold text-xl text-white">PrepVerse</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-300 hover:text-orange-600 transition-colors">Features</a>
                        <a href="#problems" className="text-gray-300 hover:text-orange-600 transition-colors">Problems</a>
                        <a href="#ai-reports" className="text-gray-300 hover:text-orange-600 transition-colors">AI Reports</a>
                        <a href="#daily-bet" className="text-gray-300 hover:text-orange-600 transition-colors">Challenge Bets</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="px-3 py-1 bg-orange-900 text-orange-200 rounded-lg text-sm">
                            <Coins className="h-4 w-4 inline mr-1" /> 20 PrepCoins
                        </div>
                        <button className="px-4 py-2 text-orange-600 font-medium hover:bg-blue-50 rounded-lg transition-colors" onClick={handleNavigateToAuth}>Login</button>
                        <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:bg-orange-700 transition-colors" onClick={handleNavigateToAuth}>Sign Up</button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header