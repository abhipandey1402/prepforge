import React, { useState } from 'react';
import SuccessStoryCard from "../commonComponents/SuccessStoryCard";
import axiosClient from '@/interceptors/axiosClient';
import { Modal } from '../commonComponents/Modal';

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


    const handleStorySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { name, email, contact, linkedinId, message } = storyFormData;

            const payload = {
                formType: 'Success Story',
                name,
                email,
                contact,
                linkedinId,
                message
            };

            await axiosClient.post('/users/feedback', payload);

            setShowStoryModal(false);

            setStoryFormData({
                name: '',
                email: '',
                contact: '',
                linkedinId: '',
                message: ''
            });

        } catch (error) {
            console.error('Error submitting story:', error);
        }
    };


    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { name, email, contact, linkedinId, message } = feedbackFormData;

            const payload = {
                formType: 'Feedback',
                name,
                email,
                contact,
                linkedinId,
                message
            };

            await axiosClient.post('/users/feedback', payload);

            setShowFeedbackModal(false);

            setFeedbackFormData({
                name: '',
                email: '',
                contact: '',
                linkedinId: '',
                message: ''
            });
        } catch (error) {
            console.error('Error submitting story:', error);
        }
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