import React, { useState } from 'react';
import { Outlet, Link, NavLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  User, 
  Globe, 
  LogOut, 
  Menu, 
  X, 
  Gamepad2 
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './AdminLayout.css';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-layout">
      <Helmet>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      {/* Admin Mobile Top Bar */}
      <header className="admin-mobile-header">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <Link to="/admin/dashboard" className="admin-header-logo">
          <Gamepad2 size={20} color="#8b5cf6" />
          <span>YONO</span> ADMIN
        </Link>
        <div style={{ width: 24 }}></div> {/* spacer */}
      </header>

      {/* Admin Sidebar Navigation */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-brand">
          <Gamepad2 size={24} color="#8b5cf6" />
          <span>YONO</span> ADMIN
        </div>

        <div className="admin-user-profile">
          <div className="avatar-placeholder">
            {user?.username ? user.username[0].toUpperCase() : 'A'}
          </div>
          <div className="admin-user-info">
            <div className="admin-username">{user?.username || 'Administrator'}</div>
            <div className="admin-role">{user?.role || 'ROLE_ADMIN'}</div>
          </div>
        </div>

        <nav className="admin-nav-menu">
          <NavLink 
            to="/admin/dashboard" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>
          <NavLink 
            to="/admin/blogs" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            end
            onClick={() => setSidebarOpen(false)}
          >
            <FileText size={18} />
            <span>Manage Blogs</span>
          </NavLink>
          <NavLink 
            to="/admin/blogs/new" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <PlusCircle size={18} />
            <span>Add Blog</span>
          </NavLink>
          <NavLink 
            to="/admin/profile" 
            className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setSidebarOpen(false)}
          >
            <User size={18} />
            <span>Profile Settings</span>
          </NavLink>
          <Link 
            to="/" 
            className="admin-nav-item"
            style={{ marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}
          >
            <Globe size={18} />
            <span>View Website</span>
          </Link>
          <button onClick={handleLogout} className="admin-nav-item admin-logout-btn">
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      {/* Main Admin Content Panel */}
      <main className="admin-main-content">
        {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
        <div className="admin-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
