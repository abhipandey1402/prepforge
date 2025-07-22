import { setCurrentItem } from '@/features/globalFeatures/slices/configSlice';
import { RootState } from '@/store';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const accessToken = useSelector((state: RootState) => state.auth?.userData?.accessToken);


    const handleNavigateToAuth = () => {
        Navigate("/auth");
    }

    const navigateToDashboard = () => {
        dispatch(setCurrentItem('submissions'));
        Navigate('/dashboard');
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => Navigate('/')}>
                        <img src="https://res.cloudinary.com/dbzi19ec6/image/upload/v1752592047/icon128_vsu3tt.png" alt="prepforge-logo" className='w-10 h-10 rounded'/>
                        <span className="font-bold text-xl text-blue-950">PrepForge</span>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-600 hover:text-orange-600 transition-colors">Features</a>
                        <a href="#problems" className="text-gray-600 hover:text-orange-600 transition-colors">Problems</a>
                        <a href="#ai-reports" className="text-gray-600 hover:text-orange-600 transition-colors">AI Reports</a>
                    </div>
                    {accessToken ?
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:bg-orange-700 transition-colors" onClick={navigateToDashboard}>Go to Dashboard</button>
                        </div>
                        :
                        <div className="flex items-center space-x-4">
                            <button className="px-4 py-2 text-blue-950 font-medium hover:bg-blue-50 rounded-lg transition-colors" onClick={handleNavigateToAuth}>Login</button>
                            <button className="px-4 py-2 bg-blue-950 text-white font-medium rounded-lg shadow-md hover:bg-orange-600/10 hover:text-blue-950 transition-colors" onClick={handleNavigateToAuth}>Sign Up</button>
                        </div>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Header