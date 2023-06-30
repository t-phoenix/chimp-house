import { Routes, Route } from 'react-router-dom';
import './App.css';
import TokenManager from './pages/TokenManager';
import GovernorManager from './pages/GovernorManager';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className='min-h-screen flex justify-start content-center flex-col bg-primary-gradient'>
      {/* Navigation Bar - common */}
      <Navbar />

      {/* Page Content */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/token-manager' element={<TokenManager />} />
        <Route path='/governor-manager' element={<GovernorManager />} />
      </Routes>
    </div>
  );
}

export default App;
