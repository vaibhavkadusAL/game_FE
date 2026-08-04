import React from 'react';
import { Play } from 'lucide-react';
import DownloadButton from './DownloadButton';
import './Hero.css';

const Hero = () => {
  const handleScrollToGames = () => {
    const gamesSection = document.getElementById('featured-games');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-content fade-in">
        <div className="hero-tag">🔥 Instant Play & Download</div>
        <h1 className="hero-title">
          <span className="text-gradient-purple">The Ultimate Portal For</span>
          <span className="text-gradient-cyan">Yono Games APK</span>
        </h1>
        <p className="hero-subtitle">
          Unlock access to the complete suite of YONO gaming apps. Rummy, slots, card games, and premium arcade apps. Fast downloads, 100% secure packages, and real-time updates.
        </p>

        <div className="hero-actions" id="download">
          <DownloadButton label="Download YONO App" />
          <button className="btn-premium btn-outline" onClick={handleScrollToGames}>
            <Play size={18} fill="#fff" />
            <span>Explore Games</span>
          </button>
        </div>

        <div className="hero-badge-container">
          <div className="hero-badge">
            <span className="hero-badge-number">10M+</span>
            <span className="hero-badge-text">Downloads</span>
          </div>
          <div className="hero-badge">
            <span className="hero-badge-number">4.8★</span>
            <span className="hero-badge-text">Rating</span>
          </div>
          <div className="hero-badge">
            <span className="hero-badge-number">50+</span>
            <span className="hero-badge-text">Games Catalog</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
