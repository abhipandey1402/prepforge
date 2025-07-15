import { User, Chrome, BarChart3 } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            number: 1,
            title: "Authenticate",
            description: "Sign up/Login to PrepForge",
            icon: <User className="w-8 h-8" />,
            detail: "Create your account or sign in"
        },
        {
            number: 2,
            title: "Extension Setup",
            description: "Install Chrome extension & sync LeetCode",
            icon: <Chrome className="w-8 h-8" />,
            detail: "Connect extension → Login LeetCode → Send session token"
        },
        {
            number: 3,
            title: "AI Insights",
            description: "Get personalized analytics & recommendations",
            icon: <BarChart3 className="w-8 h-8" />,
            detail: "Dashboard with submissions → Topic insights → AI analysis"
        }
    ];

    return (
        <div className="mx-auto py-6 px-4">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-black mb-3 bg-gradient-to-r from-blue-950 to-blue-800 bg-clip-text">How It Works</h2>
                <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">Simple 3-step process to unlock AI-powered coding insights</p>
            </div>

            <div className="flex flex-col py-16 md:flex-row items-start justify-evenly space-y-12 md:space-y-0 md:space-x-12 bg-gradient-to-r from-orange-600/40 to-blue-950/40 rounded-2xl">
                {steps.map((step, index) => (
                        <div className="text-center min-w-[20%] relative group" key={index}>
                            <div className="text-orange-600 mb-6 flex justify-center bg-blue-950 w-16 h-16 rounded-xl items-center mx-auto transition-colors duration-300">
                                {step.icon}
                            </div>
                            <h3 className="text-blue-950 font-bold text-xl mb-3">{step.title}</h3>
                            <p className="text-blue-950/80 font-medium mb-3">{step.description}</p>
                            <p className="text-blue-950/60 text-sm leading-relaxed">{step.detail}</p>
                        </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;