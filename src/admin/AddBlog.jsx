import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import blogService from '../services/blogService';
import './AddBlog.css';

const AddBlog = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  
  // Blog fields state
  const [blog, setBlog] = useState({
    title: '',
    slug: '',
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    featuredImage: '',
    imageAltTag: '',
    shortDescription: '',
    fullDescription: '',
    status: 'DRAFT',
    publishDate: new Date().toISOString().slice(0, 16) // datetime-local format
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Automatically generate slug and meta title from title
    if (name === 'title') {
      const generatedSlug = value
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '') // remove special chars
        .replace(/\s+/g, '-')         // replace spaces with hyphens
        .replace(/-+/g, '-')          // replace multiple hyphens
        .trim();
      
      setBlog(prev => ({
        ...prev,
        title: value,
        slug: generatedSlug,
        metaTitle: `${value} | YONO Games`
      }));
    } else {
      setBlog(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Create a local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploadingImage(true);
    try {
      const response = await blogService.uploadBlogImage(file);
      // Expected response: { imageUrl: '/uploads/filename.jpg' }
      setBlog(prev => ({
        ...prev,
        featuredImage: response.imageUrl
      }));
      alert("Featured image uploaded successfully.");
    } catch {
      // Fallback: use base64 in database for offline preview simulation
      setBlog(prev => ({
        ...prev,
        featuredImage: reader.result
      }));
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Ensure publishDate is formatted properly
      const payload = {
        ...blog,
        publishDate: new Date(blog.publishDate).toISOString()
      };
      await blogService.adminCreateBlog(payload);
      alert("Blog post created successfully.");
      navigate('/admin/blogs');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create the blog post. (Server Offline)");
      // Offline local storage simulation for showcase
      const localStored = JSON.parse(localStorage.getItem('local_blogs') || '[]');
      localStored.push({ ...blog, id: Date.now(), publishDate: new Date(blog.publishDate).toISOString() });
      localStorage.setItem('local_blogs', JSON.stringify(localStored));
      navigate('/admin/blogs');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-blog-page fade-in">
      <Link to="/admin/blogs" className="back-to-blogs-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
        <ArrowLeft size={16} /> Back to List
      </Link>

      <div className="blog-form-container">
        <header className="blog-form-header">
          <h1 className="text-gradient">Add New Blog Post</h1>
        </header>

        <form onSubmit={handleSubmit} className="blog-form-grid">
          {/* Main content inputs */}
          <div className="form-main-column">
            <div className="form-group">
              <label htmlFor="title">Blog Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={blog.title} 
                onChange={handleChange} 
                required 
                className="form-input"
                placeholder="e.g. Yono Rummy: Winning Tricks"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slug">SEO friendly URL (Slug)</label>
              <input 
                type="text" 
                id="slug" 
                name="slug" 
                value={blog.slug} 
                onChange={handleChange} 
                required 
                className="form-input"
                placeholder="e.g. yono-rummy-winning-tricks"
              />
            </div>

            <div className="form-group">
              <label htmlFor="shortDescription">Short Description</label>
              <textarea 
                id="shortDescription" 
                name="shortDescription" 
                value={blog.shortDescription} 
                onChange={handleChange} 
                required 
                className="form-input"
                placeholder="Enter a brief summary for blog listings..."
                style={{ minHeight: '80px', resize: 'vertical' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="fullDescription">Full Body Description (HTML allowed)</label>
              <textarea 
                id="fullDescription" 
                name="fullDescription" 
                value={blog.fullDescription} 
                onChange={handleChange} 
                required 
                className="form-input"
                placeholder="<h2>Write your article in HTML headings and paragraphs...</h2>"
                style={{ minHeight: '300px', resize: 'vertical' }}
              />
            </div>
          </div>

          {/* Sidebar / SEO inputs */}
          <div className="form-sidebar-column">
            <div className="form-group">
              <label>Featured Image</label>
              <label className="image-upload-box">
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  style={{ display: 'none' }}
                />
                {imagePreview ? (
                  <>
                    <img src={imagePreview} className="image-preview-element" alt="Preview" />
                    <div className="image-preview-overlay">
                      <Upload size={20} /> Replace Image
                    </div>
                  </>
                ) : (
                  <>
                    <Upload size={28} color="var(--accent-purple)" />
                    <span>{uploadingImage ? 'Uploading...' : 'Click to Upload Image'}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>JPG, PNG or WEBP</span>
                  </>
                )}
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="imageAltTag">Image Alt Tag (SEO)</label>
              <input 
                type="text" 
                id="imageAltTag" 
                name="imageAltTag" 
                value={blog.imageAltTag} 
                onChange={handleChange} 
                className="form-input"
                placeholder="e.g. Yono Rummy gameplay screenshot"
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Publish Status</label>
              <select 
                id="status" 
                name="status" 
                value={blog.status} 
                onChange={handleChange} 
                className="form-input"
              >
                <option value="DRAFT">DRAFT</option>
                <option value="PUBLISHED">PUBLISHED</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="publishDate">Publish Schedule Date</label>
              <input 
                type="datetime-local" 
                id="publishDate" 
                name="publishDate" 
                value={blog.publishDate} 
                onChange={handleChange} 
                required 
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="metaTitle">Meta Title (SEO)</label>
              <input 
                type="text" 
                id="metaTitle" 
                name="metaTitle" 
                value={blog.metaTitle} 
                onChange={handleChange} 
                className="form-input"
                placeholder="Page Title tag"
              />
            </div>

            <div className="form-group">
              <label htmlFor="metaDescription">Meta Description (SEO)</label>
              <textarea 
                id="metaDescription" 
                name="metaDescription" 
                value={blog.metaDescription} 
                onChange={handleChange} 
                className="form-input"
                placeholder="Google snippet meta tag..."
                style={{ minHeight: '80px', resize: 'none' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords (SEO comma separated)</label>
              <input 
                type="text" 
                id="keywords" 
                name="keywords" 
                value={blog.keywords} 
                onChange={handleChange} 
                className="form-input"
                placeholder="yono rummy, card games, apk"
              />
            </div>
          </div>

          {/* Form Actions Row */}
          <div className="form-main-column" style={{ gridColumn: '1 / -1' }}>
            <div className="form-actions-row">
              <Link to="/admin/blogs" className="btn-premium btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Cancel
              </Link>
              <button 
                type="submit" 
                className="btn-premium btn-purple" 
                disabled={submitting || uploadingImage}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Save size={18} />
                <span>{submitting ? 'Saving...' : 'Save Blog Post'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
