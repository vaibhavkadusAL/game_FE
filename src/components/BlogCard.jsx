import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  const { title, slug, featuredImage, imageAltTag, shortDescription, publishDate } = blog;
  
  // Format Image URL
  const getImageUrl = () => {
    if (!featuredImage) return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop';
    if (featuredImage.startsWith('http') || featuredImage.startsWith('data:')) return featuredImage;
    return `http://localhost:8080${featuredImage}`;
  };

  // Format Date
  const formatDate = (dateString) => {
    if (!dateString) return 'Recent Post';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article className="blog-card">
      <div className="blog-card-image-wrapper">
        <img 
          src={getImageUrl()} 
          alt={imageAltTag || title} 
          className="blog-card-image"
          loading="lazy" 
        />
        <div className="blog-card-badge">News</div>
      </div>
      
      <div className="blog-card-content">
        <div className="blog-card-date" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Calendar size={14} />
          <span>{formatDate(publishDate)}</span>
        </div>
        
        <h3 className="blog-card-title">
          <Link to={`/blogs/${slug}`}>{title}</Link>
        </h3>
        
        <p className="blog-card-desc">{shortDescription}</p>
        
        <div className="blog-card-footer">
          <Link to={`/blogs/${slug}`} className="blog-read-more">
            <span>Read More</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
