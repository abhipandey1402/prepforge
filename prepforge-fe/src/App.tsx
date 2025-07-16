import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './features/homepage/Homepage';
import AuthPage from './features/user/pages/AuthPage';
import ProtectedRoutes from './features/globalFeatures/components/ProtectedRoutes';
import Dashboard from './features/dashboard/pages/Dashboard';
import PrivacyPolicy from './features/homepage/pages/PrivacyPolicy';
import TermsOfService from './features/homepage/pages/TermsOfService';
import CookiePolicy from './features/homepage/pages/CookiePolicy';
import AboutUsPage from './features/homepage/pages/AboutUs';
import ContactUsPage from './features/homepage/pages/ContactUs';
import VerifyEmailPage from './features/user/pages/VerifyEmailPage';


function App() {

  return (
    <BrowserRouter>
      <div>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/auth' element={<AuthPage/>} />
          <Route path='/verify-email' element={<VerifyEmailPage/>} />
          <Route path='/privacy-policy' element={<PrivacyPolicy/>} />
          <Route path='/terms-service' element={<TermsOfService/>} />
          <Route path='/cookie-policy' element={<CookiePolicy/>} />
          <Route path='/about' element={<AboutUsPage/>} />
          <Route path='/contact' element={<ContactUsPage/>} />


          <Route element={<ProtectedRoutes/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
