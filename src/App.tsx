import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { HomePage } from './pages/Home/HomePage';
import { ExplorePage } from './pages/Explore/ExplorePage';
import { AnalysisPage } from './pages/Analysis/AnalysisPage';
import './styles/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Protected / App Routes with Sidebar Layout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/analyze" element={<AnalysisPage />} />
          
          {/* Placeholders for other nav items */}
          <Route path="/universe" element={<Navigate to="/dashboard" replace />} />
          <Route path="/personality" element={<Navigate to="/dashboard" replace />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
