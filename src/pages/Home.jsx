import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gamepad2,
  ShieldCheck,
  Zap,
  Coins,
  Headphones,
  ChevronDown,
  ChevronUp,
  FileText,
  Download,
  Gift
} from 'lucide-react';
import Hero from '../components/Hero';
import BlogCard from '../components/BlogCard';
import DownloadButton from '../components/DownloadButton';
import SEO from '../components/SEO';
import blogService from '../services/blogService';
import './Home.css';

import bossrummy from '../assets/game images/Boss Rummy.png';
import hirummy from '../assets/game images/Hi Rummy.png';
import hindi777 from '../assets/game images/Hindi 777.png';
import jaihorummy from '../assets/game images/Jaiho Rummy.png';
import joyrummy from '../assets/game images/Joy Rummy.png';
import topRummy from '../assets/game images/Top Rummy.png';
import winrummy from '../assets/game images/Win Rummy.png';
import yonorummy from '../assets/game images/Yono Rummy.png';
const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await blogService.getBlogs();
        // Take only the latest 3 published blogs
        const publishedBlogs = data
          .filter(b => b.status === 'PUBLISHED')
          .slice(0, 3);
        setBlogs(publishedBlogs.length > 0 ? publishedBlogs : mockBlogs);
      } catch {
        setBlogs(mockBlogs);
      } finally {
        setLoadingBlogs(false);
      }
    };
    fetchBlogs();
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleScrollToGames = () => {
    const gamesSection = document.getElementById('featured-games');
    if (gamesSection) {
      gamesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const gamesList = [
    { name: "Joy Rummy", image: joyrummy, bonus: "₹41", withdraw: "₹100", url: "https://www.joyrummyace.com/?code=J5KFRSW5141&t=1785823943", category: "new" },
    { name: "Yono Rummy", image: yonorummy, bonus: "₹51", withdraw: "₹100", url: "https://yonorummy049.com/?code=VIPTM43QZFN&t=1785823790", category: "new" },
    { name: "Win Rummy", image: winrummy, bonus: "₹41", withdraw: "₹100", url: "https://www.winrummy36.com/?code=5XZA1DA9B4A&t=1785824136", category: "new" },
    { name: "Hi Rummy", image: hirummy, bonus: "₹41", withdraw: "₹100", url: "https://www.hirummyagents.app/?code=RX3KTZDCU2C&t=1772102518", category: "old" },
    { name: "Top Rummy", image: topRummy, bonus: "₹41", withdraw: "₹100", url: "https://www.toprummy.xyz/?code=7K92AB3HW5M&t=1772103481", category: "old" },
    { name: "Hindi 777", image: hindi777, bonus: "₹41", withdraw: "₹100", url: "https://www.hindi777refer.me/?code=7LFJSZD2MFS&t=1772102341", category: "old" },
    { name: "Boss Rummy", image: bossrummy, bonus: "₹41", withdraw: "₹100", url: "https://www.bossrummyo.com/?code=LSHK11YQ7BE&t=1771231579", category: "old" }
  ];

  const filteredGames = activeFilter === 'all'
    ? gamesList
    : gamesList.filter(game => game.category === activeFilter);

  const faqs = [
    {
      q: "What is YONO Games and how do I play?",
      a: "YONO Games is a premium mobile-first gaming store that hosts a variety of engaging multiplayer card games, slots, and casual arcade games. You can play by downloading the secure YONO App APK directly from this portal and installing it on your smartphone."
    },
    {
      q: "Is it safe to download the YONO Games APK?",
      a: "Yes. Our APK packages are 100% verified, clean, and free of any malware. We update the download links directly from our central developer pipeline to guarantee secure installations."
    },
    {
      q: "How can I withdraw cash winnings?",
      a: "Inside the YONO App, navigate to the Account Dashboard and select Withdraw. Enter your verified payment method (Bank Transfer or UPI) and follow the prompts. Withdrawals are processed instantly 24/7."
    },
    {
      q: "Why does my Android system say 'Block by Play Protect'?",
      a: "Since you are sideloading an APK file outside of the Google Play Store, Android shows a security warning. To install, go to Settings -> Security -> and toggle 'Allow installation from Unknown Sources'. Then restart the APK installer."
    }
  ];

  return (
    <div className="home-page">
      <SEO
        title="YONO Games - Play & Download Yono Games Online"
        description="Welcome to YONO Games, the premium hub for top rummy, slots, and arcade apps. Download the secure YONO APK and read latest platform updates."
      />

      {/* Horizontal Scrollable Games Section */}
      <section className="horizontal-games-section section-padding" style={{ paddingTop: '20px', paddingBottom: '0' }}>
        <div className="container" style={{ maxWidth: '100%', padding: '0' }}>
          <div className="horizontal-scroll-container">
            <div className="horizontal-scroll-track">
              {/* First set for seamless loop */}
              {gamesList.map((game, index) => (
                <div className="hz-card" key={`hz-1-${index}`}>
                  <div className="hz-thumbnail">
                    <img src={game.image} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  </div>
                  <div className="hz-details">
                    <h3 className="hz-title">{game.name}</h3>
                    <div className="hz-meta">
                      <div className="hz-bonus">
                        <Gift size={13} /> <span>Welcome Bonus {game.bonus}</span>
                      </div>
                      <div className="hz-withdraw">
                        <Gift size={13} /> <span>Min Withdraw {game.withdraw}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hz-action">
                    <a href={game.url} target="_blank" rel="noopener noreferrer" className="hz-btn">
                      <Download size={14} /> <span className="hz-btn-text">Download</span>
                    </a>
                  </div>
                </div>
              ))}
              {/* Second set for seamless loop */}
              {gamesList.map((game, index) => (
                <div className="hz-card" key={`hz-2-${index}`}>
                  <div className="hz-thumbnail">
                    <img src={game.image} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                  </div>
                  <div className="hz-details">
                    <h3 className="hz-title">{game.name}</h3>
                    <div className="hz-meta">
                      <div className="hz-bonus">
                        <Gift size={13} /> <span>Welcome Bonus {game.bonus}</span>
                      </div>
                      <div className="hz-withdraw">
                        <Gift size={13} /> <span>Min Withdraw {game.withdraw}</span>
                      </div>
                    </div>
                  </div>
                  <div className="hz-action">
                    <a href={game.url} target="_blank" rel="noopener noreferrer" className="hz-btn">
                      <Download size={14} /> <span className="hz-btn-text">Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <Hero />

      {/* Featured Games Section */}
      <section id="featured-games" className="featured-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="text-gradient-purple">Featured YONO Games</h2>
            <p>Select from our most popular titles, download the APK, and start playing instantly.</p>
          </div>

          <div className="game-filters">
            <button
              className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
              onClick={() => setActiveFilter('all')}
            >
              All Games
            </button>
            <button
              className={`filter-btn ${activeFilter === 'new' ? 'active' : ''}`}
              onClick={() => setActiveFilter('new')}
            >
              New Game
            </button>
            <button
              className={`filter-btn ${activeFilter === 'old' ? 'active' : ''}`}
              onClick={() => setActiveFilter('old')}
            >
              Old Game
            </button>
          </div>

          <div className="game-list-container">
            {filteredGames.map((game, index) => (
              <div className="game-list-item" key={index}>
                <div className="game-thumbnail">
                  <img src={game.image} alt={game.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
                </div>
                <div className="game-details">
                  <h3 className="game-title">{game.name}</h3>
                  <div className="game-meta">
                    <div className="game-bonus">
                      <Gift size={14} /> <span>Welcome Bonus {game.bonus}</span>
                    </div>
                    <div className="game-withdraw">
                      <Gift size={14} /> <span>Min Withdraw {game.withdraw}</span>
                    </div>
                  </div>
                </div>
                <div className="game-action">
                  <a href={game.url} target="_blank" rel="noopener noreferrer" className="btn-download-sm">
                    <Download size={16} /> Download
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="text-gradient-cyan">Why Choose YONO Games?</h2>
            <p>Experience the most secure and player-friendly online mobile gaming application.</p>
          </div>

          <div className="features-grid">
            <div className="feature-item">
              <div className="feature-icon-wrapper"><ShieldCheck size={28} /></div>
              <h3 className="feature-title">100% Safe & Secure</h3>
              <p className="feature-desc">Encrypted connections, secure payments, and fully audited game code for certified fair play.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><Zap size={28} /></div>
              <h3 className="feature-title">Fast Loading Speeds</h3>
              <p className="feature-desc">Highly optimized asset delivery ensures seamless lobbies and lag-free gameplay, even on 3G networks.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><Coins size={28} /></div>
              <h3 className="feature-title">Instant Cash Withdrawals</h3>
              <p className="feature-desc">Hassle-free 24/7 bank and wallet cashouts processed instantly into your account.</p>
            </div>
            <div className="feature-item">
              <div className="feature-icon-wrapper"><Headphones size={28} /></div>
              <h3 className="feature-title">24/7 Support Desk</h3>
              <p className="feature-desc">Need assistance? Contact our live support team directly via email or telegram chat support.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section className="download-guide-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="text-gradient-purple">How to Install YONO Games</h2>
            <p>Follow these 3 simple steps to load the YONO app on your mobile device.</p>
          </div>

          <div className="guide-steps">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3>Download APK</h3>
              <p>Click our 'Download App' link. The APK will start downloading onto your phone directory.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h3>Enable Unknown Sources</h3>
              <p>Go to your phone settings, check security, and toggle 'Allow installation from Unknown Sources'.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h3>Install & Play</h3>
              <p>Open the downloaded package, click 'Install', register your account, and claim signup bonuses!</p>
            </div>
          </div>

          <div className="guide-cta-container">
            <DownloadButton label="Download Secure APK" onClick={handleScrollToGames} />
            <span className="guide-cta-note">Compatible with all Android versions 5.0+ and iOS devices.</span>
          </div>
        </div>
      </section>

      {/* Latest Blogs Section */}
      <section className="latest-blogs-section section-padding">
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', textAlign: 'left', gap: '20px' }}>
            <div>
              <h2 className="text-gradient-purple" style={{ margin: 0 }}>Latest Articles & Guides</h2>
              <p style={{ margin: 0, marginTop: '8px' }}>Stay informed with the latest gaming tutorials, rummy secrets, and tournament news.</p>
            </div>
            <Link to="/blogs" className="btn-premium btn-outline" style={{ fontSize: '0.85rem' }}>
              <FileText size={16} /> View All Blogs
            </Link>
          </div>

          {loadingBlogs ? (
            <div style={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
              <div className="download-btn-pulse" style={{ position: 'relative', width: '40px', height: '40px' }}></div>
            </div>
          ) : (
            <div className="games-grid">
              {blogs.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="faqs-section section-padding">
        <div className="container">
          <div className="section-header">
            <h2 className="text-gradient-cyan">Frequently Asked Questions</h2>
            <p>Got questions about Yono Games? Find instant answers to the most common queries.</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <button className="faq-question" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  {openFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
