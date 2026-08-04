import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, Search, Edit2, Trash2, Globe } from 'lucide-react';
import blogService from '../services/blogService';
import './Blogs.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');

  const loadBlogs = async () => {
    setLoading(true);
    try {
      const data = await blogService.adminGetBlogs();
      setBlogs(data);
    } catch {
      setError("Could not load blogs from database server. Initializing mock list.");
      // Fallback fallback list
      setBlogs([
        { id: 1, title: "Yono Rummy: The Ultimate Guide to Win Real Cash Rewards", slug: "yono-rummy-ultimate-guide-cash-rewards", status: "PUBLISHED", publishDate: "2026-07-15T12:00:00Z" },
        { id: 2, title: "How to Securely Install YONO Games APK on Android Devices", slug: "how-to-securely-install-yono-games-apk-android", status: "PUBLISHED", publishDate: "2026-07-14T09:00:00Z" },
        { id: 3, title: "Top 5 Popular Card Games Available inside the Yono Store App", slug: "top-5-popular-card-games-yono-store-app", status: "PUBLISHED", publishDate: "2026-07-13T15:30:00Z" }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete the blog post: "${title}"?`)) {
      try {
        await blogService.adminDeleteBlog(id);
        alert("Blog post successfully deleted.");
        loadBlogs();
      } catch (err) {
        alert(err.response?.data?.message || "Failed to delete the blog post. (API Offline)");
        // Local simulation deletion for design preview
        setBlogs(blogs.filter(b => b.id !== id));
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div className="download-btn-pulse" style={{ position: 'relative', width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  return (
    <div className="blogs-manager-page fade-in">
      <div className="blogs-manager-header">
        <div>
          <h1 className="text-gradient">Manage Blog Posts</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Add, edit, or delete articles from your public blog listings.</p>
        </div>
        <Link to="/admin/blogs/new" className="btn-premium btn-purple" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <PlusCircle size={18} />
          <span>Add New Blog</span>
        </Link>
      </div>

      <div className="blogs-manager-search">
        <Search size={18} />
        <input 
          type="text" 
          placeholder="Search blogs by title or slug..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {error && <div className="login-error" style={{ marginTop: '20px' }}>{error}</div>}

      <div className="blogs-table-container">
        {filteredBlogs.length === 0 ? (
          <div style={{ textShadow: 'none', color: 'var(--text-muted)', textAlign: 'center', padding: '50px 0' }}>
            No blog articles found matching your query.
          </div>
        ) : (
          <table className="blogs-table">
            <thead>
              <tr>
                <th>Blog Details</th>
                <th>Status</th>
                <th>Publish Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map(blog => (
                <tr key={blog.id}>
                  <td>
                    <div className="table-blog-title">{blog.title}</div>
                    <div className="table-blog-slug">/{blog.slug}</div>
                  </td>
                  <td>
                    <span className={`recent-blog-status ${blog.status.toLowerCase()}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td>{formatDate(blog.publishDate)}</td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/admin/blogs/edit/${blog.id}`} className="action-btn-small edit" aria-label="Edit Blog">
                        <Edit2 size={14} /> Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(blog.id, blog.title)} 
                        className="action-btn-small delete" 
                        aria-label="Delete Blog"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                      {blog.status === 'PUBLISHED' && (
                        <Link to={`/blogs/${blog.slug}`} className="action-btn-small" target="_blank">
                          <Globe size={14} /> View
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Blogs;
