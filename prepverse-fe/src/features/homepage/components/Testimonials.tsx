import SuccessStoryCard from "../commonComponents/SuccessStoryCard ";

const Testimonials: React.FC = () => (
    <div className="bg-blue-950 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-3">
                Success Stories
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
                See how our platform has helped users ace their technical interviews
            </p>

            <div className="grid md:grid-cols-3 gap-8">
                <SuccessStoryCard
                    initial="JD"
                    name="John Doe"
                    position="Software Engineer @ Google"
                    testimonial="The challenge betting feature kept me consistent with my LeetCode practice. I went from solving 1 problem a week to 3 problems a day. The AI reports helped me identify my weak areas in DP and Graphs."
                    rating={5}
                />
                <SuccessStoryCard
                    initial="SR"
                    name="Sarah Ramos"
                    position="SDE @ Amazon"
                    testimonial="Betting credits with my study buddy created the perfect mix of fun and accountability. The AI analysis was spot on - it helped me realize I needed to work on my sliding window technique."
                    rating={5}
                />
                <SuccessStoryCard
                    initial="MP"
                    name="Mike Patel"
                    position="Frontend Developer @ Meta"
                    testimonial="I was struggling with consistency in my interview prep. The betting system transformed my approach - knowing my friend would win my credits if I failed kept me motivated daily!"
                    rating={4.5}
                />
            </div>
        </div>
    </div>
);

export default Testimonials;
