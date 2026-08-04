import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Menu, X, Gamepad2, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    handleLinkClick();
    navigate('/');
  };

  return (
    <nav className="navbar">
      {/* Semi-transparent Backdrop for mobile drawer */}
      {isOpen && <div className="navbar-backdrop" onClick={handleLinkClick}></div>}

      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={handleLinkClick}>
          <Gamepad2 size={28} color="#22c55e" />
          <span style={{ color: '#000', fontWeight: '900' }}>YONO</span>
          <span style={{ color: '#000', fontWeight: '900' }}>GAMES</span>
        </Link>

        <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
          {/* Mobile close button inside the drawer */}
          <li className="drawer-close-container">
            <button className="drawer-close-btn" onClick={handleLinkClick} aria-label="Close menu">
              <X size={28} />
            </button>
          </li>

          <li className="nav-item">
            <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''} end onClick={handleLinkClick}>
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleLinkClick}>
              About
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/blogs" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleLinkClick}>
              Blogs
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleLinkClick}>
              Contact
            </NavLink>
          </li>

          {isAuthenticated && (
            <>
              <li className="nav-item">
                <Link to="/admin/dashboard" className="navbar-admin-link" onClick={handleLinkClick} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ec4899' }}>
                  <LayoutDashboard size={16} /> Admin
                </Link>
              </li>
              <li className="nav-item mobile-only">
                <button onClick={handleLogout} className="nav-download-btn" style={{ background: '#ef4444', width: '100%' }}>
                  Logout
                </button>
              </li>
            </>
          )}

          {!isAuthenticated && (
            <li className="nav-item mobile-only" style={{ marginTop: '10px' }}>
              <Link to="/#download" className="nav-download-btn" onClick={handleLinkClick} style={{ display: 'inline-block', textAlign: 'center', width: '100%' }}>
                Download App
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="nav-download-btn desktop-only" style={{ background: '#ef4444', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={14} /> Logout
            </button>
          ) : (
            <Link to="/#download" className="nav-download-btn desktop-only">
              Download App
            </Link>
          )}

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
