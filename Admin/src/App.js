import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Routine from './pages/videos';
import SignIn from './pages/login';
import Dashboard from './pages/dashboard';
import SettingsPage from './pages/settings';
import UserList from './pages/Users';
import PrivacyPolicy from './pages/CMS/PrivacyPolicy';
import TermsAndConditions from './pages/CMS/TermsAndConditions';
import ContactUs from './pages/CMS/ContactUs';
import UploadFile from './pages/Uploadfiles';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/routine' element={<Routine />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/upload-video-files' element={<UploadFile />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/cms/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/cms/terms-conditions' element={<TermsAndConditions />} />
        <Route path='/cms/contact-us' element={<ContactUs/>} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
