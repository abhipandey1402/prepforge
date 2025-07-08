import { ChevronLeft, FileText } from 'lucide-react';
 import useGoHome from '../hooks/useGoHome';
 import Footer from '../components/Footer';
import Header from '../components/Header';

 
 const TermsOfService = () => {
  const goHome = useGoHome();

 return (
    <div className="min-h-screen bg-white">
      <Header/>
      <div className="mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-8">
            <button 
              onClick={goHome}
              className="flex items-center text-orange-600 hover:text-orange-800 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Back to Homepage
            </button>
          </div>
          
          <div className="flex items-center mb-8">
            <FileText className="w-8 h-8 text-green-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Terms of Service</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">
              <strong>Effective Date:</strong> July 15, 2025<br />
              <strong>Last Updated:</strong> July 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                Welcome to Prepforge, operated by BrainBuddies Labs ("Company," "we," "us," or "our"). These Terms of Service ("Terms") govern your use of our website located at https://www.prepforge.space and any related services, including mobile applications and browser extensions (collectively, the "Service").
              </p>
              <p className="mb-4">
                By accessing or using our Service, you agree to be bound by these Terms. If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
              <p className="mb-4">
                Prepforge is an educational platform that provides study materials, practice tests, and learning tools to help users prepare for various examinations and certifications. Our services may include:
              </p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Online study materials and resources</li>
                <li>Practice tests and quizzes</li>
                <li>Progress tracking and analytics</li>
                <li>Community features and forums</li>
                <li>Browser extensions for enhanced study experience</li>
                <li>Premium subscription features</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Account Creation</h3>
              <p className="mb-4">To access certain features of our Service, you must create an account. You agree to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Maintain the security of your password</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Account Termination</h3>
              <p className="mb-4">We may terminate or suspend your account at any time for violations of these Terms or for any other reason at our sole discretion.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Acceptable Use</h2>
              <p className="mb-4">You agree not to use the Service to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Share your account credentials with third parties</li>
                <li>Distribute malware or harmful code</li>
                <li>Engage in academic dishonesty or cheating</li>
                <li>Circumvent security measures or access controls</li>
                <li>Interfere with the proper functioning of the Service</li>
                <li>Harvest or collect user information without consent</li>
                <li>Use the Service for commercial purposes without authorization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Our Content</h3>
              <p className="mb-4">
                The Service and its original content, features, and functionality are owned by BrainBuddies Labs and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 User Content</h3>
              <p className="mb-4">
                You retain ownership of any content you submit to the Service. However, by submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content for the purposes of providing and improving our Service.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.3 Third-Party Content</h3>
              <p className="mb-4">
                Our Service may contain content from third parties. We do not claim ownership of such content and respect the intellectual property rights of others.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Payment Terms</h2>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Subscription Services</h3>
              <p className="mb-4">
                Some features of our Service are available through paid subscriptions. By purchasing a subscription, you agree to pay all charges associated with your subscription.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Payment Processing</h3>
              <p className="mb-4">
                Payments are processed by third-party payment processors. We do not store your payment information on our servers.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Refunds</h3>
              <p className="mb-4">
                Refunds are handled on a case-by-case basis. Please contact <a href="mailto:support@prepforge.space" className="text-orange-600 hover:underline">support@prepforge.space</a> for refund requests.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.4 Auto-Renewal</h3>
              <p className="mb-4">
                Subscriptions automatically renew unless cancelled. You can cancel your subscription at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Privacy</h2>
              <p className="mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Disclaimers</h2>
              <p className="mb-4">
                THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS. WE MAKE NO WARRANTIES OR REPRESENTATIONS ABOUT THE ACCURACY OR COMPLETENESS OF THE CONTENT OR THE CONTENT OF ANY THIRD-PARTY SITES.
              </p>
              <p className="mb-4">
                WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                IN NO EVENT SHALL BRAINBUDDIES LABS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.
              </p>
              <p className="mb-4">
                OUR TOTAL LIABILITY SHALL NOT EXCEED THE AMOUNT YOU PAID FOR THE SERVICE IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify and hold BrainBuddies Labs harmless from any claims, damages, or expenses arising from your use of the Service or violation of these Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason, including breach of these Terms.
              </p>
              <p className="mb-4">
                Upon termination, your right to use the Service will cease immediately. All provisions that by their nature should survive termination shall survive.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which BrainBuddies Labs is incorporated, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the "Last Updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Information</h2>
              <p className="mb-4">If you have any questions about these Terms, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>BrainBuddies Labs</strong></p>
                <p>Email: <a href="mailto:support@prepforge.space" className="text-orange-600 hover:underline">support@prepforge.space</a></p>
                <p>General Support: <a href="mailto:support@prepforge.space" className="text-orange-600 hover:underline">support@prepforge.space</a></p>
                <p>Website: <a href="https://www.prepforge.space" className="text-orange-600 hover:underline">https://www.prepforge.space</a></p>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )};

  export default TermsOfService;