import React from 'react';
import { 
  Brain, 
  Code, 
  TrendingUp, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Award,
  Github,
  Linkedin,
  Twitter,
  Mail,
  ChevronRight,
  Star,
  BookOpen,
  BarChart3,
  Lightbulb
} from 'lucide-react';
import Footer from '../components/Footer';
import Header from '../components/Header';

const AboutUsPage: React.FC = () => {
  const teamMembers = [
    {
      name: "Alex Chen",
      role: "CEO & Co-Founder",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      bio: "Former Google SWE with 8+ years in algorithmic problem solving and AI systems.",
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    {
      name: "Sarah Kim",
      role: "CTO & Co-Founder", 
      image: "https://images.unsplash.com/photo-1494790108755-2616b69ab027?w=400&h=400&fit=crop&crop=face",
      bio: "Ex-Microsoft engineer specializing in machine learning and developer tools.",
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    {
      name: "David Rodriguez",
      role: "Head of AI",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "PhD in ML from Stanford, former researcher at OpenAI focusing on code analysis.",
      linkedin: "#",
      twitter: "#",
      github: "#"
    },
    {
      name: "Emily Zhang",
      role: "Product Manager",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Former Amazon PM with expertise in developer experience and educational platforms.",
      linkedin: "#",
      twitter: "#",
      github: "#"
    }
  ];

  const milestones = [
  {
    year: "May 2025",
    title: "Project Kickoff",
    description: "The idea of PrepForge was born — a unified platform to help developers track, analyze, and improve their coding practice."
  },
  {
    year: "June 2025",
    title: "PrepForge Beta Launch",
    description: "Initial launch with LeetCode submission sync, solved problem tracking, and basic community chat features."
  },
  {
    year: "July 2025",
    title: "Chrome Extension Released",
    description: "Launch of our Chrome extension to authorize LeetCode accounts securely using session tokens."
  },
  {
    year: "August 2025",
    title: "AI Insights & Smart Suggestions",
    description: "Intelligent analysis of submissions with personalized problem recommendations, weak-topic detection, and progress scoring."
  },
  {
    year: "September 2025",
    title: "Coming Soon...",
    description: "More powerful features like study streaks, buddy challenges, and in-depth analytics are on the way!"
  }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-orange-600" />,
      title: "Excellence",
      description: "We strive for the highest quality in everything we build, from code to user experience."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
      title: "Innovation",
      description: "We leverage cutting-edge AI to transform how developers approach problem-solving."
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: "Community",
      description: "We believe in the power of shared knowledge and collaborative learning."
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: "Trust",
      description: "We maintain the highest standards of security and privacy for our users."
    }
  ];

  const features = [
    {
      icon: <Brain className="w-12 h-12 text-orange-600" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms analyze your coding patterns and provide personalized insights to accelerate your growth."
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-green-600" />,
      title: "Submission Tracking",
      description: "Comprehensive tracking of all your LeetCode submissions with advanced filtering and progress visualization."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-purple-600" />,
      title: "Problem Curation",
      description: "Smart problem recommendations based on your skill level, weaknesses, and career goals."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-orange-600" />,
      title: "Performance Analytics",
      description: "Detailed performance metrics and trends to help you identify areas for improvement."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-white">
      {/* Hero Section */}
      <Header/>
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            About <span className="text-orange-600">Prepforge</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            We're revolutionizing how developers master algorithmic problem-solving through AI-powered insights and seamless LeetCode integration.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-lg">
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-lg">
              <Users className="w-5 h-5 text-orange-600 mr-2" />
              <span className="text-gray-700">50+ Active Users</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-lg">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              <span className="text-gray-700">4.9/5 Rating</span>
            </div>
            <div className="flex items-center bg-white px-6 py-3 rounded-full shadow-lg">
              <Code className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-gray-700">5k+ Problems Solved</span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At BrainBuddies Labs, we believe that every developer deserves access to personalized, AI-powered learning tools that accelerate their growth and career success.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Prepforge was born from the frustration of traditional coding practice methods. We saw developers spending countless hours on problems without clear direction or understanding of their progress patterns.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our platform bridges this gap by providing intelligent insights, seamless LeetCode integration, and personalized learning paths that adapt to each developer's unique journey.
              </p>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-r from-orange-600 to-blue-950 rounded-2xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6 text-white">
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">95%</div>
                    <div className="text-sm opacity-90">User Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">3x</div>
                    <div className="text-sm opacity-90">Faster Learning</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">85%</div>
                    <div className="text-sm opacity-90">Interview Success</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold mb-2">24/7</div>
                    <div className="text-sm opacity-90">AI Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Makes Us Different</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge AI with deep understanding of developer needs to create the most effective coding practice platform.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do at BrainBuddies Labs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 ml-14 mr-14 bg-gradient-to-r from-orange-600 to-blue-950 rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Passionate engineers and educators dedicated to transforming how developers learn and grow.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  <a href={member.linkedin} className="text-gray-400 hover:text-orange-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href={member.twitter} className="text-gray-400 hover:text-orange-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href={member.github} className="text-gray-400 hover:text-orange-600 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-xl text-gray-600">
              From idea to impact - see how we've grown to serve thousands of developers.
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-orange-200"></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <div className="text-orange-600 font-bold text-lg mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-orange-600 rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 ml-14 mr-14 bg-gradient-to-r from-orange-600 to-blue-950 rounded-2xl">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Transform Your Coding Journey?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who have accelerated their growth with Prepforge's AI-powered insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
              Get Started Free
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-orange-600 transition-colors">
              View Demo
            </button>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default AboutUsPage;