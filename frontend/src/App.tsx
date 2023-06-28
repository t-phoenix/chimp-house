import {Routes, Route} from 'react-router-dom';
import './App.css';
import TokenManager from './pages/TokenManager';
import GovernorManager from './pages/GovernorManager';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';

function App() {

  return (
    <div className='container min-h-screen flex justify-start content-center flex-col' >

      <div style={{flexDirection: 'column', justifyContent: 'flex-start'}}>
        {/* Navigation Bar - common */}
        <Navbar />

        {/* Page Content */}
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/token-manager" element={<TokenManager />}/>
          <Route path="/governor-manager" element={<GovernorManager />}/>
        </Routes>
      </div>

    </div>

  );
}

export default App;
