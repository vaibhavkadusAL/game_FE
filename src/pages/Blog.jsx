import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Search, 
  Send 
} from 'lucide-react';

const Facebook = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
import SEO from '../components/SEO';
import BlogCard from '../components/BlogCard';
import blogService from '../services/blogService';
import './Blog.css';

const Blog = () => {
  const { slug } = useParams();

  const [blogs, setBlogs] = useState([]);
  const [blogDetail, setBlogDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Categories States (for listing mode)
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Carousel States
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  // Fetch blogs on load or slug change
  useEffect(() => {
    const fetchBlogsData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await blogService.getBlogs();
        // Sort published blogs by date
        const sortedData = data
          .filter(b => b.status === 'PUBLISHED')
          .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
        
        setBlogs(sortedData.length > 0 ? sortedData : mockBlogs);

        // If we are looking for a specific slug detail
        if (slug) {
          try {
            const detail = await blogService.getBlogBySlug(slug);
            if (detail && detail.status === 'PUBLISHED') {
              setBlogDetail(detail);
            } else {
              // try searching in local state if slug matches mock data
              const localBlog = sortedData.length > 0 
                ? sortedData.find(b => b.slug === slug) 
                : mockBlogs.find(b => b.slug === slug);
              
              if (localBlog) setBlogDetail(localBlog);
              else setError("Blog post not found.");
            }
          } catch {
            // Find in mock data fallback
            const localBlog = mockBlogs.find(b => b.slug === slug);
            if (localBlog) {
              setBlogDetail(localBlog);
            } else {
              setError("Blog post not found.");
            }
          }
        } else {
          setBlogDetail(null);
        }
      } catch {
        setBlogs(mockBlogs);
        if (slug) {
          const localBlog = mockBlogs.find(b => b.slug === slug);
          if (localBlog) {
            setBlogDetail(localBlog);
          } else {
            setError("Blog post not found.");
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogsData();
  }, [slug]);

  // Handle Search & Category Filters
  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      blog.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    
    // We can simulate categories by matching title keywords
    if (activeCategory === 'All') return matchesSearch;
    if (activeCategory === 'Guides') return matchesSearch && (blog.title.toLowerCase().includes('guide') || blog.title.toLowerCase().includes('install'));
    if (activeCategory === 'Rummy') return matchesSearch && blog.title.toLowerCase().includes('rummy');
    if (activeCategory === 'Reviews') return matchesSearch && blog.title.toLowerCase().includes('top');
    return matchesSearch;
  });

  // Handle image path mappings
  const getDetailImageUrl = (detail) => {
    if (!detail.featuredImage) return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1200&auto=format&fit=crop';
    if (detail.featuredImage.startsWith('http') || detail.featuredImage.startsWith('data:')) return detail.featuredImage;
    return `${import.meta.env.VITE_STATIC_URL}${detail.featuredImage}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recent';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Carousel Controls
  const handleNext = React.useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === filteredBlogs.length - 1 ? 0 : prevIndex + 1));
  }, [filteredBlogs.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? filteredBlogs.length - 1 : prevIndex - 1));
  };

  // Auto-slide effect (1 second)
  useEffect(() => {
    let interval;
    if (!isHovered && filteredBlogs.length > 1) {
      interval = setInterval(() => {
        handleNext();
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isHovered, filteredBlogs.length, handleNext]);

  // Touch handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    if (touchStartX - touchEndX > 50) {
      handleNext();
    }
    if (touchStartX - touchEndX < -50) {
      handlePrev();
    }
    setTouchStartX(0);
    setTouchEndX(0);
  };


  // Render LOADING indicator
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="download-btn-pulse" style={{ position: 'relative', width: '50px', height: '50px' }}></div>
      </div>
    );
  }

  // Render ERROR state
  if (error || (slug && !blogDetail)) {
    return (
      <div className="blog-detail-container" style={{ textAlign: 'center', padding: '100px 24px' }}>
        <SEO title="Page Not Found" />
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Article Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{error || "The article you are searching for does not exist or has been removed."}</p>
        <Link to="/blogs" className="btn-premium btn-purple">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>
      </div>
    );
  }

  // RENDER BLOG DETAILS VIEW
  if (slug && blogDetail) {
    return (
      <div className="blog-detail-container">
        <SEO 
          title={blogDetail.metaTitle || blogDetail.title} 
          description={blogDetail.metaDescription || blogDetail.shortDescription}
          keywords={blogDetail.keywords}
          image={blogDetail.featuredImage || undefined}
          slug={`blogs/${blogDetail.slug}`}
        />

        <Link to="/blogs" className="back-to-blogs-link">
          <ArrowLeft size={16} /> Back to Blogs
        </Link>

        <header className="blog-detail-header">
          <div className="blog-detail-meta">
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Calendar size={14} /> {formatDate(blogDetail.publishDate)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <User size={14} /> Admin Writer
            </span>
          </div>
          <h1 className="blog-detail-title text-gradient">{blogDetail.title}</h1>
        </header>

        <div className="blog-detail-image-wrapper">
          <img 
            src={getDetailImageUrl(blogDetail)} 
            alt={blogDetail.imageAltTag || blogDetail.title} 
            className="blog-detail-image" 
          />
        </div>

        <div className="blog-detail-content-wrap">
          <article className="blog-body" dangerouslySetInnerHTML={{ __html: blogDetail.fullDescription }} />
          
          <aside className="blog-sidebar">
            <div className="blog-sidebar-widget">
              <h3>Share Post</h3>
              <div className="blog-share-buttons">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Facebook"><Facebook size={18} /></a>
                <a href={`https://twitter.com/intent/tweet?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Twitter"><Twitter size={18} /></a>
                <a href={`https://t.me/share/url?url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-btn" aria-label="Telegram"><Send size={18} /></a>
              </div>
            </div>

            <div className="blog-sidebar-widget">
              <h3>Recent Articles</h3>
              {blogs.filter(b => b.slug !== slug).slice(0, 3).map(recent => (
                <Link to={`/blogs/${recent.slug}`} key={recent.id} className="recent-post-link">
                  {recent.title}
                  <span className="recent-post-date">{formatDate(recent.publishDate)}</span>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // RENDER BLOG LISTING VIEW
  return (
    <div className="blog-page">
      <SEO 
        title="YONO Games Blog - Tips, Tricks & Game Tutorials" 
        description="Access official game walkthroughs, rummy winning tricks, and installation manuals for YONO Games. Read the blog and claim rewards." 
        slug="blogs"
      />

      <section className="blog-hero">
        <div className="container">
          <h1 className="text-gradient-purple">Blogs & Tutorials</h1>
          <p>Read about game strategies, installation guides, and platform updates.</p>
        </div>
      </section>

      <section className="blog-listing-content section-padding" style={{ background: 'rgba(18, 14, 36, 0.2)' }}>
        <div className="container">
          
          <div className="blog-filters-container">
            <div className="category-tags">
              {['All', 'Guides', 'Rummy', 'Reviews'].map(cat => (
                <button 
                  key={cat} 
                  className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="blog-search-bar">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Search articles..." 
                className="blog-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {filteredBlogs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)' }}>
              <h3>No articles match your search parameters.</h3>
              <p style={{ marginTop: '8px' }}>Try searching for generic terms like "Rummy" or "Install".</p>
            </div>
          ) : (
            <div 
              className="blog-carousel-container"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <button className="carousel-nav-btn prev-btn" onClick={handlePrev} aria-label="Previous">
                <ArrowLeft size={24} />
              </button>
              
              <div className="carousel-track-wrapper">
                <div 
                  className="carousel-track" 
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {filteredBlogs.map(blog => (
                    <div className="carousel-slide" key={blog.id}>
                      <BlogCard blog={blog} />
                    </div>
                  ))}
                </div>
              </div>

              <button className="carousel-nav-btn next-btn" onClick={handleNext} aria-label="Next">
                <ArrowLeft size={24} style={{ transform: 'rotate(180deg)' }} />
              </button>

              <div className="carousel-pagination">
                {filteredBlogs.map((_, idx) => (
                  <button 
                    key={idx} 
                    className={`carousel-dot ${idx === currentIndex ? 'active' : ''}`}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default Blog;
