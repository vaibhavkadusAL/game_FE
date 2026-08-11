import React from 'react';
import SEO from '../components/SEO';

const Disclaimer = () => {
  return (
    <div className="legal-page section-padding" style={{ background: 'rgba(18, 14, 36, 0.4)' }}>
      <SEO 
        title="Disclaimer - YONO Games Legal Disclosures" 
        description="Read the official YONO Games disclaimer. We provide information regarding app installation packages for educational showcase purposes only." 
        slug="disclaimer"
      />
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box', wordBreak: 'break-word', color: 'var(--text-muted)', lineHeight: '1.8' }}>
        <h1 className="text-gradient-purple" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)', marginBottom: '24px', textAlign: 'center' }}>Disclaimer</h1>
        <p style={{ marginBottom: '20px' }}>Last Updated: July 16, 2026</p>

        <p style={{ marginBottom: '20px' }}>
          If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at support@yonostoreapp.com.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>1. General Information Disclosure</h2>
        <p style={{ marginBottom: '20px' }}>
          All the information on this website - https://yonostoreapp.com - is published in good faith and for general information purpose only. YONO Games does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website (YONO Games), is strictly at your own risk. YONO Games will not be liable for any losses and/or damages in connection with the use of our website.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>2. External Hyperlinks</h2>
        <p style={{ marginBottom: '20px' }}>
          From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>3. Independent Status</h2>
        <p style={{ marginBottom: '20px' }}>
          YONO Games is an independent showcase and informational portal. We are not officially affiliated, associated, authorized, endorsed by, or in any way officially connected with any card game franchises or official brand names. All brand names, logos, and registered trademarks displayed here belong to their respective owners.
        </p>

        <h2 style={{ color: '#fff', fontSize: 'clamp(1.2rem, 4vw, 1.5rem)', marginTop: '30px', marginBottom: '12px' }}>4. Responsible Gaming (18+)</h2>
        <p style={{ marginBottom: '20px' }}>
          Online gaming involves financial risk and may be addictive. Please play responsibly. Access to YONO games and real-money lobbies is strictly restricted to users aged 18 and older. If you reside in a jurisdiction where online skill-based card gaming is restricted, do not download the application packages.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
