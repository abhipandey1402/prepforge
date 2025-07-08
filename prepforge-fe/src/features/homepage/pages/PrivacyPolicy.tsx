 import { ChevronLeft, Shield } from 'lucide-react';
 import useGoHome from '../hooks/useGoHome';
 import Footer from '../components/Footer';
import Header from '../components/Header';

 
 const PrivacyPolicy = () => {
  const goHome = useGoHome();
  
  return(
    <div className="min-h-screen bg-white" >
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
            <Shield className="w-8 h-8 text-orange-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Privacy Policy</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">
              <strong>Effective Date:</strong> July 15, 2025<br />
              <strong>Last Updated:</strong> July 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to Prepforge, operated by BrainBuddies Labs ("we," "us," or "our"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at https://www.prepforge.space and use our services, including any potential future Chrome extension.
              </p>
              <p className="mb-4">
                We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This policy outlines our practices concerning the collection and use of your information and tells you how to contact us if you have questions or concerns.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Personal Information</h3>
              <p className="mb-4">We may collect the following types of personal information:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Name and contact information (email address, phone number)</li>
                <li>Account credentials (username, password)</li>
                <li>Profile information (educational background, preferences)</li>
                <li>Payment information (processed securely through third-party payment processors)</li>
                <li>Communication records (support tickets, feedback)</li>
                <li>Usage data and learning progress</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Automatically Collected Information</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device information (operating system, screen resolution)</li>
                <li>Website usage statistics and analytics</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Extension usage data (if using our Chrome extension)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Chrome Extension Data</h3>
          <p className="mb-4">
  If you use our Chrome extension, we may collect the following limited data solely to facilitate your experience with our platform:
</p>
<ul className="list-disc list-inside mb-4 space-y-2">
  <li>Session token from LeetCode.com: This is fetched with your permission to authenticate and authorize your LeetCode account on our platform.</li>
  <li>Extension interaction data: Minimal interaction logs may be recorded to improve reliability and user experience.</li>
  <li>Performance metrics: Anonymous metrics may be collected to help us optimize extension performance across devices.</li>
</ul>
<p className="text-sm text-gray-600 italic">
  🔐 Note: Our Chrome extension performs a <strong>single, focused task</strong> — securely retrieving your LeetCode session token and transmitting it to our platform to enable authorized access to your LeetCode submissions. We do <strong>not</strong> track your browsing activity or collect unrelated personal data.
</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Providing and maintaining our services</li>
                <li>Processing payments and transactions</li>
                <li>Personalizing your learning experience</li>
                <li>Communicating with you about your account and updates</li>
                <li>Providing customer support</li>
                <li>Analyzing usage patterns to improve our platform</li>
                <li>Ensuring security and preventing fraud</li>
                <li>Complying with legal obligations</li>
                <li>Marketing and promotional communications (with your consent)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Information Sharing and Disclosure</h2>
              <p className="mb-4">We may share your information in the following circumstances:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.1 Service Providers</h3>
              <p className="mb-4">We may share information with trusted third-party service providers who assist us in operating our platform, including:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Payment processors (Stripe, PayPal, etc.)</li>
                <li>Cloud hosting providers</li>
                <li>Analytics services</li>
                <li>Customer support tools</li>
                <li>Email service providers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.2 Legal Requirements</h3>
              <p className="mb-4">We may disclose your information if required by law or in response to valid requests by public authorities.</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">4.3 Business Transfers</h3>
              <p className="mb-4">In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Data Security</h2>
              <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and assessments</li>
                <li>Access controls and authentication measures</li>
                <li>Secure coding practices</li>
                <li>Regular staff training on data protection</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Rights and Choices</h2>
              <p className="mb-4">You have the following rights regarding your personal information:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Access: Request access to your personal information</li>
                <li>Rectification: Request correction of inaccurate information</li>
                <li>Erasure: Request deletion of your personal information</li>
                <li>Portability: Request transfer of your data</li>
                <li>Restriction: Request limitation of processing</li>
                <li>Objection: Object to processing of your information</li>
                <li>Withdraw consent: Withdraw consent for data processing</li>
              </ul>
              <p className="mb-4">To exercise these rights, contact us at <a href="mailto:support@prepforge.space" className="text-orange-600 hover:underline">support@prepforge.space</a>.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Retention</h2>
              <p className="mb-4">We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Account information is typically retained for the duration of your account plus 1 year for legal and compliance purposes.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. International Data Transfers</h2>
              <p className="mb-4">Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for such transfers, including standard contractual clauses and adequacy decisions.</p>
            </section>


            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Changes to This Policy</h2>
              <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. Your continued use of our services after such changes constitutes acceptance of the updated policy.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Information</h2>
              <p className="mb-4">If you have any questions about this Privacy Policy, please contact us:</p>
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


  export default PrivacyPolicy;