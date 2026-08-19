import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { DashboardLayout } from './layouts/DashboardLayout';
import { HomePage } from './pages/Home/HomePage';
import { ExplorePage } from './pages/Explore/ExplorePage';
import { AnalysisPage } from './pages/Analysis/AnalysisPage';
import { ProcessingPage } from './pages/Analysis/ProcessingPage';
import { AnalysisResultPage } from './pages/Analysis/AnalysisResultPage';
import { PersonalityPage } from './pages/Personality/PersonalityPage';
import { PersonalitySetupPage } from './pages/Personality/PersonalitySetupPage';
import { ProfilePage } from './pages/Profile/ProfilePage';
import { SettingsPage } from './pages/Settings/SettingsPage';
import { AuthLayout } from './layouts/AuthLayout';
import { LoginPage } from './pages/Auth/LoginPage';
import { RegisterPage } from './pages/Auth/RegisterPage';
import { ResetPasswordPage } from './pages/Auth/ResetPasswordPage';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import './styles/App.css';

import { MusicUniversePage } from './pages/MusicUniverse/MusicUniversePage';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
          </Route>

          {/* Protected / App Routes with Sidebar Layout */}
          <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
            <Route path="/dashboard" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/analyze" element={<AnalysisPage />} />
            <Route path="/processing" element={<ProcessingPage />} />
            <Route path="/analyze/result" element={<AnalysisResultPage />} />
            <Route path="/personality/report" element={<PersonalityPage />} />
            <Route path="/personality/setup" element={<PersonalitySetupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/universe" element={<MusicUniversePage />} />
            
            <Route path="/personality" element={<Navigate to="/profile" replace />} />
          </Route>

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
