import React, { useState } from 'react';
import { Mail, MessageSquare, Code, TrendingUp, MapPin, Clock, Phone, Send, CheckCircle, AlertCircle, User, MessageCircle } from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    category: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        category: 'general',
        message: ''
      });
    }, 2000);
  };

  const contactCategories = [
    {
      id: 'general',
      title: 'General Inquiry',
      icon: MessageSquare,
      description: 'Questions about our platform or services'
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: Code,
      description: 'Issues with LeetCode integration or tracking'
    },
    {
      id: 'features',
      title: 'Feature Request',
      icon: TrendingUp,
      description: 'Suggestions for new AI insights or features'
    },
    {
      id: 'business',
      title: 'Business Partnership',
      icon: User,
      description: 'Collaboration and partnership opportunities'
    }
  ];

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      content: 'hello@leetcodeai.com',
      subtitle: 'We respond within 24 hours'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      content: 'Available 24/7',
      subtitle: 'Instant support for urgent issues'
    },
    {
      icon: Clock,
      title: 'Response Time',
      content: '< 24 hours',
      subtitle: 'Average response time for all inquiries'
    }
  ];

  const faqs = [
    {
      question: 'How does the LeetCode integration work?',
      answer: 'Simply authorize with your LeetCode account and we\'ll automatically sync all your submissions, providing AI-powered insights on your coding patterns and progress.'
    },
    {
      question: 'What kind of AI insights do you provide?',
      answer: 'We analyze your submission patterns, identify weak areas, suggest practice problems, track your improvement over time, and provide personalized recommendations.'
    },
    {
      question: 'Is my LeetCode data secure?',
      answer: 'Yes, we use enterprise-grade security measures and only access submission data with your explicit permission. We never store your login credentials.'
    },
    {
      question: 'Can I filter my submissions?',
      answer: 'Absolutely! You can filter by difficulty, topic, date range, status, and more to analyze specific aspects of your coding journey.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white">
      {/* Hero Section */}
      <Header/>
      <div className="bg-gradient-to-r from-blue-950 to-blue-950 text-white py-8 ml-18 mr-18 mt-8 rounded-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-3xl font-bold mb-6">
              Get in Touch
            </h2>
            <p className="text-xl md:text-xl mb-8 text-white max-w-3xl mx-auto">
              Have questions about our AI-powered LeetCode insights? We're here to help you master your coding journey.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-4 lg:px-8 py-10 ml-10 mr-10">
        {/* Contact Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-center mb-10 text-blue-950">
            How Can We Help You?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCategories.map((category) => (
              <div 
                key={category.id}
                className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:shadow-lg ${
                  formData.category === category.id 
                    ? 'border-orange-600 bg-orange-50 shadow-md' 
                    : 'border-gray-200 bg-white hover:border-orange-300'
                }`}
                onClick={() => setFormData(prev => ({...prev, category: category.id}))}
              >
                <category.icon className="w-8 h-8 text-orange-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-sm text-gray-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Send Us a Message</h2>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <p className="text-green-800">Message sent successfully! We'll get back to you soon.</p>
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Tell us more about your question or feedback..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-600 to-blue-950 hover:from-blue-950 hover:to-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact Information & FAQ */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Contact Information</h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{info.title}</h3>
                      <p className="text-lg text-orange-600 font-medium">{info.content}</p>
                      <p className="text-sm text-gray-600">{info.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-orange-600 to-orange-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Master LeetCode?</h2>
          <p className="text-xl mb-6 text-white">
            Join thousands of developers using AI-powered insights to improve their coding skills
          </p>
          <button className="bg-white text-orange-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300">
            Start Your Journey
          </button>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default ContactUsPage;