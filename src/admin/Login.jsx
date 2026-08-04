import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gamepad2, Lock, User, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('login'); // 'login', 'forgot-email', 'forgot-otp'
  
  // Forgot Password State
  const [resetEmail, setResetEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(username, password);
      // Expected payload format: { token, username, email, role }
      const userData = {
        username: data.username,
        email: data.email,
        role: data.role
      };
      login(userData, data.token, data.refreshToken);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        "Invalid administrator username or password."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await authService.forgotPassword(resetEmail);
      setView('forgot-otp');
      setSuccessMsg('An OTP has been sent to your email.');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request password reset.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);
    try {
      await authService.resetPassword(resetEmail, otpCode, newPassword);
      setView('login');
      setSuccessMsg('Password has been successfully reset. Please log in.');
      setResetEmail('');
      setOtpCode('');
      setNewPassword('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-card fade-in">
        <div className="login-header">
          <div className="login-logo">
            <Gamepad2 size={32} color="#8b5cf6" />
            <span>YONO</span>ADMIN
          </div>
          <p>Sign in with your secure credentials to manage blogs</p>
        </div>

        {error && <div className="login-error">{error}</div>}
        {successMsg && <div className="login-error" style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', color: '#22c55e', borderLeftColor: '#22c55e' }}>{successMsg}</div>}

        {view === 'login' && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                id="username" 
                required 
                className="form-input" 
                style={{ paddingLeft: '40px', width: '100%' }}
                placeholder="Admin username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                id="password" 
                required 
                className="form-input" 
                style={{ paddingLeft: '40px', width: '100%' }}
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
              <Link 
                to="#" 
                onClick={(e) => { 
                  e.preventDefault(); 
                  setView('forgot-email');
                  setError('');
                  setSuccessMsg('');
                }} 
                style={{ fontSize: '0.85rem', color: '#8b5cf6', textDecoration: 'none', fontWeight: '500' }}>
                Forgot Password?
              </Link>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-premium btn-purple login-btn"
            disabled={loading}
          >
            <span>{loading ? 'Verifying...' : 'Sign In'}</span>
          </button>
        </form>
        )}

        {view === 'forgot-email' && (
        <form onSubmit={handleForgotPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enter your email address to receive an OTP to reset your password.</p>
          <div className="form-group">
            <label htmlFor="resetEmail">Email Address</label>
            <input 
              type="email" 
              id="resetEmail" 
              required 
              className="form-input" 
              placeholder="admin@yonostoreapp.com"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn-premium btn-purple login-btn" disabled={loading}>
            <span>{loading ? 'Sending...' : 'Send OTP'}</span>
          </button>
          <button type="button" onClick={() => setView('login')} className="btn-premium btn-outline" style={{ marginTop: '8px' }}>
            Back to Login
          </button>
        </form>
        )}

        {view === 'forgot-otp' && (
        <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Enter the 6-digit OTP sent to <strong>{resetEmail}</strong></p>
          <div className="form-group">
            <label htmlFor="otpCode">OTP Code</label>
            <input 
              type="text" 
              id="otpCode" 
              required 
              className="form-input" 
              placeholder="123456"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              disabled={loading}
              maxLength="6"
            />
          </div>
          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>
            <input 
              type="password" 
              id="newPassword" 
              required 
              className="form-input" 
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              disabled={loading}
              minLength="8"
            />
          </div>
          <button type="submit" className="btn-premium btn-purple login-btn" disabled={loading}>
            <span>{loading ? 'Resetting...' : 'Reset Password'}</span>
          </button>
          <button type="button" onClick={() => setView('login')} className="btn-premium btn-outline" style={{ marginTop: '8px' }}>
            Back to Login
          </button>
        </form>
        )}

        <Link to="/" className="back-to-web-btn">
          <ArrowLeft size={14} /> Back to Website
        </Link>
      </div>
    </div>
  );
};

export default Login;
