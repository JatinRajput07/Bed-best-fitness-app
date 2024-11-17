import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Routine from './pages/videos';
import SignIn from './pages/login';
import Dashboard from './pages/dashboard';
import SettingsPage from './pages/settings';
import UserList from './pages/Users';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/routine' element={<Routine />} />
        <Route path='/login' element={<SignIn />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/settings' element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;
