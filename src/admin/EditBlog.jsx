import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Save } from 'lucide-react';
import blogService from '../services/blogService';
import './AddBlog.css'; // Reuse form styles

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
    publishDate: ''
  });

  useEffect(() => {
    const loadBlogDetail = async () => {
      try {
        const blogsList = await blogService.adminGetBlogs();
        // Find by numeric ID
        const targetBlog = blogsList.find(b => String(b.id) === String(id));
        if (targetBlog) {
          // Format date for datetime-local: YYYY-MM-DDThh:mm
          const localDateStr = targetBlog.publishDate 
            ? new Date(targetBlog.publishDate).toISOString().slice(0, 16) 
            : new Date().toISOString().slice(0, 16);
          
          setBlog({
            title: targetBlog.title || '',
            slug: targetBlog.slug || '',
            metaTitle: targetBlog.metaTitle || '',
            metaDescription: targetBlog.metaDescription || '',
            keywords: targetBlog.keywords || '',
            featuredImage: targetBlog.featuredImage || '',
            imageAltTag: targetBlog.imageAltTag || '',
            shortDescription: targetBlog.shortDescription || '',
            fullDescription: targetBlog.fullDescription || '',
            status: targetBlog.status || 'DRAFT',
            publishDate: localDateStr
          });

          if (targetBlog.featuredImage) {
            const previewUrl = targetBlog.featuredImage.startsWith('http') || targetBlog.featuredImage.startsWith('data:')
              ? targetBlog.featuredImage
              : `http://localhost:8080${targetBlog.featuredImage}`;
            setImagePreview(previewUrl);
          }
        } else {
          alert("Blog post not found.");
          navigate('/admin/blogs');
        }
      } catch {
        // Fallback simulate finding the blog from local simulated db
        const fallbackBlogs = [
          { id: 1, title: "Yono Rummy: The Ultimate Guide to Win Real Cash Rewards", slug: "yono-rummy-ultimate-guide-cash-rewards", shortDescription: "Discover tips, strategies, and official rules to dominate in Yono Rummy...", fullDescription: "<h2>Introduction</h2><p>Rummy is classic...</p>", status: "PUBLISHED", publishDate: "2026-07-15T12:00:00Z" },
          { id: 2, title: "How to Securely Install YONO Games APK on Android Devices", slug: "how-to-securely-install-yono-games-apk-android", shortDescription: "Step by step walkthrough to safely sideload...", fullDescription: "<h2>Safety first</h2>", status: "PUBLISHED", publishDate: "2026-07-14T09:00:00Z" }
        ];
        const target = fallbackBlogs.find(b => String(b.id) === String(id));
        if (target) {
          setBlog({
            title: target.title,
            slug: target.slug,
            metaTitle: `${target.title} | YONO Games`,
            metaDescription: target.shortDescription,
            keywords: "yono rummy, card games",
            featuredImage: "",
            imageAltTag: target.title,
            shortDescription: target.shortDescription,
            fullDescription: target.fullDescription,
            status: target.status,
            publishDate: new Date(target.publishDate).toISOString().slice(0, 16)
          });
        } else {
          navigate('/admin/blogs');
        }
      } finally {
        setLoading(false);
      }
    };

    loadBlogDetail();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploadingImage(true);
    try {
      const response = await blogService.uploadBlogImage(file);
      setBlog(prev => ({
        ...prev,
        featuredImage: response.imageUrl
      }));
      alert("Featured image updated.");
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
      const payload = {
        ...blog,
        publishDate: new Date(blog.publishDate).toISOString()
      };
      await blogService.adminUpdateBlog(id, payload);
      alert("Blog post updated successfully.");
      navigate('/admin/blogs');
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update the blog post. (Server Offline)");
      navigate('/admin/blogs');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="download-btn-pulse" style={{ position: 'relative', width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  return (
    <div className="edit-blog-page fade-in">
      <Link to="/admin/blogs" className="back-to-blogs-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
        <ArrowLeft size={16} /> Back to List
      </Link>

      <div className="blog-form-container">
        <header className="blog-form-header">
          <h1 className="text-gradient">Edit Blog Post</h1>
        </header>

        <form onSubmit={handleSubmit} className="blog-form-grid">
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
                style={{ minHeight: '300px', resize: 'vertical' }}
              />
            </div>
          </div>

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
                    <span>Click to Upload Image</span>
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
                style={{ minHeight: '80px', resize: 'none' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="keywords">Keywords (SEO)</label>
              <input 
                type="text" 
                id="keywords" 
                name="keywords" 
                value={blog.keywords} 
                onChange={handleChange} 
                className="form-input"
              />
            </div>
          </div>

          <div className="form-main-column" style={{ gridColumn: '1 / -1' }}>
            <div className="form-actions-row">
              <Link to="/admin/blogs" className="btn-premium btn-outline">
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

export default EditBlog;
