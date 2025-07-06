import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Homepage from './features/homepage/Homepage';
import AuthPage from './features/user/pages/AuthPage';
import ProtectedRoutes from './features/globalFeatures/components/ProtectedRoutes';
import Dashboard from './features/dashboard/pages/Dashboard';

function App() {

  return (
    <BrowserRouter>
      <div>
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/auth' element={<AuthPage/>} />

          <Route element={<ProtectedRoutes/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
