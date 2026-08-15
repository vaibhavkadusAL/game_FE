import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Send, MessageCircle, Globe, MessageSquare } from 'lucide-react';
import './Footer.css';

const Facebook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Instagram = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const YouTubeIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>
);

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo" onClick={() => window.scrollTo(0, 0)}>
            <Gamepad2 size={26} color="#00f2fe" />
            <span>YONO</span>GAMES
          </Link>
          <p>
            Welcome to YONO Games, your number one source for premium gaming downloads, detailed blog posts, game reviews, and platform guides. Experience top-tier entertainment and join our active community today.
          </p>
          <div className="footer-socials">
            <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube"><YouTubeIcon size={16} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Telegram"><Send size={16} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="WhatsApp"><MessageCircle size={16} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Website"><Globe size={16} /></a>
            <a href="#" onClick={(e) => e.preventDefault()} target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Live Chat"><MessageSquare size={16} /></a>
          </div>
        </div>

        <div className="footer-links-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link></li>
            <li><Link to="/about" onClick={() => window.scrollTo(0, 0)}>About Us</Link></li>
            <li><Link to="/blogs" onClick={() => window.scrollTo(0, 0)}>Latest Blogs</Link></li>
            <li><Link to="/contact" onClick={() => window.scrollTo(0, 0)}>Contact Support</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h3>Legal Information</h3>
          <ul>
            <li><Link to="/privacy-policy" onClick={() => window.scrollTo(0, 0)}>Privacy Policy</Link></li>
            <li><Link to="/terms-conditions" onClick={() => window.scrollTo(0, 0)}>Terms & Conditions</Link></li>
            <li><Link to="/disclaimer" onClick={() => window.scrollTo(0, 0)}>Disclaimer</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h3>Contact Us</h3>
          <ul style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            <li>Email: support@yonostoreapp.com</li>
            <li>Hours: 24/7 Online Support</li>
            
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YONO Games. All rights reserved.</p>
        <p>Designed for mobile-first gaming excellence.</p>
      </div>

      <div className="footer-disclaimer-text">
        Disclaimer: YONO Games is an independent game information portal. All downloads and external resources linked here are intended for educational and general showcase purposes. Ensure compliance with your local regulations regarding online gaming resources.
      </div>
    </footer>
  );
};

export default Footer;
