import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  PlusCircle, 
  CheckCircle, 
  AlertCircle, 
  Settings, 
  ArrowUpRight 
} from 'lucide-react';
import blogService from '../services/blogService';
import './Dashboard.css';

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0
  });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const data = await blogService.adminGetBlogs();
        const total = data.length;
        const published = data.filter(b => b.status === 'PUBLISHED').length;
        const drafts = total - published;

        setStats({ total, published, drafts });
        // Take 5 most recent posts
        const sorted = [...data].sort((a, b) => new Date(b.createdAt || b.publishDate) - new Date(a.createdAt || a.publishDate));
        setRecentBlogs(sorted.slice(0, 5));
      } catch {
        // Use placeholders
        setStats({ total: 3, published: 3, drafts: 0 });
        setRecentBlogs([
          { id: 1, title: "Yono Rummy: The Ultimate Guide to Win Real Cash Rewards", status: "PUBLISHED", publishDate: "2026-07-15T12:00:00Z" },
          { id: 2, title: "How to Securely Install YONO Games APK on Android Devices", status: "PUBLISHED", publishDate: "2026-07-14T09:00:00Z" },
          { id: 3, title: "Top 5 Popular Card Games Available inside the Yono Store App", status: "PUBLISHED", publishDate: "2026-07-13T15:30:00Z" }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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
    <div className="admin-dashboard-page fade-in">
      <div className="dashboard-header">
        <div>
          <h1 className="text-gradient">Dashboard Overview</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>Welcome back. Here is the current status of your blogging catalog.</p>
        </div>
      </div>

      {/* Stats Counter Rows */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-value">{stats.total}</span>
            <span className="stat-label">Total Articles</span>
          </div>
          <div className="stat-icon blue"><FileText size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-value">{stats.published}</span>
            <span className="stat-label">Published</span>
          </div>
          <div className="stat-icon green"><CheckCircle size={24} /></div>
        </div>

        <div className="stat-card">
          <div className="stat-info">
            <span className="stat-value">{stats.drafts}</span>
            <span className="stat-label">Drafts</span>
          </div>
          <div className="stat-icon orange"><AlertCircle size={24} /></div>
        </div>
      </div>

      {/* Main Grid for lists & widgets */}
      <div className="dashboard-main-grid">
        <div className="dashboard-panel">
          <h2>Recent Activity</h2>
          {recentBlogs.length === 0 ? (
            <div style={{ textShadow: 'none', color: 'var(--text-muted)', textAlign: 'center', padding: '40px 0' }}>
              No blogs found in system database. Click 'Add Blog' to create your first article!
            </div>
          ) : (
            <div className="recent-blogs-list">
              {recentBlogs.map(blog => (
                <div className="recent-blog-row" key={blog.id}>
                  <div>
                    <div className="recent-blog-title">{blog.title}</div>
                    <span className="recent-blog-date">Published: {formatDate(blog.publishDate)}</span>
                  </div>
                  <span className={`recent-blog-status ${blog.status.toLowerCase()}`}>
                    {blog.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="dashboard-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <h2>Quick Actions</h2>
          <div className="actions-list">
            <Link to="/admin/blogs/new" className="dashboard-action-btn">
              <PlusCircle size={18} />
              <span>Create New Article</span>
            </Link>
            <Link to="/admin/blogs" className="dashboard-action-btn">
              <FileText size={18} />
              <span>Manage Existing Blogs</span>
            </Link>
            <Link to="/admin/profile" className="dashboard-action-btn">
              <Settings size={18} />
              <span>Security Configurations</span>
            </Link>
            <a href="/" target="_blank" className="dashboard-action-btn">
              <ArrowUpRight size={18} />
              <span>Preview Live Site</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
