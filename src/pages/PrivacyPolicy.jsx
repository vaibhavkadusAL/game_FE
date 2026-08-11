import React from 'react';
import SEO from '../components/SEO';

const PrivacyPolicy = () => {
  return (
    <div className="legal-page section-padding" style={{ background: 'rgba(18, 14, 36, 0.4)' }}>
      <SEO 
        title="Privacy Policy - YONO Games" 
        description="Learn how YONO Games collects, handles, and protects user data. Review our terms regarding cookie files and third-party trackers." 
        slug="privacy-policy"
      />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box', wordBreak: 'break-word', color: 'var(--text-muted)', lineHeight: '1.8' }}>
        <h1 className="text-gradient-purple" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '24px', textAlign: 'center' }}>Privacy Policy</h1>
        <p style={{ marginBottom: '20px' }}>Last Updated: July 16, 2026</p>

        <p style={{ marginBottom: '20px' }}>
          At YONO Games (accessible from https://yonostoreapp.com), the privacy of our visitors is one of our primary priorities. This Privacy Policy document outlines the types of information that is collected and recorded by YONO Games and how we use it.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>1. Consent</h2>
        <p style={{ marginBottom: '20px' }}>
          By using our website, you hereby consent to our Privacy Policy and agree to its terms.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>2. Information We Collect</h2>
        <p style={{ marginBottom: '20px' }}>
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>3. How We Use Your Information</h2>
        <p style={{ marginBottom: '20px' }}>
          We use the information we collect in various ways, including to:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '20px' }}>
          <li style={{ marginBottom: '8px' }}>Provide, operate, and maintain our website.</li>
          <li style={{ marginBottom: '8px' }}>Improve, personalize, and expand our website.</li>
          <li style={{ marginBottom: '8px' }}>Understand and analyze how you use our website.</li>
          <li style={{ marginBottom: '8px' }}>Develop new products, services, features, and functionality.</li>
          <li style={{ marginBottom: '8px' }}>Send you emails regarding support queries or platform updates.</li>
        </ul>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>4. Log Files & Cookies</h2>
        <p style={{ marginBottom: '20px' }}>
          YONO Games follows a standard procedure of using log files. These files log visitors when they visit websites. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>5. Third Party Privacy Policies</h2>
        <p style={{ marginBottom: '20px' }}>
          YONO Games's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>6. Children's Information</h2>
        <p style={{ marginBottom: '20px' }}>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. YONO Games does not knowingly collect any Personal Identifiable Information from children under the age of 13.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
