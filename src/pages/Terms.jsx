import React from 'react';
import SEO from '../components/SEO';
import './Terms.css';

const Terms = () => {
  return (
    <div className="legal-page section-padding" style={{ background: 'rgba(18, 14, 36, 0.4)' }}>
      <SEO 
        title="Terms and Conditions - YONO Games" 
        description="Review the terms and conditions for using the YONO Games platform. Learn about intellectual property, acceptable usage, and limitation of liability." 
        slug="terms-conditions"
      />
      <div className="container legal-container">
        <h1 className="text-gradient-purple legal-title">Terms & Conditions</h1>
        <p style={{ marginBottom: '20px' }}>Last Updated: July 16, 2026</p>

        <p style={{ marginBottom: '20px' }}>
          Welcome to YONO Games! These terms and conditions outline the rules and regulations for the use of YONO Games's Website, located at https://yonostoreapp.com.
        </p>

        <p style={{ marginBottom: '20px' }}>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use YONO Games if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="legal-subtitle">1. License & Intellectual Property</h2>
        <p style={{ marginBottom: '20px' }}>
          Unless otherwise stated, YONO Games and/or its licensors own the intellectual property rights for all material on YONO Games. All intellectual property rights are reserved. You may access this from YONO Games for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <p style={{ marginBottom: '20px' }}>You must not:</p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Republish material from YONO Games</li>
          <li style={{ marginBottom: '8px' }}>Sell, rent or sub-license material from YONO Games</li>
          <li style={{ marginBottom: '8px' }}>Reproduce, duplicate or copy material from YONO Games</li>
          <li style={{ marginBottom: '8px' }}>Redistribute content from YONO Games</li>
        </ul>

        <h2 className="legal-subtitle">2. User Comments & Content</h2>
        <p style={{ marginBottom: '20px' }}>
          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. YONO Games does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of YONO Games, its agents and/or affiliates.
        </p>

        <h2 className="legal-subtitle">3. Hyperlinking to our Content</h2>
        <p style={{ marginBottom: '20px' }}>
          The following organizations may link to our Website without prior written approval: government agencies, search engines, news organizations, and online directory distributors.
        </p>

        <h2 className="legal-subtitle">4. Disclaimer of Liability</h2>
        <p style={{ marginBottom: '20px' }}>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Limit or exclude our or your liability for death or personal injury.</li>
          <li style={{ marginBottom: '8px' }}>Limit or exclude our or your liability for fraud or fraudulent misrepresentation.</li>
          <li style={{ marginBottom: '8px' }}>Limit any of our or your liabilities in any way that is not permitted under applicable law.</li>
        </ul>
        <p style={{ marginBottom: '20px' }}>
          As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
        </p>
      </div>
    </div>
  );
};

export default Terms;
