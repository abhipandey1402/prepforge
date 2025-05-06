import { Code } from "lucide-react";

const CTA: React.FC = () => (
    <div className="bg-blue-950 py-16">
        <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-800 to-blue-950 rounded-xl shadow-xl overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center">
                        {/* Text Section */}
                        <div className="md:w-2/3 mb-8 md:mb-0">
                            <h2 className="text-3xl font-bold text-white mb-4">
                                Ready to Elevate Your LeetCode Game?
                            </h2>
                            <p className="text-gray-300 mb-6">
                                Connect your LeetCode account, challenge your friends, and get AI-powered insights to ace your next technical interview.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <button className="px-6 py-3 bg-orange-600 text-white font-medium rounded-lg shadow-md hover:bg-orange-700 transition-colors flex items-center justify-center">
                                    Get Started For Free
                                </button>
                                <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center">
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
);

export default CTA;
