import { Link } from 'react-router-dom';

const Footer: React.FC = () => {

    return (
        <footer className="bg-white text-gray-700 py-6 border-t border-gray-200">
            <div className="container mx-auto px-4">
                {/* Top Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-2">
                    {/* Brand Column */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img src="https://res.cloudinary.com/dbzi19ec6/image/upload/v1752592047/icon128_vsu3tt.png" alt="prepforge-logo" className='w-10 h-10 rounded' />
                            <span className="font-bold text-xl text-neutral-950">PrepForge</span>
                        </div>
                        <p className="text-sm mb-4">
                            The ultimate platform to master LeetCode and ace your technical interviews with AI insights.
                        </p>
                        {/* <div className="flex space-x-4">
                            <a href="#" className="hover:text-orange-600">
                                <Github className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-orange-600">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="hover:text-orange-600">
                                <Linkedin className="h-5 w-5" />
                            </a>
                        </div> */}
                    </div>

                    {/* Features */}
                    {/* <div>
                        <h3 className="font-medium text-white mb-4">Features</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Problem Tracking</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">AI Analysis</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Challenge Betting</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Progress Reports</a></li>
                        </ul>
                    </div> */}

                    {/* Resources */}
                    {/* <div>
                        <h3 className="font-medium text-white mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">API</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Tutorials</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Blog</a></li>
                        </ul>
                    </div> */}

                    {/* Company Info */}
                    {/* <div>
                        <h3 className="font-medium text-white mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-orange-600 transition-colors">About</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Careers</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Contact</a></li>
                            <li><a href="#" className="hover:text-orange-600 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div> */}
                </div>

                {/* Bottom Legal Row */}
                <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-sm mb-4 md:mb-0">
                        © 2025 PrepForge. All rights reserved.
                    </div>
                    <div className="flex space-x-4 text-xs">
                        <Link to="/terms-service" className="hover:text-orange-600 transition-colors">
                            Terms of Service
                        </Link>
                        <Link to="/privacy-policy" className="hover:text-orange-600 transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/cookie-policy" className="hover:text-orange-600 transition-colors">
                            Cookie Policy
                        </Link>
                        <Link to="/contact" className="hover:text-orange-600 transition-colors">
                            Contact us
                        </Link>
                        <Link to="/about" className="hover:text-orange-600 transition-colors">
                            About us
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
