import React, { useState } from 'react';
import { Mail, Send, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulate API Submission
    setTimeout(() => {
      setSuccess(true);
      setSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 1200);
  };

  return (
    <div className="contact-page">
      <SEO 
        title="Contact Us - YONO Games Customer Support" 
        description="Need help with the YONO app or cash withdrawals? Contact the YONO Games customer service desk. Submit a query online or connect with our support agents." 
        slug="contact"
      />

      <section className="contact-hero">
        <div className="container">
          <h1 className="text-gradient-purple">Contact Support</h1>
          <p>Have questions about deposits, withdrawals, or install settings? We are here to help 24/7.</p>
        </div>
      </section>

      <section className="contact-section-content section-padding">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info-column">
              <h2 className="text-gradient-cyan">Get in Touch</h2>
              <p>
                Please fill out the contact form with your correct account email so that we can fetch your device logs if necessary. Alternatively, you can connect directly with our support lines.
              </p>

              <div className="contact-methods">
                <div className="contact-method-card">
                  <div className="contact-method-icon"><Mail size={22} /></div>
                  <div className="contact-method-detail">
                    <h3>Customer Email Support</h3>
                    <p>support@yonostoreapp.com</p>
                  </div>
                </div>
                <div className="contact-method-card">
                  <div className="contact-method-icon"><Send size={22} /></div>
                  <div className="contact-method-detail">
                    <h3>Official Telegram Channel</h3>
                    <p>@YonoGamesOfficial</p>
                  </div>
                </div>
                <div className="contact-method-card">
                  <div className="contact-method-icon"><Clock size={22} /></div>
                  <div className="contact-method-detail">
                    <h3>Service Hours</h3>
                    <p>24 hours a day, 7 days a week</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="contact-form-column">
              {success ? (
                <div className="contact-success-msg">
                  <h3>Thank you!</h3>
                  <p style={{ marginTop: '8px' }}>Your message has been submitted. A support representative will email you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      required 
                      className="form-input"
                      placeholder="e.g. John Doe"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange} 
                      required 
                      className="form-input"
                      placeholder="e.g. john@example.com"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject" 
                      value={formData.subject} 
                      onChange={handleChange} 
                      required 
                      className="form-input"
                      placeholder="e.g. App Install Problem"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message Description</label>
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      className="form-input form-textarea"
                      placeholder="Please details your query..."
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={submitting} 
                    className="btn-premium btn-purple submit-btn"
                  >
                    <span>{submitting ? 'Submitting...' : 'Send Message'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
