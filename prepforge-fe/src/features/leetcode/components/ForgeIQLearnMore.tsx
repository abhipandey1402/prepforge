import React from "react";

interface ForgeIQLearnMoreProps {
    isDarkMode: boolean;
}

const ForgeIQLearnMore: React.FC<ForgeIQLearnMoreProps> = ({ isDarkMode }) => {
    const textColor = isDarkMode ? "text-gray-300" : "text-gray-700";
    const sectionBg = isDarkMode ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-300";
    const headingColor = isDarkMode ? "text-white" : "text-gray-900";

    return (
        <div
            className={`transition-colors duration-500 rounded-2xl px-6 py-12 md:px-16 ${isDarkMode ? "bg-slate-900 text-white" : "bg-white text-gray-900"
                }`}
        >
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto text-center mb-16">
                <h1 className={`text-4xl font-bold mb-4 ${headingColor}`}>
                    🚀 Smarter Prep Starts with Smarter Insights
                </h1>
                <p className={`text-lg mb-6 ${textColor}`}>
                    ForgeIQ analyzes your LeetCode submission history and delivers personalized, topic-wise feedback powered by AI.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    {/* <button
                        className={`border bg-orange-100 px-6 py-2 rounded-md font-medium transition ${isDarkMode
                                ? "border-gray-400 hover:border-white text-white"
                                : "border-gray-400 hover:border-gray-600 text-gray-800"
                            }`}
                    >
                        Try Demo (Coming Soon)
                    </button> */}
                </div>
            </section>

            {/* What is ForgeIQ */}
            <section className="max-w-3xl mx-auto mb-16 text-center">
                <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>What Is ForgeIQ?</h2>
                <p className={`${textColor}`}>
                    ForgeIQ is your personal AI coach that turns your coding submission history into actionable insights.
                    Get deep, personalized feedback on the topics that matter most based on your real coding journey.
                </p>
            </section>

            {/* Features */}
            <section className="max-w-5xl mx-auto mb-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                    {
                        title: "Topic-Wise Strength & Weakness Mapping",
                        desc: "Understand which topics you’ve mastered, and where you're falling behind."
                    },
                    {
                        title: "AI-Powered Suggestions",
                        desc: "Know *why* you struggle with certain topics and get focused improvement tips."
                    },
                    {
                        title: "Visual Skill Reports",
                        desc: "Charts and graphs highlight your performance trends and blind spots."
                    },
                    {
                        title: "Smart Practice Paths (Coming Soon)",
                        desc: "AI-recommended problems that help you close knowledge gaps efficiently."
                    }
                ].map(({ title, desc }, i) => (
                    <div key={i} className={`p-6 rounded-lg border ${sectionBg}`}>
                        <h3 className={`text-lg font-semibold mb-2 ${headingColor}`}>{title}</h3>
                        <p className={`text-sm ${textColor}`}>{desc}</p>
                    </div>
                ))}
            </section>

            {/* How It Works */}
            <section className="max-w-4xl mx-auto mb-16 text-center">
                <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>How It Works</h2>
                <ol className={`list-decimal list-inside space-y-3 text-left max-w-lg mx-auto ${textColor}`}>
                    <li>We analyze your LeetCode submissions by topic and difficulty.</li>
                    <li>Our AI identifies patterns and problem-solving behaviors.</li>
                    <li>You receive clear, actionable insights to improve smarter.</li>
                </ol>
            </section>

            {/* Why It Matters */}
            <section className="max-w-3xl mx-auto text-center mb-16">
                <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>Why It Matters</h2>
                <p className={`${textColor}`}>
                    Most platforms treat every learner the same. ForgeIQ makes your prep personal so every session is focused and efficient.
                </p>
            </section>

            {/* Privacy */}
            <section className="max-w-3xl mx-auto text-center mb-16">
                <h2 className={`text-xl font-semibold mb-2 ${headingColor}`}>🔒 Privacy-First</h2>
                <p className={`${textColor}`}>
                    Your submission history is securely analyzed, and never shared. You're always in control of your data.
                </p>
            </section>

            {/* CTA Section */}
            <section className="max-w-3xl mx-auto text-center mb-16">
                <h2 className={`text-2xl font-semibold mb-4 ${headingColor}`}>
                    Ready to Unlock Your Full Potential?
                </h2>
                <p className={`${textColor} mb-6`}>
                    ForgeIQ gives you clarity, focus, and a smarter prep path tailored to your journey.
                </p>
                {/* <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md font-medium text-white transition">
                    Notify Me When It Launches
                </button> */}
            </section>

            {/* FAQ Section */}
            <section className="max-w-4xl mx-auto mb-16">
                <h2 className={`text-2xl font-semibold mb-6 text-center ${headingColor}`}>
                    📌 Frequently Asked Questions
                </h2>
                <div className={`space-y-6 ${textColor}`}>
                    {[
                        {
                            q: "Is ForgeIQ free?",
                            a: "Yes! Free access to core insights will be available, but with some limitations. Premium features may follow."
                        },
                        {
                            q: "What data does it use?",
                            a: "Only your LeetCode submission history securely accessed and analyzed."
                        },
                        {
                            q: "Do I need to link my LeetCode account?",
                            a: "Yes. A one-time secure sync enables personalized insights."
                        },
                        {
                            q: "Can I export my report?",
                            a: "Yes. You’ll be able to download your insights as a PDF."
                        }
                    ].map(({ q, a }, i) => (
                        <div key={i}>
                            <strong className={`${headingColor}`}>Q: {q}</strong>
                            <p>{a}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default ForgeIQLearnMore;
