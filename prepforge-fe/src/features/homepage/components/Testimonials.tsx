// import SuccessStoryCard from "../commonComponents/SuccessStoryCard";

// const Testimonials: React.FC = () => (
//     <div className="bg-white py-10 px-4 relative">
//         <div className="container mx-auto px-4 rounded-2xl">
//             <h2 className="text-3xl font-bold text-center text-neutral-950 mb-3">
//                 Success Stories
//             </h2>
//             <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
//                 See how our platform helps users simplify their LeetCode journey with AI-powered insights and seamless code tracking.
//             </p>

//             {/* Blurred Content with Overlay */}
//             <div className="relative">
//                 <div className="grid md:grid-cols-3 gap-8 blur-sm pointer-events-none">
//                     <SuccessStoryCard
//                         initial="JD"
//                         name="John Doe"
//                         position="Software Engineer @ Google"
//                         testimonial="Being able to revisit my past submissions and run through them quickly has completely changed how I revise. The AI summaries are incredibly helpful in spotting mistakes and learning patterns."
//                         rating={5}
//                     />
//                     <SuccessStoryCard
//                         initial="SR"
//                         name="Sarah Ramos"
//                         position="SDE @ Amazon"
//                         testimonial="The platform makes it super easy to track my progress. I love how I can jump into any old problem, see my code, and get instant feedback from the AI. It saves me so much time!"
//                         rating={5}
//                     />
//                     <SuccessStoryCard
//                         initial="MP"
//                         name="Mike Patel"
//                         position="Frontend Developer @ Meta"
//                         testimonial="The AI suggestions helped me improve my code quality and logic. The quick access to all my submissions by topic made it so easy to revise before my Meta interviews."
//                         rating={4.5}
//                     />
//                 </div>

//                 {/* Overlay with CTA */}
//                 <div className="absolute inset-0 flex items-center justify-center">
//                     <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto text-center shadow-2xl border border-gray-200">
//                         <div className="text-4xl mb-4">🌟</div>
//                         <h3 className="text-2xl font-bold text-blue-950 mb-3">
//                             Share Your Success Story
//                         </h3>
//                         <p className="text-gray-600 mb-6">
//                             Have you improved your coding skills using PrepForge? Share your experience and be among the first to get featured in our success stories section!
//                         </p>
//                         <div className="flex flex-col sm:flex-row gap-3 justify-center">
//                             <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg">
//                                 Share Your Story
//                             </button>
//                             <button className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300">
//                                 Give Feedback
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// );

// export default Testimonials;

import React, { useState } from 'react';
import SuccessStoryCard from "../commonComponents/SuccessStoryCard";

interface FormData {
    name: string;
    email: string;
    contact?: string;
    linkedinId?: string;
    message: string;
}

const Testimonials: React.FC = () => {
    const [showStoryModal, setShowStoryModal] = useState(false);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const [storyFormData, setStoryFormData] = useState<FormData>({
        name: '',
        email: '',
        contact: '',
        linkedinId: '',
        message: ''
    });
    const [feedbackFormData, setFeedbackFormData] = useState<FormData>({
        name: '',
        email: '',
        contact: '',
        linkedinId: '',
        message: ''
    });

    const handleStorySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle story submission logic here
        console.log('Story submitted:', storyFormData);
        setShowStoryModal(false);
        // Reset form
        setStoryFormData({
            name: '',
            email: '',
            contact: '',
            linkedinId: '',
            message: ''
        });
    };

    const handleFeedbackSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle feedback submission logic here
        console.log('Feedback submitted:', feedbackFormData);
        setShowFeedbackModal(false);
        // Reset form
        setFeedbackFormData({
            name: '',
            email: '',
            contact: '',
            linkedinId: '',
            message: ''
        });
    };

    const Modal = ({
        isOpen,
        onClose,
        title,
        formData,
        setFormData,
        onSubmit,
        messagePlaceholder
    }: {
        isOpen: boolean;
        onClose: () => void;
        title: string;
        formData: FormData;
        setFormData: React.Dispatch<React.SetStateAction<FormData>>;
        onSubmit: (e: React.FormEvent) => void;
        messagePlaceholder: string;
    }) => {
        if (!isOpen) return null;

        return (
            <div className="fixed inset-0 bg-white/20 backdrop-blur-md flex items-center justify-center z-50">
                <div className="bg-white rounded-2xl p-4 max-w-[50%] w-full max-h-[95vh] overflow-y-auto shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-2xl font-bold text-blue-950">{title}</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                        >
                            ×
                        </button>
                    </div>

                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className='flex justify-between w-full gap-4'>
                            <div className='w-[50%]'>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className='w-[50%]'>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your email address"
                                />
                            </div>
                        </div>

                        <div className='flex justify-between w-full gap-4'>
                            <div className='w-[50%]'>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contact Number (Optional)
                                </label>
                                <input
                                    type="tel"
                                    value={formData.contact}
                                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your contact number"
                                />
                            </div>

                            <div className='w-[50%]'>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    LinkedIn ID
                                </label>
                                <input
                                    type="text"
                                    value={formData.linkedinId}
                                    onChange={(e) => setFormData({ ...formData, linkedinId: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Enter your LinkedIn profile URL or username"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                                placeholder={messagePlaceholder}
                            />
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold transition-colors duration-300"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-white py-10 px-4 relative">
            <div className="container mx-auto px-4 rounded-2xl">
                <h2 className="text-3xl font-bold text-center text-neutral-950 mb-3">
                    Success Stories
                </h2>
                <p className="text-center text-gray-400 mb-16 max-w-3xl mx-auto">
                    See how our platform helps users simplify their LeetCode journey with AI-powered insights and seamless code tracking.
                </p>

                {/* Blurred Content with Overlay */}
                <div className="relative">
                    <div className="grid md:grid-cols-3 gap-8 blur-sm pointer-events-none">
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

                    {/* Overlay with CTA */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 max-w-lg mx-auto text-center shadow-2xl border border-gray-200">
                            <div className="text-4xl mb-4">🌟</div>
                            <h3 className="text-2xl font-bold text-blue-950 mb-3">
                                Share Your Success Story
                            </h3>
                            <p className="text-gray-600 mb-6">
                                Have you improved your coding skills using PrepForge? Share your experience and be among the first to get featured in our success stories section!
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button
                                    onClick={() => setShowStoryModal(true)}
                                    className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300 shadow-lg"
                                >
                                    Share Your Story
                                </button>
                                <button
                                    onClick={() => setShowFeedbackModal(true)}
                                    className="bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
                                >
                                    Give Feedback
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Story Modal */}
            <Modal
                isOpen={showStoryModal}
                onClose={() => setShowStoryModal(false)}
                title="Share Your Success Story"
                formData={storyFormData}
                setFormData={setStoryFormData}
                onSubmit={handleStorySubmit}
                messagePlaceholder="Tell us about your success story with PrepForge. How did our platform help you improve your coding skills and achieve your goals?"
            />

            {/* Feedback Modal */}
            <Modal
                isOpen={showFeedbackModal}
                onClose={() => setShowFeedbackModal(false)}
                title="Give Feedback"
                formData={feedbackFormData}
                setFormData={setFeedbackFormData}
                onSubmit={handleFeedbackSubmit}
                messagePlaceholder="We'd love to hear your feedback about PrepForge. What features do you like? What can we improve?"
            />
        </div>
    );
};

export default Testimonials;