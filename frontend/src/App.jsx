import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import CalculatorPage from './pages/CalculatorPage';
import ResultsPage from './pages/ResultsPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen relative flex flex-col items-center overflow-hidden bg-background">
        
        <div className="fixed inset-0 z-0 pointer-events-none w-full h-full bg-grid-pattern"></div>
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-blob"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none animate-blob animation-delay-2000"></div>

        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 z-10 relative">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
