import React, { useState } from 'react';
import { Key, User, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AddBlog.css'; // Reuse form/panel styles

const Profile = () => {
  const { user } = useAuth();
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    
    setSubmitting(true);
    setTimeout(() => {
      alert("Security credentials updated successfully. (Simulation completed)");
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="admin-profile-page fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="text-gradient">Security & Profile</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Review security protocols and configure administrative settings.</p>
        </div>
      </div>

      <div className="blog-form-grid" style={{ marginTop: '20px' }}>
        {/* Left column: Admin Info */}
        <div className="form-main-column">
          <div className="blog-form-container" style={{ marginTop: 0, padding: '30px' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
              <User size={18} color="var(--accent-cyan)" />
              <span>Administrative Session</span>
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Admin Username</label>
                <input 
                  type="text" 
                  value={user?.username || 'admin'} 
                  readOnly 
                  className="form-input" 
                  style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', cursor: 'not-allowed' }}
                />
              </div>
              
              <div className="form-group">
                <label>Admin Security Role</label>
                <input 
                  type="text" 
                  value={user?.role || 'ROLE_ADMIN'} 
                  readOnly 
                  className="form-input" 
                  style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', cursor: 'not-allowed' }}
                />
              </div>

              <div className="form-group">
                <label>Assigned Support Channel</label>
                <input 
                  type="text" 
                  value="support@yonostoreapp.com" 
                  readOnly 
                  className="form-input" 
                  style={{ background: 'rgba(255,255,255,0.02)', color: 'var(--text-muted)', cursor: 'not-allowed' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right column: Password modification */}
        <div className="form-sidebar-column">
          <div className="blog-form-container" style={{ marginTop: 0, padding: '30px' }}>
            <h2 style={{ fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
              <Key size={18} color="var(--accent-purple)" />
              <span>Change Password</span>
            </h2>

            <form onSubmit={handlePasswordSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label htmlFor="currentPassword">Current Password</label>
                <input 
                  type="password" 
                  id="currentPassword" 
                  name="currentPassword" 
                  required 
                  className="form-input" 
                  value={passwordForm.currentPassword}
                  onChange={handleChange}
                  placeholder="Enter current password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword">New Password</label>
                <input 
                  type="password" 
                  id="newPassword" 
                  name="newPassword" 
                  required 
                  className="form-input" 
                  value={passwordForm.newPassword}
                  onChange={handleChange}
                  placeholder="Minimum 6 characters"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm New Password</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  required 
                  className="form-input" 
                  value={passwordForm.confirmPassword}
                  onChange={handleChange}
                  placeholder="Retype new password"
                />
              </div>

              <button 
                type="submit" 
                disabled={submitting} 
                className="btn-premium btn-purple" 
                style={{ width: '100%', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <Save size={16} />
                <span>{submitting ? 'Updating...' : 'Update Password'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
