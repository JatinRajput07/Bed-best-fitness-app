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
import VideoList from './pages/VideoList';
import AssignHost from './pages/AssignHost';



const routes = [
  { path: '/', component: Dashboard },
  { path: '/login', component: SignIn },
  { path: '/routine', component: Routine },
  { path: '/users', component: UserList },
  { path: '/user/assign_host', component: AssignHost },
  { path: '/video', component: VideoList },
  { path: '/video/upload-video-files', component: UploadFile },
  { path: '/settings', component: SettingsPage },
  { path: '/cms/privacy-policy', component: PrivacyPolicy },
  { path: '/cms/terms-conditions', component: TermsAndConditions },
  { path: '/cms/contact-us', component: ContactUs },
];


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
