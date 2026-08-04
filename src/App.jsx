import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import AppRoutes from './routes/AppRoutes';
import MobileContact from './components/MobileContact';

function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          {/* Global Neon Background Ambient Glows */}
          <div className="bg-glow-wrapper">
            <div className="bg-glow-1"></div>
            <div className="bg-glow-2"></div>
            <div className="bg-glow-3"></div>
          </div>
          
          {/* Declarative App Routes */}
          <AppRoutes />
          
          <MobileContact />
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
