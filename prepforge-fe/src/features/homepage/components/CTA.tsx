import { Code } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CTA: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-orange-300 to-slate-300 rounded-xl shadow-xl overflow-hidden">
                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row items-center">
                            {/* Text Section */}
                            <div className="md:w-2/3 mb-8 md:mb-0">
                                <h2 className="text-3xl font-bold text-white mb-4">
                                    Ready to Elevate Your LeetCode Game?
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Connect your LeetCode account, challenge your friends, and get AI-powered insights to ace your next technical interview.
                                </p>
                                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                    <button className="px-6 py-3 bg-blue-950 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition-colors flex items-center justify-center" onClick={() => navigate('/auth')}>
                                        Get Started For Free
                                    </button>
                                    <button className="px-6 py-3 bg-transparent border border-white text-blue-950 font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center" onClick={() => navigate('/about')}>
                                        Learn More
                                    </button>
                                </div>
                            </div>

                            {/* Icon Section */}
                            <div className="md:w-1/3">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-orange-600 rounded-full opacity-20 blur-2xl transform -translate-x-4 translate-y-4"></div>
                                    <div className="relative">
                                        <Code className="h-32 w-32 text-orange-500 mx-auto" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CTA;
