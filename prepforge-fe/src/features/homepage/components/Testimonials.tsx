import SuccessStoryCard from "../commonComponents/SuccessStoryCard ";

const Testimonials: React.FC = () => (
    <div className="bg-white py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-neutral-950 mb-3">
                Success Stories
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                See how our platform helps users simplify their LeetCode journey with AI-powered insights and seamless code tracking.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                <SuccessStoryCard
                    initial="JD"
                    name="John Doe"
                    position="Software Engineer @ Google"
                    testimonial="Being able to revisit my past submissions and run through them quickly has completely changed how I revise. The AI summaries are incredibly helpful in spotting mistakes and learning patterns."
                    rating={5}
                />
                <SuccessStoryCard
                    initial="SR"
                    name="Sarah Ramos"
                    position="SDE @ Amazon"
                    testimonial="The platform makes it super easy to track my progress. I love how I can jump into any old problem, see my code, and get instant feedback from the AI. It saves me so much time!"
                    rating={5}
                />
                <SuccessStoryCard
                    initial="MP"
                    name="Mike Patel"
                    position="Frontend Developer @ Meta"
                    testimonial="The AI suggestions helped me improve my code quality and logic. The quick access to all my submissions by topic made it so easy to revise before my Meta interviews."
                    rating={4.5}
                />
            </div>
        </div>
    </div>
);

export default Testimonials;
