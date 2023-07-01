import { Routes, Route } from 'react-router-dom';
import './App.css';
import TokenManager from './pages/TokenManager';
import GovernorManager from './pages/GovernorManager';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CreateProposal from './pages/CreateProposal';
import ProposalDetails from './pages/ProposalDetails';

function App() {
  return (
    <div className='min-h-screen flex justify-start content-center flex-col bg-background'>
      {/* Navigation Bar - common */}
      <Navbar />

      {/* Page Content */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/token-manager' element={<TokenManager />} />
        <Route path='/governor-manager' element={<GovernorManager />} />
        <Route path='/create-proposal' element={<CreateProposal />} />
        <Route path='/proposal-details/:id' element={<ProposalDetails />} />
      </Routes>
    </div>
  );
}

export default App;
