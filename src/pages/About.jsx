import React from 'react';
import { ShieldCheck, Award, ThumbsUp, Users } from 'lucide-react';
import SEO from '../components/SEO';
import DownloadButton from '../components/DownloadButton';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <SEO 
        title="About Us - YONO Games" 
        description="Learn more about YONO Games, the leading mobile-first online game provider. Our platform features audited games, secure payment support, and certified fair play lobbies." 
        slug="about"
      />

      <section className="about-hero">
        <div className="container">
          <h1 className="text-gradient-purple">About YONO Games</h1>
          <p>We are dedicated to building the ultimate premium gaming catalog for card games, slots, and interactive arcade tables.</p>
        </div>
      </section>

      <section className="about-content-section section-padding">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2 className="text-gradient-cyan">Who We Are</h2>
              <p>
                YONO Games is a state-of-the-art mobile application store designed specifically to fulfill modern gaming preferences. We provide downloadable game packages (APK) and deep blog insights to give users a comprehensive gaming workspace.
              </p>
              <p>
                Whether you are a casual player looking to pass time on slot reels, a statistics nerd looking to review Rummy probability logs, or a high-roller competing in card tournaments, YONO Games delivers a premium, secure environment optimized for your smartphone.
              </p>
              <p>
                Our system values transparency, user-protection, and fast cash withdrawals above all else. This sets us apart in the competitive gaming space as a platform built by gamers, for gamers.
              </p>
            </div>

            <div className="about-visual">
              <div className="about-glow-box">
                <h3 className="text-gradient-purple">Platform Certifications</h3>
                <div className="certification-list">
                  <div className="cert-item">
                    <ShieldCheck className="cert-icon" size={24} />
                    <div className="cert-info">
                      <h4>ISO 27001 Secure</h4>
                      <p>Encrypted data protection channels.</p>
                    </div>
                  </div>
                  <div className="cert-item">
                    <Award className="cert-icon" size={24} />
                    <div className="cert-info">
                      <h4>RNG Certified</h4>
                      <p>Random Number Generator audited.</p>
                    </div>
                  </div>
                  <div className="cert-item">
                    <ThumbsUp className="cert-icon" size={24} />
                    <div className="cert-info">
                      <h4>Responsible Gaming</h4>
                      <p>Advanced deposit and age locks (18+).</p>
                    </div>
                  </div>
                  <div className="cert-item">
                    <Users className="cert-icon" size={24} />
                    <div className="cert-info">
                      <h4>Anti-Fraud Engine</h4>
                      <p>Active multi-account detection systems.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand values banner */}
      <section className="values-section section-padding" style={{ textAlign: 'center' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px' }}>
          <h2 className="text-gradient-purple" style={{ fontSize: '2.2rem' }}>Get The Official App Today</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Join over 10 million players globally. Claim signup bonuses, compete in active lobbies, and request instant bank withdrawals.
          </p>
          <DownloadButton label="Download App Catalog" />
        </div>
      </section>
    </div>
  );
};

export default About;
