  import { ChevronLeft, Cookie } from 'lucide-react';
 import useGoHome from '../hooks/useGoHome';
import Footer from '../components/Footer';
import Header from '../components/Header';

 
 const CookiePolicy = () =>{
  const goHome = useGoHome();

  return(
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
            <Cookie className="w-8 h-8 text-orange-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-800">Cookie Policy</h1>
          </div>
          
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-sm text-gray-500 mb-6">
              <strong>Effective Date:</strong> July 15, 2025<br />
              <strong>Last Updated:</strong> July 15, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to website owners.
              </p>
              <p className="mb-4">
                This Cookie Policy explains how BrainBuddies Labs ("we," "us," or "our") uses cookies and similar technologies on our website https://www.prepforge.space and any related services, including potential Chrome extensions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.1 Essential Cookies</h3>
              <p className="mb-4">These cookies are necessary for the website to function properly and cannot be switched off in our systems. They are usually set in response to actions made by you which amount to a request for services, such as:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Setting your privacy preferences</li>
                <li>Logging in or filling in forms</li>
                <li>Maintaining your session during your visit</li>
                <li>Enabling security features</li>
                <li>Load balancing</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.2 Performance Cookies</h3>
              <p className="mb-4">These cookies collect information about how visitors use our website, including:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Which pages are visited most often</li>
                <li>How long users spend on each page</li>
                <li>Error messages users receive</li>
                <li>How users navigate through the site</li>
                <li>Application performance metrics</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.3 Functionality Cookies</h3>
              <p className="mb-4">These cookies allow the website to remember choices you make and provide enhanced, more personalized features:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Remembering your login details</li>
                <li>Storing your preferences and settings</li>
                <li>Personalizing content based on your interests</li>
                <li>Remembering your progress in courses</li>
                <li>Customizing your dashboard layout</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.4 Targeting/Advertising Cookies</h3>
              <p className="mb-4">These cookies may be set through our site by our advertising partners:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Building a profile of your interests</li>
                <li>Showing you relevant advertisements</li>
                <li>Measuring the effectiveness of advertising campaigns</li>
                <li>Limiting the number of times you see an advertisement</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">2.5 Analytics Cookies</h3>
              <p className="mb-4">We use analytics cookies to understand how users interact with our website:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Google Analytics for website traffic analysis</li>
                <li>User behavior tracking and heatmaps</li>
                <li>Conversion tracking for marketing campaigns</li>
                <li>A/B testing for website optimization</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Third-Party Cookies</h2>
              <p className="mb-4">We may also use third-party cookies from the following providers:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.1 Google Services</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Google Analytics for website analytics</li>
                <li>Google Ads for advertising</li>
                <li>Google Fonts for web fonts</li>
                <li>reCAPTCHA for spam protection</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.2 Payment Processors</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Stripe for payment processing</li>
                <li>PayPal for payment processing</li>
                <li>Other authorized payment gateways</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.3 Social Media</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Facebook for social sharing and advertising</li>
                <li>Twitter for social sharing</li>
                <li>LinkedIn for professional networking</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">3.4 Support and Communication</h3>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Intercom for customer support</li>
                <li>Zendesk for ticket management</li>
                <li>Mailchimp for email marketing</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Browser Extension Cookies</h2>
              <p className="mb-4">If you use our Chrome extension, we may use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Synchronize your study progress across devices</li>
                <li>Remember your extension preferences</li>
                <li>Provide personalized study recommendations</li>
                <li>Track extension usage for improvements</li>
                <li>Maintain your session across browser restarts</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. How Long Do Cookies Last?</h2>
              <p className="mb-4">Cookies can be either session cookies or persistent cookies:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.1 Session Cookies</h3>
              <p className="mb-4">These cookies are temporary and are deleted when you close your browser. They are used to remember your actions during a single browsing session.</p>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">5.2 Persistent Cookies</h3>
              <p className="mb-4">These cookies remain on your device for a set period or until you delete them. Our persistent cookies typically last:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Authentication cookies: 30 days</li>
                <li>Preference cookies: 1 year</li>
                <li>Analytics cookies: 2 years</li>
                <li>Advertising cookies: 30 days to 2 years</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Your Cookie Choices</h2>
              <p className="mb-4">You have several options for managing cookies:</p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.1 Browser Settings</h3>
              <p className="mb-4">Most browsers allow you to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>View and delete cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block third-party cookies</li>
                <li>Clear all cookies when you close the browser</li>
                <li>Set up notifications when cookies are set</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.2 Cookie Consent Manager</h3>
              <p className="mb-4">We provide a cookie consent manager that allows you to:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Accept or reject non-essential cookies</li>
                <li>Manage your preferences by cookie category</li>
                <li>Change your preferences at any time</li>
                <li>Learn more about each cookie's purpose</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mb-3">6.3 Opt-Out Links</h3>
              <p className="mb-4">You can opt out of certain cookies using these links:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-orange-600 hover:underline">Google Analytics Opt-out</a></li>
                <li>Google Ads: <a href="https://adssettings.google.com/" className="text-orange-600 hover:underline">Google Ads Settings</a></li>
                <li>Facebook: <a href="https://www.facebook.com/help/568137493302217" className="text-orange-600 hover:underline">Facebook Cookie Settings</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Impact of Disabling Cookies</h2>
              <p className="mb-4">If you choose to disable cookies, some features of our website may not function properly:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>You may need to re-enter your login credentials frequently</li>
                <li>Your preferences and settings may not be saved</li>
                <li>Some interactive features may not work correctly</li>
                <li>The website may not remember your progress</li>
                <li>You may see less relevant content and advertisements</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Mobile Applications</h2>
              <p className="mb-4">Our mobile applications may use similar technologies to cookies, including:</p>
              <ul className="list-disc list-inside mb-4 space-y-2">
                <li>Local storage for app preferences</li>
                <li>Device identifiers for analytics</li>
                <li>Push notification tokens</li>
                <li>App usage analytics</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Updates to This Policy</h2>
              <p className="mb-4">We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by updating the "Last Updated" date at the top of this policy.</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Contact Information</h2>
              <p className="mb-4">If you have any questions about our use of cookies or this Cookie Policy, please contact us:</p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>BrainBuddies Labs</strong></p>
                <p>Email: <a href="mailto:support@prepforge.space" className="text-orange-600 hover:underline">support@prepforge.space</a></p>
                <p>General Support: <a href="mailto:support@prepforge.space" className="text-orange-600 hover:underline">support@prepforge.space</a></p>
                <p>Website: <a href="https://www.prepforge.space" className="text-orange-600 hover:underline">https://www.prepforge.space</a></p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Detailed Cookie List</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Cookie Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Duration</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">Type</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">pf_session</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">User session management</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Session</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Essential</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">pf_preferences</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Store user preferences</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 year</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Functional</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">_ga</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Google Analytics tracking</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 years</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Analytics</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">pf_auth</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Authentication token</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">30 days</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Essential</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">pf_consent</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cookie consent preferences</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 year</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Essential</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )};

  export default CookiePolicy;